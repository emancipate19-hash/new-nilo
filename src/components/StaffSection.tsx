import React, { useState, useRef } from 'react';
import { useStudio } from '../context/StudioContext';
import { TeamMember, CursorContextState } from '../types';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Mail, 
  ExternalLink,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface StaffSectionProps {
  setCursorContext: (context: CursorContextState) => void;
}

export const StaffSection: React.FC<StaffSectionProps> = ({ setCursorContext }) => {
  const { 
    teamMembers, 
    addTeamMember, 
    updateTeamMember, 
    deleteTeamMember, 
    uploadFileAsDataUrl, 
    isAdminMode 
  } = useStudio();

  // Section Header State (persisted in component or default)
  const [sectionBadge, setSectionBadge] = useState('05 — ATELIER PRINCIPALS & STAFF');
  const [sectionTitle, setSectionTitle] = useState('DISCIPLINARY LEADERSHIP & ARCHITECTS');
  const [sectionSubtitle, setSectionSubtitle] = useState(
    'A multidisciplinary ensemble of licensed architects, structural innovators, interior directors, and computational designers shaping each NILO AXIS commission.'
  );

  // Modal / Editing State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Form State for Adding / Editing
  const [formState, setFormState] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    portrait: '',
    bio: '',
    role: '',
    experience: '',
    socialLinks: { linkedin: '', instagram: '', x: '', email: '' },
    isVisible: true
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);
  const [inlineUploadTargetId, setInlineUploadTargetId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setFormState({
      id: `staff-${Date.now()}`,
      name: '',
      position: 'SENIOR ARCHITECT & DESIGNER',
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Specialist in structural systems, sustainable materials, and contemporary spatial programming.',
      role: 'Core Atelier Staff',
      experience: '8+ Years Experience',
      socialLinks: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com', x: '', email: 'studio@niloaxis.com' },
      isVisible: true
    });
    setEditingMember(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormState({
      ...member,
      socialLinks: { ...member.socialLinks }
    });
    setIsAddModalOpen(true);
  };

  const handleSaveMember = () => {
    if (!formState.name?.trim()) {
      alert('Please enter a name for the staff member.');
      return;
    }

    const memberData: TeamMember = {
      id: editingMember ? editingMember.id : (formState.id || `staff-${Date.now()}`),
      name: formState.name || 'NEW ARCHITECT',
      position: formState.position || 'STUDIO ARCHITECT',
      portrait: formState.portrait || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: formState.bio || '',
      role: formState.role || 'Staff Member',
      experience: formState.experience || '',
      socialLinks: {
        linkedin: formState.socialLinks?.linkedin || '',
        instagram: formState.socialLinks?.instagram || '',
        x: formState.socialLinks?.x || '',
        email: formState.socialLinks?.email || ''
      },
      isVisible: formState.isVisible !== false
    };

    if (editingMember) {
      updateTeamMember(memberData);
    } else {
      addTeamMember(memberData);
    }

    setIsAddModalOpen(false);
    setEditingMember(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const dataUrl = await uploadFileAsDataUrl(file);
      setFormState((prev) => ({ ...prev, portrait: dataUrl }));
    } catch (err) {
      console.error('Error uploading portrait:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleInlinePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>, member: TeamMember) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await uploadFileAsDataUrl(file);
      updateTeamMember({
        ...member,
        portrait: dataUrl
      });
    } catch (err) {
      console.error('Error uploading inline portrait:', err);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= teamMembers.length) return;

    const newMembers = [...teamMembers];
    const [moved] = newMembers.splice(index, 1);
    newMembers.splice(targetIndex, 0, moved);

    // Save ordered array through batch or sequential update
    newMembers.forEach((m) => updateTeamMember(m));
  };

  const visibleMembers = isAdminMode 
    ? teamMembers 
    : teamMembers.filter((m) => m.isVisible !== false);

  return (
    <section id="team" className="my-24 pt-8 border-t border-stone-800/80 relative scroll-mt-24">
      {/* Hidden File Input for Direct Inline Uploads */}
      <input
        type="file"
        ref={inlineFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (inlineUploadTargetId) {
            const member = teamMembers.find((m) => m.id === inlineUploadTargetId);
            if (member) {
              handleInlinePortraitUpload(e, member);
            }
          }
        }}
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            {isAdminMode ? (
              <input
                type="text"
                value={sectionBadge}
                onChange={(e) => setSectionBadge(e.target.value)}
                className="text-[11px] font-mono tracking-[0.2em] text-amber-400 bg-stone-900 border border-stone-700 rounded px-2 py-0.5"
              />
            ) : (
              <span className="text-[11px] font-mono tracking-[0.2em] text-amber-400 uppercase font-semibold">
                {sectionBadge}
              </span>
            )}
          </div>

          {isAdminMode ? (
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="text-2xl md:text-3xl font-mono font-bold text-stone-100 uppercase tracking-tight bg-stone-900 border border-stone-700 rounded px-2 py-1 w-full"
            />
          ) : (
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-stone-100 uppercase tracking-tight">
              {sectionTitle}
            </h2>
          )}

          {isAdminMode ? (
            <textarea
              rows={2}
              value={sectionSubtitle}
              onChange={(e) => setSectionSubtitle(e.target.value)}
              className="text-xs font-mono text-stone-400 bg-stone-900 border border-stone-700 rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="text-xs font-mono text-stone-400 leading-relaxed max-w-xl">
              {sectionSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* Staff Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleMembers.map((member, index) => (
          <div
            key={member.id}
            id={`team-member-card-${member.id}`}
            className={`group relative bg-stone-900/60 border rounded-sm overflow-hidden flex flex-col transition-all duration-300 ${
              member.isVisible === false 
                ? 'opacity-60 border-dashed border-stone-700 bg-stone-950/40' 
                : 'border-stone-800/80 hover:border-amber-400/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            }`}
          >
            {/* Portrait Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-950">
              <img
                src={member.portrait}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="px-2 py-0.5 bg-stone-950/90 backdrop-blur-md border border-stone-800 text-[10px] font-mono text-amber-300 font-bold uppercase rounded-xs">
                  {`0${index + 1}`}
                </span>
                {member.isVisible === false && (
                  <span className="px-2 py-0.5 bg-red-950/90 border border-red-800 text-[9px] font-mono text-red-300 uppercase">
                    HIDDEN
                  </span>
                )}
              </div>

              {/* Direct Portrait Upload Button (Hover on portrait) */}
              <button
                onClick={() => {
                  setInlineUploadTargetId(member.id);
                  inlineFileInputRef.current?.click();
                }}
                className="absolute top-3 right-3 p-1.5 bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 backdrop-blur-md rounded border border-stone-700 opacity-0 group-hover:opacity-100 transition-all z-20"
                title="Upload new portrait image directly"
              >
                <Upload className="h-3.5 w-3.5" />
              </button>

              {/* Admin Quick Action Floating Bar (Only when Inline Edit is Active from Top Navbar) */}
              {isAdminMode && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1 z-20 bg-stone-950/95 p-1.5 rounded border border-amber-500/50 backdrop-blur-md">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-1 hover:bg-amber-500 hover:text-stone-950 text-amber-400 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-colors"
                      title="Edit Member Details"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>EDIT</span>
                    </button>

                    <button
                      onClick={() => updateTeamMember({ ...member, isVisible: !member.isVisible })}
                      className="p-1 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded transition-colors"
                      title={member.isVisible ? 'Hide from public view' : 'Make visible to public'}
                    >
                      {member.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3 text-amber-400" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {index > 0 && (
                      <button
                        onClick={() => handleMove(index, 'up')}
                        className="p-1 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded transition-colors"
                        title="Move Left"
                      >
                        <ArrowUp className="h-3 w-3 transform -rotate-90" />
                      </button>
                    )}
                    {index < teamMembers.length - 1 && (
                      <button
                        onClick={() => handleMove(index, 'down')}
                        className="p-1 hover:bg-stone-800 text-stone-400 hover:text-stone-200 rounded transition-colors"
                        title="Move Right"
                      >
                        <ArrowDown className="h-3 w-3 transform -rotate-90" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${member.name} from atelier staff?`)) {
                          deleteTeamMember(member.id);
                        }
                      }}
                      className="p-1 hover:bg-red-950 text-stone-400 hover:text-red-400 rounded transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Member Info Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-stone-950/80">
              <div className="space-y-1.5">
                <h3 className="text-sm font-mono font-bold text-stone-100 uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[11px] font-mono text-amber-400/90 font-medium tracking-wide">
                  {member.position}
                </p>
                <p className="text-[11px] font-mono text-stone-400 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Social & Contact Links */}
              <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
                      title="Instagram Profile"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.socialLinks?.x && (
                    <a
                      href={member.socialLinks.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
                      title="X / Twitter"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.socialLinks?.email && (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="p-1 text-stone-400 hover:text-amber-300 transition-colors"
                      title="Direct Email"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleOpenEdit(member)}
                  className="text-[10px] font-mono text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-1 uppercase"
                >
                  <span>PROFILE</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Staff Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-800 rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-mono font-bold text-stone-100 uppercase">
                  {editingMember ? 'EDIT STAFF MEMBER' : 'ADD NEW STAFF MEMBER'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Portrait Photo & Upload */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-stone-300 uppercase block">
                  PORTRAIT PHOTO
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-16 rounded overflow-hidden bg-stone-950 border border-stone-700 flex-shrink-0">
                    {formState.portrait ? (
                      <img
                        src={formState.portrait}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-stone-600">
                        <Users className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Image URL or upload file below..."
                      value={formState.portrait || ''}
                      onChange={(e) => setFormState({ ...formState, portrait: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs font-mono text-stone-200"
                    />
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-mono rounded border border-stone-700 transition-colors"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>{isUploadingPhoto ? 'UPLOADING...' : 'UPLOAD PHOTO FROM DEVICE'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-400 uppercase">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ELENA NILO"
                    value={formState.name || ''}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-stone-100 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-400 uppercase">POSITION / TITLE *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FOUNDING PRINCIPAL & DESIGN DIRECTOR"
                    value={formState.position || ''}
                    onChange={(e) => setFormState({ ...formState, position: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-amber-300 font-semibold"
                  />
                </div>
              </div>

              {/* Bio / Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-stone-400 uppercase">ARCHITECTURAL BIO / STATEMENT</label>
                <textarea
                  rows={3}
                  placeholder="Specialization, architectural background, design philosophy, credentials..."
                  value={formState.bio || ''}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs font-mono text-stone-300 leading-relaxed"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <label className="text-[10px] font-mono text-stone-400 uppercase">SOCIAL & CONTACT PROFILES</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5">
                    <Linkedin className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="LinkedIn URL"
                      value={formState.socialLinks?.linkedin || ''}
                      onChange={(e) => setFormState({
                        ...formState,
                        socialLinks: { ...formState.socialLinks, linkedin: e.target.value }
                      })}
                      className="w-full bg-transparent text-xs font-mono text-stone-200 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5">
                    <Instagram className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={formState.socialLinks?.instagram || ''}
                      onChange={(e) => setFormState({
                        ...formState,
                        socialLinks: { ...formState.socialLinks, instagram: e.target.value }
                      })}
                      className="w-full bg-transparent text-xs font-mono text-stone-200 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5">
                    <Twitter className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="X / Twitter URL"
                      value={formState.socialLinks?.x || ''}
                      onChange={(e) => setFormState({
                        ...formState,
                        socialLinks: { ...formState.socialLinks, x: e.target.value }
                      })}
                      className="w-full bg-transparent text-xs font-mono text-stone-200 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5">
                    <Mail className="h-3.5 w-3.5 text-stone-500 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="Direct Email Address"
                      value={formState.socialLinks?.email || ''}
                      onChange={(e) => setFormState({
                        ...formState,
                        socialLinks: { ...formState.socialLinks, email: e.target.value }
                      })}
                      className="w-full bg-transparent text-xs font-mono text-stone-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center justify-between p-3 bg-stone-950 border border-stone-800 rounded">
                <div>
                  <p className="text-xs font-mono font-bold text-stone-200">Public Visibility</p>
                  <p className="text-[10px] font-mono text-stone-500">Show this staff member on the live portfolio page</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, isVisible: !formState.isVisible })}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                    formState.isVisible !== false 
                      ? 'bg-amber-500 text-stone-950' 
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {formState.isVisible !== false ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono rounded"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSaveMember}
                className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold rounded shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                <Check className="h-4 w-4" />
                <span>SAVE STAFF MEMBER</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
