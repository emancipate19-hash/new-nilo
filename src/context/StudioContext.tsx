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
  SeoSettings,
  SocialLink,
  FooterSettings,
  LegalContent
} from '../types';
import { PROJECTS as INITIAL_PROJECTS, JOURNAL_ARTICLES as INITIAL_JOURNAL_ARTICLES } from '../data/projects';
import {
  DEFAULT_LOGO_URL,
  DEFAULT_HERO_IMAGE_URL,
  DEFAULT_UPLOADED_ASSETS,
  DEFAULT_UPLOADED_PICTURES
} from '../assets/images/defaultAssets';

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
  heading: 'COMMISSION NILO AXIS STUDIO',
  description: 'We accept a limited number of high-end residential, commercial, and landscape architecture commissions annually to ensure meticulous design rigor and structural craftsmanship.',
  address: 'AXIS PLAZA, BOLE DISTRICT, ADDIS ABABA, ETHIOPIA',
  email: 'COMMISSIONS@NILOAXIS.COM',
  phone: '+251 11 892 4000',
  workingHours: 'MON - FRI: 08:00 - 19:00 EAT',
  mapLatitude: 8.995,
  mapLongitude: 38.788,
  mapZoom: 14
};

export const INITIAL_HERO_SETTINGS: HeroSettings = {
  title: 'VERTICAL FOREST TOWER',
  subtitle: 'LUXURY HABITATION & COASTAL FOREST SANCTUARY',
  tagline: 'CONTEMPORARY ARCHITECTURE & DESIGN ATELIER',
  heroImage: DEFAULT_HERO_IMAGE_URL,
  heroVideoUrl: '',
  ctaPrimaryText: 'EXPLORE WORKS',
  ctaPrimaryLink: '#works-showcase',
  ctaSecondaryText: 'COMMISSION ATELIER',
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
    id: 'team-1',
    name: 'ELENA NILO',
    position: 'FOUNDING PRINCIPAL & DESIGN DIRECTOR',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Pritzker nominee specializing in extreme-topography high-rise structures and climate-responsive kinetic envelopes.',
    socialLinks: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
    isVisible: true
  },
  {
    id: 'team-2',
    name: 'MARCUS V. AXIS',
    position: 'PARTNER & HEAD OF STRUCTURAL INNOVATION',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in post-tensioned volcanic concrete, parametric geometry, and high-density carbon-negative systems.',
    socialLinks: { linkedin: 'https://linkedin.com', x: 'https://x.com' },
    isVisible: true
  },
  {
    id: 'team-3',
    name: 'SORAIA KANJ',
    position: 'DIRECTOR OF INTERIOR ARCHITECTURE & LIGHT',
    portrait: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Master of natural lighting choreography, bespoke monolithic timber joinery, and subterranean wellness sanctuaries.',
    socialLinks: { instagram: 'https://instagram.com' },
    isVisible: true
  }
];

export const INITIAL_CLIENTS: ClientItem[] = [
  { id: 'cli-1', name: 'AMAMAN SANCTUARIES', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80', description: 'Luxury Eco-Hospitality Group', isVisible: true },
  { id: 'cli-2', name: 'ALPINE RESIDENCES AG', logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=200&q=80', description: 'Swiss Mountain Cantilever Real Estate', isVisible: true },
  { id: 'cli-3', name: 'METROPOLIS CIVIC FOUNDATION', logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80', description: 'Public Art & Cultural Architecture Trust', isVisible: true }
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
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isVisible: true
  },
  {
    id: 'test-2',
    quote: 'Working with Elena & Marcus was a masterclass in architectural rigor. Their zero-cut landscape philosophy made our gallery a global beacon for sustainable luxury.',
    clientName: 'CLARA SANTIAGO',
    company: 'DIRECTOR, METROPOLIS CULTURAL TRUST',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
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
  accentColor: '#f59e0b'
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
}

interface StudioContextType extends StudioState {
  setIsAdminMode: (active: boolean) => void;
  setIsCmsOpen: (open: boolean) => void;
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
  updateSeoSettings: (seo: SeoSettings) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  updateFooterSettings: (footer: FooterSettings) => void;
  updateLegalPages: (legal: LegalContent) => void;

  // Backup & Import
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
  uploadFileAsDataUrl: (file: File) => Promise<string>;
}

const STORAGE_KEY = 'nilo_axis_studio_state_v8';

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO_URL);
  const [heroImageUrl, setHeroImageUrl] = useState<string>(DEFAULT_HERO_IMAGE_URL);
  const [studioName] = useState<string>('NILO AXIS STUDIO');
  const [heroTitle, setHeroTitle] = useState<string>('VERTICAL FOREST TOWER');
  const [heroSubtitle, setHeroSubtitle] = useState<string>('LUXURY HABITATION & COASTAL FOREST SANCTUARY');
  const [heroTagline, setHeroTagline] = useState<string>('CONTEMPORARY ARCHITECTURE & DESIGN ATELIER');
  
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(INITIAL_HERO_SETTINGS);
  const [navMenuItems, setNavMenuItems] = useState<NavMenuItem[]>(INITIAL_NAV_MENU);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [philosophyBlocks, setPhilosophyBlocks] = useState<PhilosophyBlock[]>(INITIAL_PHILOSOPHY_BLOCKS);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>(INITIAL_JOURNAL_ARTICLES);
  const [contactDetails, setContactDetails] = useState<ContactDetails>(INITIAL_CONTACT_DETAILS);
  const [showcaseHeader, setShowcaseHeader] = useState({
    title: 'FEATURED ARCHITECTURAL WORKS',
    subtitle: '01 — PORTFOLIO HIGHLIGHTS & CONCEPTUAL BUILDINGS'
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

  // Load persisted state on mount
  useEffect(() => {
    try {
      // Clear older version keys to ensure new default assets take effect immediately
      ['nilo_axis_studio_state', 'nilo_axis_studio_state_v2', 'nilo_axis_studio_state_v3', 'nilo_axis_studio_state_v4', 'nilo_axis_studio_state_v5', 'nilo_axis_studio_state_v6', 'nilo_axis_studio_state_v7'].forEach(key => {
        localStorage.removeItem(key);
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
        if (parsed.heroImageUrl) {
          // If cached image is old unsplash default, use updated DEFAULT_HERO_IMAGE_URL
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
        ...updatedState
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
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
  };

  const updateHeroImage = (newUrl: string) => {
    setHeroImageUrl(newUrl);
    setHeroSettings((prev) => ({ ...prev, heroImage: newUrl }));
    saveState({ heroImageUrl: newUrl, heroSettings: { ...heroSettings, heroImage: newUrl } });
  };

  const updateHeroContent = (title: string, subtitle: string, tagline: string) => {
    setHeroTitle(title);
    setHeroSubtitle(subtitle);
    setHeroTagline(tagline);
    const updated = { ...heroSettings, title, subtitle, tagline };
    setHeroSettings(updated);
    saveState({ heroTitle: title, heroSubtitle: subtitle, heroTagline: tagline, heroSettings: updated });
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
  };

  const updateNavMenuItems = (items: NavMenuItem[]) => {
    setNavMenuItems(items);
    saveState({ navMenuItems: items });
  };

  const updateProjectImage = (projectId: string, newUrl: string) => {
    const updated = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            heroImage: newUrl,
            previewImage: newUrl,
            galleryImages: p.galleryImages.length > 0 ? [newUrl, ...p.galleryImages.slice(1)] : [newUrl]
          }
        : p
    );
    setProjects(updated);
    saveState({ projects: updated });
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    setProjects(updated);
    saveState({ projects: updated });
  };

  const updateProject = (updatedProject: Project) => {
    const updated = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(updated);
    saveState({ projects: updated });
  };

  const deleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    saveState({ projects: updated });
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
  };

  const updateServiceItem = (service: ServiceItem) => {
    const updated = servicesList.map((s) => (s.id === service.id ? service : s));
    setServicesList(updated);
    saveState({ servicesList: updated });
  };

  const deleteServiceItem = (id: string) => {
    const updated = servicesList.filter((s) => s.id !== id);
    setServicesList(updated);
    saveState({ servicesList: updated });
  };

  // Journal CRUD
  const addJournalArticle = (article: JournalArticle) => {
    const updated = [article, ...journalArticles];
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
  };

  const updateJournalArticle = (article: JournalArticle) => {
    const updated = journalArticles.map((a) => (a.id === article.id ? article : a));
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
  };

  const deleteJournalArticle = (id: string) => {
    const updated = journalArticles.filter((a) => a.id !== id);
    setJournalArticles(updated);
    saveState({ journalArticles: updated });
  };

  // Contact CRUD
  const updateContactDetails = (details: ContactDetails) => {
    setContactDetails(details);
    saveState({ contactDetails: details });
  };

  // Header CRUD
  const updateShowcaseHeader = (title: string, subtitle: string) => {
    const newHeader = { title, subtitle };
    setShowcaseHeader(newHeader);
    saveState({ showcaseHeader: newHeader });
  };

  const updateCatalogHeader = (title: string, subtitle: string) => {
    const newHeader = { title, subtitle };
    setCatalogHeader(newHeader);
    saveState({ catalogHeader: newHeader });
  };

  // Team
  const addTeamMember = (member: TeamMember) => {
    const updated = [...teamMembers, member];
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
  };
  const updateTeamMember = (member: TeamMember) => {
    const updated = teamMembers.map((m) => (m.id === member.id ? member : m));
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
  };
  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    saveState({ teamMembers: updated });
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

  const resetToDefaults = () => {
    setLogoUrl(DEFAULT_LOGO_URL);
    setHeroImageUrl(DEFAULT_HERO_IMAGE_URL);
    setHeroTitle('VERTICAL FOREST TOWER');
    setHeroSubtitle('LUXURY HABITATION & COASTAL FOREST SANCTUARY');
    setHeroTagline('CONTEMPORARY ARCHITECTURE & DESIGN ATELIER');
    setHeroSettings(INITIAL_HERO_SETTINGS);
    setNavMenuItems(INITIAL_NAV_MENU);
    setProjects(INITIAL_PROJECTS);
    setPhilosophyBlocks(INITIAL_PHILOSOPHY_BLOCKS);
    setServicesList(INITIAL_SERVICES);
    setJournalArticles(INITIAL_JOURNAL_ARTICLES);
    setContactDetails(INITIAL_CONTACT_DETAILS);
    setShowcaseHeader({
      title: 'FEATURED ARCHITECTURAL WORKS',
      subtitle: '01 — PORTFOLIO HIGHLIGHTS & CONCEPTUAL BUILDINGS'
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
        setIsAdminMode,
        setIsCmsOpen,
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
        updateSeoSettings,
        updateSocialLinks,
        updateFooterSettings,
        updateLegalPages,
        exportBackupJSON,
        importBackupJSON,
        resetToDefaults,
        uploadFileAsDataUrl
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

