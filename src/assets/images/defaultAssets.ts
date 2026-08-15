import heroTowerImg from './default_hero_tower_1786667006054.jpg';
import terrainVillaImg from './terrain_cantilever_villa_1786641237169.jpg';
import lumenCenterImg from './lumen_cultural_center_1786641251205.jpg';
import boleTowerImg from './bole_horizon_tower_1786641262408.jpg';
import hawassaRetreatImg from './hawassa_lake_retreat_1786641272805.jpg';

// Default Brand Assets for NILO AXIS STUDIO

// Requirement: First uploaded picture as Company Logo (Gold 'NA' Emblem in double circle)
export const DEFAULT_LOGO_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
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

  <!-- Dark wood textured circular background -->
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

// Requirement: Second uploaded picture as Hero Image (Tall luxury high-rise tower in lush green pine forest)
export const DEFAULT_HERO_IMAGE_URL = heroTowerImg;

// All uploaded images exported as primary default loading assets
export const DEFAULT_UPLOADED_PICTURES = [
  heroTowerImg,
  terrainVillaImg,
  lumenCenterImg,
  boleTowerImg,
  hawassaRetreatImg
];

export const DEFAULT_UPLOADED_ASSETS = {
  heroTower: heroTowerImg,
  terrainVilla: terrainVillaImg,
  lumenCenter: lumenCenterImg,
  boleTower: boleTowerImg,
  hawassaRetreat: hawassaRetreatImg,
  logo: DEFAULT_LOGO_URL
};

// Default loading pictures collection for all sections, galleries and fallback previews
export const SAMPLE_PROJECT_IMAGES = [
  heroTowerImg,
  terrainVillaImg,
  lumenCenterImg,
  boleTowerImg,
  hawassaRetreatImg
];

