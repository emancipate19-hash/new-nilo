// Base Supabase Storage Bucket Public CDN URL
export const SUPABASE_STORAGE_URL = 'https://eyzsdftddznlmonfpnko.supabase.co/storage/v1/object/public/website-assets';

// Default Studio Vector Emblem Logo
export const FALLBACK_VECTOR_LOGO_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e1e1e"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f6d365"/>
      <stop offset="30%" stop-color="#fda085"/>
      <stop offset="60%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#aa771c"/>
    </linearGradient>
    <linearGradient id="goldRing" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b8860b"/>
      <stop offset="50%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#996515"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Dark circular background -->
  <circle cx="200" cy="200" r="190" fill="url(#bgGrad)" stroke="#111" stroke-width="4"/>

  <!-- Outer Gold Ring -->
  <circle cx="200" cy="200" r="170" fill="none" stroke="url(#goldRing)" stroke-width="10" filter="url(#shadow)"/>
  
  <!-- Inner Gold Ring -->
  <circle cx="200" cy="200" r="150" fill="none" stroke="url(#goldGrad)" stroke-width="6"/>

  <!-- Gold NA Monogram Emblem -->
  <g filter="url(#shadow)">
    <!-- Letter N -->
    <path d="M 105 280 L 105 120 L 130 120 L 195 240 L 195 120 L 218 120 L 218 280 L 193 280 L 128 160 L 128 280 Z" fill="url(#goldGrad)" />
    
    <!-- Letter A -->
    <path d="M 232 280 L 270 120 L 295 120 L 333 280 L 306 280 L 297 240 L 268 240 L 259 280 Z M 273 218 L 292 218 L 282 170 Z" fill="url(#goldGrad)" />

    <!-- Center Separator Bar -->
    <rect x="198" y="115" width="4" height="170" fill="url(#goldRing)" rx="2"/>
  </g>
</svg>
`)}`;

// Primary Logo & Hero Image
export const logoImg = FALLBACK_VECTOR_LOGO_URL;
export const logoThumbnailImg = FALLBACK_VECTOR_LOGO_URL;

export const heroTowerImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';
export const projectImg1 = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80';
export const projectImg2 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80';
export const projectImg3 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80';
export const projectImg4 = 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80';
export const projectImg5 = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80';
export const projectImg6 = 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80';
export const projectImg7 = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80';
export const projectImg8 = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80';
export const projectImg9 = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80';

// Interior Design Images (Supabase Storage & high-res architectural assets)
export const interiorImg1 = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80';
export const interiorImg2 = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80';
export const interiorImg3 = 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80';
export const interiorImg4 = 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80';
export const interiorImg5 = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80';
export const interiorImg6 = 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80';
export const interiorImg7 = 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80';
export const interiorImg8 = 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80';
export const interiorImg9 = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80';
export const interiorImg10 = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80';

export const INTERIOR_DESIGN_IMAGES = [
  interiorImg1,
  interiorImg2,
  interiorImg3,
  interiorImg4,
  interiorImg5,
  interiorImg6,
  interiorImg7,
  interiorImg8,
  interiorImg9,
  interiorImg10
];

// Residential Architecture Images
export const residentialImg1 = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80';
export const residentialImg2 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
export const residentialImg3 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80';
export const residentialImg4 = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80';
export const residentialImg5 = 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80';
export const residentialImg6 = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80';
export const residentialImg7 = 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80';
export const residentialImg8 = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80';
export const residentialImg9 = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80';
export const residentialImg10 = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80';

export const RESIDENTIAL_ARCHITECTURE_IMAGES = [
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
];

export const staffDawitImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
export const staffKidusImg = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
export const staffMilkiImg = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80';

// Aliases for compatibility
export const terrainVillaImg = residentialImg1;
export const lumenCenterImg = projectImg2;
export const boleTowerImg = projectImg3;
export const hawassaRetreatImg = residentialImg2;

// Primary Studio Logo
export const DEFAULT_LOGO_URL = logoImg;

// Hero Image
export const DEFAULT_HERO_IMAGE_URL = heroTowerImg;

// All uploaded images exported as primary default loading assets
export const DEFAULT_UPLOADED_PICTURES = [
  logoImg,
  projectImg1,
  projectImg2,
  projectImg3,
  projectImg4,
  projectImg5,
  projectImg6,
  projectImg7,
  projectImg8,
  projectImg9
];

export const DEFAULT_UPLOADED_ASSETS = {
  logo: logoImg,
  heroTower: heroTowerImg,
  project1: projectImg1,
  project2: projectImg2,
  project3: projectImg3,
  project4: projectImg4,
  project5: projectImg5,
  project6: projectImg6,
  project7: projectImg7,
  project8: projectImg8,
  project9: projectImg9,
  interior1: interiorImg1,
  interior2: interiorImg2,
  interior3: interiorImg3,
  interior4: interiorImg4,
  interior5: interiorImg5,
  interior6: interiorImg6,
  interior7: interiorImg7,
  interior8: interiorImg8,
  interior9: interiorImg9,
  interior10: interiorImg10,
  residential1: residentialImg1,
  residential2: residentialImg2,
  residential3: residentialImg3,
  residential4: residentialImg4,
  residential5: residentialImg5,
  residential6: residentialImg6,
  residential7: residentialImg7,
  residential8: residentialImg8,
  residential9: residentialImg9,
  residential10: residentialImg10,
  terrainVilla: residentialImg1,
  lumenCenter: projectImg2,
  boleTower: projectImg3,
  hawassaRetreat: residentialImg2,
  staffDawit: staffDawitImg,
  staffKidus: staffKidusImg,
  staffMilki: staffMilkiImg
};

// Default loading pictures collection for all sections, galleries and fallback previews
export const SAMPLE_PROJECT_IMAGES = [
  projectImg1,
  projectImg2,
  projectImg3,
  projectImg4,
  projectImg5,
  projectImg6,
  projectImg7,
  projectImg8,
  projectImg9
];


