import React, { useRef, useState } from 'react';
import { Project, CursorContextState } from '../types';
import { useStudio } from '../context/StudioContext';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Plus,
  Edit2,
  Trash2,
  MoveLeft,
  MoveRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';

interface HorizontalWorksShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (project: Project) => void;
  setCursorContext: (context: CursorContextState) => void;
}

export const HorizontalWorksShowcase: React.FC<HorizontalWorksShowcaseProps> = ({
  onSelectProject,
  onOpenAddModal,
  onOpenEditModal,
  setCursorContext
}) => {
  const {
    projects,
    showcaseHeader,
    isAdminMode,
    updateProjectImage,
    deleteProject,
    moveProject,
    uploadFileAsDataUrl
  } = useStudio();

  const rowRef = useRef<HTMLDivElement>(null);
  const [uploadingProjectId, setUploadingProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadProject, setSelectedUploadProject] = useState<string | null>(null);

  // Smooth scroll left and right
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCardImageUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingProjectId(projectId);
      const dataUrl = await uploadFileAsDataUrl(file);
      updateProjectImage(projectId, dataUrl);
    } catch (err) {
      console.error('Failed to update project image', err);
    } finally {
      setUploadingProjectId(null);
      if (e.target) e.target.value = '';
    }
  };

  const triggerImageUploadForProject = (projectId: string) => {
    setSelectedUploadProject(projectId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <section id="works-showcase" className="relative bg-slate-950 py-16 md:py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Hidden file input for project image updates */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (selectedUploadProject) {
            handleCardImageUpload(selectedUploadProject, e);
          }
        }}
      />

      {/* Section Header */}
      <div className="px-6 md:px-16 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-sm bg-slate-900 px-3 py-1 text-[11px] font-mono tracking-widest text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>PORTFOLIO CATALOG</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-extrabold text-slate-100 uppercase tracking-tight">
            {showcaseHeader?.title || 'WORKS SHOWCASE'}
          </h2>
          <p className="mt-2 text-xs md:text-sm font-mono text-slate-400 max-w-xl">
            {showcaseHeader?.subtitle || 'Explore our curated portfolio of residential, cultural, and high-density commercial architecture. Scroll horizontally to inspect each masterpiece.'}
          </p>
        </div>

        {/* Controls: Scroll Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'PREV' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="p-3 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-all active:scale-95 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'NEXT' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="p-3 rounded-sm bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-all active:scale-95 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Showcase Scrollable Row */}
      <div
        ref={rowRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-6 md:px-16 pb-8 pt-2 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative flex-none w-[320px] sm:w-[380px] md:w-[440px] snap-start bg-slate-900/80 border border-slate-800/90 rounded-sm overflow-hidden transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            onMouseEnter={() => setCursorContext({ mode: 'project', text: 'INSPECT' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
          >
            {/* Image Container with Zoom & Upload Hover */}
            <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden bg-slate-950">
              <img
                src={project.heroImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] group-hover:brightness-100"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Number Badge */}
              <div className="absolute top-4 left-4 z-10 rounded-sm bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-amber-300 border border-amber-500/30">
                {project.number || `0${index + 1}`}
              </div>

              {/* Category & Location Badge */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
                <span className="rounded-sm bg-amber-400 px-2 py-0.5 text-[9px] font-mono font-bold text-slate-950 uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-slate-300 font-medium drop-shadow-md">
                  {project.year} | {project.location}
                </span>
              </div>

              {/* Quick Image Upload Button on Card */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerImageUploadForProject(project.id);
                }}
                title="Change Image for this project"
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-sm bg-slate-950/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono text-amber-300 border border-amber-500/50 hover:bg-amber-400 hover:text-slate-950 transition-all opacity-90 group-hover:opacity-100 shadow-md"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{uploadingProjectId === project.id ? 'UPLOADING...' : 'CHANGE IMAGE'}</span>
              </button>

              {/* Admin Actions Overlay (Move Left/Right, Edit, Delete) */}
              {isAdminMode && (
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1 rounded-sm border border-slate-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveProject(project.id, 'left');
                    }}
                    title="Move Left"
                    className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-sm"
                  >
                    <MoveLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveProject(project.id, 'right');
                    }}
                    title="Move Right"
                    className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-sm"
                  >
                    <MoveRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditModal(project);
                    }}
                    title="Edit Info"
                    className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-sm"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete project "${project.title}"?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    title="Delete Project"
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-sm"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Card Information Body */}
            <div className="p-6 space-y-3 bg-slate-900/90">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base md:text-lg font-mono font-bold text-slate-100 uppercase tracking-wide group-hover:text-amber-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-amber-400 flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <p className="text-xs font-mono text-amber-400/90 font-medium uppercase tracking-wider">
                {project.subtitle}
              </p>

              <p className="text-xs font-mono text-slate-400 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Specs Chips */}
              {project.specs && (
                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-800/80">
                  <span className="bg-slate-950 px-2 py-1 rounded-sm border border-slate-800 text-slate-300">
                    AREA: {project.specs.area || 'N/A'}
                  </span>
                  <span className="bg-slate-950 px-2 py-1 rounded-sm border border-slate-800 text-amber-300">
                    STATUS: {project.specs.status || 'BUILT'}
                  </span>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                onClick={() => onSelectProject(project)}
                className="w-full mt-3 rounded-sm bg-slate-950 border border-slate-800 py-2.5 text-xs font-mono font-bold text-slate-200 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all uppercase tracking-widest"
              >
                VIEW FULL SPECIFICATION →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
