import React, { useEffect, useState, useRef } from 'react';
import { MagneticButton } from './MagneticButton';
import { CursorContextState } from '../types';
import { ArrowDownRight, Camera, Sparkles, Edit2, Upload, RotateCcw } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenContact: () => void;
  setCursorContext: (context: CursorContextState) => void;
  reducedMotion: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenContact,
  setCursorContext,
  reducedMotion
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  const {
    heroImageUrl,
    studioName,
    heroTitle,
    heroSubtitle,
    heroTagline,
    isAdminMode,
    updateHeroImage,
    updateHeroContent,
    uploadFileAsDataUrl
  } = useStudio();

  const heroInputRef = useRef<HTMLInputElement>(null);

  const [tempTitle, setTempTitle] = useState(heroTitle);
  const [tempSubtitle, setTempSubtitle] = useState(heroSubtitle);
  const [tempTagline, setTempTagline] = useState(heroTagline);

  useEffect(() => {
    if (reducedMotion) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // Subtle scroll scale & parallax transformation
  const heroScale = Math.max(1.0, 1.08 - scrollY * 0.00025);
  const heroTranslateY = scrollY * 0.22;
  const letterSpacingPx = Math.min(22, 6 + scrollY * 0.02);

  const handleHeroImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const publicUrl = await uploadFileAsDataUrl(file, 'brand');
      if (publicUrl) {
        updateHeroImage(publicUrl);
      }
    } catch (err) {
      console.error('Failed to change hero image', err);
    } finally {
      setIsUploading(false);
      if (heroInputRef.current) heroInputRef.current.value = '';
    }
  };

  const handleSaveContent = () => {
    updateHeroContent(tempTitle, tempSubtitle, tempTagline);
    setIsEditingTitle(false);
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 px-6 md:px-16 pt-28 pb-12">
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <div className="animate-ambient-light absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-500/10 via-yellow-400/5 to-transparent blur-3xl" />
      </div>

      {/* Main Landing / Hero Background Image with Parallax Scale */}
      <div
        className="absolute inset-0 z-0 overflow-hidden opacity-50 transition-transform duration-100 ease-out"
        style={{
          transform: reducedMotion ? 'none' : `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`
        }}
      >
        <img
          src={heroImageUrl}
          alt={`${studioName} Hero Architectural Vision`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover filter brightness-[0.95] contrast-[1.08]"
        />
        
        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60" />
      </div>

      {/* Top Header Eyebrow */}
      <div className="relative z-20 flex items-center justify-between border-b border-slate-800/80 pb-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="tracking-[0.22em] text-amber-300 font-bold uppercase">
            {studioName} / ARCHITECTURAL VISION
          </span>
        </div>
        <div className="hidden sm:block tracking-widest text-slate-400">
          INTERNATIONAL ARCHITECTURE & LANDSCAPE STUDIO
        </div>
      </div>

      {/* Main Typography Headline & Hero Content */}
      <div className="relative z-20 my-auto py-12 md:py-20 max-w-5xl">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 rounded-sm bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-mono tracking-[0.2em] text-amber-300 border border-amber-500/40 mb-6 shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>{heroTagline}</span>
        </div>

        {/* Company Name & Big Hero Display */}
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-amber-400/90 font-bold uppercase">
              ARCHITECTURAL & DESIGN STUDIO
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-mono font-extrabold tracking-tight text-slate-100 uppercase leading-[0.95] transition-all duration-300 drop-shadow-md"
            style={{ letterSpacing: `${letterSpacingPx}px` }}
          >
            {studioName}
          </h1>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-amber-300 uppercase leading-snug mt-3 drop-shadow-sm">
            {heroTitle || 'ROOTED HERE. DESIGNED BEYOND.'}
          </h2>

          <p className="mt-6 max-w-2xl text-sm md:text-base font-mono text-slate-200 leading-relaxed bg-slate-950/40 p-3 rounded-sm border-l-2 border-amber-400 backdrop-blur-sm">
            {heroSubtitle}
          </p>
        </div>

        {/* Magnetic Action Button */}
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <MagneticButton
            onClick={onExploreProjects}
            setCursorContext={setCursorContext}
            cursorMode={{ mode: 'project', text: 'EXPLORE WORKS', intensity: 'high' }}
            className="group rounded-sm bg-amber-400 px-8 py-4 text-xs font-mono font-bold tracking-widest text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:bg-amber-300 transition-all"
          >
            <span className="flex items-center gap-3 uppercase">
              EXPLORE WORKS SHOWCASE
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold">NILO AXIS STUDIO</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">LUXURY RESIDENTIAL & COMMERCIAL ARCHITECTURE</span>
        </div>

        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <span>SCROLL DOWN TO EXPLORE WORKS</span>
          <ArrowDownRight className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
