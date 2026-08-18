import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import {
  X, Save, RotateCcw, Download, Upload, Plus, Trash2, Eye, EyeOff,
  MoveUp, MoveDown, Layers, Image as ImageIcon, FileText, Settings,
  Users, Award, HelpCircle, MessageSquare, Layout, Palette, Globe,
  ShieldAlert, Sliders, Check, ArrowRight, Video, Sparkles, Compass, FolderSync,
  LogOut, ShieldCheck
} from 'lucide-react';
import { Project, TeamMember, ServiceItem, PhilosophyBlock, BeforeAfterPair, Panorama360Item, ProcessStep, FaqItem, AwardItem, ClientItem, TestimonialItem, CustomSection } from '../types';

export const CmsModal: React.FC = () => {
  const {
    isCmsOpen,
    setIsCmsOpen,
    heroSettings,
    updateHeroSettings,
    logoUrl,
    updateLogo,
    navMenuItems,
    updateNavMenuItems,
    projects,
    addProject,
    updateProject,
    deleteProject,
    philosophyBlocks,
    addPhilosophyBlock,
    updatePhilosophyBlock,
    deletePhilosophyBlock,
    servicesList,
    addServiceItem,
    updateServiceItem,
    deleteServiceItem,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    clientList,
    addClientItem,
    updateClientItem,
    deleteClientItem,
    awardList,
    addAwardItem,
    updateAwardItem,
    deleteAwardItem,
    testimonialList,
    addTestimonialItem,
    updateTestimonialItem,
    deleteTestimonialItem,
    faqList,
    addFaqItem,
    updateFaqItem,
    deleteFaqItem,
    beforeAfterList,
    addBeforeAfterPair,
    updateBeforeAfterPair,
    deleteBeforeAfterPair,
    panorama360List,
    addPanorama360Item,
    updatePanorama360Item,
    deletePanorama360Item,
    processSteps,
    addProcessStep,
    updateProcessStep,
    deleteProcessStep,
    questionnaireQuestions,
    updateQuestionnaireQuestions,
    inquiries,
    updateInquiryStatus,
    deleteInquirySubmission,
    customSections,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    sectionVisibility,
    updateSectionVisibility,
    themeSettings,
    updateThemeSettings,
    seoSettings,
    updateSeoSettings,
    socialLinks,
    updateSocialLinks,
    footerSettings,
    updateFooterSettings,
    legalPages,
    updateLegalPages,
    contactDetails,
    updateContactDetails,
    exportBackupJSON,
    importBackupJSON,
    resetToDefaults,
    uploadFileAsDataUrl,
    setIsGoogleDriveModalOpen,
    adminUser,
    logoutAdmin
  } = useStudio();

  const [activeTab, setActiveTab] = useState<string>('sections');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isCmsOpen) return null;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nilo-axis-studio-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('CMS backup exported successfully');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importBackupJSON(content)) {
        showToast('CMS backup imported successfully');
      } else {
        showToast('Error importing CMS backup file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl text-stone-100 font-mono p-2 sm:p-6 overflow-hidden">
      {/* CMS Control Center Card */}
      <div className="w-full max-w-7xl h-[92vh] bg-stone-950 border border-stone-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-stone-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-widest text-amber-400 uppercase">
                  NILO AXIS STUDIO — CMS & PORTFOLIO ENGINE
                </h2>
                {adminUser?.email && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    {adminUser.email}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-stone-400 tracking-wider">
                NO-CODE ATELIER MANAGEMENT • SUPABASE IAM PROTECTED
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setIsGoogleDriveModalOpen(true)}
              className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-bold border border-amber-500/50 rounded transition shadow-sm"
              title="Sync and replace portfolio photos with Google Drive folder"
            >
              <FolderSync className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DRIVE SYNC</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded transition"
              title="Export complete site data JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXPORT BACKUP</span>
            </button>

            <label className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">IMPORT BACKUP</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={() => {
                if (confirm('Reset entire website data to default architectural portfolio preset?')) {
                  resetToDefaults();
                  showToast('Site reset to defaults');
                }
              }}
              className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 rounded transition"
              title="Reset state to default template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>

            <button
              onClick={async () => {
                await logoutAdmin();
                setIsCmsOpen(false);
              }}
              className="flex items-center space-x-1 text-xs px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 rounded transition cursor-pointer"
              title="Sign out of Supabase Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>

            <button
              onClick={() => setIsCmsOpen(false)}
              className="p-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition cursor-pointer"
              title="Close CMS Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="bg-amber-500/20 border-b border-amber-500/40 text-amber-300 text-xs px-6 py-2 flex items-center justify-between">
            <span>{notification}</span>
            <Check className="w-4 h-4 text-amber-400" />
          </div>
        )}

        {/* Main Content Split: Sidebar Tabs & Form Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-64 border-r border-stone-800 bg-stone-950/80 p-3 overflow-y-auto space-y-1 text-xs">
            <div className="text-[10px] text-stone-500 uppercase px-3 py-1 tracking-widest font-bold">
              PAGE STRUCTURE & BRAND
            </div>
            <TabBtn id="sections" label="1. Section Manager" icon={<Layers className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="hero" label="2. Hero & Brand Identity" icon={<ImageIcon className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="nav" label="3. Navigation Menu" icon={<Compass className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />

            <div className="text-[10px] text-stone-500 uppercase px-3 py-1 pt-3 tracking-widest font-bold">
              PORTFOLIO & CONTENT
            </div>
            <TabBtn id="projects" label="4. Works / Projects Index" icon={<FileText className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="philosophy" label="5. Studio Philosophy" icon={<Sparkles className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="services" label="6. Services & Process" icon={<Sliders className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="interactive" label="7. 360° Views & Sliders" icon={<Eye className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />

            <div className="text-[10px] text-stone-500 uppercase px-3 py-1 pt-3 tracking-widest font-bold">
              PEOPLE & TRUST
            </div>
            <TabBtn id="team" label="8. Team, Awards & Clients" icon={<Users className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="inquiries" label="9. Inquiries & Form" icon={<MessageSquare className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="custom" label="10. Custom Sections" icon={<Layout className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />

            <div className="text-[10px] text-stone-500 uppercase px-3 py-1 pt-3 tracking-widest font-bold">
              GLOBAL CONFIG
            </div>
            <TabBtn id="theme" label="11. Theme & Neon Style" icon={<Palette className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="seo" label="12. SEO & Global Footer" icon={<Globe className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
            <TabBtn id="contact" label="13. Contact & Map" icon={<ShieldAlert className="w-4 h-4" />} active={activeTab} setActive={setActiveTab} />
          </div>

          {/* Tab Panel Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-stone-900/30">
            {activeTab === 'sections' && (
              <SectionsTab
                visibility={sectionVisibility}
                updateVisibility={updateSectionVisibility}
                showToast={showToast}
              />
            )}

            {activeTab === 'hero' && (
              <HeroTab
                heroSettings={heroSettings}
                updateHeroSettings={updateHeroSettings}
                logoUrl={logoUrl}
                updateLogo={updateLogo}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'nav' && (
              <NavTab
                navMenuItems={navMenuItems}
                updateNavMenuItems={updateNavMenuItems}
                showToast={showToast}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsTab
                projects={projects}
                addProject={addProject}
                updateProject={updateProject}
                deleteProject={deleteProject}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'philosophy' && (
              <PhilosophyTab
                philosophyBlocks={philosophyBlocks}
                addPhilosophyBlock={addPhilosophyBlock}
                updatePhilosophyBlock={updatePhilosophyBlock}
                deletePhilosophyBlock={deletePhilosophyBlock}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'services' && (
              <ServicesTab
                servicesList={servicesList}
                addServiceItem={addServiceItem}
                updateServiceItem={updateServiceItem}
                deleteServiceItem={deleteServiceItem}
                processSteps={processSteps}
                addProcessStep={addProcessStep}
                updateProcessStep={updateProcessStep}
                deleteProcessStep={deleteProcessStep}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'interactive' && (
              <InteractiveTab
                beforeAfterList={beforeAfterList}
                addBeforeAfterPair={addBeforeAfterPair}
                updateBeforeAfterPair={updateBeforeAfterPair}
                deleteBeforeAfterPair={deleteBeforeAfterPair}
                panorama360List={panorama360List}
                addPanorama360Item={addPanorama360Item}
                updatePanorama360Item={updatePanorama360Item}
                deletePanorama360Item={deletePanorama360Item}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'team' && (
              <TeamTab
                teamMembers={teamMembers}
                addTeamMember={addTeamMember}
                updateTeamMember={updateTeamMember}
                deleteTeamMember={deleteTeamMember}
                clientList={clientList}
                addClientItem={addClientItem}
                updateClientItem={updateClientItem}
                deleteClientItem={deleteClientItem}
                awardList={awardList}
                addAwardItem={addAwardItem}
                updateAwardItem={updateAwardItem}
                deleteAwardItem={deleteAwardItem}
                testimonialList={testimonialList}
                addTestimonialItem={addTestimonialItem}
                updateTestimonialItem={updateTestimonialItem}
                deleteTestimonialItem={deleteTestimonialItem}
                faqList={faqList}
                addFaqItem={addFaqItem}
                updateFaqItem={updateFaqItem}
                deleteFaqItem={deleteFaqItem}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesTab
                inquiries={inquiries}
                updateInquiryStatus={updateInquiryStatus}
                deleteInquirySubmission={deleteInquirySubmission}
                questionnaireQuestions={questionnaireQuestions}
                updateQuestionnaireQuestions={updateQuestionnaireQuestions}
                showToast={showToast}
              />
            )}

            {activeTab === 'custom' && (
              <CustomTab
                customSections={customSections}
                addCustomSection={addCustomSection}
                updateCustomSection={updateCustomSection}
                deleteCustomSection={deleteCustomSection}
                showToast={showToast}
              />
            )}

            {activeTab === 'theme' && (
              <ThemeTab
                themeSettings={themeSettings}
                updateThemeSettings={updateThemeSettings}
                showToast={showToast}
              />
            )}

            {activeTab === 'seo' && (
              <SeoTab
                seoSettings={seoSettings}
                updateSeoSettings={updateSeoSettings}
                socialLinks={socialLinks}
                updateSocialLinks={updateSocialLinks}
                footerSettings={footerSettings}
                updateFooterSettings={updateFooterSettings}
                legalPages={legalPages}
                updateLegalPages={updateLegalPages}
                uploadFileAsDataUrl={uploadFileAsDataUrl}
                showToast={showToast}
              />
            )}

            {activeTab === 'contact' && (
              <ContactTab
                contactDetails={contactDetails}
                updateContactDetails={updateContactDetails}
                showToast={showToast}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Tab Button ---
const TabBtn: React.FC<{
  id: string;
  label: string;
  icon: React.ReactNode;
  active: string;
  setActive: (id: string) => void;
}> = ({ id, label, icon, active, setActive }) => (
  <button
    onClick={() => setActive(id)}
    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left transition ${
      active === id
        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
        : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
    }`}
  >
    {icon}
    <span className="truncate">{label}</span>
  </button>
);

// --- TAB 1: SECTION MANAGER ---
const SectionsTab: React.FC<{
  visibility: any;
  updateVisibility: (v: any) => void;
  showToast: (m: string) => void;
}> = ({ visibility, updateVisibility, showToast }) => {
  const sectionsList = [
    { key: 'hero', name: 'Hero / Landing Section' },
    { key: 'showcase', name: 'Featured Works Showcase Carousel' },
    { key: 'philosophy', name: 'Studio Philosophy & Manifesto' },
    { key: 'services', name: 'Architectural Services Grid' },
    { key: 'catalog', name: 'Complete Portfolio Catalog Index' },
    { key: 'ongoingProjects', name: 'Ongoing & Conceptual Projects' },
    { key: 'beforeAfter', name: 'Interactive Before & After Sliders' },
    { key: 'panorama360', name: '360° Interactive Architectural Views' },
    { key: 'process', name: '4-Phase Design Process Milestones' },
    { key: 'team', name: 'Principals & Design Team' },
    { key: 'clientsAndAwards', name: 'Clients, Partners & Awards' },
    { key: 'faq', name: 'Frequently Asked Questions' },
    { key: 'journal', name: 'Architectural Journal Articles' },
    { key: 'questionnaire', name: 'Client Project Questionnaire' },
    { key: 'contact', name: 'Commission Inquiry Form' },
    { key: 'map', name: 'Studio Location Map' },
    { key: 'footer', name: 'Global Footer & Copyright' }
  ];

  const toggle = (key: string) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    updateVisibility(updated);
    showToast(`Updated ${key} visibility`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">1. HOMEPAGE SECTION MANAGER</h3>
        <p className="text-xs text-stone-400">Toggle or hide any section of the architecture portfolio instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sectionsList.map((sec) => (
          <div
            key={sec.key}
            className={`p-4 rounded-xl border flex items-center justify-between transition ${
              visibility[sec.key]
                ? 'bg-stone-900 border-amber-500/30 text-stone-200'
                : 'bg-stone-950 border-stone-800 text-stone-600 opacity-60'
            }`}
          >
            <div>
              <p className="text-xs font-bold uppercase">{sec.name}</p>
              <p className="text-[10px] text-stone-500">ID: #{sec.key}</p>
            </div>

            <button
              onClick={() => toggle(sec.key)}
              className={`p-2 rounded-lg flex items-center space-x-1 text-xs font-bold transition ${
                visibility[sec.key]
                  ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              {visibility[sec.key] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{visibility[sec.key] ? 'VISIBLE' : 'HIDDEN'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TAB 2: HERO & BRAND ---
const HeroTab: React.FC<{
  heroSettings: any;
  updateHeroSettings: (s: any) => void;
  logoUrl: string;
  updateLogo: (url: string) => void;
  uploadFileAsDataUrl: (f: File, folder?: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads') => Promise<string>;
  showToast: (m: string) => void;
}> = ({ heroSettings, updateHeroSettings, logoUrl, updateLogo, uploadFileAsDataUrl, showToast }) => {
  const [form, setForm] = useState(heroSettings);

  const handleSave = () => {
    updateHeroSettings(form);
    showToast('Hero settings saved');
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFileAsDataUrl(file, 'brand');
        if (url) {
          updateLogo(url);
          showToast('Studio Logo uploaded to Supabase Storage');
        }
      } catch (err: any) {
        showToast(`Upload failed: ${err.message || err}`);
      }
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFileAsDataUrl(file, 'brand');
        if (url) {
          setForm((prev: any) => ({ ...prev, heroImage: url }));
          showToast('Hero background uploaded to Supabase Storage');
        }
      } catch (err: any) {
        showToast(`Upload failed: ${err.message || err}`);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">2. HERO & BRAND IDENTITY</h3>
        <p className="text-xs text-stone-400">Configure hero titles, hero background image/video, logo, and action buttons.</p>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-stone-300 uppercase">Studio Branding & Logo</h4>
        <div className="flex items-center space-x-4">
          <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain border border-stone-700 rounded bg-black/50 p-2" />
          <div>
            <label className="text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded cursor-pointer transition">
              UPLOAD NEW LOGO IMAGE
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
            <p className="text-[10px] text-stone-500 mt-1">PNG, SVG or transparent asset recommended.</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-stone-300 uppercase">Hero Titles & Headline</h4>
        <div>
          <label className="text-[10px] text-stone-400 uppercase">Hero Headline Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>

        <div>
          <label className="text-[10px] text-stone-400 uppercase">Hero Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>

        <div>
          <label className="text-[10px] text-stone-400 uppercase">Studio Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-stone-300 uppercase">Hero Background Image or Video</h4>
        <div className="flex items-center space-x-4">
          <img src={form.heroImage} alt="Hero" className="w-24 h-16 object-cover border border-stone-700 rounded" />
          <div>
            <label className="text-xs px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded cursor-pointer transition">
              REPLACE HERO IMAGE
              <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-stone-400 uppercase">Background Video URL (MP4 / WebM optional)</label>
          <input
            type="text"
            value={form.heroVideoUrl || ''}
            onChange={(e) => setForm({ ...form, heroVideoUrl: e.target.value })}
            placeholder="https://example.com/video.mp4"
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-stone-300 uppercase">Action Call-To-Action Buttons</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-stone-400 uppercase">Primary Button Text</label>
            <input
              type="text"
              value={form.ctaPrimaryText}
              onChange={(e) => setForm({ ...form, ctaPrimaryText: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-400 uppercase">Primary Button Link</label>
            <input
              type="text"
              value={form.ctaPrimaryLink}
              onChange={(e) => setForm({ ...form, ctaPrimaryLink: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>

          <div>
            <label className="text-[10px] text-stone-400 uppercase">Secondary Button Text</label>
            <input
              type="text"
              value={form.ctaSecondaryText}
              onChange={(e) => setForm({ ...form, ctaSecondaryText: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-400 uppercase">Secondary Button Link</label>
            <input
              type="text"
              value={form.ctaSecondaryLink}
              onChange={(e) => setForm({ ...form, ctaSecondaryLink: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition"
      >
        SAVE HERO CHANGES
      </button>
    </div>
  );
};

// --- TAB 3: NAVIGATION MENU ---
const NavTab: React.FC<{
  navMenuItems: any[];
  updateNavMenuItems: (items: any[]) => void;
  showToast: (m: string) => void;
}> = ({ navMenuItems, updateNavMenuItems, showToast }) => {
  const [items, setItems] = useState([...navMenuItems]);

  const handleAdd = () => {
    const newItem = {
      id: `nav-${Date.now()}`,
      title: 'NEW MENU ITEM',
      link: '#section',
      isVisible: true
    };
    const updated = [...items, newItem];
    setItems(updated);
    updateNavMenuItems(updated);
    showToast('Added new menu item');
  };

  const handleUpdate = (idx: number, field: string, value: any) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
    updateNavMenuItems(updated);
  };

  const handleDelete = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    updateNavMenuItems(updated);
    showToast('Deleted menu item');
  };

  const handleMove = (idx: number, dir: 'up' | 'down') => {
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    setItems(updated);
    updateNavMenuItems(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">3. NAVIGATION MENU MANAGER</h3>
          <p className="text-xs text-stone-400">Add, edit, reorder or hide top bar navigation links.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>ADD MENU ITEM</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-center space-x-3">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1 text-stone-500 hover:text-stone-200 disabled:opacity-20"
              >
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === items.length - 1}
                className="p-1 text-stone-500 hover:text-stone-200 disabled:opacity-20"
              >
                <MoveDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100"
                placeholder="Title"
              />
              <input
                type="text"
                value={item.link}
                onChange={(e) => handleUpdate(idx, 'link', e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100"
                placeholder="#link or /url"
              />
              <input
                type="text"
                value={item.badge || ''}
                onChange={(e) => handleUpdate(idx, 'badge', e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-100"
                placeholder="Optional Badge (e.g. NEW)"
              />
            </div>

            <button
              onClick={() => handleUpdate(idx, 'isVisible', !item.isVisible)}
              className={`p-2 rounded ${item.isVisible ? 'text-amber-400 bg-amber-500/10' : 'text-stone-600 bg-stone-950'}`}
            >
              {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button onClick={() => handleDelete(idx)} className="p-2 text-red-400 hover:bg-red-950/40 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TAB 4: PROJECTS / WORKS ---
const ProjectsTab: React.FC<{
  projects: Project[];
  addProject: (p: Project) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  uploadFileAsDataUrl: (f: File, folder?: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads') => Promise<string>;
  showToast: (m: string) => void;
}> = ({ projects, addProject, updateProject, deleteProject, uploadFileAsDataUrl, showToast }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  const startNew = () => {
    const newProj: Project = {
      id: `p-${Date.now()}`,
      number: `${(projects.length + 1).toString().padStart(2, '0')}`,
      title: 'NEW ARCHITECTURAL PROJECT',
      subtitle: 'LUXURY CANTILEVER STRUCTURE',
      tagline: 'LUXURY CANTILEVER STRUCTURE',
      category: 'Residential',
      year: '2026',
      location: 'ADDIS ABABA, ETHIOPIA',
      surfaceArea: '1,200 SQM',
      client: 'PRIVATE COMMISSION',
      costBracket: '$5M - $10M USD',
      status: 'In Progress',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: 'A contemporary architectural milestone prioritizing spatial flow and kinetic natural light integration.',
      concept: 'Dynamic cantilevered geometry merging landscape and structure.',
      specs: {
        area: '1,200 SQM',
        structuralType: 'Post-Tensioned Cantilever Steel & Reinforced Concrete',
        materials: ['Volcanic Concrete', 'Teak Wood', 'Triple Glass'],
        timeline: '18 Months',
        status: 'In Progress',
        climateStrategy: 'Passive Solar Thermal & Micro-Ventilation'
      },
      floorPlan: {
        title: 'LEVEL 01 — MASTER SPATIAL LAYOUT',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        spots: [
          {
            id: 'spot-1',
            label: 'CANTILEVER LIVING GALLERY',
            description: 'Double-height volume framing sunset panorama.',
            area: '180 SQM',
            x: 35,
            y: 45
          }
        ]
      },
      highlights: ['Solar Integration', 'Zero-Waste Construction', 'Smart Glass Facade'],
      renders3D: [],
      floorPlans: [],
      blueprints: [],
      customFields: [
        { id: 'f1', key: 'FACADE', value: 'Anodized Bronze & Kinetic Louvers' },
        { id: 'f2', key: 'FOUNDATION', value: 'Volcanic Rock Anchor Bolts' }
      ],
      isVisible: true,
      isFeatured: true
    };
    addProject(newProj);
    setEditingId(newProj.id);
    setForm(newProj);
    showToast('New project created');
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm(p);
  };

  const handleSave = () => {
    if (form.id) {
      updateProject(form as Project);
      setEditingId(null);
      showToast('Project updated successfully');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'previewImage') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFileAsDataUrl(file, 'projects');
        if (url) {
          setForm((prev) => ({ ...prev, [field]: url }));
          showToast('Project image uploaded to Supabase Storage');
        }
      } catch (err: any) {
        showToast(`Upload failed: ${err.message || err}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">4. ARCHITECTURAL WORKS INDEX (CMS)</h3>
          <p className="text-xs text-stone-400">Full CRUD for projects, floor plans, 3D renders, drawings, and specs.</p>
        </div>

        <button
          onClick={startNew}
          className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE NEW PROJECT</span>
        </button>
      </div>

      {editingId ? (
        <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl space-y-4 max-w-4xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h4 className="text-sm font-bold text-amber-300">EDITING PROJECT #{form.id}</h4>
            <button onClick={() => setEditingId(null)} className="text-xs text-stone-400 hover:text-stone-200">
              CANCEL
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-stone-400 uppercase">Project Title</label>
              <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 uppercase">Tagline</label>
              <input
                type="text"
                value={form.tagline || ''}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 uppercase">Category</label>
              <input
                type="text"
                value={form.category || ''}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 uppercase">Year</label>
              <input
                type="text"
                value={form.year || ''}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 uppercase">Location</label>
              <input
                type="text"
                value={form.location || ''}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 uppercase">Surface Area</label>
              <input
                type="text"
                value={form.surfaceArea || ''}
                onChange={(e) => setForm({ ...form, surfaceArea: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>

            <div>
              <label className="text-[10px] text-stone-400 uppercase">Client</label>
              <input
                type="text"
                value={form.client || ''}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 uppercase">Status</label>
              <select
                value={form.status || 'Completed'}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Conceptual">Conceptual</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-stone-400 uppercase">Hero Image Upload / URL</label>
            <div className="flex items-center space-x-3 mt-1">
              <input
                type="text"
                value={form.heroImage || ''}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value, previewImage: e.target.value })}
                className="flex-1 bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
              />
              <label className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded text-xs cursor-pointer">
                BROWSE
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImage')} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-stone-400 uppercase">Spatial Concept Description</label>
            <textarea
              rows={3}
              value={form.spatialConcept || ''}
              onChange={(e) => setForm({ ...form, spatialConcept: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded transition"
          >
            SAVE PROJECT DETAILS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <img src={p.heroImage} alt={p.title} className="w-full h-32 object-cover rounded-lg border border-stone-800" />
                <div>
                  <h4 className="text-xs font-bold text-stone-100 uppercase">{p.title}</h4>
                  <p className="text-[10px] text-stone-400">{p.category} • {p.year} • {p.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-stone-800">
                <button
                  onClick={() => startEdit(p)}
                  className="flex-1 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-bold transition text-center"
                >
                  EDIT PROJECT
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete project ${p.title}?`)) {
                      deleteProject(p.id);
                      showToast('Project deleted');
                    }
                  }}
                  className="p-1.5 bg-red-950/40 text-red-400 hover:bg-red-900/60 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- TAB 5: PHILOSOPHY ---
const PhilosophyTab: React.FC<{
  philosophyBlocks: PhilosophyBlock[];
  addPhilosophyBlock: (b: PhilosophyBlock) => void;
  updatePhilosophyBlock: (b: PhilosophyBlock) => void;
  deletePhilosophyBlock: (id: string) => void;
  uploadFileAsDataUrl: (f: File) => Promise<string>;
  showToast: (m: string) => void;
}> = ({ philosophyBlocks, addPhilosophyBlock, updatePhilosophyBlock, deletePhilosophyBlock, uploadFileAsDataUrl, showToast }) => {
  const handleAdd = () => {
    const newBlock: PhilosophyBlock = {
      id: `phil-${Date.now()}`,
      badge: '03 — NEW MANIFESTO BLOCK',
      title: 'ENVIRONMENTAL & STRUCTURAL DIALOGUE',
      paragraph: 'Architecture as an active mediator between topography and human perception.',
      bullets: [
        { title: 'CLIMATE RESPONSIVENESS', description: 'Adaptive facade louvers.' }
      ],
      isVisible: true
    };
    addPhilosophyBlock(newBlock);
    showToast('Philosophy block added');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">5. STUDIO PHILOSOPHY & MANIFESTO</h3>
          <p className="text-xs text-stone-400">Edit design manifestos, spatial bullets, and images.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PHILOSOPHY BLOCK</span>
        </button>
      </div>

      <div className="space-y-4">
        {philosophyBlocks.map((block) => (
          <div key={block.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={block.badge}
                onChange={(e) => updatePhilosophyBlock({ ...block, badge: e.target.value })}
                className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-amber-400 font-bold"
              />
              <button
                onClick={() => {
                  if (confirm('Delete this philosophy block?')) {
                    deletePhilosophyBlock(block.id);
                    showToast('Block deleted');
                  }
                }}
                className="p-1.5 text-red-400 hover:bg-red-950/40 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={block.title}
              onChange={(e) => updatePhilosophyBlock({ ...block, title: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100 font-bold"
            />

            <textarea
              rows={2}
              value={block.paragraph}
              onChange={(e) => updatePhilosophyBlock({ ...block, paragraph: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TAB 6: SERVICES & PROCESS ---
const ServicesTab: React.FC<{
  servicesList: ServiceItem[];
  addServiceItem: (s: ServiceItem) => void;
  updateServiceItem: (s: ServiceItem) => void;
  deleteServiceItem: (id: string) => void;
  processSteps: ProcessStep[];
  addProcessStep: (p: ProcessStep) => void;
  updateProcessStep: (p: ProcessStep) => void;
  deleteProcessStep: (id: string) => void;
  uploadFileAsDataUrl: (f: File) => Promise<string>;
  showToast: (m: string) => void;
}> = ({ servicesList, addServiceItem, updateServiceItem, deleteServiceItem, processSteps, addProcessStep, updateProcessStep, deleteProcessStep, uploadFileAsDataUrl, showToast }) => {
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `serv-${Date.now()}`,
      title: 'NEW ARCHITECTURAL SERVICE',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Bespoke design, engineering & site supervision.',
      isVisible: true
    };
    addServiceItem(newService);
    showToast('Service added');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-amber-400 uppercase">6A. SERVICES GRID MANAGEMENT</h3>
            <p className="text-xs text-stone-400">Add or modify architectural service offerings.</p>
          </div>

          <button
            onClick={handleAddService}
            className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" />
            <span>ADD SERVICE</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicesList.map((serv) => (
            <div key={serv.id} className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={serv.title}
                  onChange={(e) => updateServiceItem({ ...serv, title: e.target.value })}
                  className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100 font-bold flex-1 mr-2"
                />
                <button onClick={() => deleteServiceItem(serv.id)} className="p-1 text-red-400 hover:bg-red-950/40 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={2}
                value={serv.description}
                onChange={(e) => updateServiceItem({ ...serv, description: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-stone-800 pt-6">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">6B. 4-PHASE DESIGN PROCESS MILESTONES</h3>
          <p className="text-xs text-stone-400">Configure phase numbers, titles, and descriptions.</p>
        </div>

        <div className="space-y-3">
          {processSteps.map((step) => (
            <div key={step.id} className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2 flex items-center space-x-3">
              <input
                type="text"
                value={step.stepNumber}
                onChange={(e) => updateProcessStep({ ...step, stepNumber: e.target.value })}
                className="w-12 bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-amber-400 text-center font-bold"
              />
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={step.name}
                  onChange={(e) => updateProcessStep({ ...step, name: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100 font-bold"
                />
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => updateProcessStep({ ...step, description: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TAB 7: INTERACTIVE FEATURES ---
const InteractiveTab: React.FC<{
  beforeAfterList: BeforeAfterPair[];
  addBeforeAfterPair: (b: BeforeAfterPair) => void;
  updateBeforeAfterPair: (b: BeforeAfterPair) => void;
  deleteBeforeAfterPair: (id: string) => void;
  panorama360List: Panorama360Item[];
  addPanorama360Item: (p: Panorama360Item) => void;
  updatePanorama360Item: (p: Panorama360Item) => void;
  deletePanorama360Item: (id: string) => void;
  uploadFileAsDataUrl: (f: File) => Promise<string>;
  showToast: (m: string) => void;
}> = ({ beforeAfterList, addBeforeAfterPair, updateBeforeAfterPair, deleteBeforeAfterPair, panorama360List, addPanorama360Item, updatePanorama360Item, deletePanorama360Item, showToast }) => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">7A. BEFORE & AFTER COMPARISON SLIDERS</h3>
        <p className="text-xs text-stone-400">Configure dual image comparison pairs for transformation projects.</p>
      </div>

      <div className="space-y-4">
        {beforeAfterList.map((pair) => (
          <div key={pair.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
            <input
              type="text"
              value={pair.title}
              onChange={(e) => updateBeforeAfterPair({ ...pair, title: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100 font-bold"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-stone-400">Before Image URL</label>
                <input
                  type="text"
                  value={pair.beforeImage}
                  onChange={(e) => updateBeforeAfterPair({ ...pair, beforeImage: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-400">After Image URL</label>
                <input
                  type="text"
                  value={pair.afterImage}
                  onChange={(e) => updateBeforeAfterPair({ ...pair, afterImage: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-stone-800">
        <h3 className="text-lg font-bold text-amber-400 uppercase">7B. 360° INTERACTIVE PANORAMAS</h3>
        <p className="text-xs text-stone-400">Configure equirectangular 360 panoramic views.</p>
        <div className="space-y-3 mt-4">
          {panorama360List.map((pan) => (
            <div key={pan.id} className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
              <input
                type="text"
                value={pan.title}
                onChange={(e) => updatePanorama360Item({ ...pan, title: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100 font-bold"
              />
              <input
                type="text"
                value={pan.panoramaImage}
                onChange={(e) => updatePanorama360Item({ ...pan, panoramaImage: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TAB 8: TEAM & TRUST ---
const TeamTab: React.FC<{
  teamMembers: TeamMember[];
  addTeamMember: (m: TeamMember) => void;
  updateTeamMember: (m: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  clientList: ClientItem[];
  addClientItem: (c: ClientItem) => void;
  updateClientItem: (c: ClientItem) => void;
  deleteClientItem: (id: string) => void;
  awardList: AwardItem[];
  addAwardItem: (a: AwardItem) => void;
  updateAwardItem: (a: AwardItem) => void;
  deleteAwardItem: (id: string) => void;
  testimonialList: TestimonialItem[];
  addTestimonialItem: (t: TestimonialItem) => void;
  updateTestimonialItem: (t: TestimonialItem) => void;
  deleteTestimonialItem: (id: string) => void;
  faqList: FaqItem[];
  addFaqItem: (f: FaqItem) => void;
  updateFaqItem: (f: FaqItem) => void;
  deleteFaqItem: (id: string) => void;
  uploadFileAsDataUrl: (f: File, folder?: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads') => Promise<string>;
  showToast: (m: string) => void;
}> = ({ 
  teamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember, 
  clientList, 
  addClientItem, 
  updateClientItem, 
  deleteClientItem, 
  awardList, 
  addAwardItem, 
  updateAwardItem, 
  deleteAwardItem, 
  testimonialList, 
  addTestimonialItem, 
  updateTestimonialItem, 
  deleteTestimonialItem, 
  faqList, 
  addFaqItem, 
  updateFaqItem, 
  deleteFaqItem, 
  uploadFileAsDataUrl,
  showToast 
}) => {
  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: 'NEW ARCHITECT / STAFF MEMBER',
      position: 'SENIOR PROJECT ARCHITECT',
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Licensed architect specializing in parametric modeling, high-performance structural envelopes, and construction site management.',
      socialLinks: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
      isVisible: true
    };
    addTeamMember(newMember);
    showToast('Staff member added');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, member: TeamMember) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFileAsDataUrl(file, 'team');
      if (url) {
        updateTeamMember({ ...member, portrait: url });
        showToast('Portrait photo uploaded to Supabase Storage');
      }
    } catch (err: any) {
      console.error(err);
      showToast(`Upload failed: ${err.message || err}`);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">8. ATELIER STAFF & PRINCIPALS</h3>
          <p className="text-xs text-stone-400">Manage architects, staff members, portraits, bios, social links, and public visibility.</p>
        </div>
        <button
          onClick={handleAddMember}
          className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>ADD STAFF MEMBER</span>
        </button>
      </div>

      {/* Staff Members List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-stone-200 uppercase">Atelier Architects & Leadership ({teamMembers.length})</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((m) => (
            <div key={m.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3 relative">
              <div className="flex items-start gap-3">
                <div className="relative group/pic flex-shrink-0">
                  <img
                    src={m.portrait}
                    alt={m.name}
                    className="w-16 h-20 object-cover rounded border border-stone-700 bg-stone-950"
                  />
                  <label className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover/pic:opacity-100 flex items-center justify-center cursor-pointer rounded transition-opacity">
                    <Upload className="w-4 h-4 text-amber-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, m)}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => updateTeamMember({ ...m, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100 font-bold"
                    />
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${m.name}?`)) {
                          deleteTeamMember(m.id);
                          showToast('Member removed');
                        }
                      }}
                      className="p-1 text-red-400 hover:bg-red-950/40 rounded ml-2"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={m.position}
                    onChange={(e) => updateTeamMember({ ...m, position: e.target.value })}
                    placeholder="Position / Title"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-amber-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-stone-400 uppercase">Portrait URL or Click Photo to Upload</label>
                <input
                  type="text"
                  value={m.portrait}
                  onChange={(e) => updateTeamMember({ ...m, portrait: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-stone-400 uppercase">Bio / Statement</label>
                <textarea
                  rows={2}
                  value={m.bio}
                  onChange={(e) => updateTeamMember({ ...m, bio: e.target.value })}
                  placeholder="Architectural Bio"
                  className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={m.socialLinks?.linkedin || ''}
                  onChange={(e) => updateTeamMember({
                    ...m,
                    socialLinks: { ...m.socialLinks, linkedin: e.target.value }
                  })}
                  className="bg-stone-950 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-300"
                />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={m.socialLinks?.instagram || ''}
                  onChange={(e) => updateTeamMember({
                    ...m,
                    socialLinks: { ...m.socialLinks, instagram: e.target.value }
                  })}
                  className="bg-stone-950 border border-stone-800 rounded px-2 py-1 text-[11px] text-stone-300"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                <span className="text-[10px] text-stone-400 font-mono">Public Status:</span>
                <button
                  type="button"
                  onClick={() => {
                    updateTeamMember({ ...m, isVisible: !m.isVisible });
                    showToast(m.isVisible ? 'Staff hidden' : 'Staff visible');
                  }}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    m.isVisible !== false ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {m.isVisible !== false ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TAB 9: INQUIRIES ---
const InquiriesTab: React.FC<{
  inquiries: any[];
  updateInquiryStatus: (id: string, s: 'new' | 'read' | 'archived') => void;
  deleteInquirySubmission: (id: string) => void;
  questionnaireQuestions: any[];
  updateQuestionnaireQuestions: (q: any[]) => void;
  showToast: (m: string) => void;
}> = ({ inquiries, updateInquiryStatus, deleteInquirySubmission, questionnaireQuestions, updateQuestionnaireQuestions, showToast }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">9. COMMISSION INQUIRIES & QUESTIONNAIRE</h3>
        <p className="text-xs text-stone-400">View incoming client submissions or adjust qualification questions.</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-stone-200 uppercase">Inbox ({inquiries.length} Inquiries)</h4>
        {inquiries.length === 0 ? (
          <p className="text-xs text-stone-500 italic p-4 bg-stone-900/50 rounded-lg">No inquiries received yet.</p>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-100">{inq.name} ({inq.email})</p>
                  <p className="text-[10px] text-amber-400">{inq.projectType} • {inq.budget} • {inq.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                    className="bg-stone-950 border border-stone-800 text-[10px] rounded px-2 py-1 text-stone-200"
                  >
                    <option value="new">NEW</option>
                    <option value="read">READ</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                  <button onClick={() => deleteInquirySubmission(inq.id)} className="p-1 text-red-400 hover:bg-red-950/40 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-stone-300 bg-stone-950/60 p-2.5 rounded border border-stone-800/60">{inq.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- TAB 10: CUSTOM SECTIONS ---
const CustomTab: React.FC<{
  customSections: CustomSection[];
  addCustomSection: (c: CustomSection) => void;
  updateCustomSection: (c: CustomSection) => void;
  deleteCustomSection: (id: string) => void;
  showToast: (m: string) => void;
}> = ({ customSections, addCustomSection, updateCustomSection, deleteCustomSection, showToast }) => {
  const handleAdd = () => {
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      badge: 'CUSTOM BLOCK',
      title: 'CUSTOM ARCHITECTURAL SECTION',
      subtitle: 'OPTIONAL DYNAMIC CONTENT BLOCK',
      content: 'Add rich text, embedded visual concepts, or custom spatial statements here.',
      layoutType: 'text-image',
      contentBody: 'Add rich text, embedded visual concepts, or custom spatial statements here.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isVisible: true
    };
    addCustomSection(newSec);
    showToast('Custom section created');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-400 uppercase">10. CUSTOM SECTION BUILDER</h3>
          <p className="text-xs text-stone-400">Inject bespoke content blocks anywhere into the portfolio page.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 text-stone-950 text-xs font-bold rounded hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>ADD CUSTOM SECTION</span>
        </button>
      </div>

      <div className="space-y-4">
        {customSections.map((sec) => (
          <div key={sec.id} className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={sec.title}
                onChange={(e) => updateCustomSection({ ...sec, title: e.target.value })}
                className="bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-100 font-bold"
              />
              <button onClick={() => deleteCustomSection(sec.id)} className="p-1 text-red-400 hover:bg-red-950/40 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={3}
              value={sec.contentBody}
              onChange={(e) => updateCustomSection({ ...sec, contentBody: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1 text-xs text-stone-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TAB 11: THEME & NEON ---
const ThemeTab: React.FC<{
  themeSettings: any;
  updateThemeSettings: (t: any) => void;
  showToast: (m: string) => void;
}> = ({ themeSettings, updateThemeSettings, showToast }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">11. THEME PRESETS & SCROLL ANIMATIONS</h3>
        <p className="text-xs text-stone-400">Switch color palettes, accent highlights, fonts, cursor effects, and GSAP / Framer Motion project list scroll animations.</p>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <div>
          <label className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Editorial Project List Scroll Animation</label>
          <select
            value={themeSettings.projectAnimationPreset || 'framer-slide-fade'}
            onChange={(e) => {
              updateThemeSettings({ ...themeSettings, projectAnimationPreset: e.target.value });
              showToast(`Scroll animation set to ${e.target.value}`);
            }}
            className="w-full bg-stone-950 border border-amber-500/50 rounded px-3 py-2 text-xs text-amber-200 mt-1 font-mono"
          >
            <option value="framer-slide-fade">⚡ Framer Motion: Slide & Fade (Graceful Elevation)</option>
            <option value="framer-spring-glide">🌊 Framer Motion: Spring Elastic Glide</option>
            <option value="motion-fade-scale">✨ Framer Motion: Radiant Fade & Scale</option>
            <option value="gsap-stagger-slide">🎬 GSAP: Inertial Slide-In (Power3 Easing)</option>
            <option value="gsap-curtain-reveal">🏛️ GSAP: Architectural Curtain Reveal</option>
            <option value="architectural-drift">📐 GSAP: Spatial Drift & Slow Elevation</option>
          </select>
          <p className="text-[10px] text-stone-500 mt-1 font-mono">
            Applies hardware-accelerated scroll-triggered entrance physics to every project row in the Editorial Index.
          </p>
        </div>

        <div>
          <label className="text-[10px] text-stone-400 uppercase">Color Preset</label>
          <select
            value={themeSettings.preset}
            onChange={(e) => {
              updateThemeSettings({ ...themeSettings, preset: e.target.value });
              showToast(`Preset changed to ${e.target.value}`);
            }}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100 mt-1"
          >
            <option value="dark-obsidian">Dark Obsidian & Amber Gold (Default Luxury)</option>
            <option value="warm-concrete">Warm Concrete & Raw Sand</option>
            <option value="monolithic-slate">Monolithic Slate & Subdued Bronze</option>
            <option value="pure-studio-white">Pure Architectural White (High Contrast Light)</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 bg-stone-950 rounded border border-stone-800">
          <div>
            <p className="text-xs font-bold text-stone-200">Architectural Neon Light Lines</p>
            <p className="text-[10px] text-stone-500">Subtle animated neon grid lines across sections</p>
          </div>
          <button
            onClick={() => {
              updateThemeSettings({ ...themeSettings, neonLinesEnabled: !themeSettings.neonLinesEnabled });
              showToast('Neon lines toggled');
            }}
            className={`px-3 py-1 rounded text-xs font-bold ${
              themeSettings.neonLinesEnabled ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
            }`}
          >
            {themeSettings.neonLinesEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-stone-950 rounded border border-stone-800">
          <div>
            <p className="text-xs font-bold text-stone-200">Interactive Custom Cursor</p>
            <p className="text-[10px] text-stone-500">Precision architectural crosshair cursor</p>
          </div>
          <button
            onClick={() => {
              updateThemeSettings({ ...themeSettings, cursorEnabled: !themeSettings.cursorEnabled });
              showToast('Custom cursor toggled');
            }}
            className={`px-3 py-1 rounded text-xs font-bold ${
              themeSettings.cursorEnabled ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
            }`}
          >
            {themeSettings.cursorEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TAB 12: SEO & FOOTER ---
const SeoTab: React.FC<{
  seoSettings: any;
  updateSeoSettings: (s: any) => void;
  socialLinks: any[];
  updateSocialLinks: (l: any[]) => void;
  footerSettings: any;
  updateFooterSettings: (f: any) => void;
  legalPages: any;
  updateLegalPages: (l: any) => void;
  uploadFileAsDataUrl: (f: File) => Promise<string>;
  showToast: (m: string) => void;
}> = ({ seoSettings, updateSeoSettings, socialLinks, updateSocialLinks, footerSettings, updateFooterSettings, legalPages, updateLegalPages, showToast }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">12. SEO, FOOTER & LEGAL PAGES</h3>
        <p className="text-xs text-stone-400">Configure page title, meta description, copyright text, and privacy terms.</p>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-stone-200 uppercase">SEO Meta Information</h4>
        <div>
          <label className="text-[10px] text-stone-400 uppercase">Page Title Tag</label>
          <input
            type="text"
            value={seoSettings.pageTitle}
            onChange={(e) => updateSeoSettings({ ...seoSettings, pageTitle: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
          />
        </div>
        <div>
          <label className="text-[10px] text-stone-400 uppercase">Meta Description</label>
          <textarea
            rows={2}
            value={seoSettings.metaDescription}
            onChange={(e) => updateSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-300"
          />
        </div>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-stone-200 uppercase">Global Footer Text</h4>
        <div>
          <label className="text-[10px] text-stone-400 uppercase">Copyright Text</label>
          <input
            type="text"
            value={footerSettings.copyrightText}
            onChange={(e) => updateFooterSettings({ ...footerSettings, copyrightText: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-1.5 text-xs text-stone-100"
          />
        </div>
      </div>
    </div>
  );
};

// --- TAB 13: CONTACT ---
const ContactTab: React.FC<{
  contactDetails: any;
  updateContactDetails: (c: any) => void;
  showToast: (m: string) => void;
}> = ({ contactDetails, updateContactDetails, showToast }) => {
  const [form, setForm] = useState(contactDetails);

  const handleSave = () => {
    updateContactDetails(form);
    showToast('Contact details saved');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-bold text-amber-400 uppercase">13. CONTACT & STUDIO LOCATION</h3>
        <p className="text-xs text-stone-400">Edit address, commission email, studio phone, and map coordinates.</p>
      </div>

      <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
        <div>
          <label className="text-[10px] text-stone-400 uppercase">Inquiry Heading</label>
          <input
            type="text"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-stone-400 uppercase">Commission Email</label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-400 uppercase">Studio Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-stone-400 uppercase">Physical Atelier Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-stone-100"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition"
      >
        SAVE CONTACT DETAILS
      </button>
    </div>
  );
};
