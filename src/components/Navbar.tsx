import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Menu, X, Camera, Edit3, Check, RefreshCw, Plus, FolderPlus } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { CursorContextState } from '../types';
import { useStudio } from '../context/StudioContext';

interface NavbarProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateContact: () => void;
  onOpenAddProject?: () => void;
  setCursorContext: (context: CursorContextState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  reducedMotion,
  onToggleReducedMotion,
  onNavigateHome,
  onNavigateProjects,
  onNavigateContact,
  onOpenAddProject,
  setCursorContext
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  
  const {
    logoUrl,
    studioName,
    isAdminMode,
    setIsAdminMode,
    setIsCmsOpen,
    updateLogo,
    uploadFileAsDataUrl,
    resetToDefaults
  } = useStudio();

  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLogoUploading(true);
      const dataUrl = await uploadFileAsDataUrl(file);
      updateLogo(dataUrl);
    } catch (err) {
      console.error('Failed to upload logo', err);
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[95] bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      {/* Scroll Progress Line */}
      <div
        className="h-[2px] bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="flex items-center justify-between px-6 md:px-12 py-3.5">
        {/* Brand Logo & Studio Title */}
        <div className="flex items-center gap-3 group">
          {/* Logo container with quick hover upload */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 border border-amber-500/40 p-1 shadow-[0_0_15px_rgba(212,175,55,0.2)] overflow-hidden transition-transform group-hover:scale-105">
            <img
              src={logoUrl}
              alt={`${studioName} Logo`}
              className="h-full w-full object-contain rounded-full"
            />
            
            {/* Logo Upload Trigger overlay */}
            <button
              onClick={() => logoInputRef.current?.click()}
              onMouseEnter={() => setCursorContext({ mode: 'link', text: 'CHANGE LOGO' })}
              onMouseLeave={() => setCursorContext({ mode: 'default' })}
              title="Upload / Change Logo"
              className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-amber-300"
            >
              <Camera className="h-4 w-4 animate-bounce" />
            </button>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>

          <button
            onClick={onNavigateHome}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'HOME' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="text-left"
          >
            <span className="block text-sm font-mono font-extrabold tracking-[0.22em] text-slate-100 uppercase">
              {studioName}
            </span>
            <span className="block text-[9px] font-mono tracking-[0.25em] text-amber-400/90 font-medium uppercase">
              ARCHITECTURAL ATELIER
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-300">
          <button
            onClick={onNavigateHome}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'INDEX' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="hover:text-amber-300 transition-colors uppercase tracking-widest"
          >
            INDEX
          </button>
          <button
            onClick={onNavigateProjects}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'SHOWCASE' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="hover:text-amber-300 transition-colors uppercase tracking-widest flex items-center gap-1.5"
          >
            <span>WORKS SHOWCASE</span>
            <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] text-amber-300">NEW</span>
          </button>
          <a
            href="#journal"
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'JOURNAL' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="hover:text-amber-300 transition-colors uppercase tracking-widest"
          >
            JOURNAL
          </a>
        </nav>

        {/* Actions & Studio Admin Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Add New Project Button (Prominently displayed when Inline Edit is active, and always available via Quick Action) */}
          {isAdminMode && onOpenAddProject && (
            <button
              id="btn-navbar-add-project"
              onClick={onOpenAddProject}
              onMouseEnter={() => setCursorContext({ mode: 'link', text: 'NEW PROJECT' })}
              onMouseLeave={() => setCursorContext({ mode: 'default' })}
              className="flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-[11px] font-mono border bg-amber-400 text-slate-950 font-bold border-amber-300 hover:bg-amber-300 transition-all shadow-[0_0_16px_rgba(245,158,11,0.5)] animate-pulse"
              title="Add a new project to the portfolio"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>+ NEW PROJECT</span>
            </button>
          )}

          {/* CMS Modal Trigger */}
          <button
            onClick={() => setIsCmsOpen(true)}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'CMS' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-[11px] font-mono border bg-slate-900 text-amber-300 font-bold border-amber-500/40 hover:bg-amber-400 hover:text-slate-950 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            title="Open Full 55-Point No-Code Portfolio CMS"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>CMS CONTROL CENTER</span>
          </button>

          {/* Quick Edit Studio Toggle */}
          <button
            id="btn-navbar-inline-edit"
            onClick={() => {
              const nextState = !isAdminMode;
              setIsAdminMode(nextState);
            }}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: isAdminMode ? 'DONE' : 'STUDIO EDIT' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-[11px] font-mono border transition-all ${
              isAdminMode
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-amber-400/70 hover:text-amber-300'
            }`}
            title="Toggle inline editing mode"
          >
            {isAdminMode ? <Check className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5 text-amber-400" />}
            <span>{isAdminMode ? 'EDIT MODE: ON' : 'INLINE EDIT'}</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'MOTION' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] font-mono border transition-all ${
              reducedMotion
                ? 'bg-slate-900 text-amber-300 border-amber-500/50'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Reduced Motion"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>{reducedMotion ? 'MOTION: REDUCED' : 'MOTION: FULL'}</span>
          </button>

          {/* Magnetic Contact Button */}
          <MagneticButton
            onClick={onNavigateContact}
            setCursorContext={setCursorContext}
            cursorMode={{ mode: 'link', text: 'INQUIRE' }}
            className="rounded-sm bg-amber-400 px-5 py-2 text-xs font-mono font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            COMMISSION →
          </MagneticButton>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          {isAdminMode && onOpenAddProject && (
            <button
              onClick={onOpenAddProject}
              className="px-2.5 py-1.5 rounded-sm border bg-amber-400 text-slate-950 border-amber-300 text-xs font-mono font-bold flex items-center gap-1"
              title="Add New Project"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>+ PROJECT</span>
            </button>
          )}

          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`p-2 rounded-sm border text-xs font-mono flex items-center gap-1 ${
              isAdminMode ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' : 'text-slate-300 border-slate-800'
            }`}
          >
            <Edit3 className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 border border-slate-800 rounded-sm"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Inline Edit Active Status Banner with quick actions */}
      {isAdminMode && (
        <div className="bg-amber-500/10 border-t border-b border-amber-500/30 px-6 md:px-12 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold tracking-wider uppercase">INLINE EDIT MODE ACTIVE:</span>
            <span className="text-stone-300 hidden sm:inline">Modify portfolio projects, upload visuals & manage catalog</span>
          </div>

          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            {onOpenAddProject && (
              <button
                onClick={onOpenAddProject}
                className="flex items-center gap-1 bg-amber-400 text-slate-950 px-3 py-1 rounded-sm font-bold hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>+ ADD NEW PROJECT</span>
              </button>
            )}
            <button
              onClick={() => setIsCmsOpen(true)}
              className="flex items-center gap-1 bg-slate-900 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-sm hover:bg-slate-800 transition-colors"
            >
              <Sliders className="h-3 w-3" />
              <span>CMS DRAWER</span>
            </button>
            <button
              onClick={() => setIsAdminMode(false)}
              className="text-stone-400 hover:text-white px-2 py-1 transition-colors"
            >
              DONE
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 p-6 space-y-4 text-xs font-mono text-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-amber-400 font-bold">{studioName}</span>
            <button
              onClick={() => logoInputRef.current?.click()}
              className="text-[11px] text-cyan-300 underline flex items-center gap-1"
            >
              <Camera className="h-3 w-3" /> Change Logo
            </button>
          </div>

          {onOpenAddProject && (
            <button
              onClick={() => {
                onOpenAddProject();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2.5 px-3 bg-amber-400 text-slate-950 font-bold rounded-sm uppercase tracking-widest flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>+ ADD NEW PROJECT</span>
            </button>
          )}

          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 hover:text-amber-300 uppercase tracking-widest"
          >
            INDEX & MANIFESTO
          </button>
          <button
            onClick={() => {
              onNavigateProjects();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 hover:text-amber-300 uppercase tracking-widest text-amber-300 font-bold"
          >
            WORKS SHOWCASE
          </button>
          <button
            onClick={() => {
              setIsCmsOpen(true);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-amber-400 font-bold hover:text-amber-300 uppercase tracking-widest flex items-center gap-2"
          >
            <Sliders className="h-4 w-4" />
            <span>CMS CONTROL CENTER</span>
          </button>
          <button
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-amber-300 hover:text-white uppercase tracking-widest flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>{isAdminMode ? 'DISABLE INLINE EDIT' : 'ENABLE INLINE EDIT'}</span>
          </button>
          <button
            onClick={onToggleReducedMotion}
            className="block w-full text-left py-2 text-slate-400"
          >
            {reducedMotion ? 'ENABLE MOTION EFFECTS' : 'REDUCE MOTION'}
          </button>
          <button
            onClick={() => {
              onNavigateContact();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-center bg-amber-400 py-3 text-slate-950 font-bold rounded-sm mt-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            START A COMMISSION
          </button>
        </div>
      )}
    </header>
  );
};
