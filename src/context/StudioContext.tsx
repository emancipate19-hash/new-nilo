import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  PhilosophyBlock,
  ServiceItem,
  JournalArticle,
  ContactDetails,
  HeroSettings,
  NavMenuItem,
  TeamMember,
  ClientItem,
  AwardItem,
  TestimonialItem,
  FaqItem,
  BeforeAfterPair,
  Panorama360Item,
  ProcessStep,
  QuestionnaireQuestion,
  InquirySubmission,
  CustomSection,
  SectionVisibility,
  ThemeSettings,
  ProjectAnimationPreset,
  SeoSettings,
  SocialLink,
  FooterSettings,
  LegalContent,
  CategoryItem,
  GalleryItem,
  SupabaseSyncStatus,
  AdminUser
} from '../types';
import { PROJECTS as INITIAL_PROJECTS, JOURNAL_ARTICLES as INITIAL_JOURNAL_ARTICLES } from '../data/projects';
import { INITIAL_CATEGORIES, INITIAL_GALLERY_ITEMS } from '../data/categories';
import {
  DEFAULT_LOGO_URL,
  DEFAULT_HERO_IMAGE_URL,
  DEFAULT_UPLOADED_ASSETS,
  DEFAULT_UPLOADED_PICTURES
} from '../assets/images/defaultAssets';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout as authLogout, getAccessToken } from '../services/auth';
import {
  DriveFolderFile,
  DEFAULT_DRIVE_FOLDER_ID,
  fetchDriveFolderFiles,
  getDriveImageUrl,
  getDriveThumbnailUrl
} from '../services/googleDriveService';
import {
  checkSupabaseConnection,
  fetchCmsDataFromSupabase,
  uploadImageToSupabaseStorage,
  upsertProjectToSupabase,
  deleteProjectFromSupabase,
  upsertCategoryToSupabase,
  deleteCategoryFromSupabase,
  upsertServiceToSupabase,
  deleteServiceFromSupabase,
  upsertTeamMemberToSupabase,
  deleteTeamMemberFromSupabase,
  upsertJournalArticleToSupabase,
  deleteJournalArticleFromSupabase,
  upsertGalleryItemToSupabase,
  deleteGalleryItemFromSupabase,
  saveSiteContentToSupabase,
  seedAllDataToSupabase
} from '../services/supabaseCmsService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const INITIAL_PHILOSOPHY_BLOCKS: PhilosophyBlock[] = [
  {
    id: 'phil-1',
    badge: '01 — SPATIAL MANIFESTO',
    title: 'NILO AXIS STUDIO RESPONDS TO NATURAL TERRAIN.',
    paragraph: 'At NILO AXIS STUDIO, we do not level mountains or clear forests to make room for architecture; we suspend modern high-density structures over cliffs and nestle luxury high-rises directly into pine forest canopies. Architecture is not an imposition upon nature, but an elevated lens through which light, landscape, and climate converge.',
    bullets: [
      {
        title: 'TOPOGRAPHY INTEGRATION',
        description: 'Zero-cut site strategy preserving natural drainage channels, native pine trees, and rock formations.'
      },
      {
        title: 'STRUCTURAL EXTREMITY',
        description: 'Post-tensioned cantilever balconies and kinetic shading envelopes tuned to atmospheric breeze.'
      }
    ],
    image: DEFAULT_UPLOADED_ASSETS.terrainVilla,
    isVisible: true
  },
  {
    id: 'phil-2',
    badge: '02 — THE POETICS OF MATERIAL & LIGHT',
    title: 'LIGHT & WOOD AS PRIMARY STRUCTURAL ELEMENTS.',
    paragraph: 'Sunlight is sculpted into an active architectural component. Through motorized bronze anodized louvers, timber vertical accents, and triple-height glass curtain walls, peak sun angles cast geometric tapestries across interior living sanctuaries.',
    bullets: [
      {
        title: 'SOLAR CHIMNEYS',
        description: 'Passive stack ventilation drawing cool coastal pine forest air into vertical light atrium shafts.'
      },
      {
        title: 'TACTILE TIMBER & GLASS',
        description: 'Local teak and anodized bronze combined with structural white concrete.'
      }
    ],
    image: DEFAULT_UPLOADED_ASSETS.lumenCenter,
    isVisible: true
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'MONOLITHIC RESIDENTIAL ARCHITECTURE',
    image: DEFAULT_UPLOADED_ASSETS.terrainVilla,
    description: 'Mountain cantilever villas & private coastal sanctuaries.',
    isVisible: true
  },
  {
    id: 'serv-2',
    title: 'CIVIC & CULTURAL PAVILIONS',
    image: DEFAULT_UPLOADED_ASSETS.lumenCenter,
    description: 'Galleries, amphitheatres, and light-focused public spaces.',
    isVisible: true
  },
  {
    id: 'serv-3',
    title: 'PARAMETRIC KINETIC FACADES',
    image: DEFAULT_UPLOADED_ASSETS.boleTower,
    description: 'Automated bronze solar louvers & dynamic climate skins.',
    isVisible: true
  },
  {
    id: 'serv-4',
    title: 'EARTH & MATERIAL RESEARCH',
    image: DEFAULT_UPLOADED_ASSETS.hawassaRetreat,
    description: 'Rammed volcanic subsoil and zero-cement carbon negative concrete.',
    isVisible: true
  }
];

export const INITIAL_CONTACT_DETAILS: ContactDetails = {
  heading: 'Our Message',
  description: 'We believe every project begins with an idea — a vision waiting to take shape.\n\nBy bridging architecture, art, technology, and strategy, we create thoughtful spaces and compelling digital experiences that connect people, purpose, and place. From architectural concepts and spatial design to visual identities, websites, video, and digital storytelling, we approach every project with curiosity, precision, and a strong sense of aesthetics.\n\nOur goal is simple: to transform ideas into meaningful experiences that inspire, engage, and endure.',
  address: '',
  email: 'niloaxisstudio@gmail.com',
  phone: '',
  workingHours: 'MON - FRI: 08:00 - 19:00 EAT',
  mapLatitude: 8.995,
  mapLongitude: 38.788,
  mapZoom: 14
};

export const INITIAL_HERO_SETTINGS: HeroSettings = {
  title: 'ROOTED HERE. DESIGNED BEYOND.',
  subtitle: 'CONTEMPORARY ARCHITECTURE & DESIGN ATELIER',
  tagline: 'CONTEMPORARY ARCHITECTURE & DESIGN ATELIER',
  heroImage: DEFAULT_HERO_IMAGE_URL,
  heroVideoUrl: '',
  ctaPrimaryText: 'EXPLORE WORKS',
  ctaPrimaryLink: '#works-showcase',
  ctaSecondaryText: 'INQUIRE ATELIER',
  ctaSecondaryLink: '#contact',
  showHero: true
};

export const INITIAL_NAV_MENU: NavMenuItem[] = [
  { id: 'nav-1', title: 'INDEX', link: '#hero', isVisible: true },
  { id: 'nav-2', title: 'FEATURED WORKS', link: '#works-showcase', badge: 'NEW', isVisible: true },
  { id: 'nav-3', title: 'PHILOSOPHY', link: '#philosophy', isVisible: true },
  { id: 'nav-4', title: 'SERVICES', link: '#services', isVisible: true },
  { id: 'nav-5', title: 'BEFORE & AFTER', link: '#before-after', isVisible: true },
  { id: 'nav-6', title: '360° VIEWS', link: '#panorama360', isVisible: true },
  { id: 'nav-7', title: 'TEAM & AWARDS', link: '#team-awards', isVisible: true },
  { id: 'nav-8', title: 'JOURNAL', link: '#journal', isVisible: true },
  { id: 'nav-9', title: 'COMMISSION', link: '#contact', isVisible: true }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-2',
    name: 'KIDUS AMANUEL HAILESILASSE',
    position: 'PRINCIPAL ARCHITECT & STRUCTURAL ENGINEER',
    portrait: DEFAULT_UPLOADED_ASSETS.staffKidus,
    bio: 'Precision engineering meets timeless architectural design. Extensive expertise and rigorous attention to detail are brought to every stage of the architectural process. Dedicated to translating aspirations into structural masterpieces, technical proficiency is combined with creative ingenuity. Whether designing residential sanctuaries, commercial landmarks, or public spaces, each solution is custom-tailored to deliver structural integrity, spatial efficiency, and exceptional design value.',
    socialLinks: { linkedin: 'https://linkedin.com', x: 'https://x.com' },
    isVisible: true
  },
  {
    id: 'team-3',
    name: 'MILKI LEGESSE GONFA',
    position: 'DESIGN DIRECTOR & SUSTAINABLE SPATIAL ARCHITECT',
    portrait: DEFAULT_UPLOADED_ASSETS.staffMilki,
    bio: 'Shaping spaces that inspire, endure, and connect. Driven by a passion for functional artistry, bold visions are transformed into tangible reality. With a strong commitment to sustainable design and modern aesthetics, every project is approached as a unique dialogue between the built environment and the people who inhabit it. From conceptual design to meticulous execution, the focus remains on creating spaces that harmonize beauty, purpose, and environmental responsibility.',
    socialLinks: { instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    isVisible: true
  },
  {
    id: 'team-1',
    name: 'DAWIT ENDAYLALU TADESSE',
    position: 'CREATIVE DIRECTOR & DIGITAL STRATEGIST',
    portrait: DEFAULT_UPLOADED_ASSETS.staffDawit,
    bio: 'Bridging art, technology, and strategy to build compelling digital experiences. Specializing in graphic design, video editing, web development, and digital storytelling. With a keen eye for visual aesthetics and a deep understanding of digital ecosystems, every project—from immersive brand identities and dynamic video content to high-performing websites and engaging social media campaigns—is crafted to captivate audiences and drive measurable impact. Seamlessly blending technical execution with visionary creative direction, ideas are brought to life across every digital touchpoint.',
    socialLinks: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
    isVisible: true
  }
];

export const INITIAL_CLIENTS: ClientItem[] = [
  { id: 'cli-1', name: 'AMAMAN SANCTUARIES', logo: DEFAULT_UPLOADED_ASSETS.project1, description: 'Luxury Eco-Hospitality Group', isVisible: true },
  { id: 'cli-2', name: 'ALPINE RESIDENCES AG', logo: DEFAULT_UPLOADED_ASSETS.project2, description: 'Swiss Mountain Cantilever Real Estate', isVisible: true },
  { id: 'cli-3', name: 'METROPOLIS CIVIC FOUNDATION', logo: DEFAULT_UPLOADED_ASSETS.project3, description: 'Public Art & Cultural Architecture Trust', isVisible: true }
];

export const INITIAL_AWARDS: AwardItem[] = [
  { id: 'awd-1', title: 'GLOBAL ARCHITECTURE ATELIER OF THE YEAR', year: '2026', organization: 'WORLD ARCHITECTURE FESTIVAL (WAF)', isVisible: true },
  { id: 'awd-2', title: 'PRITZKER DESIGN SELECTION SHORTLIST', year: '2025', organization: 'HYATT FOUNDATION', isVisible: true },
  { id: 'awd-3', title: 'BEST RESIDENTIAL HIGH-RISE CANTILEVER', year: '2024', organization: 'AIA INTERNATIONAL ARCHITECTURE AWARDS', isVisible: true }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'NILO AXIS STUDIO transformed an impossible cliff face into our signature mountain retreat. The precision of light and structural tension exceeds anything we envisioned.',
    clientName: 'HENRIK VON BERG',
    company: 'ALPINE RESIDENCES GROUP',
    photo: DEFAULT_UPLOADED_ASSETS.project8,
    isVisible: true
  },
  {
    id: 'test-2',
    quote: 'Working with Elena & Marcus was a masterclass in architectural rigor. Their zero-cut landscape philosophy made our gallery a global beacon for sustainable luxury.',
    clientName: 'CLARA SANTIAGO',
    company: 'DIRECTOR, METROPOLIS CULTURAL TRUST',
    photo: DEFAULT_UPLOADED_ASSETS.project9,
    isVisible: true
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  { id: 'faq-1', question: 'WHAT IS THE MINIMUM PROJECT BUDGET NILO AXIS ACCEPTS?', answer: 'We specialize in bespoke architectural commissions typically starting at $2.5M USD for private residential sanctuaries and $10M+ for commercial/civic developments.', isVisible: true },
  { id: 'faq-2', question: 'DO YOU DESIGN BOTH EXTERIOR ARCHITECTURE AND INTERIORS?', answer: 'Yes. We operate as a total spatial atelier — designing everything from site masterplanning and structural engineering to bespoke furniture, lighting choreography, and millwork.', isVisible: true },
  { id: 'faq-3', question: 'HOW DOES THE STUDIO HANDLE INTERNATIONAL COMMISSIONS?', answer: 'We collaborate with trusted local executive architects and engineering teams globally while maintaining 100% design direction and site supervision from our primary atelier.', isVisible: true }
];

export const INITIAL_BEFORE_AFTER: BeforeAfterPair[] = [
  {
    id: 'ba-1',
    title: 'VOLCANIC QUARRY RESIDUAL TO CAVERN SPA',
    beforeImage: DEFAULT_UPLOADED_ASSETS.hawassaRetreat,
    afterImage: DEFAULT_UPLOADED_ASSETS.terrainVilla,
    description: 'Subterranean quarry excavation converted into a heated thermal water spring & subterranean spa pavilion.',
    isVisible: true
  }
];

export const INITIAL_PANORAMA360: Panorama360Item[] = [
  {
    id: 'pan-1',
    title: 'CLIFFTOP ATRIUM & OCEAN OVERLOOK',
    panoramaImage: DEFAULT_UPLOADED_ASSETS.heroTower,
    location: 'MONTEREY COAST, CALIFORNIA',
    autoRotate: true,
    speed: 0.5,
    startingAngle: 0,
    isVisible: true
  }
];

export const INITIAL_PROCESS_STEPS: ProcessStep[] = [
  { id: 'prc-1', stepNumber: '01', name: 'SITE ANALYSIS & CLIMATE MAPPING', phase: 'CONCEPTUAL DISCOVERY', description: 'Solar trajectory mapping, micro-wind simulations, and zero-impact topography scanning.', image: DEFAULT_UPLOADED_ASSETS.terrainVilla, isVisible: true },
  { id: 'prc-2', stepNumber: '02', name: 'PARAMETRIC & STRUCTURAL GEOMETRY', phase: 'DESIGN DEVELOPMENT', description: 'Multi-objective structural optimization using algorithmic models for lightweight concrete cantilevers.', image: DEFAULT_UPLOADED_ASSETS.lumenCenter, isVisible: true },
  { id: 'prc-3', stepNumber: '03', name: 'MATERIAL FABRICATION & PROTOTYPING', phase: 'DETAIL EXECUTION', description: 'Full-scale physical mockups of kinetic louvers, custom timber casting, and glass joint testing.', image: DEFAULT_UPLOADED_ASSETS.boleTower, isVisible: true },
  { id: 'prc-4', stepNumber: '04', name: 'SITE EXECUTION & ARCHITECTURAL HANDOVER', phase: 'CONSTRUCTION RIGOR', description: 'On-site supervisory presence ensuring sub-millimeter tolerances and seamless natural landscaping integration.', image: DEFAULT_UPLOADED_ASSETS.hawassaRetreat, isVisible: true }
];

export const INITIAL_QUESTIONNAIRE: QuestionnaireQuestion[] = [
  { id: 'q-1', text: 'WHAT IS THE PRIMARY TYPE OF YOUR PROPOSED ARCHITECTURAL PROJECT?', type: 'select', options: ['Private Residential Sanctuary', 'Commercial / High-Rise', 'Civic / Cultural Pavilion', 'Luxury Hospitality Resort', 'Subterranean / Wellness'], isRequired: true },
  { id: 'q-2', text: 'WHERE IS THE GEOGRAPHIC LOCATION OF THE PROJECT SITE?', type: 'text', isRequired: true },
  { id: 'q-3', text: 'WHAT IS YOUR ESTIMATED CAPITAL INVESTMENT BRACKET?', type: 'select', options: ['$2.5M - $5M USD', '$5M - $15M USD', '$15M - $50M USD', '$50M+ USD'], isRequired: true },
  { id: 'q-4', text: 'WHAT IS YOUR TARGET CONSTRUCTION START TIMELINE?', type: 'select', options: ['Immediate (Within 3 Months)', '6 - 12 Months', '12 - 24 Months', 'Long-term Planning'], isRequired: false }
];

export const INITIAL_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  showcase: true,
  philosophy: true,
  services: true,
  catalog: true,
  ongoingProjects: true,
  beforeAfter: true,
  panorama360: true,
  process: true,
  team: true,
  clientsAndAwards: true,
  faq: true,
  journal: true,
  questionnaire: true,
  contact: true,
  map: true,
  footer: true
};

export const INITIAL_THEME_SETTINGS: ThemeSettings = {
  preset: 'dark-obsidian',
  fontFamily: 'mono',
  cursorEnabled: true,
  neonLinesEnabled: true,
  smoothScroll: true,
  accentColor: '#f59e0b',
  projectAnimationPreset: 'framer-slide-fade'
};

export const INITIAL_SEO_SETTINGS: SeoSettings = {
  pageTitle: 'NILO AXIS STUDIO | Contemporary Architecture Atelier',
  metaDescription: 'NILO AXIS STUDIO is an elite architecture atelier specializing in luxury residential cantilevers, civic pavilions, and sustainable parametric design.',
  keywords: 'architecture, atelier, luxury residential, parametric design, cantilever villas, nilo axis studio',
  ogImage: DEFAULT_HERO_IMAGE_URL,
  faviconUrl: DEFAULT_LOGO_URL
};

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: 'soc-1', platform: 'INSTAGRAM', url: 'https://instagram.com', isVisible: true },
  { id: 'soc-2', platform: 'LINKEDIN', url: 'https://linkedin.com', isVisible: true },
  { id: 'soc-3', platform: 'ARCHDAILY', url: 'https://archdaily.com', isVisible: true },
  { id: 'soc-4', platform: 'X / TWITTER', url: 'https://x.com', isVisible: true },
  { id: 'soc-5', platform: 'PINTEREST', url: 'https://pinterest.com', isVisible: true }
];

export const INITIAL_FOOTER_SETTINGS: FooterSettings = {
  copyrightText: '© 2026 NILO AXIS STUDIO. ALL RIGHTS RESERVED.',
  description: 'NILO AXIS STUDIO — ARCHITECTURAL ATELIER & RESEARCH LAB.',
  showSocials: true,
  showBackToTop: true
};

export const INITIAL_LEGAL: LegalContent = {
  privacyPolicy: `PRIVACY POLICY — NILO AXIS STUDIO

1. DATA COLLECTION
NILO AXIS STUDIO collects minimal client information exclusively for architectural commission inquiries, client questionnaires, and project proposals.

2. CONFIDENTIALITY
All architectural drawings, site coordinates, structural budgets, and client identity details are protected under strict non-disclosure terms.

3. COOKIES & LOCAL STORAGE
This digital portfolio uses local storage solely to persist user theme preferences, CMS edit states, and active session configurations.`,
  termsAndConditions: `TERMS & CONDITIONS — NILO AXIS STUDIO

1. INTELLECTUAL PROPERTY
All architectural renderings, 3D parametric models, spatial drawings, and concepts presented on this website are the sole property of NILO AXIS STUDIO.

2. COMMISSIONS & ENGAGEMENT
Acceptance of commission inquiries is subject to formal architectural service agreements and site feasibility studies.`
};

export const INITIAL_INQUIRIES: InquirySubmission[] = [
  {
    id: 'inq-1',
    date: '2026-08-10',
    name: 'Julian Vance',
    email: 'j.vance@vancerealestate.com',
    phone: '+1 310 555 0192',
    projectType: 'Private Residential Sanctuary',
    budget: '$15M - $50M USD',
    location: 'Aspen, Colorado',
    message: 'Seeking a cliffside cantilevered villa with integrated thermal subterranean spa.',
    status: 'new'
  }
];

interface StudioState {
  logoUrl: string;
  heroImageUrl: string;
  studioName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroSettings: HeroSettings;
  navMenuItems: NavMenuItem[];
  projects: Project[];
  categories: CategoryItem[];
  galleryItems: GalleryItem[];
  philosophyBlocks: PhilosophyBlock[];
  servicesList: ServiceItem[];
  journalArticles: JournalArticle[];
  contactDetails: ContactDetails;
  showcaseHeader: { title: string; subtitle: string };
  catalogHeader: { title: string; subtitle: string };
  teamMembers: TeamMember[];
  clientList: ClientItem[];
  awardList: AwardItem[];
  testimonialList: TestimonialItem[];
  faqList: FaqItem[];
  beforeAfterList: BeforeAfterPair[];
  panorama360List: Panorama360Item[];
  processSteps: ProcessStep[];
  questionnaireQuestions: QuestionnaireQuestion[];
  inquiries: InquirySubmission[];
  customSections: CustomSection[];
  sectionVisibility: SectionVisibility;
  themeSettings: ThemeSettings;
  seoSettings: SeoSettings;
  socialLinks: SocialLink[];
  footerSettings: FooterSettings;
  legalPages: LegalContent;
  isAdminMode: boolean;
  isCmsOpen: boolean;
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  isCheckingAuth: boolean;
  adminAuthError: string | null;
  isAdminLoginModalOpen: boolean;
  isDirectAdminRoute: boolean;
  activeAdminTab: string;
  supabaseSyncStatus: SupabaseSyncStatus;
}

interface StudioContextType extends StudioState {
  setIsAdminMode: (active: boolean) => void;
  setIsCmsOpen: (open: boolean) => void;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  setIsDirectAdminRoute: (open: boolean) => void;
  setActiveAdminTab: (tab: string) => void;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logoutAdmin: () => Promise<void>;
  updateLogo: (newUrl: string) => void;
  updateHeroImage: (newUrl: string) => void;
  updateHeroContent: (title: string, subtitle: string, tagline: string) => void;
  updateHeroSettings: (settings: HeroSettings) => void;
  updateNavMenuItems: (items: NavMenuItem[]) => void;
  updateProjectImage: (projectId: string, newUrl: string) => void;
  addProject: (project: Project) => void;
  updateProject: (updatedProject: Project) => void;
  deleteProject: (projectId: string) => void;
  moveProject: (id: string, direction: 'left' | 'right') => void;

  // Categories CRUD
  addCategory: (category: CategoryItem) => void;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (categories: CategoryItem[]) => void;

  // Gallery CRUD
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  moveGalleryItemCategory: (id: string, newCategory: string) => void;
  reorderGalleryItems: (items: GalleryItem[]) => void;

  // Philosophy CRUD
  addPhilosophyBlock: (block: PhilosophyBlock) => void;
  updatePhilosophyBlock: (block: PhilosophyBlock) => void;
  deletePhilosophyBlock: (id: string) => void;

  // Services CRUD
  addServiceItem: (service: ServiceItem) => void;
  updateServiceItem: (service: ServiceItem) => void;
  deleteServiceItem: (id: string) => void;

  // Journal CRUD
  addJournalArticle: (article: JournalArticle) => void;
  updateJournalArticle: (article: JournalArticle) => void;
  deleteJournalArticle: (id: string) => void;

  // Contact CRUD
  updateContactDetails: (details: ContactDetails) => void;

  // Section Headers
  updateShowcaseHeader: (title: string, subtitle: string) => void;
  updateCatalogHeader: (title: string, subtitle: string) => void;

  // Team, Clients, Awards, Testimonials, FAQ
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;

  addClientItem: (item: ClientItem) => void;
  updateClientItem: (item: ClientItem) => void;
  deleteClientItem: (id: string) => void;

  addAwardItem: (award: AwardItem) => void;
  updateAwardItem: (award: AwardItem) => void;
  deleteAwardItem: (id: string) => void;

  addTestimonialItem: (item: TestimonialItem) => void;
  updateTestimonialItem: (item: TestimonialItem) => void;
  deleteTestimonialItem: (id: string) => void;

  addFaqItem: (item: FaqItem) => void;
  updateFaqItem: (item: FaqItem) => void;
  deleteFaqItem: (id: string) => void;

  // Interactive Features
  addBeforeAfterPair: (pair: BeforeAfterPair) => void;
  updateBeforeAfterPair: (pair: BeforeAfterPair) => void;
  deleteBeforeAfterPair: (id: string) => void;

  addPanorama360Item: (item: Panorama360Item) => void;
  updatePanorama360Item: (item: Panorama360Item) => void;
  deletePanorama360Item: (id: string) => void;

  addProcessStep: (step: ProcessStep) => void;
  updateProcessStep: (step: ProcessStep) => void;
  deleteProcessStep: (id: string) => void;

  // Questionnaire & Inquiries
  updateQuestionnaireQuestions: (questions: QuestionnaireQuestion[]) => void;
  addInquirySubmission: (inquiry: Omit<InquirySubmission, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'new' | 'read' | 'archived') => void;
  deleteInquirySubmission: (id: string) => void;

  // Custom Sections
  addCustomSection: (sec: CustomSection) => void;
  updateCustomSection: (sec: CustomSection) => void;
  deleteCustomSection: (id: string) => void;

  // Settings & Configuration
  updateSectionVisibility: (vis: SectionVisibility) => void;
  updateThemeSettings: (theme: ThemeSettings) => void;
  projectAnimationPreset: ProjectAnimationPreset;
  setProjectAnimationPreset: (preset: ProjectAnimationPreset) => void;
  updateSeoSettings: (seo: SeoSettings) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  updateFooterSettings: (footer: FooterSettings) => void;
  updateLegalPages: (legal: LegalContent) => void;

  // Backup, Storage & Supabase Sync
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  uploadFileAsDataUrl: (file: File) => Promise<string>;
  uploadImageToStorage: (file: File, folder?: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads') => Promise<{ url: string; path: string; error: string | null }>;
  syncWithSupabase: () => Promise<void>;
  pushAllToSupabase: () => Promise<{ success: boolean; errors: string[] }>;

  // Google Drive Folder Synchronization & OAuth
  driveFolderId: string;
  setDriveFolderId: (id: string) => void;
  driveFiles: DriveFolderFile[];
  isSyncingDrive: boolean;
  driveSyncStatus: string | null;
  driveSyncError: string | null;
  currentUser: User | null;
  isDriveConnected: boolean;
  isGoogleDriveModalOpen: boolean;
  setIsGoogleDriveModalOpen: (open: boolean) => void;
  handleGoogleSignIn: () => Promise<void>;
  handleGoogleSignOut: () => Promise<void>;
  syncGoogleDriveFolder: (folderId?: string) => Promise<boolean>;
  applyDriveFilesToStudio: (files: DriveFolderFile[]) => void;
}

const STORAGE_KEY = 'nilo_axis_studio_state_v27';

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO_URL);
  const [heroImageUrl, setHeroImageUrl] = useState<string>(DEFAULT_HERO_IMAGE_URL);
  const [studioName] = useState<string>('NILO AXIS STUDIO');
  const [heroTitle, setHeroTitle] = useState<string>('ROOTED HERE. DESIGNED BEYOND.');
  const [heroSubtitle, setHeroSubtitle] = useState<string>('CONTEMPORARY ARCHITECTURE & DESIGN ATELIER');
  const [heroTagline, setHeroTagline] = useState<string>('CONTEMPORARY ARCHITECTURE & DESIGN ATELIER');
  
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(INITIAL_HERO_SETTINGS);
  const [navMenuItems, setNavMenuItems] = useState<NavMenuItem[]>(INITIAL_NAV_MENU);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [philosophyBlocks, setPhilosophyBlocks] = useState<PhilosophyBlock[]>(INITIAL_PHILOSOPHY_BLOCKS);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(INITIAL_JOURNAL_ARTICLES);
  const [contactDetails, setContactDetails] = useState<ContactDetails>(INITIAL_CONTACT_DETAILS);
  const [showcaseHeader, setShowcaseHeader] = useState({
    title: 'FEATURED ARCHITECTURAL AND DESIGN WORKS',
    subtitle: '01 — PORTFOLIO HIGHLIGHTS & DESIGN COMMISSIONS'
  });
  const [catalogHeader, setCatalogHeader] = useState({
    title: 'COMPLETE PORTFOLIO INDEX',
    subtitle: 'EDITORIAL CATALOG & ARCHITECTURAL INDEX'
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [clientList, setClientList] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [awardList, setAwardList] = useState<AwardItem[]>(INITIAL_AWARDS);
  const [testimonialList, setTestimonialList] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [faqList, setFaqList] = useState<FaqItem[]>(INITIAL_FAQS);
  const [beforeAfterList, setBeforeAfterList] = useState<BeforeAfterPair[]>(INITIAL_BEFORE_AFTER);
  const [panorama360List, setPanorama360List] = useState<Panorama360Item[]>(INITIAL_PANORAMA360);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(INITIAL_PROCESS_STEPS);
  const [questionnaireQuestions, setQuestionnaireQuestions] = useState<QuestionnaireQuestion[]>(INITIAL_QUESTIONNAIRE);
  const [inquiries, setInquiries] = useState<InquirySubmission[]>(INITIAL_INQUIRIES);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(INITIAL_SECTION_VISIBILITY);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(INITIAL_THEME_SETTINGS);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(INITIAL_SEO_SETTINGS);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(INITIAL_FOOTER_SETTINGS);
  const [legalPages, setLegalPages] = useState<LegalContent>(INITIAL_LEGAL);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  // Supabase & Admin Authentication States
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Route check for /admin or #admin
  const [isDirectAdminRoute, setIsDirectAdminRouteState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#admin') ||
      window.location.search.includes('admin=true')
    );
  });

  const setIsDirectAdminRoute = (isOpen: boolean) => {
    setIsDirectAdminRouteState(isOpen);
    if (typeof window !== 'undefined') {
      if (isOpen) {
        if (!window.location.pathname.startsWith('/admin')) {
          try {
            window.history.pushState(null, '', '/admin');
          } catch {
            window.location.hash = 'admin';
          }
        }
      } else {
        if (window.location.pathname.startsWith('/admin')) {
          try {
            window.history.pushState(null, '', '/');
          } catch {
            window.location.hash = '';
          }
        }
      }
    }
  };

  // Supabase Auth Session checking on mount & AuthState listener
  useEffect(() => {
    // Purge any legacy unverified tokens
    try {
      localStorage.removeItem('nilo_admin_auth');
      sessionStorage.removeItem('nilo_admin_auth');
    } catch {}

    // Check active Supabase session
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (session?.user && !error) {
          setIsAdminAuthenticated(true);
          setAdminUser({
            id: session.user.id,
            email: session.user.email,
            role: session.user.role,
            lastSignInAt: session.user.last_sign_in_at
          });
        } else {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
        setIsCheckingAuth(false);
      }).catch((err) => {
        console.warn('Supabase auth session check failed:', err);
        setIsCheckingAuth(false);
      });

      // Subscribe to auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAdminAuthenticated(true);
          setAdminUser({
            id: session.user.id,
            email: session.user.email,
            role: session.user.role,
            lastSignInAt: session.user.last_sign_in_at
          });
        } else {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
          setIsAdminMode(false);
        }
        setIsCheckingAuth(false);
      });

      return () => {
        subscription?.unsubscribe();
      };
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  // Supabase sync tracking
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<SupabaseSyncStatus>({
    isConnected: false,
    isSyncing: false,
    lastSync: null,
    error: null,
    tables: {
      projects: 0,
      categories: 0,
      services: 0,
      team: 0,
      gallery: 0,
      site_content: 0,
      journal: 0
    }
  });

  // Google Drive Integration States
  const [driveFolderId, setDriveFolderId] = useState<string>(DEFAULT_DRIVE_FOLDER_ID);
  const [driveFiles, setDriveFiles] = useState<DriveFolderFile[]>([]);
  const [isSyncingDrive, setIsSyncingDrive] = useState<boolean>(false);
  const [driveSyncStatus, setDriveSyncStatus] = useState<string | null>(null);
  const [driveSyncError, setDriveSyncError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isGoogleDriveModalOpen, setIsGoogleDriveModalOpen] = useState<boolean>(false);

  // Initialize Firebase Auth listener for Google Drive scope
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        if (token && driveFiles.length === 0) {
          // Automatically try fetching the folder once authenticated
          syncGoogleDriveFolder(driveFolderId);
        }
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [driveFolderId]);

  // Load persisted state on mount & sync with Supabase
  useEffect(() => {
    try {
      // Clear older version keys to ensure new default assets take effect immediately
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('nilo_axis_studio_state') && key !== STORAGE_KEY) {
          localStorage.removeItem(key);
        }
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.logoUrl) {
          if (parsed.logoUrl.startsWith('data:image/svg+xml')) {
            setLogoUrl(DEFAULT_LOGO_URL);
          } else {
            setLogoUrl(parsed.logoUrl);
          }
        }
        if (parsed.heroImageUrl) {
          if (parsed.heroImageUrl.includes('unsplash.com')) {
            setHeroImageUrl(DEFAULT_HERO_IMAGE_URL);
          } else {
            setHeroImageUrl(parsed.heroImageUrl);
          }
        }
        if (parsed.heroTitle) setHeroTitle(parsed.heroTitle);
        if (parsed.heroSubtitle) setHeroSubtitle(parsed.heroSubtitle);
        if (parsed.heroTagline) setHeroTagline(parsed.heroTagline);
        if (parsed.heroSettings) {
          const heroImg = parsed.heroSettings.heroImage && parsed.heroSettings.heroImage.includes('unsplash.com')
            ? DEFAULT_HERO_IMAGE_URL
            : parsed.heroSettings.heroImage || DEFAULT_HERO_IMAGE_URL;
          setHeroSettings({ ...parsed.heroSettings, heroImage: heroImg });
        }
        if (Array.isArray(parsed.navMenuItems)) setNavMenuItems(parsed.navMenuItems);
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) setProjects(parsed.projects);
        if (Array.isArray(parsed.categories) && parsed.categories.length > 0) setCategories(parsed.categories);
        if (Array.isArray(parsed.galleryItems) && parsed.galleryItems.length > 0) setGalleryItems(parsed.galleryItems);
        if (Array.isArray(parsed.philosophyBlocks) && parsed.philosophyBlocks.length > 0) setPhilosophyBlocks(parsed.philosophyBlocks);
        if (Array.isArray(parsed.servicesList) && parsed.servicesList.length > 0) setServicesList(parsed.servicesList);
        if (Array.isArray(parsed.journalArticles) && parsed.journalArticles.length > 0) setJournalArticles(parsed.journalArticles);
        if (parsed.contactDetails) setContactDetails(parsed.contactDetails);
        if (parsed.showcaseHeader) setShowcaseHeader(parsed.showcaseHeader);
        if (parsed.catalogHeader) setCatalogHeader(parsed.catalogHeader);
        if (Array.isArray(parsed.teamMembers)) setTeamMembers(parsed.teamMembers);
        if (Array.isArray(parsed.clientList)) setClientList(parsed.clientList);
        if (Array.isArray(parsed.awardList)) setAwardList(parsed.awardList);
        if (Array.isArray(parsed.testimonialList)) setTestimonialList(parsed.testimonialList);
        if (Array.isArray(parsed.faqList)) setFaqList(parsed.faqList);
        if (Array.isArray(parsed.beforeAfterList)) setBeforeAfterList(parsed.beforeAfterList);
        if (Array.isArray(parsed.panorama360List)) setPanorama360List(parsed.panorama360List);
        if (Array.isArray(parsed.processSteps)) setProcessSteps(parsed.processSteps);
        if (Array.isArray(parsed.questionnaireQuestions)) setQuestionnaireQuestions(parsed.questionnaireQuestions);
        if (Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
        if (Array.isArray(parsed.customSections)) setCustomSections(parsed.customSections);
        if (parsed.sectionVisibility) setSectionVisibility({ ...INITIAL_SECTION_VISIBILITY, ...parsed.sectionVisibility });
        if (parsed.themeSettings) setThemeSettings({ ...INITIAL_THEME_SETTINGS, ...parsed.themeSettings });
        if (parsed.seoSettings) setSeoSettings({ ...INITIAL_SEO_SETTINGS, ...parsed.seoSettings });
        if (Array.isArray(parsed.socialLinks)) setSocialLinks(parsed.socialLinks);
        if (parsed.footerSettings) setFooterSettings({ ...INITIAL_FOOTER_SETTINGS, ...parsed.footerSettings });
        if (parsed.legalPages) setLegalPages({ ...INITIAL_LEGAL, ...parsed.legalPages });
      }
    } catch (e) {
      console.error('Failed to load studio state from localStorage', e);
    }

    // Trigger initial background sync with Supabase
    syncWithSupabase();
  }, []);

  // Save state helper
  const saveState = (updatedState: Partial<StudioState>) => {
    try {
      const currentState = {
        logoUrl,
        heroImageUrl,
        studioName,
        heroTitle,
        heroSubtitle,
        heroTagline,
        heroSettings,
        navMenuItems,
        projects,
        categories,
        galleryItems,
        philosophyBlocks,
        servicesList,
        journalArticles,
        contactDetails,
        showcaseHeader,
        catalogHeader,
        teamMembers,
        clientList,
        awardList,
        testimonialList,
        faqList,
        beforeAfterList,
        panorama360List,
        processSteps,
        questionnaireQuestions,
        inquiries,
        customSections,
        sectionVisibility,
        themeSettings,
        seoSettings,
        socialLinks,
        footerSettings,
        legalPages,
        activeAdminTab,
        ...updatedState
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  };

  // Supabase Data Fetching & Syncing
  const syncWithSupabase = async () => {
    setSupabaseSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    try {
      const connection = await checkSupabaseConnection();
      if (!connection.isConnected) {
        setSupabaseSyncStatus(prev => ({
          ...prev,
          isConnected: false,
          isSyncing: false,
          error: connection.error || 'Could not connect to Supabase'
        }));
        return;
      }

      const cmsData = await fetchCmsDataFromSupabase();

      if (cmsData.projects && cmsData.projects.length > 0) {
        setProjects(cmsData.projects);
      }
      if (cmsData.categories && cmsData.categories.length > 0) {
        setCategories(cmsData.categories);
      }
      if (cmsData.services && cmsData.services.length > 0) {
        setServicesList(cmsData.services);
      }
      if (cmsData.team && cmsData.team.length > 0) {
        setTeamMembers(cmsData.team);
      }
      if (cmsData.gallery && cmsData.gallery.length > 0) {
        setGalleryItems(cmsData.gallery);
      }
      if (cmsData.journal && cmsData.journal.length > 0) {
        setJournalArticles(cmsData.journal);
      }

      // Merge site content
      if (cmsData.siteContent) {
        if (cmsData.siteContent.heroSettings) setHeroSettings(cmsData.siteContent.heroSettings);
        if (cmsData.siteContent.heroTitle) setHeroTitle(cmsData.siteContent.heroTitle);
        if (cmsData.siteContent.heroSubtitle) setHeroSubtitle(cmsData.siteContent.heroSubtitle);
        if (cmsData.siteContent.heroTagline) setHeroTagline(cmsData.siteContent.heroTagline);
        if (cmsData.siteContent.logoUrl) setLogoUrl(cmsData.siteContent.logoUrl);
        if (cmsData.siteContent.heroImageUrl) setHeroImageUrl(cmsData.siteContent.heroImageUrl);
        if (cmsData.siteContent.contactDetails) setContactDetails(cmsData.siteContent.contactDetails);
        if (cmsData.siteContent.showcaseHeader) setShowcaseHeader(cmsData.siteContent.showcaseHeader);
        if (cmsData.siteContent.catalogHeader) setCatalogHeader(cmsData.siteContent.catalogHeader);
      }

      setSupabaseSyncStatus({
        isConnected: true,
        isSyncing: false,
        lastSync: new Date().toLocaleTimeString(),
        error: null,
        tables: {
          projects: cmsData.projects?.length || 0,
          categories: cmsData.categories?.length || 0,
          services: cmsData.services?.length || 0,
          team: cmsData.team?.length || 0,
          gallery: cmsData.gallery?.length || 0,
          site_content: cmsData.siteContent ? Object.keys(cmsData.siteContent).length : 0,
          journal: cmsData.journal?.length || 0
        }
      });
    } catch (err: any) {
      console.warn('Supabase sync notice:', err.message);
      setSupabaseSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        error: err.message || 'Error during database sync'
      }));
    }
  };

  const pushAllToSupabase = async (): Promise<{ success: boolean; errors: string[] }> => {
    setSupabaseSyncStatus(prev => ({ ...prev, isSyncing: true, error: null }));
    const result = await seedAllDataToSupabase({
      projects,
      categories,
      services: servicesList,
      team: teamMembers,
      gallery: galleryItems,
      journal: journalArticles,
      siteContent: {
        heroSettings,
        heroTitle,
        heroSubtitle,
        heroTagline,
        logoUrl,
        heroImageUrl,
        contactDetails,
        showcaseHeader,
        catalogHeader
      }
    });

    await syncWithSupabase();
    return result;
  };

  const uploadImageToStorage = async (
    file: File,
    folder: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads' = 'uploads'
  ): Promise<{ url: string; path: string; error: string | null }> => {
    try {
      const storageResult = await uploadImageToSupabaseStorage(file, folder);
      if (storageResult.url && !storageResult.error) {
        return storageResult;
      }
      const dataUrl = await uploadFileAsDataUrl(file);
      return {
        url: dataUrl,
        path: `local/${file.name}`,
        error: storageResult.error
      };
    } catch {
      const dataUrl = await uploadFileAsDataUrl(file);
      return {
        url: dataUrl,
        path: `local/${file.name}`,
        error: null
      };
    }
  };

  // Admin Auth Helpers - Strict Supabase Authentication Only
  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error: string | null }> => {
    setAdminAuthError(null);
    const trimmedEmail = email?.trim() || '';

    if (!trimmedEmail || !password) {
      const err = 'Both email and password are required for Supabase authentication.';
      setAdminAuthError(err);
      return { success: false, error: err };
    }

    if (!isSupabaseConfigured) {
      const err = 'Supabase credentials are not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to log in.';
      setAdminAuthError(err);
      return { success: false, error: err };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: password
      });

      if (error) {
        setAdminAuthError(error.message);
        return { success: false, error: error.message };
      }

      if (data?.session?.user) {
        setAdminUser({
          id: data.session.user.id,
          email: data.session.user.email,
          role: data.session.user.role,
          lastSignInAt: data.session.user.last_sign_in_at
        });
        setIsAdminAuthenticated(true);
        setIsAdminMode(true);
        setAdminAuthError(null);
        return { success: true, error: null };
      }

      const err = 'Unable to establish an authenticated Supabase session.';
      setAdminAuthError(err);
      return { success: false, error: err };
    } catch (err: any) {
      const message = err.message || 'Supabase authentication failed';
      setAdminAuthError(message);
      return { success: false, error: message };
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    } finally {
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      setIsAdminMode(false);
      setIsCmsOpen(false);
      setAdminAuthError(null);
      try {
        localStorage.removeItem('nilo_admin_auth');
        sessionStorage.removeItem('nilo_admin_auth');
      } catch {}
    }
  };

  const uploadFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read image file'));
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const updateLogo = (newUrl: string) => {
    setLogoUrl(newUrl);
    saveState({ logoUrl: newUrl });
    saveSiteContentToSupabase('logoUrl', newUrl).catch(() => {});
  };

  const updateHeroImage = (newUrl: string) => {
    setHeroImageUrl(newUrl);
    setHeroSettings((prev) => ({ ...prev, heroImage: newUrl }));
    saveState({ heroImageUrl: newUrl, heroSettings: { ...heroSettings, heroImage: newUrl } });
    saveSiteContentToSupabase('heroImageUrl', newUrl).catch(() => {});
  };

  const updateHeroContent = (title: string, subtitle: string, tagline: string) => {
    setHeroTitle(title);
    setHeroSubtitle(subtitle);
    setHeroTagline(tagline);
    const updated = { ...heroSettings, title, subtitle, tagline };
    setHeroSettings(updated);
    saveState({ heroTitle: title, heroSubtitle: subtitle, heroTagline: tagline, heroSettings: updated });
    saveSiteContentToSupabase('heroSettings', updated).catch(() => {});
  };

  const updateHeroSettings = (settings: HeroSettings) => {
    setHeroSettings(settings);
    setHeroTitle(settings.title);
    setHeroSubtitle(settings.subtitle);
    setHeroTagline(settings.tagline);
    setHeroImageUrl(settings.heroImage);
    saveState({
      heroSettings: settings,
      heroTitle: settings.title,
      heroSubtitle: settings.subtitle,
      heroTagline: settings.tagline,
      heroImageUrl: settings.heroImage
    });
    saveSiteContentToSupabase('heroSettings', settings).catch(() => {});
  };

  const updateNavMenuItems = (items: NavMenuItem[]) => {
    setNavMenuItems(items);
    saveState({ navMenuItems: items });
  };

  const updateProjectImage = (projectId: string, newUrl: string) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const item = {
          ...p,
          heroImage: newUrl,
          previewImage: newUrl,
          galleryImages: p.galleryImages.length > 0 ? [newUrl, ...p.galleryImages.slice(1)] : [newUrl]
        };
        upsertProjectToSupabase(item).catch(() => {});
        return item;
      }
      return p;
    });
    setProjects(updated);
    saveState({ projects: updated });
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    saveState({ projects: updated });
    upsertProjectToSupabase(project).catch(() => {});
  };

  const updateProject = (updatedProject: Project) => {
    const updated = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(updated);
    saveState({ projects: updated });
    upsertProjectToSupabase(updatedProject).catch(() => {});
  };

  const deleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    saveState({ projects: updated });
    deleteProjectFromSupabase(projectId).catch(() => {});
  };

  const moveProject = (id: string, direction: 'left' | 'right') => {
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);

    setProjects(updated);
    saveState({ projects: updated });
  };

  // Categories CRUD
  const addCategory = (category: CategoryItem) => {
    const updated = [...categories, category];
    setCategories(updated);
    saveState({ categories: updated });
    upsertCategoryToSupabase(category).catch(() => {});
  };

  const updateCategory = (category: CategoryItem) => {
    const updated = categories.map((c) => (c.id === category.id ? category : c));
    setCategories(updated);
    saveState({ categories: updated });
    upsertCategoryToSupabase(category).catch(() => {});
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveState({ categories: updated });
    deleteCategoryFromSupabase(id).catch(() => {});
  };

  const reorderCategories = (newOrder: CategoryItem[]) => {
    setCategories(newOrder);
    saveState({ categories: newOrder });
  };

  // Gallery CRUD
  const addGalleryItem = (item: GalleryItem) => {
    const updated = [item, ...galleryItems];
    setGalleryItems(updated);
    saveState({ galleryItems: updated });
    upsertGalleryItemToSupabase(item).catch(() => {});
  };

  const updateGalleryItem = (item: GalleryItem) => {
    const updated = galleryItems.map((g) => (g.id === item.id ? item : g));
    setGalleryItems(updated);
    saveState({ galleryItems: updated });
    upsertGalleryItemToSupabase(item).catch(() => {});
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((g) => g.id !== id);
    setGalleryItems(updated);
    saveState({ galleryItems: updated });
    deleteGalleryItemFromSupabase(id).catch(() => {});
  };

  const moveGalleryItemCategory = (id: string, newCategory: string) => {
    const updated = galleryItems.map((g) => {
      if (g.id === id) {
        const modified = { ...g, category: newCategory };
        upsertGalleryItemToSupabase(modified).catch(() => {});
        return modified;
      }
      return g;
    });
    setGalleryItems(updated);
    saveState({ galleryItems: updated });
  };

  const reorderGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    saveState({ galleryItems: items });
  };

  // Philosophy CRUD
  const addPhilosophyBlock = (block: PhilosophyBlock) => {
    const updated = [...philosophyBlocks, block];
    setPhilosophyBlocks(updated);
    saveState({ philosophyBlocks: updated });
  };

  const updatePhilosophyBlock = (block: PhilosophyBlock) => {
    const updated = philosophyBlocks.map((b) => (b.id === block.id ? block : b));
    setPhilosophyBlocks(updated);
    saveState({ philosophyBlocks: updated });
  };

  const deletePhilosophyBlock = (id: string) => {
    const updated = philosophyBlocks.filter((b) => b.id !== id);
    setPhilosophyBlocks(updated);
    saveState({ philosophyBlocks: updated });
  };

  // Services CRUD
  const addServiceItem = (service: ServiceItem) => {
    const updated = [...servicesList, service];
    setServicesList(updated);
    saveState({ servicesList: updated });
    upsertServiceToSupabase(service).catch(() => {});
  };

  const updateServiceItem = (service: ServiceItem) => {
    const updated = servicesList.map((s) => (s.id === service.id ? service : s));
    setServicesList(updated);
    saveState({ servicesList: updated });
    upsertServiceToSupabase(service).catch(() => {});
  };

  const deleteServiceItem = (id: string) => {
    const updated = servicesList.filter((s) => s.id !== id);
    setServicesList(updated);
    saveState({ servicesList: updated });
    deleteServiceFromSupabase(id).catch(() => {});
  };

  // Journal CRUD
  const addJournalArticle = (article: JournalArticle) => {
    const updated = [article, ...journalArticles];
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
    upsertJournalArticleToSupabase(article).catch(() => {});
  };

  const updateJournalArticle = (article: JournalArticle) => {
    const updated = journalArticles.map((a) => (a.id === article.id ? article : a));
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
    upsertJournalArticleToSupabase(article).catch(() => {});
  };

  const deleteJournalArticle = (id: string) => {
    const updated = journalArticles.filter((a) => a.id !== id);
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
    deleteJournalArticleFromSupabase(id).catch(() => {});
  };

  // Contact CRUD
  const updateContactDetails = (details: ContactDetails) => {
    setContactDetails(details);
    saveState({ contactDetails: details });
    saveSiteContentToSupabase('contactDetails', details).catch(() => {});
  };

  // Header CRUD
  const updateShowcaseHeader = (title: string, subtitle: string) => {
    const newHeader = { title, subtitle };
    setShowcaseHeader(newHeader);
    saveState({ showcaseHeader: newHeader });
    saveSiteContentToSupabase('showcaseHeader', newHeader).catch(() => {});
  };

  const updateCatalogHeader = (title: string, subtitle: string) => {
    const newHeader = { title, subtitle };
    setCatalogHeader(newHeader);
    saveState({ catalogHeader: newHeader });
    saveSiteContentToSupabase('catalogHeader', newHeader).catch(() => {});
  };

  // Team
  const addTeamMember = (member: TeamMember) => {
    const updated = [...teamMembers, member];
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
    upsertTeamMemberToSupabase(member).catch(() => {});
  };
  const updateTeamMember = (member: TeamMember) => {
    const updated = teamMembers.map((m) => (m.id === member.id ? member : m));
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
    upsertTeamMemberToSupabase(member).catch(() => {});
  };
  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
    deleteTeamMemberFromSupabase(id).catch(() => {});
  };

  // Clients
  const addClientItem = (item: ClientItem) => {
    const updated = [...clientList, item];
    setClientList(updated);
    saveState({ clientList: updated });
  };
  const updateClientItem = (item: ClientItem) => {
    const updated = clientList.map((c) => (c.id === item.id ? item : c));
    setClientList(updated);
    saveState({ clientList: updated });
  };
  const deleteClientItem = (id: string) => {
    const updated = clientList.filter((c) => c.id !== id);
    setClientList(updated);
    saveState({ clientList: updated });
  };

  // Awards
  const addAwardItem = (award: AwardItem) => {
    const updated = [...awardList, award];
    setAwardList(updated);
    saveState({ awardList: updated });
  };
  const updateAwardItem = (award: AwardItem) => {
    const updated = awardList.map((a) => (a.id === award.id ? award : a));
    setAwardList(updated);
    saveState({ awardList: updated });
  };
  const deleteAwardItem = (id: string) => {
    const updated = awardList.filter((a) => a.id !== id);
    setAwardList(updated);
    saveState({ awardList: updated });
  };

  // Testimonials
  const addTestimonialItem = (item: TestimonialItem) => {
    const updated = [...testimonialList, item];
    setTestimonialList(updated);
    saveState({ testimonialList: updated });
  };
  const updateTestimonialItem = (item: TestimonialItem) => {
    const updated = testimonialList.map((t) => (t.id === item.id ? item : t));
    setTestimonialList(updated);
    saveState({ testimonialList: updated });
  };
  const deleteTestimonialItem = (id: string) => {
    const updated = testimonialList.filter((t) => t.id !== id);
    setTestimonialList(updated);
    saveState({ testimonialList: updated });
  };

  // FAQ
  const addFaqItem = (item: FaqItem) => {
    const updated = [...faqList, item];
    setFaqList(updated);
    saveState({ faqList: updated });
  };
  const updateFaqItem = (item: FaqItem) => {
    const updated = faqList.map((f) => (f.id === item.id ? item : f));
    setFaqList(updated);
    saveState({ faqList: updated });
  };
  const deleteFaqItem = (id: string) => {
    const updated = faqList.filter((f) => f.id !== id);
    setFaqList(updated);
    saveState({ faqList: updated });
  };

  // Interactive Features
  const addBeforeAfterPair = (pair: BeforeAfterPair) => {
    const updated = [...beforeAfterList, pair];
    setBeforeAfterList(updated);
    saveState({ beforeAfterList: updated });
  };
  const updateBeforeAfterPair = (pair: BeforeAfterPair) => {
    const updated = beforeAfterList.map((p) => (p.id === pair.id ? pair : p));
    setBeforeAfterList(updated);
    saveState({ beforeAfterList: updated });
  };
  const deleteBeforeAfterPair = (id: string) => {
    const updated = beforeAfterList.filter((p) => p.id !== id);
    setBeforeAfterList(updated);
    saveState({ beforeAfterList: updated });
  };

  const addPanorama360Item = (item: Panorama360Item) => {
    const updated = [...panorama360List, item];
    setPanorama360List(updated);
    saveState({ panorama360List: updated });
  };
  const updatePanorama360Item = (item: Panorama360Item) => {
    const updated = panorama360List.map((p) => (p.id === item.id ? item : p));
    setPanorama360List(updated);
    saveState({ panorama360List: updated });
  };
  const deletePanorama360Item = (id: string) => {
    const updated = panorama360List.filter((p) => p.id !== id);
    setPanorama360List(updated);
    saveState({ panorama360List: updated });
  };

  const addProcessStep = (step: ProcessStep) => {
    const updated = [...processSteps, step];
    setProcessSteps(updated);
    saveState({ processSteps: updated });
  };
  const updateProcessStep = (step: ProcessStep) => {
    const updated = processSteps.map((s) => (s.id === step.id ? step : s));
    setProcessSteps(updated);
    saveState({ processSteps: updated });
  };
  const deleteProcessStep = (id: string) => {
    const updated = processSteps.filter((s) => s.id !== id);
    setProcessSteps(updated);
    saveState({ processSteps: updated });
  };

  // Questionnaire & Inquiries
  const updateQuestionnaireQuestions = (questions: QuestionnaireQuestion[]) => {
    setQuestionnaireQuestions(questions);
    saveState({ questionnaireQuestions: questions });
  };

  const addInquirySubmission = (inquiryData: Omit<InquirySubmission, 'id' | 'date' | 'status'>) => {
    const newInquiry: InquirySubmission = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveState({ inquiries: updated });
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'read' | 'archived') => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(updated);
    saveState({ inquiries: updated });
  };

  const deleteInquirySubmission = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    saveState({ inquiries: updated });
  };

  // Custom Sections
  const addCustomSection = (sec: CustomSection) => {
    const updated = [...customSections, sec];
    setCustomSections(updated);
    saveState({ customSections: updated });
  };

  const updateCustomSection = (sec: CustomSection) => {
    const updated = customSections.map((s) => (s.id === sec.id ? sec : s));
    setCustomSections(updated);
    saveState({ customSections: updated });
  };

  const deleteCustomSection = (id: string) => {
    const updated = customSections.filter((s) => s.id !== id);
    setCustomSections(updated);
    saveState({ customSections: updated });
  };

  // Settings
  const updateSectionVisibility = (vis: SectionVisibility) => {
    setSectionVisibility(vis);
    saveState({ sectionVisibility: vis });
  };

  const updateThemeSettings = (theme: ThemeSettings) => {
    setThemeSettings(theme);
    saveState({ themeSettings: theme });
  };

  const setProjectAnimationPreset = (preset: ProjectAnimationPreset) => {
    const updatedTheme: ThemeSettings = {
      ...themeSettings,
      projectAnimationPreset: preset
    };
    setThemeSettings(updatedTheme);
    saveState({ themeSettings: updatedTheme });
  };

  const updateSeoSettings = (seo: SeoSettings) => {
    setSeoSettings(seo);
    saveState({ seoSettings: seo });
  };

  const updateSocialLinks = (links: SocialLink[]) => {
    setSocialLinks(links);
    saveState({ socialLinks: links });
  };

  const updateFooterSettings = (footer: FooterSettings) => {
    setFooterSettings(footer);
    saveState({ footerSettings: footer });
  };

  const updateLegalPages = (legal: LegalContent) => {
    setLegalPages(legal);
    saveState({ legalPages: legal });
  };

  // Backup & Import
  const exportBackupJSON = (): string => {
    const stateObj = {
      logoUrl,
      heroImageUrl,
      studioName,
      heroTitle,
      heroSubtitle,
      heroTagline,
      heroSettings,
      navMenuItems,
      projects,
      philosophyBlocks,
      servicesList,
      journalArticles,
      contactDetails,
      showcaseHeader,
      catalogHeader,
      teamMembers,
      clientList,
      awardList,
      testimonialList,
      faqList,
      beforeAfterList,
      panorama360List,
      processSteps,
      questionnaireQuestions,
      inquiries,
      customSections,
      sectionVisibility,
      themeSettings,
      seoSettings,
      socialLinks,
      footerSettings,
      legalPages
    };
    return JSON.stringify(stateObj, null, 2);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
      if (parsed.heroImageUrl) setHeroImageUrl(parsed.heroImageUrl);
      if (parsed.heroTitle) setHeroTitle(parsed.heroTitle);
      if (parsed.heroSubtitle) setHeroSubtitle(parsed.heroSubtitle);
      if (parsed.heroTagline) setHeroTagline(parsed.heroTagline);
      if (parsed.heroSettings) setHeroSettings(parsed.heroSettings);
      if (Array.isArray(parsed.navMenuItems)) setNavMenuItems(parsed.navMenuItems);
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.categories)) setCategories(parsed.categories);
      if (Array.isArray(parsed.galleryItems)) setGalleryItems(parsed.galleryItems);
      if (Array.isArray(parsed.philosophyBlocks)) setPhilosophyBlocks(parsed.philosophyBlocks);
      if (Array.isArray(parsed.servicesList)) setServicesList(parsed.servicesList);
      if (Array.isArray(parsed.journalArticles)) setJournalArticles(parsed.journalArticles);
      if (parsed.contactDetails) setContactDetails(parsed.contactDetails);
      if (parsed.showcaseHeader) setShowcaseHeader(parsed.showcaseHeader);
      if (parsed.catalogHeader) setCatalogHeader(parsed.catalogHeader);
      if (Array.isArray(parsed.teamMembers)) setTeamMembers(parsed.teamMembers);
      if (Array.isArray(parsed.clientList)) setClientList(parsed.clientList);
      if (Array.isArray(parsed.awardList)) setAwardList(parsed.awardList);
      if (Array.isArray(parsed.testimonialList)) setTestimonialList(parsed.testimonialList);
      if (Array.isArray(parsed.faqList)) setFaqList(parsed.faqList);
      if (Array.isArray(parsed.beforeAfterList)) setBeforeAfterList(parsed.beforeAfterList);
      if (Array.isArray(parsed.panorama360List)) setPanorama360List(parsed.panorama360List);
      if (Array.isArray(parsed.processSteps)) setProcessSteps(parsed.processSteps);
      if (Array.isArray(parsed.questionnaireQuestions)) setQuestionnaireQuestions(parsed.questionnaireQuestions);
      if (Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
      if (Array.isArray(parsed.customSections)) setCustomSections(parsed.customSections);
      if (parsed.sectionVisibility) setSectionVisibility(parsed.sectionVisibility);
      if (parsed.themeSettings) setThemeSettings(parsed.themeSettings);
      if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      if (Array.isArray(parsed.socialLinks)) setSocialLinks(parsed.socialLinks);
      if (parsed.footerSettings) setFooterSettings(parsed.footerSettings);
      if (parsed.legalPages) setLegalPages(parsed.legalPages);

      localStorage.setItem(STORAGE_KEY, jsonStr);
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setDriveSyncStatus('Connecting to Google Drive...');
      setDriveSyncError(null);
      const res = await googleSignIn();
      if (res?.user) {
        setCurrentUser(res.user);
        setDriveSyncStatus(`Connected as ${res.user.email || 'Google User'}. Scanning folder...`);
        await syncGoogleDriveFolder(driveFolderId);
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setDriveSyncError(err.message || 'Failed to sign in with Google');
      setDriveSyncStatus(null);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await authLogout();
      setCurrentUser(null);
      setDriveSyncStatus('Disconnected from Google Drive.');
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  const syncGoogleDriveFolder = async (folderId?: string): Promise<boolean> => {
    const targetFolder = folderId || driveFolderId || DEFAULT_DRIVE_FOLDER_ID;
    setIsSyncingDrive(true);
    setDriveSyncStatus(`Scanning Google Drive folder ${targetFolder}...`);
    setDriveSyncError(null);

    try {
      const files = await fetchDriveFolderFiles(targetFolder);
      setDriveFiles(files);
      if (files.length > 0) {
        setDriveSyncStatus(`Found ${files.length} photos in Google Drive folder.`);
        // Automatically apply files to portfolio images
        applyDriveFilesToStudio(files);
      } else {
        setDriveSyncStatus('Folder scanned, but no image files were detected.');
      }
      return true;
    } catch (err: any) {
      console.error('Error syncing Drive folder:', err);
      setDriveSyncError(err.message || 'Could not fetch files from Google Drive. Please ensure you are signed in and the folder permissions allow access.');
      setDriveSyncStatus(null);
      return false;
    } finally {
      setIsSyncingDrive(false);
    }
  };

  const applyDriveFilesToStudio = (files: DriveFolderFile[]) => {
    if (!files || files.length === 0) return;

    // Smart file categorization
    let detectedLogo = files.find(f => /logo|emblem|brand|icon/i.test(f.name))?.directUrl;
    let detectedHero = files.find(f => /hero|tower|main|cover|facade/i.test(f.name))?.directUrl;

    if (!detectedLogo) {
      detectedLogo = files[0].directUrl;
    }
    if (!detectedHero) {
      detectedHero = files[1]?.directUrl || files[0].directUrl;
    }

    // 1. Update logo & hero
    setLogoUrl(detectedLogo);
    setHeroImageUrl(detectedHero);
    setHeroSettings(prev => ({ ...prev, heroImage: detectedHero }));

    // 2. Update projects with drive images
    setProjects(prevProjects => {
      return prevProjects.map((proj, idx) => {
        const primaryFile = files[(idx + 1) % files.length];
        const secondaryFile = files[(idx + 2) % files.length];
        const floorPlanFile = files[(idx + 3) % files.length];
        const galleryUrls = files.slice(0, Math.min(files.length, 6)).map(f => f.directUrl);

        return {
          ...proj,
          heroImage: primaryFile.directUrl,
          previewImage: secondaryFile ? secondaryFile.directUrl : primaryFile.directUrl,
          floorPlan: proj.floorPlan ? {
            ...proj.floorPlan,
            image: floorPlanFile ? floorPlanFile.directUrl : proj.floorPlan.image
          } : undefined,
          galleryImages: galleryUrls.length > 0 ? galleryUrls : proj.galleryImages
        };
      });
    });

    // 3. Update Philosophy Blocks
    setPhilosophyBlocks(prev => prev.map((block, i) => {
      const file = files[(i + 2) % files.length];
      return {
        ...block,
        image: file ? file.directUrl : block.image
      };
    }));

    // 4. Update Services
    setServicesList(prev => prev.map((srv, i) => {
      const file = files[(i + 3) % files.length];
      return {
        ...srv,
        image: file ? file.directUrl : srv.image
      };
    }));

    // 5. Update Journal Articles
    setJournalArticles(prev => prev.map((art, i) => {
      const file = files[(i + 4) % files.length];
      return {
        ...art,
        image: file ? file.directUrl : art.image
      };
    }));

    // 6. Update Before/After
    setBeforeAfterList(prev => prev.map((item, i) => {
      const beforeFile = files[(i * 2) % files.length];
      const afterFile = files[(i * 2 + 1) % files.length];
      return {
        ...item,
        beforeImage: beforeFile ? beforeFile.directUrl : item.beforeImage,
        afterImage: afterFile ? afterFile.directUrl : item.afterImage
      };
    }));

    setDriveSyncStatus(`Successfully replaced all portfolio imagery with ${files.length} photos from Google Drive!`);
  };

  const resetToDefaults = () => {
    setLogoUrl(DEFAULT_LOGO_URL);
    setHeroImageUrl(DEFAULT_HERO_IMAGE_URL);
    setHeroTitle('ROOTED HERE. DESIGNED BEYOND.');
    setHeroSubtitle('LUXURY HABITATION & CONTEMPORARY SPATIAL SANCTUARY');
    setHeroTagline('CONTEMPORARY ARCHITECTURE & DESIGN ATELIER');
    setHeroSettings(INITIAL_HERO_SETTINGS);
    setNavMenuItems(INITIAL_NAV_MENU);
    setProjects(INITIAL_PROJECTS);
    setCategories(INITIAL_CATEGORIES);
    setGalleryItems(INITIAL_GALLERY_ITEMS);
    setPhilosophyBlocks(INITIAL_PHILOSOPHY_BLOCKS);
    setServicesList(INITIAL_SERVICES);
    setJournalArticles(INITIAL_JOURNAL_ARTICLES);
    setContactDetails(INITIAL_CONTACT_DETAILS);
    setShowcaseHeader({
      title: 'FEATURED ARCHITECTURAL AND DESIGN WORKS',
      subtitle: '01 — DISCIPLINARY PORTFOLIO & SPATIAL CREATIVE COMMISSIONS'
    });
    setCatalogHeader({
      title: 'COMPLETE PORTFOLIO INDEX',
      subtitle: 'EDITORIAL CATALOG & ARCHITECTURAL INDEX'
    });
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setClientList(INITIAL_CLIENTS);
    setAwardList(INITIAL_AWARDS);
    setTestimonialList(INITIAL_TESTIMONIALS);
    setFaqList(INITIAL_FAQS);
    setBeforeAfterList(INITIAL_BEFORE_AFTER);
    setPanorama360List(INITIAL_PANORAMA360);
    setProcessSteps(INITIAL_PROCESS_STEPS);
    setQuestionnaireQuestions(INITIAL_QUESTIONNAIRE);
    setInquiries(INITIAL_INQUIRIES);
    setCustomSections([]);
    setSectionVisibility(INITIAL_SECTION_VISIBILITY);
    setThemeSettings(INITIAL_THEME_SETTINGS);
    setSeoSettings(INITIAL_SEO_SETTINGS);
    setSocialLinks(INITIAL_SOCIAL_LINKS);
    setFooterSettings(INITIAL_FOOTER_SETTINGS);
    setLegalPages(INITIAL_LEGAL);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StudioContext.Provider
      value={{
        logoUrl,
        heroImageUrl,
        studioName,
        heroTitle,
        heroSubtitle,
        heroTagline,
        heroSettings,
        navMenuItems,
        projects,
        categories,
        galleryItems,
        philosophyBlocks,
        servicesList,
        journalArticles,
        contactDetails,
        showcaseHeader,
        catalogHeader,
        teamMembers,
        clientList,
        awardList,
        testimonialList,
        faqList,
        beforeAfterList,
        panorama360List,
        processSteps,
        questionnaireQuestions,
        inquiries,
        customSections,
        sectionVisibility,
        themeSettings,
        seoSettings,
        socialLinks,
        footerSettings,
        legalPages,
        isAdminMode,
        isCmsOpen,
        adminUser,
        isAdminAuthenticated,
        isCheckingAuth,
        adminAuthError,
        isAdminLoginModalOpen,
        isDirectAdminRoute,
        activeAdminTab,
        supabaseSyncStatus,
        setIsAdminMode,
        setIsCmsOpen,
        setIsAdminLoginModalOpen,
        setIsDirectAdminRoute,
        setActiveAdminTab,
        loginAdmin,
        logoutAdmin,
        updateLogo,
        updateHeroImage,
        updateHeroContent,
        updateHeroSettings,
        updateNavMenuItems,
        updateProjectImage,
        addProject,
        updateProject,
        deleteProject,
        moveProject,
        addCategory,
        updateCategory,
        deleteCategory,
        reorderCategories,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        moveGalleryItemCategory,
        reorderGalleryItems,
        addPhilosophyBlock,
        updatePhilosophyBlock,
        deletePhilosophyBlock,
        addServiceItem,
        updateServiceItem,
        deleteServiceItem,
        addJournalArticle,
        updateJournalArticle,
        deleteJournalArticle,
        updateContactDetails,
        updateShowcaseHeader,
        updateCatalogHeader,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addClientItem,
        updateClientItem,
        deleteClientItem,
        addAwardItem,
        updateAwardItem,
        deleteAwardItem,
        addTestimonialItem,
        updateTestimonialItem,
        deleteTestimonialItem,
        addFaqItem,
        updateFaqItem,
        deleteFaqItem,
        addBeforeAfterPair,
        updateBeforeAfterPair,
        deleteBeforeAfterPair,
        addPanorama360Item,
        updatePanorama360Item,
        deletePanorama360Item,
        addProcessStep,
        updateProcessStep,
        deleteProcessStep,
        updateQuestionnaireQuestions,
        addInquirySubmission,
        updateInquiryStatus,
        deleteInquirySubmission,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        updateSectionVisibility,
        updateThemeSettings,
        projectAnimationPreset: themeSettings.projectAnimationPreset || 'framer-slide-fade',
        setProjectAnimationPreset,
        updateSeoSettings,
        updateSocialLinks,
        updateFooterSettings,
        updateLegalPages,
        exportBackupJSON,
        importBackupJSON,
        resetToDefaults,
        uploadFileAsDataUrl,
        uploadImageToStorage,
        syncWithSupabase,
        pushAllToSupabase,

        // Google Drive Synchronization & OAuth
        driveFolderId,
        setDriveFolderId,
        driveFiles,
        isSyncingDrive,
        driveSyncStatus,
        driveSyncError,
        currentUser,
        isDriveConnected: !!currentUser,
        isGoogleDriveModalOpen,
        setIsGoogleDriveModalOpen,
        handleGoogleSignIn,
        handleGoogleSignOut,
        syncGoogleDriveFolder,
        applyDriveFilesToStudio
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};

