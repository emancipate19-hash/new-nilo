// Google Drive Image IDs provided for NILO AXIS STUDIO assets
export const GOOGLE_DRIVE_IDS = {
  logo: '17Ptq0XrrfinmuuF77SWpRVcPFfBdX0VA',
  hero: '1OkQM2tB1qLOiHvoqm68LnBQPMgnzHkR5',
  project1: '1c7jmTOuBj9VHwxGgdaCcl5tg3SJddsjm',
  project2: '1Fkp3YxPAUV5I1dpUCkuy7t3DUHcEirdD',
  project3: '1gg-0dwTCHnpY7e2vQJ8gMGyhMWYtZTZI',
  project4: '178RzJjY1nQwVjXYbqKwuvV-TQX_Y6Yoo',
  project5: '1wMR9Eh0WAbDo6AyUTerk2Xm8ZeZcrbyP',
  project6: '13q-5PaMirqpM705lHUNi_Z3qjUv7S_Qn',
  project7: '1fwOR6DYVMZ58EZSL3ll88BqAQOCisJzS',
  project8: '1I-08l62XYxJ13SaBnto6rR26hDRuCir3',
  project9: '1OkQM2tB1qLOiHvoqm68LnBQPMgnzHkR5',
  staffDawit: '1Vp_0adt1fIK1uHNFbaRwojtAG27roSnW',
  staffKidus: '1I_VjQITznicS9dLapt8yS5EaGo4e9qys',
  staffMilki: '10ErJNl9jtEAnUlL0COEICSvRlZ3IEFAQ'
};

// High-performance direct CDN URLs for Google Drive assets
export const logoImg = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.logo}`;
export const logoThumbnailImg = `https://drive.google.com/thumbnail?id=${GOOGLE_DRIVE_IDS.logo}&sz=w1000`;

export const heroTowerImg = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.hero}`;
export const projectImg1 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project1}`;
export const projectImg2 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project2}`;
export const projectImg3 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project3}`;
export const projectImg4 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project4}`;
export const projectImg5 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project5}`;
export const projectImg6 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project6}`;
export const projectImg7 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project7}`;
export const projectImg8 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project8}`;
export const projectImg9 = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.project9}`;

export const staffDawitImg = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.staffDawit}`;
export const staffKidusImg = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.staffKidus}`;
export const staffMilkiImg = `https://lh3.googleusercontent.com/d/${GOOGLE_DRIVE_IDS.staffMilki}`;

// Aliases for compatibility
export const terrainVillaImg = projectImg1;
export const lumenCenterImg = projectImg2;
export const boleTowerImg = projectImg3;
export const hawassaRetreatImg = projectImg4;

// Default Brand Assets for NILO AXIS STUDIO
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

// Primary Logo is the provided Google Drive Logo Asset
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
  terrainVilla: projectImg1,
  lumenCenter: projectImg2,
  boleTower: projectImg3,
  hawassaRetreat: projectImg4,
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


