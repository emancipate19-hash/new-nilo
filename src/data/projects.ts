import { Project, FloatingImageItem, TimelineStep, JournalArticle } from '../types';

import heroTowerImg from '../assets/images/default_hero_tower_1786667006054.jpg';
import terrainVillaImg from '../assets/images/terrain_cantilever_villa_1786641237169.jpg';
import lumenCenterImg from '../assets/images/lumen_cultural_center_1786641251205.jpg';
import boleTowerImg from '../assets/images/bole_horizon_tower_1786641262408.jpg';
import hawassaRetreatImg from '../assets/images/hawassa_lake_retreat_1786641272805.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'terrain-cantilever-villa',
    number: '01',
    title: 'TERRAIN CANTILEVER VILLA',
    subtitle: 'Monolithic Habitation in Mountain Terrain',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'RESIDENTIAL',
    heroImage: terrainVillaImg,
    previewImage: terrainVillaImg,
    galleryImages: [
      terrainVillaImg,
      heroTowerImg,
      lumenCenterImg,
      boleTowerImg,
      hawassaRetreatImg
    ],
    description: 'Suspended dramatically over the Entoto hillside, the Terrain Cantilever Villa negotiates extreme topography through post-tensioned concrete slabs and triple-glazed curtain walls. The structure projects 14 meters into open air without vertical ground supports.',
    concept: 'Form following topography—minimizing ground footprint while maximizing passive wind capture and panoramic valley vistas.',
    specs: {
      area: '820 SQ. M',
      structuralType: 'Post-Tensioned Concrete & Structural Steel Core',
      materials: ['Board-formed Concrete', 'Anodized Bronze', 'Low-E Acoustic Glass', 'Local Travertine'],
      timeline: '22 MONTHS (COMPLETED 2026)',
      status: 'BUILT',
      climateStrategy: 'Passive thermal mass storing heat during cold high-altitude nights; natural cross-ventilation flues.'
    },
    floorPlan: {
      title: 'LEVEL 02 — CANTILEVER SUITE & ATRIUM',
      image: terrainVillaImg,
      spots: [
        {
          id: 'cantilever-deck',
          label: '14M CANTILEVER OBSERVATION DECK',
          description: 'A floating lounge suspended above the valley with glass balustrades and embedded perimeter linear lighting.',
          area: '120 SQ. M',
          x: 28,
          y: 35
        },
        {
          id: 'zen-atrium',
          label: 'CENTRAL RAINWATER ATRIUM',
          description: 'An open-air light court hosting native mountain flora and a sound-dampening stone water cascade.',
          area: '65 SQ. M',
          x: 52,
          y: 48
        },
        {
          id: 'master-wing',
          label: 'MASTER SUITE & GALLERY',
          description: 'Secluded private wing with custom teak joinery and floor-to-ceiling corner glazing framing the sunrise.',
          area: '180 SQ. M',
          x: 78,
          y: 62
        }
      ]
    },
    highlights: [
      '14-meter unbraced concrete projection over 45° slope',
      'Integrated solar roof producing 180% of daily energy demand',
      'Zero-discharge rainwater filtration & subterranean greywater vault',
      'Custom acoustic timber louvers tuned to damp wind resonance'
    ]
  },
  {
    id: 'lumen-cultural-center',
    number: '02',
    title: 'LUMEN CULTURAL CENTER',
    subtitle: 'Public Pavilion of Light & Materiality',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2025',
    category: 'CULTURAL',
    heroImage: lumenCenterImg,
    previewImage: lumenCenterImg,
    galleryImages: [
      lumenCenterImg,
      heroTowerImg,
      terrainVillaImg,
      hawassaRetreatImg,
      boleTowerImg
    ],
    description: 'Designed as a civic sanctuary, the Lumen Cultural Center features rhythmic timber fins that track the solar arc. Sunlight penetrates deep into gallery spaces, casting changing geometric shadows throughout the day.',
    concept: 'Light as a primary building material—sculpting interior space through sunlight angles, louvers, and reflective stone pools.',
    specs: {
      area: '3,400 SQ. M',
      structuralType: 'Glulam Timber Arches & White Pigmented Concrete',
      materials: ['Eucalyptus Glulam Beams', 'Polished White Concrete', 'Perforated Brass Panels'],
      timeline: '18 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Solar chimneys induce stack-effect natural ventilation without mechanical chillers.'
    },
    floorPlan: {
      title: 'GROUND FLOOR — CIVIC GALLERY & AMPHITHEATRE',
      image: lumenCenterImg,
      spots: [
        {
          id: 'central-hall',
          label: 'SOLAR LIGHT PAVILION',
          description: 'Double-height exhibition hall illuminated by 32 overhead light scoops.',
          area: '850 SQ. M',
          x: 45,
          y: 40
        },
        {
          id: 'auditorium',
          label: 'ACOUSTIC AMPHITHEATRE',
          description: 'A 350-seat sunken hall clad in sound-diffusing micro-perforated timber panels.',
          area: '620 SQ. M',
          x: 75,
          y: 30
        }
      ]
    },
    highlights: [
      '32 sculptured roof light scoops tracking peak daylight',
      'Natural passive cooling system reducing operational energy by 68%',
      'Sustainably harvested local eucalyptus glulam structural roof arches'
    ]
  },
  {
    id: 'bole-horizon-tower',
    number: '03',
    title: 'BOLE HORIZON TOWER',
    subtitle: 'High-Density Kinetic Facade Architecture',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'COMMERCIAL',
    heroImage: boleTowerImg,
    previewImage: boleTowerImg,
    galleryImages: [
      boleTowerImg,
      heroTowerImg,
      lumenCenterImg,
      terrainVillaImg,
      hawassaRetreatImg
    ],
    description: 'A 28-story mixed-use architectural tower incorporating a dynamic kinetic shading envelope. Micro-sensors automatically rotate bronze anodized louvers to mitigate solar gain while maintaining clear urban views.',
    concept: 'Adaptive skin technology—a living building envelope that breathes and transforms with atmospheric conditions.',
    specs: {
      area: '24,000 SQ. M',
      structuralType: 'Composite Steel Frame & Outrigger Core',
      materials: ['Anodized Bronze Panels', 'High-Performance Double Glazing', 'Recycled Steel Grid'],
      timeline: '30 MONTHS',
      status: 'UNDER CONSTRUCTION',
      climateStrategy: 'Automated solar shading panels reducing HVAC cooling load by 42%.'
    },
    floorPlan: {
      title: 'LEVEL 14 — SKY GARDEN & EXECUTIVE PLATFORM',
      image: boleTowerImg,
      spots: [
        {
          id: 'sky-atrium',
          label: '360° SKY GARDEN ATRIUM',
          description: 'Triple-height indoor tropical forest acting as a bio-filter and communal lounge.',
          area: '410 SQ. M',
          x: 50,
          y: 50
        }
      ]
    },
    highlights: [
      '1,200 motorized solar-tracking bronze facade louvers',
      'Sky garden skybridges connecting interior office modules',
      'LEED Platinum certification targeted'
    ]
  },
  {
    id: 'hawassa-lake-retreat',
    number: '04',
    title: 'HAWASSA LAKE RETREAT',
    subtitle: 'Rammed Earth & Floating Waterfront Pavilion',
    location: 'HAWASSA, ETHIOPIA',
    year: '2026',
    category: 'HOSPITALITY',
    heroImage: hawassaRetreatImg,
    previewImage: hawassaRetreatImg,
    galleryImages: [
      hawassaRetreatImg,
      terrainVillaImg,
      heroTowerImg,
      lumenCenterImg,
      boleTowerImg
    ],
    description: 'Constructed from site-sourced volcanic soil and rammed earth, the Hawassa Lake Retreat merges tactile earthiness with sleek modern glass planes floating directly above the lake edge.',
    concept: 'Earth, timber, and water in quiet equilibrium. Low horizon silhouettes preserving the natural wetland shoreline.',
    specs: {
      area: '1,250 SQ. M',
      structuralType: 'Rammed Earth Monoliths & Teak Timber Roof Truss',
      materials: ['Rammed Earth', 'Local Teak', 'Thermal Glass', 'Lava Rock Paving'],
      timeline: '14 MONTHS',
      status: 'BUILT',
      climateStrategy: 'Rammed earth walls (600mm thick) provide exceptional thermal damping.'
    },
    floorPlan: {
      title: 'WATERFRONT DECK & DINING SANCTUARY',
      image: hawassaRetreatImg,
      spots: [
        {
          id: 'floating-deck',
          label: 'CANTILEVERED WATER DECK',
          description: 'Floating timber deck extending 18m into the lake with submerged seating pods.',
          area: '320 SQ. M',
          x: 35,
          y: 42
        }
      ]
    },
    highlights: [
      '100% locally sourced site soil used for rammed earth construction',
      'Off-grid solar and greywater bio-wetland filtration system',
      'Seamless glass corner panels sliding into hidden wall pockets'
    ]
  }
];

export const FLOATING_IMAGE_POPUPS: FloatingImageItem[] = [
  {
    id: 'popup-01',
    src: terrainVillaImg,
    alt: 'Cantilever Structural Detail',
    title: 'TERRAIN CANTILEVER DETAIL',
    location: 'ENTOTO RIDGE, ADDIS ABABA',
    position: 'right-upper',
    triggerSectionId: 'philosophy',
    projectRefId: 'terrain-cantilever-villa'
  },
  {
    id: 'popup-02',
    src: lumenCenterImg,
    alt: 'Light Scoop Interior Arc',
    title: 'LUMEN SOLAR SHAFT',
    location: 'CULTURAL QUARTER',
    position: 'left-lower',
    triggerSectionId: 'manifesto',
    projectRefId: 'lumen-cultural-center'
  },
  {
    id: 'popup-03',
    src: boleTowerImg,
    alt: 'Bronze Facade Grid',
    title: 'KINETIC BRONZE LOUVER',
    location: 'BOLE FINANCIAL DISTRICT',
    position: 'right-upper',
    triggerSectionId: 'materials',
    projectRefId: 'bole-horizon-tower'
  },
  {
    id: 'popup-04',
    src: hawassaRetreatImg,
    alt: 'Rammed Earth Waterfront',
    title: 'RAMMED EARTH & WATER',
    location: 'LAKE HAWASSA SHORELINE',
    position: 'left-upper',
    triggerSectionId: 'sustainability',
    projectRefId: 'hawassa-lake-retreat'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    year: 'PHASE 01',
    title: 'GEOTECHNICAL & SITE TERRAIN ANALYSIS',
    phase: 'Months 01 — 03',
    description: '3D LiDAR topography scanning, soil density sampling, and solar radiation mapping across seasons.',
    image: terrainVillaImg,
    specs: 'Precision: 1mm LiDAR grid density'
  },
  {
    year: 'PHASE 02',
    title: 'PARAMETRIC FORM GENERATION & SOLAR CHIMNEYS',
    phase: 'Months 04 — 07',
    description: 'Algorithmic structural optimization minimizing concrete mass while maximizing cantilever moment resistance.',
    image: lumenCenterImg,
    specs: '3,000 computational stress iterations'
  },
  {
    year: 'PHASE 03',
    title: 'TACTILE MATERIAL CASTING & CURED CONCRETE',
    phase: 'Months 08 — 16',
    description: 'On-site trial board-formed concrete shuttering using harvested cypress planks to etch organic grain.',
    image: hawassaRetreatImg,
    specs: 'Custom 60MPa low-carbon cement mix'
  },
  {
    year: 'PHASE 04',
    title: 'KINETIC FACADE COMMISSIONING & CALIBRATION',
    phase: 'Months 17 — 22',
    description: 'Mounting bronze anodized louvers, installing sensor arrays, and calibrating solar-tracking micro-motors.',
    image: boleTowerImg,
    specs: '1,200 independently articulated louvers'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'monolithic-light',
    title: 'MONOLITHIC LIGHT: THE POETICS OF HEAVY MASS & SUNLIGHT',
    category: 'ESSAY',
    date: 'AUGUST 2026',
    readTime: '6 MIN READ',
    excerpt: 'How raw unpolished concrete and precise solar orientation convert harsh high-altitude sunlight into calming interior atmosphere.',
    image: lumenCenterImg
  },
  {
    id: 'rammed-earth-future',
    title: 'RAMMED EARTH AT SCALE: HIGH-PERFORMANCE EARTHEN STRUCTURES',
    category: 'RESEARCH',
    date: 'JUNE 2026',
    readTime: '8 MIN READ',
    excerpt: 'Engineering volcanic subsoil with zero-cement stabilizers to achieve load-bearing capacities suitable for multi-story residential architecture.',
    image: hawassaRetreatImg
  },
  {
    id: 'cantilever-mechanics',
    title: 'THE 14-METER cantilever: DEFYING TOPOGRAPHY IN MOUNTAIN VILLAS',
    category: 'TECHNICAL',
    date: 'APRIL 2026',
    readTime: '10 MIN READ',
    excerpt: 'Deep dive into post-tensioning anchor layouts, wind vibration dampening, and thermal break engineering for extreme cantilevers.',
    image: terrainVillaImg
  }
];

