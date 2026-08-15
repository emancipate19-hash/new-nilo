import React, { useRef } from 'react';
import { useStudio } from '../context/StudioContext';
import { Camera, Plus, RefreshCw, X, Edit3, ShieldAlert } from 'lucide-react';

interface StudioAdminToolbarProps {
  onOpenAddModal: () => void;
}

export const StudioAdminToolbar: React.FC<StudioAdminToolbarProps> = ({ onOpenAddModal }) => {
  const {
    isAdminMode,
    setIsAdminMode,
    updateLogo,
    updateHeroImage,
    uploadFileAsDataUrl,
    resetToDefaults,
    studioName
  } = useStudio();

  const logoInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminMode) return null;

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await uploadFileAsDataUrl(file);
      updateLogo(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await uploadFileAsDataUrl(file);
      updateHeroImage(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

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
