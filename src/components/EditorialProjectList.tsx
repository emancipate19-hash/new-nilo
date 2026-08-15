import React, { useState, useRef } from 'react';
import { Project, CursorContextState } from '../types';
import { useStudio } from '../context/StudioContext';
import { ArrowUpRight } from 'lucide-react';

interface EditorialProjectListProps {
  onSelectProject: (project: Project) => void;
  setCursorContext: (context: CursorContextState) => void;
}

export const EditorialProjectList: React.FC<EditorialProjectListProps> = ({
  onSelectProject,
  setCursorContext
}) => {
  const { projects } = useStudio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleRowMouseEnter = (project: Project) => {
    setActiveProject(project);
    setCursorContext({
      mode: 'project',
      text: 'VIEW PROJECT',
      subtext: project.category,
      intensity: 'high'
    });
  };

  const handleRowMouseLeave = () => {
    setActiveProject(null);
    setCursorContext({ mode: 'default' });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 my-12 border-t border-b border-slate-800/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="text-[10px] font-mono tracking-[0.25em] text-amber-300 uppercase font-semibold">
            EDITORIAL CATALOG & ARCHITECTURAL INDEX
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-slate-100 mt-1 uppercase">
            COMPLETE PORTFOLIO INDEX
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          HOVER ROW TO REVEAL ARCHITECTURAL PREVIEW
        </div>
      </div>

      {/* Editorial Row Index */}
      <div className="divide-y divide-slate-800/80">
        {projects.map((project, idx) => {
          const isHovered = activeProject?.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              onMouseEnter={() => handleRowMouseEnter(project)}
              onMouseLeave={handleRowMouseLeave}
              className={`group relative flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 px-4 cursor-pointer transition-all duration-300 ${
                isHovered
                  ? 'bg-slate-900/80 translate-x-2 text-amber-200'
                  : 'hover:bg-slate-900/30 text-slate-300'
              }`}
            >
              {/* Left Column: Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="text-xs font-mono text-amber-400 font-bold">
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
                <div className="rounded-full bg-slate-800/80 p-2 text-amber-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-amber-400 group-hover:text-slate-950">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Hover Preview Image Following Cursor */}
      {activeProject && (
        <div
          className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            left: `${mousePos.x + 120}px`,
            top: `${mousePos.y - 80}px`,
          }}
        >
          <div className="w-64 md:w-80 rounded-sm bg-slate-950/95 p-2 border border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src={activeProject.previewImage || activeProject.heroImage}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
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
