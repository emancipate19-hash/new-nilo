import React, { useState, useRef, useEffect } from 'react';
import { Project, CursorContextState, ProjectAnimationPreset } from '../types';
import { useStudio } from '../context/StudioContext';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import {
  ArrowUpRight,
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Layers,
  ChevronDown,
  CheckCircle2,
  Settings2,
  Film
} from 'lucide-react';

interface EditorialProjectListProps {
  onSelectProject: (project: Project) => void;
  setCursorContext: (context: CursorContextState) => void;
  reducedMotion?: boolean;
}

const ANIMATION_PRESETS: {
  id: ProjectAnimationPreset;
  label: string;
  engine: 'Framer Motion' | 'GSAP';
  description: string;
  icon: string;
}[] = [
  {
    id: 'framer-slide-fade',
    label: 'Framer Motion: Slide & Fade',
    engine: 'Framer Motion',
    description: 'Smooth vertical translation from 45px with staggered opacity fade and cubic ease.',
    icon: '⚡'
  },
  {
    id: 'framer-spring-glide',
    label: 'Framer Motion: Spring Glide',
    engine: 'Framer Motion',
    description: 'Bouncy spring physics with slight angular entrance and high dampening.',
    icon: '🌊'
  },
  {
    id: 'motion-fade-scale',
    label: 'Framer Motion: Fade & Scale',
    engine: 'Framer Motion',
    description: 'Gentle scale up from 0.94 to 1.0 with radiant golden aura reveal.',
    icon: '✨'
  },
  {
    id: 'gsap-stagger-slide',
    label: 'GSAP: Inertial Slide-In',
    engine: 'GSAP',
    description: 'GSAP power3.out physics curve sliding horizontally and fading in on scroll.',
    icon: '🎬'
  },
  {
    id: 'gsap-curtain-reveal',
    label: 'GSAP: Curtain Reveal',
    engine: 'GSAP',
    description: 'GSAP clip-path geometric curtain shutter opening with smooth deceleration.',
    icon: '🏛️'
  },
  {
    id: 'architectural-drift',
    label: 'GSAP: Spatial Drift',
    engine: 'GSAP',
    description: 'Ultra-slow floating elevation with architectural perspective glide.',
    icon: '📐'
  }
];

export const EditorialProjectList: React.FC<EditorialProjectListProps> = ({
  onSelectProject,
  setCursorContext,
  reducedMotion = false
}) => {
  const {
    projects,
    catalogHeader,
    isAdminMode,
    projectAnimationPreset,
    setProjectAnimationPreset
  } = useStudio();

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activePreset = ANIMATION_PRESETS.find(p => p.id === projectAnimationPreset) || ANIMATION_PRESETS[0];

  // Track mouse coordinates for floating preview
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleRowMouseEnter = (project: Project) => {
    setActiveProject(project);
    setCursorContext({
      mode: 'project',
      text: 'VIEW PROJECT',
      subtext: `${project.category} • ${project.year}`,
      intensity: 'high'
    });
  };

  const handleRowMouseLeave = () => {
    setActiveProject(null);
    setCursorContext({ mode: 'default' });
  };

  // GSAP scroll trigger & entrance animations execution when GSAP preset is active
  useEffect(() => {
    if (reducedMotion) return;

    const isGsap = activePreset.engine === 'GSAP';
    if (!isGsap) return;

    // Reset styles before applying GSAP
    projectRowRefs.current.forEach((el) => {
      if (el) {
        gsap.killTweensOf(el);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index') || '0');
            const targetEl = entry.target;

            if (activePreset.id === 'gsap-stagger-slide') {
              gsap.fromTo(
                targetEl,
                {
                  opacity: 0,
                  x: -60,
                  y: 30,
                  filter: 'blur(4px)'
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 0.9,
                  delay: index * 0.1,
                  ease: 'power3.out'
                }
              );
            } else if (activePreset.id === 'gsap-curtain-reveal') {
              gsap.fromTo(
                targetEl,
                {
                  opacity: 0,
                  clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
                  y: 20
                },
                {
                  opacity: 1,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  y: 0,
                  duration: 1.1,
                  delay: index * 0.12,
                  ease: 'expo.out'
                }
              );
            } else if (activePreset.id === 'architectural-drift') {
              gsap.fromTo(
                targetEl,
                {
                  opacity: 0,
                  y: 50,
                  scale: 0.97
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.3,
                  delay: index * 0.15,
                  ease: 'sine.out'
                }
              );
            }
            observer.unobserve(targetEl);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    projectRowRefs.current.forEach((el) => {
      if (el) {
        // Initial state before observation
        gsap.set(el, { opacity: 0, y: 30 });
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activePreset, replayKey, projects, reducedMotion]);

  // Framer Motion animation variants generator
  const getFramerVariants = (index: number) => {
    if (reducedMotion) {
      return {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 }
      };
    }

    if (activePreset.id === 'framer-spring-glide') {
      return {
        hidden: {
          opacity: 0,
          y: 55,
          rotateX: -10,
          scale: 0.98
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: {
            type: 'spring',
            damping: 18,
            stiffness: 100,
            delay: index * 0.08
          }
        }
      };
    }

    if (activePreset.id === 'motion-fade-scale') {
      return {
        hidden: {
          opacity: 0,
          scale: 0.94,
          y: 25
        },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.09
          }
        }
      };
    }

    // Default 'framer-slide-fade'
    return {
      hidden: {
        opacity: 0,
        y: 45,
        x: index % 2 === 0 ? -15 : 15
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.75,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index * 0.09
        }
      }
    };
  };

  const handleTriggerReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 my-12 border-t border-b border-slate-800/80"
    >
      {/* Header with Title & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase font-semibold">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>{catalogHeader?.subtitle || 'EDITORIAL CATALOG & ARCHITECTURAL INDEX'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-slate-100 mt-1 uppercase">
            {catalogHeader?.title || 'COMPLETE PORTFOLIO INDEX'}
          </h2>
        </div>

        {/* Animation Preset Selector & Test Button (Always visible / Accessible under inline edit) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-slate-900/90 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-slate-800 text-xs font-mono transition-all shadow-md"
              title="Change scroll-triggered animation style for Editorial Projects"
            >
              <Film className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-bold uppercase tracking-wider">{activePreset.engine}: {activePreset.label.split(':')[1] || activePreset.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-amber-400 transition-transform duration-200 ${isOptionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu of Animation Options */}
            <AnimatePresence>
              {isOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-80 md:w-96 rounded-sm bg-slate-950/98 border border-amber-500/50 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 divide-y divide-slate-800/80"
                >
                  <div className="pb-2 mb-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="font-bold text-amber-300 tracking-wider">SCROLL ANIMATION ENGINE</span>
                    <span className="text-[10px] text-slate-500">6 PRESETS</span>
                  </div>

                  <div className="space-y-1 py-1 max-h-72 overflow-y-auto">
                    {ANIMATION_PRESETS.map((preset) => {
                      const isSelected = preset.id === activePreset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setProjectAnimationPreset(preset.id);
                            setIsOptionsOpen(false);
                            setReplayKey((k) => k + 1);
                          }}
                          className={`w-full text-left p-2.5 rounded-sm flex items-start justify-between gap-3 transition-all ${
                            isSelected
                              ? 'bg-amber-400/15 border border-amber-400/60 text-amber-200'
                              : 'hover:bg-slate-900/80 text-slate-300 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs">{preset.icon}</span>
                              <span className="text-xs font-mono font-bold uppercase tracking-wide">
                                {preset.label}
                              </span>
                            </div>
                            <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
                              {preset.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Active: <strong className="text-amber-300">{activePreset.engine}</strong></span>
                    <button
                      onClick={() => {
                        handleTriggerReplay();
                        setIsOptionsOpen(false);
                      }}
                      className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <RotateCcw className="h-3 w-3" /> REPLAY ANIMATION
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Replay Test Button */}
          <button
            onClick={handleTriggerReplay}
            className="flex items-center gap-1.5 px-3 py-2 rounded-sm bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-xs font-mono transition-colors"
            title="Re-trigger the scroll animation preview"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">TEST SCROLL</span>
          </button>
        </div>
      </div>

      {/* Inline Edit Control Bar (When Admin Mode is active, or for instant live customization) */}
      {isAdminMode && (
        <div className="mb-8 p-4 rounded-sm bg-amber-950/20 border border-amber-500/40 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-amber-400 text-slate-950">
              <Settings2 className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                INLINE EDIT: EDITORIAL PROJECT LIST ANIMATIONS
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Choose GSAP or Framer Motion scroll-triggered animations to customize how project rows fade & slide in.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ANIMATION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setProjectAnimationPreset(preset.id);
                  setReplayKey((k) => k + 1);
                }}
                className={`px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider font-semibold transition-all ${
                  preset.id === activePreset.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-400 hover:text-amber-300'
                }`}
              >
                {preset.label.split(':')[1]?.trim() || preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editorial Row Index with Scroll-Triggered Fade & Slide Animations */}
      <div key={`project-list-${replayKey}-${activePreset.id}`} className="divide-y divide-slate-800/80">
        {projects.map((project, idx) => {
          const isHovered = activeProject?.id === project.id;
          const isGsap = activePreset.engine === 'GSAP';

          if (isGsap) {
            // Render GSAP-controlled element
            return (
              <div
                key={project.id}
                ref={(el) => {
                  projectRowRefs.current[idx] = el;
                }}
                data-index={idx}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => handleRowMouseEnter(project)}
                onMouseLeave={handleRowMouseLeave}
                className={`group relative flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 px-4 cursor-pointer transition-all duration-300 ${
                  isHovered
                    ? 'bg-slate-900/80 translate-x-2 text-amber-200 shadow-lg'
                    : 'hover:bg-slate-900/30 text-slate-300'
                }`}
              >
                {/* Left Column: Number & Title */}
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-widest">
                    {project.number || `0${idx + 1}`}
                  </span>
                  <h3 className="text-lg md:text-2xl font-mono font-semibold tracking-wide transition-colors group-hover:text-amber-200 uppercase">
                    {project.title}
                  </h3>
                </div>

                {/* Right Column: Location, Category, Year, Arrow */}
                <div className="flex items-center gap-6 md:gap-12 mt-3 md:mt-0 text-xs font-mono text-slate-400">
                  <span className="hidden sm:inline uppercase text-slate-400 tracking-wider">
                    {project.location}
                  </span>
                  <span className="uppercase text-slate-400 font-semibold tracking-widest border border-slate-800 px-2 py-0.5 rounded-sm">
                    {project.category}
                  </span>
                  <span className="text-amber-300 font-bold">{project.year}</span>
                  <div className="rounded-full bg-slate-800/80 p-2 text-amber-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-amber-400 group-hover:text-slate-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          }

          // Render Framer Motion-controlled element
          const variants = getFramerVariants(idx);
          return (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={variants}
              onClick={() => onSelectProject(project)}
              onMouseEnter={() => handleRowMouseEnter(project)}
              onMouseLeave={handleRowMouseLeave}
              className={`group relative flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 px-4 cursor-pointer transition-all duration-300 ${
                isHovered
                  ? 'bg-slate-900/80 translate-x-2 text-amber-200 shadow-lg'
                  : 'hover:bg-slate-900/30 text-slate-300'
              }`}
            >
              {/* Left Column: Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="text-xs font-mono text-amber-400 font-bold tracking-widest">
                  {project.number || `0${idx + 1}`}
                </span>
                <h3 className="text-lg md:text-2xl font-mono font-semibold tracking-wide transition-colors group-hover:text-amber-200 uppercase">
                  {project.title}
                </h3>
              </div>

              {/* Right Column: Location, Category, Year, Arrow */}
              <div className="flex items-center gap-6 md:gap-12 mt-3 md:mt-0 text-xs font-mono text-slate-400">
                <span className="hidden sm:inline uppercase text-slate-400 tracking-wider">
                  {project.location}
                </span>
                <span className="uppercase text-slate-400 font-semibold tracking-widest border border-slate-800 px-2 py-0.5 rounded-sm">
                  {project.category}
                </span>
                <span className="text-amber-300 font-bold">{project.year}</span>
                <div className="rounded-full bg-slate-800/80 p-2 text-amber-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-amber-400 group-hover:text-slate-950">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Hover Preview Image Following Cursor */}
      {activeProject && (
        <div
          className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            left: `${mousePos.x + 130}px`,
            top: `${mousePos.y - 80}px`,
          }}
        >
          <div className="w-64 md:w-80 rounded-sm bg-slate-950/95 p-2 border border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={activeProject.previewImage || activeProject.heroImage}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-left">
                <div className="text-[9px] font-mono tracking-widest text-amber-300 uppercase">
                  {activeProject.category} — {activeProject.year}
                </div>
                <div className="text-xs font-mono font-bold text-slate-100 truncate uppercase">
                  {activeProject.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
