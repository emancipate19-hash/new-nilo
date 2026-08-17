import React, { useState, useRef } from 'react';
import { MagneticButton } from './MagneticButton';
import { CursorContextState } from '../types';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  Edit2, 
  Check, 
  Upload, 
  FileText, 
  X, 
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { supabase } from '../lib/supabase';

interface ContactSectionProps {
  setCursorContext: (context: CursorContextState) => void;
}

const CLIENT_TYPES = [
  'New Client',
  'Existing Client',
  'Visitor / Reader'
];

const SERVICE_OPTIONS = [
  'Architectural Design',
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'Renovation / Remodeling',
  '3D Visualization & Rendering',
  'Graphic Design',
  'Branding & Visual Identity',
  'Video Editing',
  'Web Development',
  'Digital Storytelling',
  'Social Media / Digital Campaigns'
];

const CONTACT_METHODS = [
  'Email',
  'WhatsApp',
  'Telegram'
];

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ setCursorContext }) => {
  const { studioName, contactDetails, updateContactDetails, isAdminMode, addInquirySubmission } = useStudio();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    heading: contactDetails.heading || 'Our Message',
    description: contactDetails.description || '',
    email: contactDetails.email || 'niloaxisstudio@gmail.com'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [clientType, setClientType] = useState<string>('New Client');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Architectural Design']);
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [preferredContact, setPreferredContact] = useState<string>('Email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? (prev.length > 1 ? prev.filter(s => s !== service) : prev)
        : [...prev, service]
    );
  };

  const handleFileProcess = (files: FileList | null) => {
    if (!files) return;
    const newItems: UploadedFileItem[] = [];

    Array.from(files).forEach(file => {
      const sizeFormatted = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      const item: UploadedFileItem = {
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: sizeFormatted,
        type: file.type
      };

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles(prev => prev.map(f => f.id === item.id ? { ...f, previewUrl: e.target?.result as string } : f));
        };
        reader.readAsDataURL(file);
      }

      newItems.push(item);
    });

    setUploadedFiles(prev => [...prev, ...newItems]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileProcess(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileProcess(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmitting) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    // 1. Validate the form
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = projectDescription.trim();

    if (!trimmedName) {
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage('Please describe what you want to create.');
      return;
    }

    // 2. Show "Sending Request…" and disable the button
    setIsSubmitting(true);

    try {
      const projectTypeStr = selectedServices.join(', ');
      
      const formData = {
        name: trimmedName,
        email: trimmedEmail,
        projectType: projectTypeStr,
        services: selectedServices,
        budget: budget.trim() || undefined,
        timeline: timeline.trim() || undefined,
        clientType: clientType,
        preferredContact: preferredContact,
        message: trimmedMessage,
        attachments: uploadedFiles.map(f => f.name)
      };

      // 3. Call existing Supabase Edge Function: send-project-request
      const { data, error } = await supabase.functions.invoke('send-project-request', {
        body: formData
      });

      if (error) {
        let errorText = error.message || 'Something went wrong. Please try again.';
        if (error && 'context' in error && (error as any).context) {
          try {
            const body = await (error as any).context.json();
            if (body?.error) errorText = body.error;
            else if (body?.message) errorText = body.message;
          } catch {
            // ignore
          }
        }
        throw new Error(errorText);
      }

      if (data && data.success === false) {
        throw new Error(data.error || 'Failed to submit project request.');
      }

      // Save to local context inquiries
      addInquirySubmission({
        name: trimmedName,
        email: trimmedEmail,
        phone: '',
        projectType: projectTypeStr,
        budget: budget || clientType,
        location: `Contact via ${preferredContact}`,
        message: trimmedMessage + (uploadedFiles.length > 0 ? `\n[Attachments: ${uploadedFiles.map(f => f.name).join(', ')}]` : ''),
        answers: {
          clientType,
          services: projectTypeStr,
          budget: budget || 'Not specified',
          timeline: timeline || 'Flexible',
          preferredContactMethod: preferredContact,
          filesAttached: uploadedFiles.map(f => f.name).join(', ')
        }
      });

      // 4. Show professional success message
      setSuccessMessage('Project request sent successfully.');
      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      const errMsg = err?.message && err.message !== 'Failed to fetch' 
        ? err.message 
        : 'Something went wrong while sending your request. Please try again.';
      setErrorMessage(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setBudget('');
    setTimeline('');
    setClientType('New Client');
    setSelectedServices(['Architectural Design']);
    setProjectDescription('');
    setUploadedFiles([]);
    setPreferredContact('Email');
    setFormSubmitted(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSaveContact = () => {
    updateContactDetails({
      ...contactDetails,
      heading: contactForm.heading,
      description: contactForm.description,
      email: contactForm.email || 'niloaxisstudio@gmail.com',
      address: '',
      phone: ''
    });
    setIsEditingContact(false);
  };

  const displayEmail = contactDetails.email || 'niloaxisstudio@gmail.com';

  return (
    <section id="contact" className="my-20 py-16 border-t border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Our Message */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-xs bg-stone-900 px-3.5 py-1 text-[10px] font-mono tracking-widest text-amber-300 border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>OUR MESSAGE</span>
            </div>

            {isAdminMode && !isEditingContact && (
              <button
                onClick={() => {
                  setContactForm({
                    heading: contactDetails.heading || 'Our Message',
                    description: contactDetails.description || '',
                    email: contactDetails.email || 'niloaxisstudio@gmail.com'
                  });
                  setIsEditingContact(true);
                }}
                className="flex items-center gap-1 text-xs font-mono text-amber-400 hover:underline"
              >
                <Edit2 className="h-3 w-3" /> Edit Message
              </button>
            )}
          </div>

          {!isEditingContact ? (
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-mono font-extrabold tracking-tight text-stone-100 uppercase">
                {contactDetails.heading || 'Our Message'}
              </h2>

              <div className="space-y-4 text-xs md:text-sm font-mono text-stone-300 leading-relaxed">
                <p className="font-medium text-stone-200">
                  We believe every project begins with an idea — a vision waiting to take shape.
                </p>
                <p className="text-stone-400">
                  By bridging <strong className="text-stone-100 font-semibold">architecture, art, technology, and strategy</strong>, we create thoughtful spaces and compelling digital experiences that connect people, purpose, and place. From architectural concepts and spatial design to visual identities, websites, video, and digital storytelling, we approach every project with curiosity, precision, and a strong sense of aesthetics.
                </p>
                <p className="text-amber-300/90 font-medium pt-2 border-l-2 border-amber-400/80 pl-3">
                  Our goal is simple: <strong className="text-stone-100 font-bold">to transform ideas into meaningful experiences that inspire, engage, and endure.</strong>
                </p>
              </div>

              {/* Direct Atelier Details (Email Only) */}
              <div className="space-y-4 pt-8 border-t border-stone-800/80 text-xs font-mono text-stone-300">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase tracking-wider">DIRECT EMAIL INQUIRIES</span>
                    <a 
                      href={`mailto:${displayEmail}`} 
                      className="text-stone-100 hover:text-amber-300 transition-colors font-bold text-sm tracking-wide"
                    >
                      {displayEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-stone-900 border border-amber-500/50 rounded-sm space-y-4 shadow-2xl">
              <h3 className="text-xs font-mono font-bold text-amber-300 uppercase">Edit Our Message & Email</h3>
              <div>
                <label className="block text-[10px] font-mono text-stone-400 mb-1">HEADING TITLE</label>
                <input
                  type="text"
                  value={contactForm.heading}
                  onChange={(e) => setContactForm({ ...contactForm, heading: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 p-2 text-xs font-mono text-stone-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-stone-400 mb-1">MESSAGE / STATEMENT</label>
                <textarea
                  rows={6}
                  value={contactForm.description}
                  onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 p-2 text-xs font-mono text-stone-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-stone-400 mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 p-2 text-xs font-mono text-stone-100 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditingContact(false)}
                  className="px-3 py-1.5 text-xs font-mono text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContact}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-mono font-bold bg-amber-400 text-stone-950 rounded-sm hover:bg-amber-300"
                >
                  <Check className="h-3.5 w-3.5" /> Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Tell Us What You Want to Create / Project Request Form */}
        <div className="lg:col-span-7 bg-stone-900/80 border border-stone-800 p-6 md:p-10 rounded-sm backdrop-blur-md shadow-2xl">
          {formSubmitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-950 border border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-mono font-bold text-stone-100 uppercase tracking-tight">
                Project request sent successfully.
              </h3>
              <p className="text-xs md:text-sm font-mono text-stone-300 max-w-lg mx-auto leading-relaxed">
                Thank you for sharing your vision with {studioName}. We have received your project parameters and our team will review your requirements and reach out via {preferredContact} ({email}) promptly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 text-xs font-mono text-amber-300 border border-amber-500/50 hover:bg-amber-500 hover:text-stone-950 rounded-sm transition-all uppercase font-bold cursor-pointer"
                >
                  SUBMIT ANOTHER PROJECT REQUEST
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3 pb-6 border-b border-stone-800">
                <h2 className="text-2xl md:text-3xl font-mono font-bold text-stone-100 uppercase tracking-tight">
                  Tell Us What You Want to Create
                </h2>
                <p className="text-xs md:text-sm font-mono text-stone-300 leading-relaxed">
                  Whether you're looking for an architectural design, a digital experience, a visual identity, or compelling content, tell us what you have in mind. Share your vision, requirements, and references, and we'll help turn your idea into a thoughtful, impactful result.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Project Request Form
                  </h3>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="flex items-center gap-3 p-3.5 bg-red-950/80 border border-red-500/50 rounded-sm text-red-200 text-xs font-mono">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Banner */}
              {successMessage && (
                <div className="flex items-center gap-3 p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-sm text-emerald-200 text-xs font-mono">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7 text-xs font-mono">
                
                {/* 1. Name & 2. Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-300 mb-2 font-bold uppercase tracking-wide">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name or organization"
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-2 font-bold uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 3. I am a: */}
                <div>
                  <label className="block text-stone-300 mb-2.5 font-bold uppercase tracking-wide">
                    I am a:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CLIENT_TYPES.map(type => {
                      const isSelected = clientType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setClientType(type)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                          }`}
                        >
                          <span>{type}</span>
                          <span className={`h-3 w-3 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-amber-400 bg-amber-400' : 'border-stone-700'
                          }`}>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-stone-950" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. What service are you interested in? */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-stone-300 font-bold uppercase tracking-wide">
                      What service are you interested in?
                    </label>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                      (Select all that apply)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map(service => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => toggleService(service)}
                          className={`px-3 py-1.5 rounded-xs border text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                          }`}
                        >
                          <span>{service}</span>
                          {isSelected && <Check className="h-3 w-3 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Optional Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-300 mb-2 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                      <span>Budget Range (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. $25k - $50k or Flexible"
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-2 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span>Target Timeline (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g. Q3 2026 or Next 3 months"
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* 6. Tell us about your project */}
                <div>
                  <label className="block text-stone-300 mb-1 font-bold uppercase tracking-wide">
                    Tell us about your project *
                  </label>
                  <p className="text-[11px] text-stone-400 italic mb-2">
                    Describe what you want to create, the problem you want to solve, your ideas, requirements, references, or anything else that can help us understand your vision.
                  </p>
                  <textarea
                    rows={5}
                    required
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Provide details about your project scope, aesthetic aspirations, site details, or target goals..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                    disabled={isSubmitting}
                  />
                </div>

                {/* 7. Upload Files (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-stone-300 font-bold uppercase tracking-wide">
                      Upload Files <span className="text-stone-500 font-normal italic lowercase">(optional)</span>
                    </label>
                  </div>
                  <p className="text-[11px] text-stone-400 italic mb-2.5">
                    Plans, sketches, images, PDFs, references, logos, or other project materials.
                  </p>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    className={`border border-dashed rounded-sm p-5 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-amber-400 bg-amber-400/10' 
                        : 'border-stone-800 bg-stone-950 hover:border-amber-500/50 hover:bg-stone-950/80'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileInputChange}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-amber-400">
                        <Upload className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-stone-200 font-medium underline underline-offset-4">
                          Click to browse files
                        </span>
                        <span className="text-xs font-mono text-stone-400"> or drag and drop here</span>
                      </div>
                      <p className="text-[10px] font-mono text-stone-500">
                        Supports PDF, PNG, JPG, CAD drawings, DWG, ZIP up to 50MB
                      </p>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map(file => (
                        <div 
                          key={file.id} 
                          className="flex items-center justify-between p-2.5 bg-stone-950 border border-stone-800 rounded-sm"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {file.previewUrl ? (
                              <img src={file.previewUrl} alt={file.name} className="h-7 w-7 object-cover rounded-xs border border-stone-700 shrink-0" />
                            ) : (
                              <div className="p-1.5 bg-stone-900 rounded border border-stone-800 text-amber-400 shrink-0">
                                <FileText className="h-3.5 w-3.5" />
                              </div>
                            )}
                            <div className="truncate">
                              <p className="text-xs font-mono text-stone-200 truncate">{file.name}</p>
                              <p className="text-[10px] font-mono text-stone-500">{file.size}</p>
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                            className="p-1 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 8. Preferred Contact Method */}
                <div>
                  <label className="block text-stone-300 mb-2.5 font-bold uppercase tracking-wide">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {CONTACT_METHODS.map(method => {
                      const isSelected = preferredContact === method;
                      return (
                        <button
                          key={method}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => setPreferredContact(method)}
                          className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-sm border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                              : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                          }`}
                        >
                          <span className={`h-2.5 w-2.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-amber-400 bg-amber-400' : 'border-stone-700'
                          }`} />
                          <span>{method}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 9. Send Project Request Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursorContext({ mode: 'link', text: 'TRANSMIT' })}
                    onMouseLeave={() => setCursorContext({ mode: 'default' })}
                    className="w-full rounded-sm bg-amber-400 py-4 text-xs md:text-sm font-mono font-bold tracking-widest text-stone-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:bg-amber-300 transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending Request…' : 'Send Project Request'}</span>
                    <Send className={`h-4 w-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
