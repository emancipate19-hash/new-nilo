import { Project, FloatingImageItem, TimelineStep, JournalArticle } from '../types';
import {
  heroTowerImg,
  projectImg1,
  projectImg2,
  projectImg3,
  projectImg4,
  projectImg5,
  projectImg6,
  projectImg7,
  projectImg8,
  projectImg9
} from '../assets/images/defaultAssets';

export const PROJECTS: Project[] = [
  {
    id: 'terrain-cantilever-villa',
    number: '01',
    title: 'TERRAIN CANTILEVER VILLA',
    subtitle: 'Monolithic Habitation in Mountain Terrain',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'RESIDENTIAL',
    heroImage: projectImg1,
    previewImage: projectImg1,
    galleryImages: [
      projectImg1,
      projectImg2,
      projectImg3,
      projectImg4,
      projectImg5,
      projectImg6
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
      image: projectImg1,
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
    heroImage: projectImg2,
    previewImage: projectImg2,
    galleryImages: [
      projectImg2,
      projectImg3,
      projectImg1,
      projectImg5,
      projectImg7
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
      image: projectImg2,
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
    heroImage: projectImg3,
    previewImage: projectImg3,
    galleryImages: [
      projectImg3,
      projectImg4,
      projectImg6,
      projectImg8,
      projectImg1
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
      image: projectImg3,
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
    heroImage: projectImg4,
    previewImage: projectImg4,
    galleryImages: [
      projectImg4,
      projectImg5,
      projectImg6,
      projectImg7,
      projectImg8
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
      image: projectImg4,
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
  },
  {
    id: 'solarium-zen-sanctuary',
    number: '05',
    title: 'SOLARIUM ZEN SANCTUARY',
    subtitle: 'High-Altitude Biophilic Residence',
    location: 'ENTOTO HIGHLANDS, ETHIOPIA',
    year: '2026',
    category: 'RESIDENTIAL',
    heroImage: projectImg5,
    previewImage: projectImg5,
    galleryImages: [
      projectImg5,
      projectImg6,
      projectImg7,
      projectImg8,
      projectImg9
    ],
    description: 'An expansive modern pavilion nestled amidst eucalyptus woodlands, with double-cantilever stone roofs and acoustic water channels framing views of the Rift Valley.',
    concept: 'Seamless thresholds where indoor living spaces effortlessly merge into high-altitude alpine gardens.',
    specs: {
      area: '950 SQ. M',
      structuralType: 'Post-Tensioned White Concrete & Basalt Masonry',
      materials: ['Basalt Stone', 'Thermally Treated Ash', 'Structural Glazing', 'Brushed Copper'],
      timeline: '16 MONTHS',
      status: 'BUILT',
      climateStrategy: 'Subterranean geothermal heat loop and triple-glazed low-E thermal envelope.'
    },
    floorPlan: {
      title: 'LEVEL 01 — LIVING ATRIUM & SPA',
      image: projectImg5,
      spots: [
        {
          id: 'spa-pavilion',
          label: 'GEOTHERMAL THERMAL SPA',
          description: 'Natural mineral bath heated by subterranean thermal loops.',
          area: '140 SQ. M',
          x: 40,
          y: 55
        }
      ]
    },
    highlights: [
      'Zero-carbon operational footprint with on-site solar storage',
      'Integrated rainwater harvest and bio-swale perimeter irrigation'
    ]
  },
  {
    id: 'monolith-civic-pavilion',
    number: '06',
    title: 'MONOLITH CIVIC PAVILION',
    subtitle: 'Sculptural Concrete Public Forum',
    location: 'MESKEL SQUARE, ADDIS ABABA',
    year: '2025',
    category: 'CIVIC',
    heroImage: projectImg6,
    previewImage: projectImg6,
    galleryImages: [
      projectImg6,
      projectImg7,
      projectImg8,
      projectImg9,
      projectImg1
    ],
    description: 'A monument to modern public life featuring vast sweeping white concrete hyperbolic shells that shade a stepped open-air gathering agora.',
    concept: 'Fluidity and monumental mass in harmony with civic gatherings and public cultural discourse.',
    specs: {
      area: '4,800 SQ. M',
      structuralType: 'Reinforced Ultra-High Performance Concrete (UHPC) Shells',
      materials: ['UHPC White Concrete', 'Recycled Bronze Inlays', 'Porous Terrazzo'],
      timeline: '24 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Self-shading hyperbolic geometry creating continuous passive thermal downdrafts.'
    },
    floorPlan: {
      title: 'AGORA & AMPHITHEATRE PLAZA',
      image: projectImg6,
      spots: [
        {
          id: 'main-agora',
          label: 'OPEN-AIR DIALOGUE AGORA',
          description: 'Stepped forum accommodating 1,200 citizens for lectures and concerts.',
          area: '1,800 SQ. M',
          x: 50,
          y: 45
        }
      ]
    },
    highlights: [
      'Record-setting 38-meter unbraced UHPC shell canopy',
      'Integrated acoustic diffusing micro-textures cast into raw concrete'
    ]
  }
];

export const FLOATING_IMAGE_POPUPS: FloatingImageItem[] = [
  {
    id: 'popup-01',
    src: projectImg1,
    alt: 'Cantilever Structural Detail',
    title: 'TERRAIN CANTILEVER DETAIL',
    location: 'ENTOTO RIDGE, ADDIS ABABA',
    position: 'right-upper',
    triggerSectionId: 'philosophy',
    projectRefId: 'terrain-cantilever-villa'
  },
  {
    id: 'popup-02',
    src: projectImg2,
    alt: 'Light Scoop Interior Arc',
    title: 'LUMEN SOLAR SHAFT',
    location: 'CULTURAL QUARTER',
    position: 'left-lower',
    triggerSectionId: 'manifesto',
    projectRefId: 'lumen-cultural-center'
  },
  {
    id: 'popup-03',
    src: projectImg3,
    alt: 'Bronze Facade Grid',
    title: 'KINETIC BRONZE LOUVER',
    location: 'BOLE FINANCIAL DISTRICT',
    position: 'right-upper',
    triggerSectionId: 'materials',
    projectRefId: 'bole-horizon-tower'
  },
  {
    id: 'popup-04',
    src: projectImg4,
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
    image: projectImg1,
    specs: 'Precision: 1mm LiDAR grid density'
  },
  {
    year: 'PHASE 02',
    title: 'PARAMETRIC FORM GENERATION & SOLAR CHIMNEYS',
    phase: 'Months 04 — 07',
    description: 'Algorithmic structural optimization minimizing concrete mass while maximizing cantilever moment resistance.',
    image: projectImg2,
    specs: '3,000 computational stress iterations'
  },
  {
    year: 'PHASE 03',
    title: 'TACTILE MATERIAL CASTING & CURED CONCRETE',
    phase: 'Months 08 — 16',
    description: 'On-site trial board-formed concrete shuttering using harvested cypress planks to etch organic grain.',
    image: projectImg3,
    specs: 'Custom 60MPa low-carbon cement mix'
  },
  {
    year: 'PHASE 04',
    title: 'KINETIC FACADE COMMISSIONING & CALIBRATION',
    phase: 'Months 17 — 22',
    description: 'Mounting bronze anodized louvers, installing sensor arrays, and calibrating solar-tracking micro-motors.',
    image: projectImg4,
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
    image: projectImg2
  },
  {
    id: 'rammed-earth-future',
    title: 'RAMMED EARTH AT SCALE: HIGH-PERFORMANCE EARTHEN STRUCTURES',
    category: 'RESEARCH',
    date: 'JUNE 2026',
    readTime: '8 MIN READ',
    excerpt: 'Engineering volcanic subsoil with zero-cement stabilizers to achieve load-bearing capacities suitable for multi-story residential architecture.',
    image: projectImg4
  },
  {
    id: 'cantilever-mechanics',
    title: 'THE 14-METER CANTILEVER: DEFYING TOPOGRAPHY IN MOUNTAIN VILLAS',
    category: 'TECHNICAL',
    date: 'APRIL 2026',
    readTime: '10 MIN READ',
    excerpt: 'Deep dive into post-tensioning anchor layouts, wind vibration dampening, and thermal break engineering for extreme cantilevers.',
    image: projectImg1
  }
];

