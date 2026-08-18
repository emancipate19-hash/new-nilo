import { CategoryItem, GalleryItem } from '../types';
import {
  projectImg1,
  projectImg2,
  projectImg3,
  projectImg4,
  projectImg5,
  projectImg6,
  projectImg7,
  projectImg8,
  projectImg9,
  heroTowerImg,
  interiorImg1,
  interiorImg2,
  interiorImg3,
  interiorImg4,
  interiorImg5,
  interiorImg6,
  interiorImg7,
  interiorImg8,
  interiorImg9,
  interiorImg10,
  residentialImg1,
  residentialImg2,
  residentialImg3,
  residentialImg4,
  residentialImg5,
  residentialImg6,
  residentialImg7,
  residentialImg8,
  residentialImg9,
  residentialImg10
} from '../assets/images/defaultAssets';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-arch',
    name: 'Architectural Design',
    slug: 'architectural-design',
    description: 'Civic pavilions, public monuments, high-altitude solariums, and landmark spaces.',
    icon: 'Building2',
    isVisible: true,
    sortOrder: 1
  },
  {
    id: 'cat-res',
    name: 'Residential Architecture',
    slug: 'residential-architecture',
    description: 'Bespoke private villas, extreme cliff cantilevers, and tectonic lakeside retreats.',
    icon: 'Home',
    isVisible: true,
    sortOrder: 2
  },
  {
    id: 'cat-comm',
    name: 'Commercial Architecture',
    slug: 'commercial-architecture',
    description: 'High-rise financial towers, corporate headquarters, and multi-functional urban hubs.',
    icon: 'Building',
    isVisible: true,
    sortOrder: 3
  },
  {
    id: 'cat-int',
    name: 'Interior Design',
    slug: 'interior-design',
    description: 'Luxury penthouses, minimalist monolithic living, biophilic ateliers, and executive suites.',
    icon: 'Maximize2',
    isVisible: true,
    sortOrder: 4
  },
  {
    id: 'cat-renov',
    name: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    description: 'Adaptive reuse of volcanic stone residual sites, heritage restorations, and spa caverns.',
    icon: 'Hammer',
    isVisible: true,
    sortOrder: 5
  },
  {
    id: 'cat-3d',
    name: '3D CGI & Spatial Visualization',
    slug: '3d-cgi-visualization',
    description: 'Hyper-realistic real-time lighting simulations, raytraced architectural walkthroughs, and 360 CGI.',
    icon: 'Box',
    isVisible: true,
    sortOrder: 6
  },
  {
    id: 'cat-brand',
    name: 'Branding & Monograph',
    slug: 'branding-monograph',
    description: 'Architectural identity, editorial monographs, custom typographies, and book design.',
    icon: 'BookOpen',
    isVisible: true,
    sortOrder: 7
  },
  {
    id: 'cat-video',
    name: 'Video Editing & Spatial Cinema',
    slug: 'video-editing-cinema',
    description: 'Cinematic 4K drone cinematography, 120fps slow-motion architectural films, and soundscapes.',
    icon: 'Video',
    isVisible: true,
    sortOrder: 8
  },
  {
    id: 'cat-web',
    name: 'Web Development & Platforms',
    slug: 'web-development',
    description: 'Custom full-stack portfolio systems, real-time parametric calculators, and interactive platforms.',
    icon: 'Code2',
    isVisible: true,
    sortOrder: 9
  },
  {
    id: 'cat-social',
    name: 'Social Media / Digital Campaigns',
    slug: 'social-media-campaigns',
    description: 'Curated architectural storytelling, motion graphics, and audience growth strategies.',
    icon: 'Share2',
    isVisible: true,
    sortOrder: 10
  },
  {
    id: 'cat-land',
    name: 'Landscape Architecture',
    slug: 'landscape-architecture',
    description: 'Native flora terraces, zero-runoff rainwater retention, and integrated botanical gardens.',
    icon: 'Trees',
    isVisible: true,
    sortOrder: 11
  },
  {
    id: 'cat-furn',
    name: 'Furniture & Product Design',
    slug: 'furniture-design',
    description: 'Bespoke hand-cast bronze hardware, monolith volcanic basalt tables, and walnut joinery.',
    icon: 'Armchair',
    isVisible: true,
    sortOrder: 12
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Terrain Cantilever Ridge',
    category: 'Residential Architecture',
    imageUrl: residentialImg1,
    caption: '14-meter post-tensioned cantilever overlooking the Entoto eucalyptus canopy.',
    date: '2026',
    tags: ['Cantilever', 'Residential', 'Concrete'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 1
  },
  {
    id: 'gal-02',
    title: 'Hawassa Lakefront Retreat',
    category: 'Residential Architecture',
    imageUrl: residentialImg2,
    caption: 'Rammed volcanic earth walls opening onto reflection water basins.',
    date: '2025',
    tags: ['Waterfront', 'Rammed Earth', 'Eco-Luxury'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 2
  },
  {
    id: 'gal-03',
    title: 'Lumen Cultural Center Pavilion',
    category: 'Architectural Design',
    imageUrl: projectImg2,
    caption: 'Continuous light scoop funneling natural zenith sunlight into the atrium.',
    date: '2026',
    tags: ['Civic', 'Pavilion', 'Solar Scoop'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 3
  },
  {
    id: 'gal-04',
    title: 'Bole Horizon Kinetic Tower',
    category: 'Commercial Architecture',
    imageUrl: projectImg3,
    caption: 'Bronze anodized kinetic louver facade tracking solar radiation paths.',
    date: '2025',
    tags: ['Commercial', 'High-Rise', 'Kinetic Facade'],
    aspectRatio: 'portrait',
    isVisible: true,
    sortOrder: 4
  },
  {
    id: 'gal-05',
    title: 'Solarium Zen High-Altitude Pavilion',
    category: 'Architectural Design',
    imageUrl: projectImg5,
    caption: 'Cantilevered basalt terrace at 2,800m altitude.',
    date: '2026',
    tags: ['Solarium', 'Zen', 'Stone'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 5
  },
  {
    id: 'gal-06',
    title: 'Nexus Commercial Global Headquarters',
    category: 'Commercial Architecture',
    imageUrl: projectImg8,
    caption: 'Spanning double-glazed curtain walls with structural timber columns.',
    date: '2026',
    tags: ['Headquarters', 'Timber', 'Glass'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 6
  },
  {
    id: 'gal-07',
    title: 'Atelier Penthouse Culinary Living',
    category: 'Interior Design',
    imageUrl: interiorImg1,
    caption: 'Monolithic quartzite island with integrated matte black bronze fixtures.',
    date: '2026',
    tags: ['Penthouse', 'Interior', 'Minimalist'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 7
  },
  {
    id: 'gal-08',
    title: 'Zenith Executive Suite & Boardroom',
    category: 'Interior Design',
    imageUrl: interiorImg2,
    caption: 'Acoustic micro-perforated smoked oak panelling and integrated ambient lighting.',
    date: '2026',
    tags: ['Executive', 'Office', 'Oak'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 8
  },
  {
    id: 'gal-09',
    title: 'Minimalist Residential Sanctuary',
    category: 'Interior Design',
    imageUrl: interiorImg3,
    caption: 'Pure micro-cement finishes with frameless floor-to-ceiling glass connections.',
    date: '2026',
    tags: ['Sanctuary', 'Micro-Cement', 'Lighting'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 9
  },
  {
    id: 'gal-10',
    title: 'Biophilic Living Atelier',
    category: 'Interior Design',
    imageUrl: interiorImg4,
    caption: 'Vertical endemic fern walls creating passive natural humidity.',
    date: '2026',
    tags: ['Biophilic', 'Living Wall', 'Greenery'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 10
  },
  {
    id: 'gal-11',
    title: 'Entoto Cliffside Monolith',
    category: 'Residential Architecture',
    imageUrl: residentialImg3,
    caption: 'Deep volcanic basalt foundations anchored directly into the bedrock.',
    date: '2026',
    tags: ['Cliffside', 'Basalt', 'Residential'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 11
  },
  {
    id: 'gal-12',
    title: 'Hero Architectural Tower View',
    category: '3D CGI & Spatial Visualization',
    imageUrl: heroTowerImg,
    caption: 'High-definition 3D rendering with atmospheric volumetric scattering.',
    date: '2026',
    tags: ['3D CGI', 'Atmospheric', 'Raytraced'],
    aspectRatio: 'landscape',
    isVisible: true,
    sortOrder: 12
  }
];
