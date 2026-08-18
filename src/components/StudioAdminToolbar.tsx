import React, { useRef, useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { ProjectAnimationPreset } from '../types';
import {
  Camera,
  Plus,
  RefreshCw,
  X,
  FolderSync,
  Film,
  Sparkles,
  ChevronUp,
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface StudioAdminToolbarProps {
  onOpenAddModal: () => void;
}

const ANIMATION_OPTIONS: { id: ProjectAnimationPreset; label: string; engine: string }[] = [
  { id: 'framer-slide-fade', label: 'Framer Motion: Slide & Fade', engine: 'Framer Motion' },
  { id: 'framer-spring-glide', label: 'Framer Motion: Spring Glide', engine: 'Framer Motion' },
  { id: 'motion-fade-scale', label: 'Framer Motion: Fade & Scale', engine: 'Framer Motion' },
  { id: 'gsap-stagger-slide', label: 'GSAP: Inertial Slide-In', engine: 'GSAP' },
  { id: 'gsap-curtain-reveal', label: 'GSAP: Curtain Reveal', engine: 'GSAP' },
  { id: 'architectural-drift', label: 'GSAP: Spatial Drift', engine: 'GSAP' }
];

export const StudioAdminToolbar: React.FC<StudioAdminToolbarProps> = ({ onOpenAddModal }) => {
  const {
    isAdminMode,
    setIsAdminMode,
    updateLogo,
    updateHeroImage,
    uploadFileAsDataUrl,
    resetToDefaults,
    setIsGoogleDriveModalOpen,
    projectAnimationPreset,
    setProjectAnimationPreset,
    studioName,
    adminUser,
    logoutAdmin
  } = useStudio();

  const [isAnimDropdownOpen, setIsAnimDropdownOpen] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminMode) return null;

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const publicUrl = await uploadFileAsDataUrl(file, 'brand');
      if (publicUrl) {
        updateLogo(publicUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const publicUrl = await uploadFileAsDataUrl(file, 'brand');
      if (publicUrl) {
        updateHeroImage(publicUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeOption = ANIMATION_OPTIONS.find(o => o.id === projectAnimationPreset) || ANIMATION_OPTIONS[0];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] bg-slate-900/95 border border-amber-500/50 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-4 text-xs font-mono text-slate-100 max-w-full overflow-x-auto">
      <div className="flex items-center gap-2 pr-3 border-r border-slate-800 flex-shrink-0">
        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-bold text-amber-300 uppercase tracking-widest">{studioName} EDIT MODE</span>
      </div>

      {/* Hidden file inputs */}
      <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
      <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Animation Preset Choose Button */}
        <div className="relative">
          <button
            onClick={() => setIsAnimDropdownOpen(!isAnimDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-amber-500/60 text-amber-300 hover:bg-slate-800 transition-colors"
            title="Choose scroll animation for Editorial Project List (GSAP / Framer Motion)"
          >
            <Film className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-bold uppercase tracking-wider">ANIMATION: {activeOption.engine}</span>
            <ChevronUp className={`h-3 w-3 text-amber-400 transition-transform ${isAnimDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isAnimDropdownOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-64 rounded-sm bg-slate-950 border border-amber-500/60 p-2 shadow-2xl z-[100] divide-y divide-slate-800">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase p-1">
                EDITORIAL LIST ANIMATIONS
              </div>
              <div className="py-1 space-y-1">
                {ANIMATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setProjectAnimationPreset(opt.id);
                      setIsAnimDropdownOpen(false);
                      const el = document.getElementById('projects-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-sm text-[11px] font-mono flex items-center justify-between transition-colors ${
                      opt.id === projectAnimationPreset
                        ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-500/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsGoogleDriveModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/60 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold transition-all shadow-sm"
          title="Sync & replace portfolio photos with Google Drive folder"
        >
          <FolderSync className="h-3.5 w-3.5" />
          <span>DRIVE FOLDER SYNC</span>
        </button>

        <button
          onClick={() => logoInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-700 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          <Camera className="h-3.5 w-3.5" />
          <span>CHANGE LOGO</span>
        </button>

        <button
          onClick={() => heroInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-700 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          <Camera className="h-3.5 w-3.5" />
          <span>CHANGE HERO</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 font-bold text-slate-950 hover:bg-amber-300 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>ADD PROJECT</span>
        </button>

        <button
          onClick={() => {
            if (confirm('Reset logo, hero image, and projects to original studio defaults?')) {
              resetToDefaults();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-red-900/50 text-red-400 hover:bg-red-950 transition-colors"
          title="Reset to initial studio assets"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>RESET DEFAULTS</span>
        </button>

        {adminUser?.email && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] text-amber-300">
            <ShieldCheck className="h-3 w-3 text-amber-400" />
            <span className="max-w-[120px] truncate">{adminUser.email}</span>
          </div>
        )}

        <button
          onClick={async () => {
            await logoutAdmin();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/70 border border-red-800/80 text-red-200 hover:bg-red-900 hover:text-white font-bold transition-all shadow-sm cursor-pointer"
          title="Sign out from Supabase Admin session"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>LOGOUT</span>
        </button>

        <button
          onClick={() => setIsAdminMode(false)}
          className="p-1.5 text-slate-400 hover:text-amber-300 ml-2"
          title="Close Admin Bar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

