import React, { useEffect, useState } from 'react';
import { Project, CursorContextState } from '../types';
import { ImageHoverLighting } from './ImageHoverLighting';
import { InteractiveFloorPlan } from './InteractiveFloorPlan';
import { Interactive3DModel } from './Interactive3DModel';
import { ArrowLeft, Maximize2, CheckCircle2, MapPin } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useStudio } from '../context/StudioContext';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
  onOpenImageModal: (src: string, title: string, location: string) => void;
  setCursorContext: (context: CursorContextState) => void;
  reducedMotion: boolean;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onOpenImageModal,
  setCursorContext,
  reducedMotion
}) => {
  const { studioName } = useStudio();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project.id]);

  const heroParallax = scrollY * 0.25;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 pt-24 pb-24 px-6 md:px-16 font-mono">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-10">
        <MagneticButton
          onClick={onBack}
          setCursorContext={setCursorContext}
          cursorMode={{ mode: 'link', text: 'RETURN' }}
          className="group flex items-center gap-3 text-xs font-mono text-amber-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO WORKS SHOWCASE</span>
        </MagneticButton>

        <div className="text-xs font-mono text-slate-500">
          {studioName} — PROJECT NO. {project.number || '01'}
        </div>
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-slate-800 my-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ transform: reducedMotion ? 'none' : `translate3d(0, ${heroParallax}px, 0)` }}
        >
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* Hero Title & Metadata Fade Overlay */}
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
          <div>
            <div className="inline-block rounded-sm bg-slate-950/90 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-300 border border-amber-500/40 mb-3">
              {project.category} — {project.year}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono font-extrabold uppercase tracking-tight text-slate-100">
              {project.title}
            </h1>
            <p className="text-sm md:text-lg font-mono text-amber-300/90 mt-2">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-950/80 px-4 py-2 border border-slate-800 rounded-sm">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      {/* Specifications & Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-16">
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h3 className="text-xs font-mono tracking-[0.25em] text-amber-300 uppercase font-bold mb-2">
              ARCHITECTURAL CONCEPT & NARRATIVE
            </h3>
            <p className="text-base font-mono text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="p-6 rounded-sm bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-mono tracking-widest text-slate-400 uppercase font-bold mb-2">
              TOPOGRAPHY & FORM GENERATION
            </h4>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              {project.concept}
            </p>
          </div>

          {/* Highlights Checklist */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-mono tracking-[0.25em] text-amber-300 uppercase font-bold mb-4">
                KEY STRUCTURAL ACHIEVEMENTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-sm bg-slate-900/40 border border-slate-800/80 text-xs font-mono text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Specification Matrix */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 p-6 rounded-sm space-y-6">
          <h3 className="text-xs font-mono tracking-[0.2em] text-amber-300 uppercase font-bold border-b border-slate-800 pb-3">
            TECHNICAL SPECIFICATIONS
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">TOTAL FOOTPRINT / AREA:</span>
              <span className="text-slate-200 font-bold">{project.specs?.area || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">STRUCTURAL SYSTEM:</span>
              <span className="text-slate-200">{project.specs?.structuralType || 'Concrete & Glass Core'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">PRIMARY MATERIALITY:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {(project.specs?.materials || ['Concrete', 'Glass']).map((m, i) => (
                  <span
                    key={i}
                    className="rounded-sm bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CLIMATE STRATEGY:</span>
              <span className="text-slate-300">{project.specs?.climateStrategy || 'Passive Ventilation'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TIMELINE & STATUS:</span>
              <span className="text-amber-300 font-bold">{project.specs?.timeline || '2026'} ({project.specs?.status || 'BUILT'})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3D Model Viewer */}
      {project.id === 'terrain-cantilever-villa' && (
        <div className="my-16">
          <Interactive3DModel setCursorContext={setCursorContext} reducedMotion={reducedMotion} />
        </div>
      )}

      {/* Floor Plan Section if present */}
      {project.floorPlan && (
        <div className="my-16">
          <InteractiveFloorPlan project={project} setCursorContext={setCursorContext} />
        </div>
      )}

      {/* Architectural Image Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="my-16 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xs font-mono tracking-[0.25em] text-amber-300 uppercase font-bold">
              ARCHITECTURAL PHOTOGRAPHY & FACADE DETAILS
            </h3>
            <span className="text-xs font-mono text-slate-500">
              CLICK IMAGE FOR FULLSCREEN VIEW
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.galleryImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-slate-800 cursor-pointer"
                onClick={() => onOpenImageModal(imgSrc, `${project.title} — DETAIL ${idx + 1}`, project.location)}
                onMouseEnter={() => setCursorContext({ mode: 'image', text: 'EXPLORE', intensity: 'high' })}
                onMouseLeave={() => setCursorContext({ mode: 'default' })}
              >
                <ImageHoverLighting
                  src={imgSrc}
                  alt={`${project.title} Gallery Image ${idx + 1}`}
                  className="h-full w-full"
                />
                <div className="absolute top-4 right-4 rounded-full bg-slate-950/80 p-2 border border-slate-700 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <MagneticButton
          onClick={onBack}
          setCursorContext={setCursorContext}
          cursorMode={{ mode: 'link', text: 'RETURN' }}
          className="text-xs font-mono text-slate-400 hover:text-white"
        >
          ← WORKS SHOWCASE
        </MagneticButton>

        <MagneticButton
          onClick={() => onSelectProject(project)}
          setCursorContext={setCursorContext}
          cursorMode={{ mode: 'project', text: 'NEXT PROJECT' }}
          className="rounded-sm bg-amber-400 px-8 py-3.5 text-xs font-mono font-bold text-slate-950 hover:bg-amber-300"
        >
          NEXT ARCHITECTURAL WORK →
        </MagneticButton>
      </div>
    </div>
  );
};
