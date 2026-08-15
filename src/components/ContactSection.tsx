import React, { useState, useRef } from 'react';
import { MagneticButton } from './MagneticButton';
import { CursorContextState } from '../types';
import { 
  Send, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Mail, 
  Edit2, 
  Check, 
  Upload, 
  FileText, 
  X, 
  MessageSquare,
  Building2,
  Layers,
  Paperclip
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';

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
  'Social Media / Digital Campaigns',
  'Other'
];

const CONTACT_METHODS = [
  'Email',
  'Phone',
  'WhatsApp'
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
  const [contactForm, setContactForm] = useState(contactDetails);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState(''); // Email / Phone
  const [clientType, setClientType] = useState<string>('New Client');
  const [selectedServices, setSelectedServices] = useState<string[]>(['Architectural Design']);
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [preferredContact, setPreferredContact] = useState<string>('Email');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEmail = contactInfo.includes('@');
    
    // Save to context inquiries
    addInquirySubmission({
      name,
      email: isEmail ? contactInfo : (contactInfo || 'N/A'),
      phone: !isEmail ? contactInfo : '',
      projectType: selectedServices.join(', ') || 'Custom Project',
      budget: clientType,
      location: `Preferred: ${preferredContact}`,
      message: `[Client Type: ${clientType}]\n[Services: ${selectedServices.join(', ')}]\n[Contact: ${contactInfo} via ${preferredContact}]\n[Files: ${uploadedFiles.map(f => f.name).join(', ') || 'None'}]\n\n${projectDescription}`,
      answers: {
        clientType,
        services: selectedServices.join(', '),
        preferredContactMethod: preferredContact,
        filesAttached: uploadedFiles.map(f => f.name).join(', ')
      }
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 400);
  };

  const handleResetForm = () => {
    setName('');
    setContactInfo('');
    setClientType('New Client');
    setSelectedServices(['Architectural Design']);
    setProjectDescription('');
    setUploadedFiles([]);
    setPreferredContact('Email');
    setFormSubmitted(false);
  };

  const handleSaveContact = () => {
    updateContactDetails(contactForm);
    setIsEditingContact(false);
  };

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
                  setContactForm(contactDetails);
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

              {/* Direct Atelier Details */}
              <div className="space-y-4 pt-8 border-t border-stone-800/80 text-xs font-mono text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase">ATELIER LOCATION</span>
                    <span>{contactDetails.address || 'AXIS PLAZA, BOLE DISTRICT, ADDIS ABABA, ETHIOPIA'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase">DIRECT INQUIRIES</span>
                    <a href={`mailto:${contactDetails.email || 'COMMISSIONS@NILOAXIS.COM'}`} className="hover:text-amber-300 transition-colors">
                      {contactDetails.email || 'COMMISSIONS@NILOAXIS.COM'}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase">STUDIO PHONE</span>
                    <a href={`tel:${contactDetails.phone || '+251 11 892 4000'}`} className="hover:text-amber-300 transition-colors">
                      {contactDetails.phone || '+251 11 892 4000'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-stone-900 border border-amber-500/50 rounded-sm space-y-4 shadow-2xl">
              <h3 className="text-xs font-mono font-bold text-amber-300 uppercase">Edit Our Message & Contact Info</h3>
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
                <label className="block text-[10px] font-mono text-stone-400 mb-1">ADDRESS</label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 p-2 text-xs font-mono text-stone-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-stone-400 mb-1">EMAIL</label>
                <input
                  type="text"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 p-2 text-xs font-mono text-stone-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-stone-400 mb-1">PHONE</label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
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
                PROJECT REQUEST TRANSMITTED
              </h3>
              <p className="text-xs md:text-sm font-mono text-stone-300 max-w-lg mx-auto leading-relaxed">
                Thank you for sharing your vision with {studioName}. We have received your project parameters and uploaded materials. Our disciplinary directors will evaluate your requirements and reach out via your preferred method ({preferredContact}) shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 text-xs font-mono text-amber-300 border border-amber-500/50 hover:bg-amber-500 hover:text-stone-950 rounded-sm transition-all uppercase font-bold"
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

              <form onSubmit={handleSubmit} className="space-y-7 text-xs font-mono">
                
                {/* 1. Name & 2. Email / Phone */}
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
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 mb-2 font-bold uppercase tracking-wide">
                      Email / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g. name@domain.com or +251 91 234 5678"
                      className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors"
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
                          onClick={() => setClientType(type)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm border text-left transition-all ${
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
                          onClick={() => toggleService(service)}
                          className={`px-3 py-1.5 rounded-xs border text-[11px] font-mono transition-all flex items-center gap-1.5 ${
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

                {/* 5. Tell us about your project */}
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
                    placeholder="Provide details about your project scope, location/context, aesthetic aspirations, or target schedule..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-sm px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed"
                  />
                </div>

                {/* 6. Upload Files (Optional) */}
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
                    onClick={() => fileInputRef.current?.click()}
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
                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                            className="p-1 text-stone-500 hover:text-red-400 transition-colors"
                            title="Remove file"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 7. Preferred Contact Method */}
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
                          onClick={() => setPreferredContact(method)}
                          className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-sm border text-center transition-all ${
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

                {/* 8. Send Project Request Button */}
                <div className="pt-4">
                  <MagneticButton
                    setCursorContext={setCursorContext}
                    cursorMode={{ mode: 'link', text: 'TRANSMIT' }}
                    className="w-full rounded-sm bg-amber-400 py-4 text-xs md:text-sm font-mono font-bold tracking-widest text-stone-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:bg-amber-300 transition-all uppercase disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? 'TRANSMITTING REQUEST...' : 'Send Project Request'}
                      <Send className="h-4 w-4" />
                    </span>
                  </MagneticButton>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
