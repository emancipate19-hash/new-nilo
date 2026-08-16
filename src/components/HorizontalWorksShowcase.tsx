import React, { useRef, useState, useMemo } from 'react';
import { Project, CursorContextState } from '../types';
import { useStudio } from '../context/StudioContext';
import {
  Sparkles,
  Camera,
  Edit2,
  Trash2,
  MoveLeft,
  MoveRight,
  ArrowUpRight,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Columns3,
  Layers,
  Search,
  Filter,
  Check
} from 'lucide-react';

interface HorizontalWorksShowcaseProps {
  onSelectProject: (project: Project) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (project: Project) => void;
  setCursorContext: (context: CursorContextState) => void;
}

export const WORK_CATEGORIES_LIST = [
  'All Works',
  'Architectural Design',
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'Renovation / Remodeling',
  '3D Visualization & Rendering',
  'Graphic Design',
  'Branding & Visual Identity',
  'Video Editing',
  'Web Development',
  'Digital Storytelling',
  'Social Media / Digital Campaigns'
] as const;

type LayoutMode = 'grid-2' | 'grid-3' | 'grid-4' | 'featured' | 'masonry';

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

  const [activeCategory, setActiveCategory] = useState<string>('All Works');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid-3');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploadingProjectId, setUploadingProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedUploadProject, setSelectedUploadProject] = useState<string | null>(null);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCategory = 
        activeCategory === 'All Works' || 
        p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
      
      const matchesSearch = 
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

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

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-xs bg-slate-900 px-3.5 py-1 text-[11px] font-mono tracking-widest text-amber-300 border border-amber-500/30 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>DISCIPLINARY PORTFOLIO</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-mono font-extrabold text-slate-100 uppercase tracking-tight">
              {showcaseHeader?.title || 'FEATURED ARCHITECTURAL AND DESIGN WORKS'}
            </h2>
            <p className="mt-2 text-xs md:text-sm font-mono text-slate-300 max-w-2xl leading-relaxed">
              Explore our curated portfolio spanning architecture, interior environments, 3D visualization, branding, and digital creative commissions. Select a discipline below or toggle custom view layouts.
            </p>
          </div>

          {/* Quick Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xs pl-9 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Bar & Layout Controls Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Work Categories Navigation Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Filter className="h-3.5 w-3.5" />
                <span>FILTER BY DISCIPLINE & CATEGORY</span>
              </span>
              <span>{filteredProjects.length} {filteredProjects.length === 1 ? 'WORK' : 'WORKS'} SHOWN</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {WORK_CATEGORIES_LIST.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    onMouseEnter={() => setCursorContext({ mode: 'link', text: 'FILTER' })}
                    onMouseLeave={() => setCursorContext({ mode: 'default' })}
                    className={`px-3.5 py-1.5 rounded-xs text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && <Check className="h-3 w-3 text-slate-950 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Switcher Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <span className="text-slate-400">LAYOUT MODE:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-xs border border-slate-800">
              {/* 2-Column Grid */}
              <button
                onClick={() => setLayoutMode('grid-2')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[10px] font-mono transition-all cursor-pointer ${
                  layoutMode === 'grid-2'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="2-Column Grid Layout"
              >
                <Grid2X2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">2 COLUMNS</span>
              </button>

              {/* 3-Column Grid */}
              <button
                onClick={() => setLayoutMode('grid-3')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[10px] font-mono transition-all cursor-pointer ${
                  layoutMode === 'grid-3'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="3-Column Grid Layout"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">3 COLUMNS</span>
              </button>

              {/* 4-Column Grid */}
              <button
                onClick={() => setLayoutMode('grid-4')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[10px] font-mono transition-all cursor-pointer ${
                  layoutMode === 'grid-4'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="4-Column Grid Layout"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">4 COLUMNS</span>
              </button>

              {/* Large / Featured View */}
              <button
                onClick={() => setLayoutMode('featured')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[10px] font-mono transition-all cursor-pointer ${
                  layoutMode === 'featured'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Featured Large View"
              >
                <Columns3 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">FEATURED</span>
              </button>

              {/* Masonry-Style Layout */}
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[10px] font-mono transition-all cursor-pointer ${
                  layoutMode === 'masonry'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Masonry-Style Layout"
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">MASONRY</span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center space-y-4 bg-slate-900/50 border border-slate-800 rounded-sm">
            <p className="text-sm font-mono text-slate-400">
              No works found matching category "<span className="text-amber-300 font-bold">{activeCategory}</span>"
              {searchQuery && ` and search query "${searchQuery}"`}.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Works');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-mono text-amber-300 border border-amber-500/50 hover:bg-amber-400 hover:text-slate-950 rounded-xs transition-all uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Gallery Container - Layout Modes */}
        {filteredProjects.length > 0 && (
          <div
            className={`transition-all duration-300 ${
              layoutMode === 'grid-2'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                : layoutMode === 'grid-3'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : layoutMode === 'grid-4'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
                : layoutMode === 'featured'
                ? 'space-y-12'
                : 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
            }`}
          >
            {filteredProjects.map((project, index) => {
              const isFeaturedMode = layoutMode === 'featured';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setCursorContext({ mode: 'project', text: 'INSPECT' })}
                  onMouseLeave={() => setCursorContext({ mode: 'default' })}
                  className={`group relative bg-slate-900/80 border border-slate-800/90 rounded-sm overflow-hidden transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7)] cursor-pointer ${
                    layoutMode === 'masonry' ? 'break-inside-avoid' : ''
                  } ${
                    isFeaturedMode ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div
                    className={`relative overflow-hidden bg-slate-950 ${
                      isFeaturedMode
                        ? 'lg:col-span-7 h-[340px] md:h-[420px] rounded-xs'
                        : layoutMode === 'grid-2'
                        ? 'h-[340px] md:h-[380px]'
                        : layoutMode === 'grid-4'
                        ? 'h-[220px]'
                        : layoutMode === 'masonry'
                        ? index % 3 === 0 ? 'h-[360px]' : index % 2 === 0 ? 'h-[280px]' : 'h-[320px]'
                        : 'h-[260px] md:h-[300px]'
                    }`}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.93] group-hover:brightness-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                      <div className="rounded-xs bg-slate-950/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest text-amber-300 border border-amber-500/30">
                        {project.number || `0${index + 1}`}
                      </div>
                    </div>

                    <div className="absolute top-3.5 right-3.5 z-10 flex flex-col items-end gap-1">
                      <span className="rounded-xs bg-amber-400 px-2 py-0.5 text-[9px] font-mono font-bold text-slate-950 uppercase tracking-wider shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Image Hover Change Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerImageUploadForProject(project.id);
                      }}
                      title="Change image for this work"
                      className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-xs bg-slate-950/90 backdrop-blur-md px-2.5 py-1.5 text-[10px] font-mono text-amber-300 border border-amber-500/50 hover:bg-amber-400 hover:text-slate-950 transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                    >
                      <Camera className="h-3 w-3" />
                      <span>{uploadingProjectId === project.id ? 'UPLOADING...' : 'REPLACE PHOTO'}</span>
                    </button>

                    {/* Inline Admin Actions */}
                    {isAdminMode && (
                      <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xs border border-slate-700">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveProject(project.id, 'left');
                          }}
                          title="Move Left"
                          className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-xs cursor-pointer"
                        >
                          <MoveLeft className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveProject(project.id, 'right');
                          }}
                          title="Move Right"
                          className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-xs cursor-pointer"
                        >
                          <MoveRight className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenEditModal(project);
                          }}
                          title="Edit Info"
                          className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-xs cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete project "${project.title}"?`)) {
                              deleteProject(project.id);
                            }
                          }}
                          title="Delete Project"
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-xs cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Project Details Information */}
                  <div className={`space-y-3 ${isFeaturedMode ? 'lg:col-span-5' : 'p-5 bg-slate-900/90'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base md:text-lg font-mono font-bold text-slate-100 uppercase tracking-wide group-hover:text-amber-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-amber-400 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <p className="text-[11px] font-mono text-amber-400/90 font-medium uppercase tracking-wider">
                      {project.subtitle}
                    </p>

                    <p className="text-xs font-mono text-slate-300 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metadata Specs */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-800/80">
                      <span>{project.location}</span>
                      <span className="text-amber-300/80 font-bold">{project.year}</span>
                    </div>

                    {/* View Specs Trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="w-full mt-2 rounded-xs bg-slate-950 border border-slate-800 py-2 text-[11px] font-mono font-bold text-slate-200 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all uppercase tracking-wider cursor-pointer"
                    >
                      VIEW SPECIFICATION →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
