export type CursorMode =
  | 'default'
  | 'project'
  | 'image'
  | 'video'
  | 'drag'
  | 'link'
  | 'rotate'
  | 'explore'
  | 'floorplan'
  | 'hidden';

export interface CursorContextState {
  mode: CursorMode;
  text?: string;
  subtext?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export interface DrawingItem {
  id: string;
  title: string;
  image: string;
  type: 'plan' | 'section' | 'elevation' | 'detail' | 'diagram';
  description: string;
}

export interface Render3DItem {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  description: string;
}

export interface ProjectCustomField {
  id: string;
  key: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline?: string;
  surfaceArea?: string;
  client?: string;
  costBracket?: string;
  status?: string;
  location: string;
  year: string;
  category: string;
  heroImage: string;
  previewImage: string;
  galleryImages: string[];
  description: string;
  concept: string;
  specs: {
    area: string;
    structuralType: string;
    materials: string[];
    timeline: string;
    status: string; // 'Concept' | 'In Progress' | 'Under Construction' | 'Completed'
    climateStrategy: string;
    budget?: string;
    client?: string;
    architect?: string;
    designer?: string;
    consultant?: string;
    progressPercentage?: number; // 0 - 100
    completionDate?: string;
    interiorOrExterior?: 'both' | 'interior' | 'exterior';
  };
  floorPlan: {
    title: string;
    image: string;
    spots: {
      id: string;
      label: string;
      description: string;
      area: string;
      x: number; // percentage 0-100
      y: number; // percentage 0-100
    }[];
  };
  floorPlans?: any[];
  drawings?: DrawingItem[];
  blueprints?: DrawingItem[];
  renders3d?: Render3DItem[];
  renders3D?: Render3DItem[];
  beforeAfter?: {
    beforeImage: string;
    afterImage: string;
    caption: string;
  };
  view360?: {
    panoramaImage: string;
    autoRotate: boolean;
    rotationSpeed: number;
  };
  customFields?: ProjectCustomField[];
  specifications?: Record<string, string>;
  highlights: string[];
  isFeatured?: boolean;
  isVisible?: boolean;
}

export interface FloatingImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  position: 'left-upper' | 'right-upper' | 'left-lower' | 'right-lower' | 'center';
  triggerSectionId: string;
  projectRefId?: string;
}

export interface TimelineStep {
  year: string;
  title: string;
  phase: string;
  description: string;
  image: string;
  specs: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author?: string;
  status?: 'published' | 'draft';
  content?: string;
  isVisible?: boolean;
}

export interface PhilosophyBlock {
  id: string;
  badge: string;
  title: string;
  paragraph: string;
  bullets: {
    title: string;
    description: string;
  }[];
  image?: string;
  videoUrl?: string;
  isVisible?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  iconName?: string;
  isVisible?: boolean;
  number?: string;
  tagline?: string;
  deliverables?: string[];
  specs?: any;
}

export interface ContactDetails {
  heading: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  workingHours?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  mapZoom?: number;
  mapApiKey?: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  tagline: string;
  heroImage: string;
  heroVideoUrl: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  showHero: boolean;
}

export interface NavMenuItem {
  id: string;
  title: string;
  link: string;
  badge?: string;
  isVisible: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  portrait: string;
  bio: string;
  role?: string;
  experience?: string;
  focus?: string;
  award?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    x?: string;
    email?: string;
  };
  isVisible: boolean;
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  description: string;
  isVisible: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  year: string;
  organization: string;
  projectRef?: string;
  certificateImage?: string;
  isVisible: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  photo?: string;
  isVisible: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  isVisible: boolean;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  isVisible: boolean;
}

export interface Panorama360Item {
  id: string;
  title: string;
  panoramaImage: string;
  location: string;
  autoRotate: boolean;
  speed: number;
  startingAngle: number;
  isVisible: boolean;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  name: string;
  phase: string;
  description: string;
  image: string;
  isVisible: boolean;
}

export interface QuestionnaireOption {
  id: string;
  label: string;
}

export interface QuestionnaireQuestion {
  id: string;
  text: string;
  type: 'text' | 'select' | 'checkbox' | 'file';
  options?: string[];
  isRequired: boolean;
}

export interface InquirySubmission {
  id: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  location?: string;
  message?: string;
  answers?: Record<string, string>;
  status: 'new' | 'read' | 'archived';
}

export interface CustomSection {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  content: string;
  contentBody?: string;
  layoutType?: 'grid' | 'split' | 'card' | 'banner' | 'text-image';
  image?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  isVisible: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isVisible: boolean;
  sortOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  date?: string;
  tags?: string[];
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  isVisible: boolean;
  sortOrder?: number;
}

export interface SiteContentItem {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  contentJson?: any;
  updatedAt?: string;
}

export interface SupabaseSyncStatus {
  isConnected: boolean;
  isSyncing: boolean;
  lastSync?: string | null;
  lastSyncedAt?: string | null;
  error: string | null;
  tables?: {
    projects: number;
    categories: number;
    services: number;
    team: number;
    gallery: number;
    site_content: number;
    journal: number;
  };
  tablesCount?: {
    projects: number;
    categories: number;
    services: number;
    team: number;
    journal: number;
    gallery: number;
  };
}

export interface AdminUser {
  id: string;
  email?: string;
  role?: string;
  lastSignInAt?: string;
}

export interface SectionVisibility {
  hero: boolean;
  showcase: boolean;
  philosophy: boolean;
  services: boolean;
  catalog: boolean;
  ongoingProjects: boolean;
  beforeAfter: boolean;
  panorama360: boolean;
  process: boolean;
  team: boolean;
  clientsAndAwards: boolean;
  faq: boolean;
  journal: boolean;
  questionnaire: boolean;
  contact: boolean;
  map: boolean;
  footer: boolean;
}

export type ProjectAnimationPreset =
  | 'framer-slide-fade'
  | 'framer-spring-glide'
  | 'gsap-stagger-slide'
  | 'gsap-curtain-reveal'
  | 'motion-fade-scale'
  | 'architectural-drift';

export interface ThemeSettings {
  preset: 'dark-obsidian' | 'warm-luxury' | 'monochrome' | 'cyber-blueprint';
  fontFamily: 'mono' | 'sans' | 'serif';
  cursorEnabled: boolean;
  neonLinesEnabled: boolean;
  smoothScroll: boolean;
  accentColor: string;
  projectAnimationPreset?: ProjectAnimationPreset;
}

export interface SeoSettings {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  faviconUrl: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isVisible: boolean;
}

export interface FooterSettings {
  copyrightText: string;
  description: string;
  showSocials: boolean;
  showBackToTop: boolean;
}

export interface LegalContent {
  privacyPolicy: string;
  termsAndConditions: string;
}


