import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Project,
  CategoryItem,
  ServiceItem,
  TeamMember,
  JournalArticle,
  GalleryItem,
  SiteContentItem,
  BeforeAfterPair,
  Panorama360Item,
  SupabaseSyncStatus
} from '../types';

export const SUPABASE_STORAGE_BUCKET = 'website-assets';

export const SQL_MIGRATION_SCRIPT = `-- ==============================================================================
-- NILO AXIS STUDIO — SUPABASE DATABASE & STORAGE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  number TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  tagline TEXT,
  category TEXT NOT NULL,
  location TEXT,
  year TEXT,
  hero_image TEXT,
  preview_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  concept TEXT,
  specs JSONB DEFAULT '{}'::jsonb,
  floor_plan JSONB DEFAULT '{}'::jsonb,
  drawings JSONB DEFAULT '[]'::jsonb,
  renders_3d JSONB DEFAULT '[]'::jsonb,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  number TEXT,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '{}'::jsonb,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TEAM TABLE
CREATE TABLE IF NOT EXISTS public.team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  focus TEXT,
  award TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  date TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  aspect_ratio TEXT DEFAULT 'landscape',
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. JOURNAL ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.journal (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT,
  read_time TEXT,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BEFORE / AFTER COMPARISONS TABLE
CREATE TABLE IF NOT EXISTS public.before_after (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  description TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SITE CONTENT & CONFIGURATION TABLE
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  tagline TEXT,
  description TEXT,
  content_json JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- Public visitors can read content; Only Authenticated Admins can Insert, Update, Delete
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read journal" ON public.journal FOR SELECT USING (true);
CREATE POLICY "Allow public read before_after" ON public.before_after FOR SELECT USING (true);
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);

-- Authenticated Admin only write policies (Insert, Update, Delete)
CREATE POLICY "Allow admin write categories" ON public.categories FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write projects" ON public.projects FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write services" ON public.services FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write team" ON public.team FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write gallery" ON public.gallery FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write journal" ON public.journal FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write before_after" ON public.before_after FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin write site_content" ON public.site_content FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 11. SUPABASE STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public can view assets
CREATE POLICY "Public Read website-assets" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'website-assets');

-- Authenticated Admins can upload, update, and delete assets
CREATE POLICY "Admin Upload website-assets" 
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'website-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update website-assets" 
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'website-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete website-assets" 
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'website-assets' AND auth.role() = 'authenticated');
`;

/**
 * Checks connection to Supabase and tests tables presence
 */
export async function checkSupabaseConnection(): Promise<SupabaseSyncStatus> {
  if (!isSupabaseConfigured) {
    return {
      isConnected: false,
      isSyncing: false,
      lastSync: null,
      lastSyncedAt: null,
      error: 'Supabase URL or Anon Key is missing in environment variables.'
    };
  }

  try {
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('id', { count: 'exact', head: true });

    if (projectsError && projectsError.code !== 'PGRST116') {
      // Table might not exist yet
      return {
        isConnected: true,
        isSyncing: false,
        lastSync: null,
        lastSyncedAt: null,
        error: `Supabase reached, but table 'projects' not initialized (${projectsError.message}). Run SQL Schema Migration.`
      };
    }

    const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    const { count: srvCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
    const { count: teamCount } = await supabase.from('team').select('*', { count: 'exact', head: true });
    const { count: jrnCount } = await supabase.from('journal').select('*', { count: 'exact', head: true });
    const { count: galCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });

    return {
      isConnected: true,
      isSyncing: false,
      lastSync: new Date().toLocaleTimeString(),
      lastSyncedAt: new Date().toISOString(),
      error: null,
      tablesCount: {
        projects: projectsData ? 1 : 0,
        categories: catCount || 0,
        services: srvCount || 0,
        team: teamCount || 0,
        journal: jrnCount || 0,
        gallery: galCount || 0
      }
    };
  } catch (err: any) {
    return {
      isConnected: false,
      isSyncing: false,
      lastSync: null,
      lastSyncedAt: null,
      error: err.message || 'Failed to connect to Supabase.'
    };
  }
}

/**
 * Fetch all CMS content from Supabase
 */
export async function fetchCmsDataFromSupabase() {
  if (!isSupabaseConfigured) return null;

  try {
    const [
      projectsRes,
      categoriesRes,
      servicesRes,
      teamRes,
      journalRes,
      galleryRes,
      siteContentRes,
      beforeAfterRes
    ] = await Promise.allSettled([
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('services').select('*').order('sort_order', { ascending: true }),
      supabase.from('team').select('*').order('sort_order', { ascending: true }),
      supabase.from('journal').select('*').order('sort_order', { ascending: true }),
      supabase.from('gallery').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_content').select('*'),
      supabase.from('before_after').select('*')
    ]);

    const result: {
      projects?: Project[];
      categories?: CategoryItem[];
      services?: ServiceItem[];
      team?: TeamMember[];
      journal?: JournalArticle[];
      gallery?: GalleryItem[];
      siteContent?: Record<string, any>;
      beforeAfter?: BeforeAfterPair[];
    } = {};

    if (projectsRes.status === 'fulfilled' && projectsRes.value.data && projectsRes.value.data.length > 0) {
      result.projects = projectsRes.value.data.map((row: any) => ({
        id: row.id,
        number: row.number || '01',
        title: row.title,
        subtitle: row.subtitle || '',
        tagline: row.tagline || '',
        category: row.category,
        location: row.location || '',
        year: row.year || '',
        heroImage: row.hero_image,
        previewImage: row.preview_image || row.hero_image,
        galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
        description: row.description || '',
        concept: row.concept || '',
        specs: row.specs || {
          area: '',
          structuralType: '',
          materials: [],
          timeline: '',
          status: 'Completed',
          climateStrategy: ''
        },
        floorPlan: row.floor_plan || { title: '', image: '', spots: [] },
        drawings: Array.isArray(row.drawings) ? row.drawings : [],
        renders3d: Array.isArray(row.renders_3d) ? row.renders_3d : [],
        highlights: Array.isArray(row.highlights) ? row.highlights : []
      }));
    }

    if (categoriesRes.status === 'fulfilled' && categoriesRes.value.data && categoriesRes.value.data.length > 0) {
      result.categories = categoriesRes.value.data.map((row: any) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description || '',
        icon: row.icon || '',
        isVisible: row.is_visible ?? true,
        sortOrder: row.sort_order || 0
      }));
    }

    if (servicesRes.status === 'fulfilled' && servicesRes.value.data && servicesRes.value.data.length > 0) {
      result.services = servicesRes.value.data.map((row: any) => ({
        id: row.id,
        title: row.title,
        tagline: row.tagline || '',
        description: row.description || '',
        image: row.image,
        deliverables: row.deliverables || [],
        specs: row.specs || {},
        number: row.number || '01',
        isVisible: row.is_visible ?? true
      }));
    }

    if (teamRes.status === 'fulfilled' && teamRes.value.data && teamRes.value.data.length > 0) {
      result.team = teamRes.value.data.map((row: any) => ({
        id: row.id,
        name: row.name,
        position: row.role || row.position || 'Architectural Designer',
        role: row.role || row.position || 'Architectural Designer',
        portrait: row.photo || row.portrait || '',
        bio: row.bio || '',
        focus: row.focus || '',
        award: row.award || '',
        socialLinks: row.social_links || {},
        isVisible: row.is_visible ?? true
      }));
    }

    if (journalRes.status === 'fulfilled' && journalRes.value.data && journalRes.value.data.length > 0) {
      result.journal = journalRes.value.data.map((row: any) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        date: row.date || '',
        readTime: row.read_time || '5 MIN READ',
        excerpt: row.excerpt || '',
        content: row.content || '',
        image: row.image,
        isVisible: row.is_visible ?? true
      }));
    }

    if (galleryRes.status === 'fulfilled' && galleryRes.value.data && galleryRes.value.data.length > 0) {
      result.gallery = galleryRes.value.data.map((row: any) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        imageUrl: row.image_url,
        thumbnailUrl: row.thumbnail_url || row.image_url,
        caption: row.caption || '',
        date: row.date || '',
        tags: Array.isArray(row.tags) ? row.tags : [],
        aspectRatio: row.aspect_ratio || 'landscape',
        isVisible: row.is_visible ?? true,
        sortOrder: row.sort_order || 0
      }));
    }

    if (beforeAfterRes.status === 'fulfilled' && beforeAfterRes.value.data && beforeAfterRes.value.data.length > 0) {
      result.beforeAfter = beforeAfterRes.value.data.map((row: any) => ({
        id: row.id,
        title: row.title,
        beforeImage: row.before_image,
        afterImage: row.after_image,
        description: row.description || '',
        isVisible: row.is_visible ?? true
      }));
    }

    if (siteContentRes.status === 'fulfilled' && siteContentRes.value.data && siteContentRes.value.data.length > 0) {
      const contentMap: Record<string, any> = {};
      siteContentRes.value.data.forEach((row: any) => {
        contentMap[row.section] = {
          title: row.title,
          subtitle: row.subtitle,
          tagline: row.tagline,
          description: row.description,
          ...row.content_json
        };
      });
      result.siteContent = contentMap;
    }

    return result;
  } catch (err) {
    console.warn('[Supabase CMS] Error fetching remote content:', err);
    return null;
  }
}

/**
 * Upload an image file directly to Supabase Storage bucket 'website-assets'
 * and return its permanent public URL.
 */
export async function uploadImageToSupabaseStorage(
  file: File,
  folder: 'projects' | 'services' | 'team' | 'gallery' | 'brand' | 'uploads' = 'uploads'
): Promise<{ url: string; path: string; error: string | null }> {
  if (!isSupabaseConfigured) {
    const errorMsg = 'Supabase credentials are not configured (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required).';
    console.error('[Supabase Storage]', errorMsg);
    return { url: '', path: '', error: errorMsg };
  }

  try {
    const rawExt = file.name.split('.').pop() || 'jpg';
    const extension = rawExt.toLowerCase().replace(/[^a-z0-9]/g, '');
    const rawName = file.name.includes('.') 
      ? file.name.substring(0, file.name.lastIndexOf('.'))
      : file.name;
    const baseName = rawName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'asset';

    const timestamp = Date.now();
    const filePath = `${folder}/${timestamp}_${baseName}.${extension}`;

    const contentType = file.type || `image/${extension === 'jpg' ? 'jpeg' : extension}`;

    const { error: uploadError } = await supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(filePath, file, {
        contentType,
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('[Supabase Storage] Upload error:', uploadError.message);
      return { url: '', path: '', error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl || `${supabaseUrl}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${filePath}`;

    console.info('[Supabase Storage] Successfully uploaded asset to:', publicUrl);

    return {
      url: publicUrl,
      path: filePath,
      error: null
    };
  } catch (err: any) {
    console.error('[Supabase Storage] Unexpected error during file upload:', err);
    return { url: '', path: '', error: err.message || 'Unexpected upload error' };
  }
}

/**
 * Upsert Project to Supabase
 */
export async function upsertProjectToSupabase(project: Project): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('projects').upsert({
      id: project.id,
      number: project.number,
      title: project.title,
      subtitle: project.subtitle,
      tagline: project.tagline || '',
      category: project.category,
      location: project.location,
      year: project.year,
      hero_image: project.heroImage,
      preview_image: project.previewImage || project.heroImage,
      gallery_images: project.galleryImages || [],
      description: project.description,
      concept: project.concept,
      specs: project.specs || {},
      floor_plan: project.floorPlan || {},
      drawings: project.drawings || [],
      renders_3d: project.renders3d || project.renders3D || [],
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Project from Supabase
 */
export async function deleteProjectFromSupabase(projectId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Category to Supabase
 */
export async function upsertCategoryToSupabase(category: CategoryItem): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('categories').upsert({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      icon: category.icon || '',
      is_visible: category.isVisible,
      sort_order: category.sortOrder,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Category from Supabase
 */
export async function deleteCategoryFromSupabase(categoryId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('categories').delete().eq('id', categoryId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Service to Supabase
 */
export async function upsertServiceToSupabase(service: ServiceItem): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('services').upsert({
      id: service.id,
      title: service.title,
      tagline: service.tagline || '',
      description: service.description,
      image: service.image,
      deliverables: service.deliverables || [],
      specs: service.specs || {},
      number: service.number || '01',
      is_visible: service.isVisible ?? true,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Service from Supabase
 */
export async function deleteServiceFromSupabase(serviceId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('services').delete().eq('id', serviceId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Team Member to Supabase
 */
export async function upsertTeamMemberToSupabase(member: TeamMember): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('team').upsert({
      id: member.id,
      name: member.name,
      role: member.role || member.position,
      photo: member.portrait,
      bio: member.bio || '',
      focus: member.focus || '',
      award: member.award || '',
      is_visible: member.isVisible ?? true,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Team Member from Supabase
 */
export async function deleteTeamMemberFromSupabase(memberId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('team').delete().eq('id', memberId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Journal Article to Supabase
 */
export async function upsertJournalArticleToSupabase(article: JournalArticle): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('journal').upsert({
      id: article.id,
      title: article.title,
      category: article.category,
      date: article.date,
      read_time: article.readTime,
      excerpt: article.excerpt,
      content: article.content || '',
      image: article.image,
      is_visible: article.isVisible ?? true,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Journal Article from Supabase
 */
export async function deleteJournalArticleFromSupabase(articleId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('journal').delete().eq('id', articleId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Gallery Item to Supabase
 */
export async function upsertGalleryItemToSupabase(item: GalleryItem): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('gallery').upsert({
      id: item.id,
      title: item.title,
      category: item.category,
      image_url: item.imageUrl,
      thumbnail_url: item.thumbnailUrl || item.imageUrl,
      caption: item.caption || '',
      date: item.date || '',
      tags: item.tags || [],
      aspect_ratio: item.aspectRatio || 'landscape',
      is_visible: item.isVisible ?? true,
      sort_order: item.sortOrder || 0,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Gallery Item from Supabase
 */
export async function deleteGalleryItemFromSupabase(itemId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('gallery').delete().eq('id', itemId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Upsert Before/After Pair to Supabase
 */
export async function upsertBeforeAfterToSupabase(pair: BeforeAfterPair): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('before_after').upsert({
      id: pair.id,
      title: pair.title,
      before_image: pair.beforeImage,
      after_image: pair.afterImage,
      description: pair.description || '',
      is_visible: pair.isVisible ?? true,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Delete Before/After Pair from Supabase
 */
export async function deleteBeforeAfterFromSupabase(pairId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await supabase.from('before_after').delete().eq('id', pairId);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Save Site Section Content to Supabase
 */
export async function saveSiteContentToSupabase(
  section: string,
  content: any
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const payload = typeof content === 'object' && content !== null ? content : { value: content };
    const { title, subtitle, tagline, description, ...rest } = payload;
    const { error } = await supabase.from('site_content').upsert({
      id: `sec-${section}`,
      section,
      title: title || '',
      subtitle: subtitle || '',
      tagline: tagline || '',
      description: description || '',
      content_json: rest,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Push all local studio state to Supabase DB (Seed / Full Cloud Migration)
 */
export async function seedAllDataToSupabase(state: {
  projects: Project[];
  categories: CategoryItem[];
  services: ServiceItem[];
  team: TeamMember[];
  journal: JournalArticle[];
  gallery: GalleryItem[];
  beforeAfter?: BeforeAfterPair[];
  heroSettings?: any;
  contactDetails?: any;
  siteContent?: any;
}): Promise<{ success: boolean; errors: string[] }> {
  if (!isSupabaseConfigured) {
    return { success: false, errors: ['Supabase URL and Anon Key must be configured.'] };
  }

  const errors: string[] = [];

  // 1. Projects
  try {
    const projectRows = state.projects.map((p, idx) => ({
      id: p.id,
      number: p.number,
      title: p.title,
      subtitle: p.subtitle,
      tagline: p.tagline || '',
      category: p.category,
      location: p.location,
      year: p.year,
      hero_image: p.heroImage,
      preview_image: p.previewImage || p.heroImage,
      gallery_images: p.galleryImages || [],
      description: p.description,
      concept: p.concept,
      specs: p.specs || {},
      floor_plan: p.floorPlan || {},
      drawings: p.drawings || [],
      renders_3d: p.renders3d || p.renders3D || [],
      sort_order: idx,
      is_visible: true,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('projects').upsert(projectRows);
    if (error) errors.push(`Projects: ${error.message}`);
  } catch (err: any) {
    errors.push(`Projects: ${err.message}`);
  }

  // 2. Categories
  try {
    const catRows = state.categories.map((c, idx) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      icon: c.icon || '',
      is_visible: c.isVisible,
      sort_order: idx,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('categories').upsert(catRows);
    if (error) errors.push(`Categories: ${error.message}`);
  } catch (err: any) {
    errors.push(`Categories: ${err.message}`);
  }

  // 3. Services
  try {
    const srvRows = state.services.map((s, idx) => ({
      id: s.id,
      number: s.number || '01',
      title: s.title,
      tagline: s.tagline || '',
      description: s.description,
      image: s.image,
      deliverables: s.deliverables || [],
      specs: s.specs || {},
      sort_order: idx,
      is_visible: s.isVisible ?? true,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('services').upsert(srvRows);
    if (error) errors.push(`Services: ${error.message}`);
  } catch (err: any) {
    errors.push(`Services: ${err.message}`);
  }

  // 4. Team
  try {
    const teamRows = state.team.map((t, idx) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      photo: t.portrait,
      bio: t.bio || '',
      focus: t.focus || '',
      award: t.award || '',
      sort_order: idx,
      is_visible: t.isVisible ?? true,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('team').upsert(teamRows);
    if (error) errors.push(`Team: ${error.message}`);
  } catch (err: any) {
    errors.push(`Team: ${err.message}`);
  }

  // 5. Journal
  try {
    const journalRows = state.journal.map((j, idx) => ({
      id: j.id,
      title: j.title,
      category: j.category,
      date: j.date,
      read_time: j.readTime,
      excerpt: j.excerpt,
      content: j.content || '',
      image: j.image,
      sort_order: idx,
      is_visible: j.isVisible ?? true,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('journal').upsert(journalRows);
    if (error) errors.push(`Journal: ${error.message}`);
  } catch (err: any) {
    errors.push(`Journal: ${err.message}`);
  }

  // 6. Gallery
  try {
    const galleryRows = state.gallery.map((g, idx) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      image_url: g.imageUrl,
      thumbnail_url: g.thumbnailUrl || g.imageUrl,
      caption: g.caption || '',
      date: g.date || '',
      tags: g.tags || [],
      aspect_ratio: g.aspectRatio || 'landscape',
      sort_order: idx,
      is_visible: g.isVisible ?? true,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('gallery').upsert(galleryRows);
    if (error) errors.push(`Gallery: ${error.message}`);
  } catch (err: any) {
    errors.push(`Gallery: ${err.message}`);
  }

  // 7. Site Content (Hero & Contact)
  try {
    await supabase.from('site_content').upsert([
      {
        id: 'sec-hero',
        section: 'hero',
        title: state.heroSettings.title || 'ROOTED HERE. DESIGNED BEYOND.',
        subtitle: state.heroSettings.subtitle || 'CONTEMPORARY ARCHITECTURE & DESIGN ATELIER',
        tagline: state.heroSettings.tagline || '',
        content_json: state.heroSettings,
        updated_at: new Date().toISOString()
      },
      {
        id: 'sec-contact',
        section: 'contact',
        title: 'COMMISSION & INQUIRIES',
        description: state.contactDetails.studioAddress || '',
        content_json: state.contactDetails,
        updated_at: new Date().toISOString()
      }
    ]);
  } catch (err: any) {
    errors.push(`Site Content: ${err.message}`);
  }

  return {
    success: errors.length === 0,
    errors
  };
}
