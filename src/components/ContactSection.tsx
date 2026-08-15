import React, { useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { CursorContextState } from '../types';
import { Send, MapPin, CheckCircle2, Sparkles, Phone, Mail, Edit2, X, Check } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface ContactSectionProps {
  setCursorContext: (context: CursorContextState) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ setCursorContext }) => {
  const { studioName, contactDetails, updateContactDetails, isAdminMode } = useStudio();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState(contactDetails);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'High-Rise Tower & Forest Sanctuary',
    location: 'International',
    estimatedBudget: '$1M - $5M',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSaveContact = () => {
    updateContactDetails(contactForm);
    setIsEditingContact(false);
  };

  return (
    <section id="contact" className="my-20 py-16 border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-sm bg-slate-900 px-3.5 py-1 text-[10px] font-mono tracking-widest text-amber-300 border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COMMISSION ENQUIRIES</span>
            </div>

            {isAdminMode && !isEditingContact && (
              <button
                onClick={() => {
                  setContactForm(contactDetails);
                  setIsEditingContact(true);
                }}
                className="flex items-center gap-1 text-xs font-mono text-cyan-300 hover:underline"
              >
                <Edit2 className="h-3 w-3" /> Edit Contact Info
              </button>
            )}
          </div>

          {!isEditingContact ? (
            <>
              <h2 className="text-3xl md:text-5xl font-mono font-extrabold tracking-tight text-slate-100 uppercase">
                {contactDetails.heading || `COMMISSION ${studioName}`}
              </h2>

              <p className="text-sm font-mono text-slate-300 leading-relaxed">
                {contactDetails.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{contactDetails.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{contactDetails.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>{contactDetails.phone}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 bg-slate-900 border border-amber-500/50 rounded-sm space-y-4 shadow-2xl">
              <h3 className="text-xs font-mono font-bold text-amber-300 uppercase">Edit Contact Information</h3>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">HEADING TITLE</label>
                <input
                  type="text"
                  value={contactForm.heading}
                  onChange={(e) => setContactForm({ ...contactForm, heading: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={contactForm.description}
                  onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">ADDRESS</label>
                <input
                  type="text"
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">EMAIL</label>
                <input
                  type="text"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">PHONE</label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-2 text-xs font-mono text-slate-100 rounded-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditingContact(false)}
                  className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContact}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-mono font-bold bg-amber-400 text-slate-950 rounded-sm hover:bg-amber-300"
                >
                  <Check className="h-3.5 w-3.5" /> Save Contact
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-8 rounded-sm backdrop-blur-md">
          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 border border-amber-400 text-amber-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-mono font-bold text-slate-100">
                COMMISSION INQUIRY RECEIVED
              </h3>
              <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                Thank you for inquiring with {studioName}. Our principal architectural partners will review your site topography and project parameters within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2 text-xs font-mono text-amber-300 border border-slate-700 hover:border-amber-400 rounded-sm"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 mb-2 uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Samuel Tadesse"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 uppercase">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="s.tadesse@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 mb-2 uppercase">PROJECT TYPE</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="High-Rise Tower & Forest Sanctuary">High-Rise Tower & Forest Sanctuary</option>
                    <option value="Luxury Cantilever Villa">Luxury Cantilever Villa / Private Residence</option>
                    <option value="Civic Pavilion">Civic / Cultural Pavilion</option>
                    <option value="Lakeside Retreat">Waterfront / Hospitality Retreat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 uppercase">SITE LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Addis Ababa, International, Regional"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-2 uppercase">PROGRAM / SITE PARAMETERS</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe site topography, plot size, structural ambitions, or target timeline..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Magnetic Submit Button */}
              <div className="pt-2">
                <MagneticButton
                  setCursorContext={setCursorContext}
                  cursorMode={{ mode: 'link', text: 'SEND' }}
                  className="w-full rounded-sm bg-amber-400 py-4 text-xs font-mono font-bold tracking-widest text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 transition-all uppercase"
                >
                  <span className="flex items-center justify-center gap-2">
                    SUBMIT ARCHITECTURAL INQUIRY
                    <Send className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

