import React, { useState } from 'react';
import { Project, CursorContextState, JournalArticle } from './types';
import { StudioProvider, useStudio } from './context/StudioContext';
import { CursorSystem } from './components/CursorSystem';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HorizontalWorksShowcase } from './components/HorizontalWorksShowcase';
import { PhilosophySection } from './components/PhilosophySection';
import { EditorialProjectList } from './components/EditorialProjectList';
import { TextHoverRevealLinks } from './components/TextHoverRevealLinks';
import { StaffSection } from './components/StaffSection';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { FullscreenImageViewer } from './components/FullscreenImageViewer';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { CmsModal } from './components/CmsModal';
import { StudioPreloader } from './components/StudioPreloader';
import { GoogleDriveFolderSyncModal } from './components/GoogleDriveFolderSyncModal';
import { StudioAdminToolbar } from './components/StudioAdminToolbar';
import { Compass, ArrowUp } from 'lucide-react';

function MainAppContent() {
  const {
    studioName,
    projects,
    sectionVisibility,
    footerSettings,
    isGoogleDriveModalOpen,
    setIsGoogleDriveModalOpen
  } = useStudio();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    title: string;
    location: string;
  } | null>(null);

  const [cursorContext, setCursorContext] = useState<CursorContextState>({
    mode: 'default',
    intensity: 'low'
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Project Modal State (Add / Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-amber-400 selection:text-slate-950">
      {/* Default Loading Screen showcasing and preloading all uploaded architectural pictures */}
      <StudioPreloader reducedMotion={reducedMotion} />

      {/* Custom Neon Spotlight Cursor System */}
      <CursorSystem cursorContext={cursorContext} reducedMotion={reducedMotion} />

      {/* Top Floating Navigation Bar with Logo Upload & CMS Control Center Trigger */}
      <Navbar
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onNavigateHome={() => {
          setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateProjects={() => {
          setSelectedProject(null);
          const el = document.getElementById('works-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateContact={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAddProject={handleOpenAddModal}
        setCursorContext={setCursorContext}
      />

      {/* Full No-Code Portfolio CMS & Site Builder Drawer Modal */}
      <CmsModal />

      {/* Main Page Layout or Selected Project Detail View */}
      {selectedProject ? (
        <ProjectDetailPage
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onSelectProject={(p) => {
            const currentIndex = projects.findIndex((item) => item.id === p.id);
            const nextIndex = (currentIndex + 1) % projects.length;
            setSelectedProject(projects[nextIndex]);
          }}
          onOpenImageModal={(src, title, location) =>
            setFullscreenImage({ src, title, location })
          }
          setCursorContext={setCursorContext}
          reducedMotion={reducedMotion}
        />
      ) : (
        <main className="relative z-10">
          {/* Landing / Hero Section */}
          {sectionVisibility.hero && (
            <HeroSection
              onExploreProjects={() => {
                const el = document.getElementById('works-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenContact={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              setCursorContext={setCursorContext}
              reducedMotion={reducedMotion}
            />
          )}

          {/* Horizontal Showcase Carousel */}
          {sectionVisibility.showcase && (
            <HorizontalWorksShowcase
              onSelectProject={(p) => setSelectedProject(p)}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              setCursorContext={setCursorContext}
            />
          )}

          {/* Philosophy & Spatial Manifesto */}
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            {sectionVisibility.philosophy && <PhilosophySection />}

            {/* Editorial Catalog & Hover Reveal Index */}
            {sectionVisibility.catalog && (
              <div id="projects-catalog">
                <EditorialProjectList
                  onSelectProject={(project) => setSelectedProject(project)}
                  setCursorContext={setCursorContext}
                />
              </div>
            )}

            {/* Text Link Hover Image Reveals & Journal */}
            {sectionVisibility.journal && (
              <TextHoverRevealLinks
                setCursorContext={setCursorContext}
                onOpenArticle={(article) =>
                  setFullscreenImage({
                    src: article.image,
                    title: article.title,
                    location: `${article.category} — ${article.date}`
                  })
                }
              />
            )}

            {/* Atelier Staff Members Section */}
            {sectionVisibility.team && (
              <StaffSection setCursorContext={setCursorContext} />
            )}

            {/* Contact & Commission Section */}
            {sectionVisibility.contact && <ContactSection setCursorContext={setCursorContext} />}

            {/* Footer */}
            {sectionVisibility.footer && (
              <footer className="py-12 border-t border-slate-800/80 text-xs font-mono text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-amber-400" />
                  <span>{footerSettings?.copyrightText || `© 2026 ${studioName}. ALL RIGHTS RESERVED.`}</span>
                </div>

                <button
                  onClick={handleScrollToTop}
                  onMouseEnter={() => setCursorContext({ mode: 'link', text: 'TOP' })}
                  onMouseLeave={() => setCursorContext({ mode: 'default' })}
                  className="flex items-center gap-2 text-amber-300 hover:text-white transition-colors"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
              </footer>
            )}
          </div>
        </main>
      )}

      {/* Fullscreen Image Viewer Modal */}
      <FullscreenImageViewer
        image={fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        setCursorContext={setCursorContext}
      />

      {/* Add / Edit Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        editingProject={editingProject}
      />

      {/* Google Drive Folder Synchronizer Modal */}
      <GoogleDriveFolderSyncModal
        isOpen={isGoogleDriveModalOpen}
        onClose={() => setIsGoogleDriveModalOpen(false)}
      />

      {/* Floating Studio Admin Toolbar */}
      <StudioAdminToolbar onOpenAddModal={handleOpenAddModal} />
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <MainAppContent />
    </StudioProvider>
  );
}
