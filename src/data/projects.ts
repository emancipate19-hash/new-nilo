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
  projectImg9,
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
  residentialImg10,
  staffDawitImg,
  staffKidusImg,
  staffMilkiImg
} from '../assets/images/defaultAssets';

export const WORK_CATEGORIES = [
  'Architectural Design',
  'Residential Architecture',
  'Commercial Architecture',
  'Interior Design',
  'Renovation / Remodeling',
  '3D Visualization & Rendering',
  'Graphic Design',
  'Branding & Visual Identity',
  'Video Editing',
  'Web Development',
  'Digital Storytelling',
  'Social Media / Digital Campaigns'
] as const;

export type WorkCategory = typeof WORK_CATEGORIES[number];

export const PROJECTS: Project[] = [
  // 1. Architectural Design
  {
    id: 'lumen-cultural-center',
    number: '01',
    title: 'LUMEN CULTURAL PAVILION',
    subtitle: 'Parametric Geometry & Solar Arc Orientation',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Architectural Design',
    heroImage: projectImg2,
    previewImage: projectImg2,
    galleryImages: [projectImg2, projectImg1, projectImg3, projectImg5, projectImg7],
    description: 'Designed as a civic sanctuary, the Lumen Cultural Pavilion features rhythmic timber fins that track the solar arc. Sunlight penetrates deep into gallery spaces, casting geometric shadow tapestries throughout the day.',
    concept: 'Sculpting space through sunlight angles, passive ventilation flues, and reflective stone pools.',
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
    id: 'solarium-zen-sanctuary',
    number: '02',
    title: 'SOLARIUM HIGH-ALTITUDE PAVILION',
    subtitle: 'Biophilic Spatial Architecture',
    location: 'ENTOTO HIGHLANDS, ETHIOPIA',
    year: '2026',
    category: 'Architectural Design',
    heroImage: projectImg5,
    previewImage: projectImg5,
    galleryImages: [projectImg5, projectImg6, projectImg7, projectImg8, projectImg9],
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
          label: 'GEOTHERMAL SPA',
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

  // 2. Residential Architecture
  {
    id: 'terrain-cantilever-villa',
    number: '03',
    title: 'TERRAIN CANTILEVER VILLA',
    subtitle: 'Monolithic Habitation in Mountain Terrain',
    location: 'ENTOTO RIDGE, ADDIS ABABA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg1,
    previewImage: residentialImg1,
    galleryImages: [residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10],
    description: 'Suspended dramatically over the Entoto hillside, the Terrain Cantilever Villa negotiates extreme topography through post-tensioned concrete slabs and triple-glazed curtain walls projecting 14 meters into open air without vertical ground supports.',
    concept: 'Form following topography—minimizing ground footprint while maximizing passive wind capture and panoramic valley vistas.',
    specs: {
      area: '820 SQ. M',
      structuralType: 'Post-Tensioned Concrete & Structural Steel Core',
      materials: ['Board-formed Concrete', 'Anodized Bronze', 'Low-E Acoustic Glass', 'Local Travertine'],
      timeline: '22 MONTHS',
      status: 'BUILT',
      climateStrategy: 'Passive thermal mass storing heat during cold nights; natural cross-ventilation flues.'
    },
    floorPlan: {
      title: 'LEVEL 02 — CANTILEVER SUITE & ATRIUM',
      image: residentialImg1,
      spots: [
        {
          id: 'cantilever-deck',
          label: '14M CANTILEVER OBSERVATION DECK',
          description: 'A floating lounge suspended above the valley with glass balustrades.',
          area: '120 SQ. M',
          x: 28,
          y: 35
        }
      ]
    },
    highlights: [
      '14-meter unbraced concrete projection over 45° slope',
      'Integrated solar roof producing 180% of daily energy demand',
      'Zero-discharge rainwater filtration & subterranean greywater vault'
    ]
  },
  {
    id: 'hawassa-lake-retreat',
    number: '04',
    title: 'HAWASSA LAKE RESIDENCE',
    subtitle: 'Rammed Earth & Floating Waterfront Villa',
    location: 'HAWASSA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg2,
    previewImage: residentialImg2,
    galleryImages: [residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1],
    description: 'Constructed from site-sourced volcanic soil and rammed earth, the Hawassa Lake Residence merges tactile earthiness with sleek modern glass planes floating directly above the lake edge.',
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
      title: 'WATERFRONT DECK & LIVING SANCTUARY',
      image: residentialImg2,
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
      'Off-grid solar and greywater bio-wetland filtration system'
    ]
  },
  {
    id: 'entoto-cliffside-monolith',
    number: '04B',
    title: 'ENTOTO CLIFFSIDE MONOLITH',
    subtitle: 'Tiered Concrete Volumes & Suspended Terraces',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg3,
    previewImage: residentialImg3,
    galleryImages: [residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2],
    description: 'A multi-tiered private residence anchored into the hillside bedrock, featuring cascading landscaped roofs, deep shaded cantilevers, and high-altitude thermal buffer zones.',
    concept: 'Harmonious descent into the mountain landscape with stepped volumetric massing.',
    specs: {
      area: '760 SQ. M',
      structuralType: 'Cascading Reinforced Concrete & Structural Basalt Piles',
      materials: ['Textured Concrete', 'Basalt Masonry', 'Low-Iron Facade Glass', 'Weathered Zinc'],
      timeline: '18 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Earth-sheltered rear wall assemblies minimizing heat loss during mountain night hours.'
    },
    floorPlan: {
      title: 'UPPER OBSERVATION LEVEL & LIVING SALON',
      image: residentialImg3,
      spots: [
        {
          id: 'cliff-terrace',
          label: 'PANORAMIC CLIFF TERRACE',
          description: 'Cantilevered terrace overlooking the south ridge with perimeter infinity reflection pool.',
          area: '160 SQ. M',
          x: 48,
          y: 45
        }
      ]
    },
    highlights: [
      'Deep cantilever eaves engineered to block high summer solar radiation',
      'Integrated geothermal ground loops coupled with radiant underfloor heating'
    ]
  },
  {
    id: 'highland-zenith-villa',
    number: '04C',
    title: 'HIGHLAND ZENITH VILLA',
    subtitle: 'Sculptured Rooflines & Continuous Glazed Envelopes',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg4,
    previewImage: residentialImg4,
    galleryImages: [residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3],
    description: 'An aerodynamic residential masterpiece featuring continuous double-curved roof profiles that deflect high-altitude winds while capturing maximum daylight and valley panoramas.',
    concept: 'Aerodynamic spatial geometry embracing highland atmospheric currents and light.',
    specs: {
      area: '890 SQ. M',
      structuralType: 'Curvilinear Steel Truss & Precast White Concrete Elements',
      materials: ['Curved Zinc Roofing', 'Architectural Timber Slatting', 'Ultra-Clear Glazing', 'Honed Slate'],
      timeline: '20 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Aerodynamic roof form channeling natural ventilation stack effects across all levels.'
    },
    floorPlan: {
      title: 'MAIN PAVILION & GRAND ATRIUM',
      image: residentialImg4,
      spots: [
        {
          id: 'zenith-atrium',
          label: 'DOUBLE-HEIGHT LIGHT ATRIUM',
          description: 'Central living atrium framed by 8-meter floor-to-ceiling panoramic glass panels.',
          area: '210 SQ. M',
          x: 52,
          y: 40
        }
      ]
    },
    highlights: [
      'Custom curved zinc standing-seam roof with integrated solar PV arrays',
      'Structural glass corner windows with zero vertical mullions'
    ]
  },
  {
    id: 'botanical-courtyard-residence',
    number: '04D',
    title: 'BOTANICAL COURTYARD RESIDENCE',
    subtitle: 'Central Flora Atrium & Introspective Living Cloister',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg5,
    previewImage: residentialImg5,
    galleryImages: [residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4],
    description: 'Conceived as an introspective domestic sanctuary, the home wraps around a lush, bioclimatic central courtyard filled with endemic flora, reflective stone pools, and shaded verandas.',
    concept: 'Inward serenity—creating private natural microclimates within urban residential density.',
    specs: {
      area: '680 SQ. M',
      structuralType: 'Post-Tensioned Concrete Frame & Timber Post-and-Beam Cloister',
      materials: ['Fluted Concrete', 'Oiled Teak Cladding', 'Black Basalt', 'Acoustic Glass'],
      timeline: '15 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Courtyard evaporative microclimate cooling ambient air by 4.5°C naturally.'
    },
    floorPlan: {
      title: 'CLOISTER LEVEL & INNER SANCTUARY',
      image: residentialImg5,
      spots: [
        {
          id: 'inner-garden',
          label: 'CENTRAL BIOCLIMATIC CLOISTER',
          description: 'Protected open-air courtyard garden providing passive cooling and tranquil focal views.',
          area: '180 SQ. M',
          x: 50,
          y: 50
        }
      ]
    },
    highlights: [
      '100% permeable courtyard ground surface with subsurface rainwater reservoirs',
      'Motorized louvered roof panels modulating rain, sun, and airflow over the garden'
    ]
  },
  {
    id: 'cantilevered-ridge-estate',
    number: '04E',
    title: 'CANTILEVERED RIDGE ESTATE',
    subtitle: 'Floating Volumes & Precision Structural Engineering',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg6,
    previewImage: residentialImg6,
    galleryImages: [residentialImg6, residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5],
    description: 'A striking architectural statement balancing bold cantilevered upper floor volumes over a transparent glass ground floor, establishing visual weightlessness against natural slopes.',
    concept: 'Defying gravity through high-performance composite structural engineering.',
    specs: {
      area: '940 SQ. M',
      structuralType: 'Structural Steel Outrigger & Post-Tensioned Monolith Slabs',
      materials: ['Charred Cedar Panels', 'Brushed Bronze Metal', 'High-Performance Glazing', 'Raw Concrete'],
      timeline: '21 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Overhanging upper volumes provide natural shade for lower glass facades.'
    },
    floorPlan: {
      title: 'CANTILEVERED UPPER WING & SUITES',
      image: residentialImg6,
      spots: [
        {
          id: 'sky-lounge',
          label: 'SUSPENDED SKY SALON',
          description: 'Upper cantilevered lounge projecting 12m over the garden slope with 270° views.',
          area: '140 SQ. M',
          x: 44,
          y: 38
        }
      ]
    },
    highlights: [
      '12-meter unbraced cantilevered living box with floor-to-ceiling glass end wall',
      'Integrated acoustic vibration dampers ensuring absolute structural stiffness'
    ]
  },
  {
    id: 'tectonic-stone-sanctuary',
    number: '04F',
    title: 'TECTONIC STONE RESIDENTIAL SANCTUARY',
    subtitle: 'Hand-Hewn Basalt & Warm Minimalist Craftsmanship',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg7,
    previewImage: residentialImg7,
    galleryImages: [residentialImg7, residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6],
    description: 'A fortress of tranquility sculpted from locally quarried hand-dressed stone, framed by bronze anodized accents and serene Japanese-inspired reflection gardens.',
    concept: 'Mass, permanence, and silence—honoring geological materials and artisanal masonry.',
    specs: {
      area: '810 SQ. M',
      structuralType: 'Load-Bearing Basalt Masonry & Post-Tensioned Roof Slabs',
      materials: ['Hand-Chiseled Basalt', 'Smoked Oak', 'Bronze Anodized Aluminum', 'Thermal Glazing'],
      timeline: '19 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'High-density masonry walls providing unmatched acoustic isolation and thermal inertia.'
    },
    floorPlan: {
      title: 'STONE COURTYARD & GALLERY HALL',
      image: residentialImg7,
      spots: [
        {
          id: 'stone-sanctum',
          label: 'MONOLITHIC LIVING ROTUNDA',
          description: 'Circular living room wrapped in hand-laid basalt with circular central skylight.',
          area: '115 SQ. M',
          x: 46,
          y: 48
        }
      ]
    },
    highlights: [
      'Locally sourced stone reducing embodied carbon by 58% compared to imported cladding',
      'Artisanal hand-chiseled surface textures by master local stonemasons'
    ]
  },
  {
    id: 'modern-atrium-dwelling',
    number: '04G',
    title: 'MODERN ATRIUM DWELLING',
    subtitle: 'Transparent Volumes, Steel Precision & Light Sculptures',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg8,
    previewImage: residentialImg8,
    galleryImages: [residentialImg8, residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7],
    description: 'A light-filled contemporary dwelling featuring open double-height volumes, exposed slender steel structures, and floating interior mezzanine bridges.',
    concept: 'Dematerializing boundaries between indoor comfort and atmospheric sky views.',
    specs: {
      area: '720 SQ. M',
      structuralType: 'Precision Structural Steel Skeleton & Opti-White Curtain Wall',
      materials: ['Structural Steel', 'Opti-White Low-E Glass', 'Rift White Oak', 'Cast Terrazzo'],
      timeline: '16 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Automated solar-tracking interior micro-blinds reducing cooling load by 35%.'
    },
    floorPlan: {
      title: 'GREAT HALL & MEZZANINE BRIDGE',
      image: residentialImg8,
      spots: [
        {
          id: 'glass-bridge',
          label: 'SUSPENDED MEZZANINE BRIDGE',
          description: 'Glass-floored aerial walkway linking private family suites across the double-height hall.',
          area: '35 SQ. M',
          x: 52,
          y: 35
        }
      ]
    },
    highlights: [
      'Slender 100mm steel columns supporting open 14-meter clear-span living volumes',
      'Integrated home automation controlling natural daylighting, temperature, and ventilation'
    ]
  },
  {
    id: 'panoramic-horizon-villa',
    number: '04H',
    title: 'PANORAMIC HORIZON VILLA',
    subtitle: 'Horizontal Ribbon Architecture & Infinity Living',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg9,
    previewImage: residentialImg9,
    galleryImages: [residentialImg9, residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8],
    description: 'Low-slung horizontal architecture extending along natural ridgeline contours, featuring endless floor-to-ceiling glass horizons, wide cantilevered eaves, and private reflection pools.',
    concept: 'Celebrating the horizontal plane as the most peaceful architectural posture.',
    specs: {
      area: '860 SQ. M',
      structuralType: 'Post-Tensioned Horizontal Monolith Slabs & Slim Steel Posts',
      materials: ['Honed Travertine', 'Custom Black Anodized Aluminum', 'Clear Solar Control Glass'],
      timeline: '17 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Overhanging roof eaves designed precisely for regional sun angles.'
    },
    floorPlan: {
      title: 'HORIZON DECK & RESIDENTIAL SUITES',
      image: residentialImg9,
      spots: [
        {
          id: 'horizon-pool',
          label: 'INFINITY REFLECTION POOL',
          description: '25-meter linear black granite reflection pool merging with the horizon sky line.',
          area: '150 SQ. M',
          x: 40,
          y: 60
        }
      ]
    },
    highlights: [
      'Zero-threshold pocket sliding doors opening 18 meters of living room completely to nature',
      'Geothermal pool heating powered by on-site solar photovoltaic collectors'
    ]
  },
  {
    id: 'sculpted-monolithic-manor',
    number: '04I',
    title: 'SCULPTED MONOLITHIC RESIDENCE',
    subtitle: 'Timeless Volumetric Massing & Private Estate Sanctuary',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Residential Architecture',
    heroImage: residentialImg10,
    previewImage: residentialImg10,
    galleryImages: [residentialImg10, residentialImg1, residentialImg2, residentialImg3, residentialImg4, residentialImg5, residentialImg6, residentialImg7, residentialImg8, residentialImg9],
    description: 'An imposing yet deeply refined residential estate composed of sculptured cast-in-place architectural concrete blocks, recessed shaded loggias, and grand double-height family spaces.',
    concept: 'Sculptural permanence rooted in contemporary architectural elegance.',
    specs: {
      area: '1,100 SQ. M',
      structuralType: 'Cast-In-Place White Architectural Concrete & Steel Framing',
      materials: ['White Architectural Concrete', 'Dark Bronze Facets', 'Italian Marble', 'Fluted Teak'],
      timeline: '24 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Double-skin thermal envelope with ventilated facade cavities for optimum temperature stability.'
    },
    floorPlan: {
      title: 'GRAND SALON & PRIVATE ESTATE GROUNDS',
      image: residentialImg10,
      spots: [
        {
          id: 'grand-salon',
          label: 'SCULPTED CENTRAL LOGGIA',
          description: 'Recessed shaded outdoor living loggia opening onto landscaped private estate grounds.',
          area: '190 SQ. M',
          x: 50,
          y: 45
        }
      ]
    },
    highlights: [
      'Bespoke architectural white concrete mix with aggregate from local riverbeds',
      'Full smart micro-grid with battery backup ensuring 100% off-grid reliability'
    ]
  },

  // 3. Commercial Architecture
  {
    id: 'bole-horizon-tower',
    number: '05',
    title: 'BOLE HORIZON TOWER',
    subtitle: 'High-Density Kinetic Facade Commercial Landmark',
    location: 'BOLE DISTRICT, ADDIS ABABA',
    year: '2026',
    category: 'Commercial Architecture',
    heroImage: projectImg3,
    previewImage: projectImg3,
    galleryImages: [projectImg3, projectImg4, projectImg6, projectImg8, projectImg1],
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
      'Targeting LEED Platinum certification'
    ]
  },
  {
    id: 'metropolis-commercial-hub',
    number: '06',
    title: 'NEXUS COMMERCIAL HEADQUARTERS',
    subtitle: 'Biophilic Atrium & Corporate Office Complex',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2025',
    category: 'Commercial Architecture',
    heroImage: projectImg8,
    previewImage: projectImg8,
    galleryImages: [projectImg8, projectImg3, projectImg6, projectImg2],
    description: 'A multi-tier corporate center structured around a central 6-story vertical light shaft and living green walls, facilitating spontaneous collaboration across tech and financial enterprises.',
    concept: 'Vertical connectivity and biophilic interior atmospheres replacing conventional cubicle layouts.',
    specs: {
      area: '18,500 SQ. M',
      structuralType: 'Reinforced Post-Tensioned Concrete & Curtain Wall',
      materials: ['Low-E Double Glazing', 'Raw Concrete', 'Acoustic Felt', 'Reclaimed Teak'],
      timeline: '24 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Underfloor air distribution with radiant floor cooling.'
    },
    floorPlan: {
      title: 'LEVEL 04 — CO-WORKING ATRIUM',
      image: projectImg8,
      spots: [
        {
          id: 'atrium-hub',
          label: 'COLLABORATIVE MEZZANINE',
          description: 'Tiered bleacher seating overlooking the central sunlit court.',
          area: '380 SQ. M',
          x: 48,
          y: 52
        }
      ]
    },
    highlights: [
      '6-story open atrium promoting daylight distribution across all floorplates',
      'Integrated rainwater thermal storage system'
    ]
  },

  // 4. Interior Design
  {
    id: 'monolith-interior-sanctuary',
    number: '07',
    title: 'ATELIER PENTHOUSE INTERIORS',
    subtitle: 'Bespoke Millwork, Materiality & Lighting Choreography',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg1,
    previewImage: interiorImg1,
    galleryImages: [interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10],
    description: 'Custom interior curation combining hand-cast micro-cement walls, smoked oak millwork, brushed brass fittings, and hidden indirect cove illumination creating meditative luxury residential living.',
    concept: 'Monastic serenity through restrained palettes and seamless architectural joinery.',
    specs: {
      area: '450 SQ. M',
      structuralType: 'Custom Architectural Millwork & Custom Built-ins',
      materials: ['Smoked Oak', 'Micro-cement', 'Basalt Stone Countertops', 'Brushed Brass'],
      timeline: '8 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Concealed acoustic insulation dampening urban ambient noise by 38dB.'
    },
    floorPlan: {
      title: 'PENTHOUSE LIVING & CULINARY WING',
      image: interiorImg1,
      spots: [
        {
          id: 'culinary-island',
          label: 'MONOLITHIC BASALT KITCHEN ISLAND',
          description: 'Single-block stone island with integrated flush induction surfaces.',
          area: '65 SQ. M',
          x: 42,
          y: 46
        }
      ]
    },
    highlights: [
      'Zero-hardware touch latch cabinetry with hidden mechanical runs',
      'Circadian lighting system adjusting color temperature from 2200K to 4000K'
    ]
  },
  {
    id: 'executive-lounge-interior',
    number: '08',
    title: 'ZENITH EXECUTIVE SUITE',
    subtitle: 'High-End Hospitality & Boardroom Spatial Interiors',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg2,
    previewImage: interiorImg2,
    galleryImages: [interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1],
    description: 'A sophisticated private suite featuring acoustic slatted timber ceilings, velvet banquettes, custom marble credenzas, and integrated smart media presentation glass.',
    concept: 'Quiet luxury where tactile textures stimulate focus and relaxed dialogue.',
    specs: {
      area: '320 SQ. M',
      structuralType: 'Acoustic Paneling & Custom Millwork',
      materials: ['Walnut Veneer', 'Calacatta Marble', 'Leather Wall Tiles'],
      timeline: '6 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Discreet linear slot diffusers providing silent climate control.'
    },
    floorPlan: {
      title: 'EXECUTIVE LOUNGE & CONFERENCE SUITE',
      image: interiorImg2,
      spots: [
        {
          id: 'board-suite',
          label: 'ACOUSTIC BOARD CHAMBER',
          description: '16-person bespoke walnut conference table with embedded power and microphones.',
          area: '90 SQ. M',
          x: 55,
          y: 40
        }
      ]
    },
    highlights: [
      'Acoustic reverberation time under 0.4s for pristine conferencing',
      'Bespoke hand-tufted wool rugs echoing topographical contour lines'
    ]
  },
  {
    id: 'minimalist-residential-sanctuary',
    number: '08B',
    title: 'MINIMALIST RESIDENTIAL SANCTUARY',
    subtitle: 'Tactile Earth Tones & Artisanal Millwork',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg3,
    previewImage: interiorImg3,
    galleryImages: [interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2],
    description: 'Harmonious open-concept interior featuring earth plaster finishes, organic textured textiles, and soft continuous ambient lighting designed for restful modern living.',
    concept: 'Warm minimalism celebrating material authenticity and spacious serenity.',
    specs: {
      area: '380 SQ. M',
      structuralType: 'Bespoke Architectural Millwork & Lime Plaster',
      materials: ['Natural Lime Plaster', 'Fluted Oak', 'Honed Travertine', 'Linen'],
      timeline: '7 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Thermal mass interior walls regulating daily indoor temperature swings.'
    },
    floorPlan: {
      title: 'MAIN RESIDENTIAL SALON & LOUNGE',
      image: interiorImg3,
      spots: [
        {
          id: 'living-zone',
          label: 'CENTRAL SUNKEN LOUNGE',
          description: 'Custom upholstered seating sunken into wide-plank oak flooring.',
          area: '85 SQ. M',
          x: 50,
          y: 48
        }
      ]
    },
    highlights: [
      'Seamless micro-fluted wood detailing on all storage partitions',
      'Integrated hidden climate diffusers maintaining minimal aesthetic ceiling plane'
    ]
  },
  {
    id: 'biophilic-living-atelier',
    number: '08C',
    title: 'BIOPHILIC LIVING ATELIER',
    subtitle: 'Integrated Flora, Natural Light & Stone Geometry',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg4,
    previewImage: interiorImg4,
    galleryImages: [interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3],
    description: 'An indoor oasis fusing living green walls, sculptured basalt rock planters, and expansive floor-to-ceiling panoramic glass to merge indoor comfort with natural vitality.',
    concept: 'Deep ecological wellness through direct visual and tactile connection with living plants.',
    specs: {
      area: '520 SQ. M',
      structuralType: 'Sub-Irrigated Indoor Planters & Custom Stone Features',
      materials: ['Basalt Stone', 'Living Moss & Ferns', 'Cast Terrazzo', 'Gunmetal Steel'],
      timeline: '9 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Automated hydro-misting system enhancing indoor relative humidity.'
    },
    floorPlan: {
      title: 'ATRIUM & CONSERVATORY LOUNGE',
      image: interiorImg4,
      spots: [
        {
          id: 'botanical-core',
          label: 'CENTRAL BIOPHILIC ATRIUM',
          description: 'Multi-species living wall with automated circadian grow lighting.',
          area: '110 SQ. M',
          x: 48,
          y: 42
        }
      ]
    },
    highlights: [
      'Custom hydroponic self-filtering plant wall requiring minimal maintenance',
      'Custom basalt rock bench heated by geothermal floor loops'
    ]
  },
  {
    id: 'contemporary-dwelling-interiors',
    number: '08D',
    title: 'CONTEMPORARY DWELLING INTERIORS',
    subtitle: 'Sculptural Volumes & Custom Architectural Furniture',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg5,
    previewImage: interiorImg5,
    galleryImages: [interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4],
    description: 'A curated residential interior balancing dramatic sculptural volumes with intimate seating pockets, featuring custom monolith marble tables and floating acoustic ceiling baffles.',
    concept: 'Architectural precision scaled to the intimate proportions of human touch.',
    specs: {
      area: '410 SQ. M',
      structuralType: 'Suspended Acoustic Baffles & Floating Architectural Volumes',
      materials: ['Nero Marquina Marble', 'Acoustic Wool Felt', 'Charred Cedar', 'Bronze'],
      timeline: '8 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Cross-ventilating operable clerestory transoms for fresh air exchange.'
    },
    floorPlan: {
      title: 'GREAT ROOM & DINING GALLERY',
      image: interiorImg5,
      spots: [
        {
          id: 'dining-gallery',
          label: 'SCULPTURAL DINING PAVILION',
          description: 'Single-piece 4.2m marble slab dining table with cantilevered pedestal base.',
          area: '70 SQ. M',
          x: 52,
          y: 45
        }
      ]
    },
    highlights: [
      'Concealed magnetic architectural tracks for flexible gallery spot lighting',
      'Hand-applied natural mineral wax finish preserving tactile wood grain'
    ]
  },
  {
    id: 'tactile-timber-concrete-salon',
    number: '08E',
    title: 'TACTILE RAW TIMBER & CONCRETE SALON',
    subtitle: 'Warm Architectural Joinery & Shadow Reveal Detailing',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg6,
    previewImage: interiorImg6,
    galleryImages: [interiorImg6, interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5],
    description: 'Refined dialogue between exposed board-formed concrete structural columns and warm vertical slatted timber paneling with recessed bronze light channels.',
    concept: 'Harmonizing structural strength with warm domestic comfort.',
    specs: {
      area: '360 SQ. M',
      structuralType: 'Architectural Timber Cladding & Exposed Structural Elements',
      materials: ['Board-formed Concrete', 'Rift White Oak', 'Raw Steel', 'Bouclé Fabric'],
      timeline: '6 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Radiant floor heating beneath polished concrete topping slab.'
    },
    floorPlan: {
      title: 'TIMBER SALON & READING NOOK',
      image: interiorImg6,
      spots: [
        {
          id: 'timber-nook',
          label: 'ACOUSTIC TIMBER ALCOVE',
          description: 'Integrated reading alcove wrapped in acoustic oak slatting with reading sconces.',
          area: '45 SQ. M',
          x: 44,
          y: 50
        }
      ]
    },
    highlights: [
      'Continuous shadow reveals separating wall claddings from ceiling plane',
      'Zero visible fastners throughout 120 linear meters of oak cabinetry'
    ]
  },
  {
    id: 'serene-monochrome-suite',
    number: '08F',
    title: 'SERENE MONOCHROME SUITE',
    subtitle: 'Quiet Luxury, Minimal Geometry & Soft Diffuse Light',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg7,
    previewImage: interiorImg7,
    galleryImages: [interiorImg7, interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6],
    description: 'A deeply calming private suite composed in subtle tonal shifts of charcoal, bone, and warm stone with custom low-profile furniture and linen drapery.',
    concept: 'Sensory decompression through visual silence and immaculate tactile materials.',
    specs: {
      area: '290 SQ. M',
      structuralType: 'Seamless Plaster Enclosures & Concealed Storage Walls',
      materials: ['Roman Clay Plaster', 'Honed Limestone', 'Washed Linen', 'Blackened Steel'],
      timeline: '5 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Triple-glazed sound dampening acoustic window assemblies.'
    },
    floorPlan: {
      title: 'PRIMARY SUITE & DRESSING SANCTUARY',
      image: interiorImg7,
      spots: [
        {
          id: 'suite-core',
          label: 'MONOCHROME SLEEPING CHAMBER',
          description: 'Platform bed integrated seamlessly with floor-to-ceiling fabric wall paneling.',
          area: '60 SQ. M',
          x: 50,
          y: 40
        }
      ]
    },
    highlights: [
      'Acoustic decibel reduction certified at STC 55 for absolute nocturnal quiet',
      'Motorized recessed architectural blackout and sheer linen drapery tracks'
    ]
  },
  {
    id: 'curated-bespoke-salon',
    number: '08G',
    title: 'CURATED BESPOKE SALON & GALLERY',
    subtitle: 'Art Collection Choreography & Precision Exhibition Lighting',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg8,
    previewImage: interiorImg8,
    galleryImages: [interiorImg8, interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7],
    description: 'An expansive private gallery and salon tailored for exhibiting large-scale contemporary African sculpture and painting with 98+ CRI museum-grade illumination.',
    concept: 'Spatial neutrality allowing art and architecture to elevate each other.',
    specs: {
      area: '480 SQ. M',
      structuralType: 'Reinforced Gallery Walls & Heavy Load Display Anchors',
      materials: ['Acid-Etched Concrete', 'Gallery-White Plaster', 'Anodized Black Aluminum'],
      timeline: '7 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Museum-grade constant temperature and 45% relative humidity control.'
    },
    floorPlan: {
      title: 'CENTRAL ART GALLERY & RECEPTION',
      image: interiorImg8,
      spots: [
        {
          id: 'sculpture-plinth',
          label: 'PRIMARY SCULPTURE DISPLAY PLINTH',
          description: 'Reinforced structural plinth supporting multi-ton stone sculptures with spotlighting.',
          area: '95 SQ. M',
          x: 46,
          y: 44
        }
      ]
    },
    highlights: [
      'Museum-grade 98+ Color Rendering Index (CRI) tunable gallery lighting',
      'Concealed floor power and data boxes for digital art installations'
    ]
  },
  {
    id: 'mezzanine-architectural-lounge',
    number: '08H',
    title: 'HIGH-CEILING MEZZANINE LOUNGE',
    subtitle: 'Vertical Air Space, Sculpted Staircases & Linear Accents',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg9,
    previewImage: interiorImg9,
    galleryImages: [interiorImg9, interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8],
    description: 'A double-height living environment punctuated by a sculptural cantilevered steel staircase, floating glass bridge, and floor-to-ceiling library wall.',
    concept: 'Celebrating vertical volume as a liberating experiential luxury.',
    specs: {
      area: '540 SQ. M',
      structuralType: 'Structural Steel Mezzanine & Cantilevered Floating Staircase',
      materials: ['Engineered Walnut', 'Opti-White Structural Glass', 'Smoked Mirror', 'Steel'],
      timeline: '9 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'High-volume low-speed silent ceiling fans preventing thermal stratification.'
    },
    floorPlan: {
      title: 'MEZZANINE BRIDGE & DOUBLE-HEIGHT LIVING',
      image: interiorImg9,
      spots: [
        {
          id: 'mezzanine-overlook',
          label: 'CANTILEVERED GLASS MEZZANINE',
          description: 'Tempered laminated glass walkway overlooking the 7-meter high great room.',
          area: '40 SQ. M',
          x: 52,
          y: 38
        }
      ]
    },
    highlights: [
      'Double-height custom millwork library with integrated motorized rolling bronze ladder',
      'Structural glass balustrade with zero visible uprights or hardware'
    ]
  },
  {
    id: 'sculptural-ambient-suite',
    number: '08I',
    title: 'SCULPTURAL LIGHTING & RESIDENTIAL SUITE',
    subtitle: 'Bespoke Luminaire Ensembles & Plaster Curvatures',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Interior Design',
    heroImage: interiorImg10,
    previewImage: interiorImg10,
    galleryImages: [interiorImg10, interiorImg1, interiorImg2, interiorImg3, interiorImg4, interiorImg5, interiorImg6, interiorImg7, interiorImg8, interiorImg9],
    description: 'An intimate residential suite shaped with organically curving plaster walls that gently guide indirect perimeter glow and frame custom blown-glass pendant luminaires.',
    concept: 'Curvilinear warmth embracing human ergonomics and soft evening light.',
    specs: {
      area: '340 SQ. M',
      structuralType: 'Curvilinear Steel Stud Framework & Hand-Sculpted Plaster',
      materials: ['Venetian Plaster', 'Hand-Blown Amber Glass', 'Oiled Teak', 'Cashmere'],
      timeline: '6 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Concealed micro-slot ventilation preserving clean organic curved ceilings.'
    },
    floorPlan: {
      title: 'ORGANIC BEDROOM & RETREAT LOUNGE',
      image: interiorImg10,
      spots: [
        {
          id: 'curved-alcove',
          label: 'ORGANIC PLASTER BED ALCOVE',
          description: 'Seamless curving plaster alcove with integrated indirect amber cove glow.',
          area: '75 SQ. M',
          x: 48,
          y: 46
        }
      ]
    },
    highlights: [
      'Hand-crafted Italian Venetian plaster with subtle crystalline luster',
      'Bespoke dimming choreography with programmable dusk-to-dawn transitions'
    ]
  },

  // 5. Renovation / Remodeling
  {
    id: 'heritage-quarry-remodeling',
    number: '09',
    title: 'VOLCANIC QUARRY SPA TRANSFORMATION',
    subtitle: 'Adaptive Reuse & Historic Site Transformation',
    location: 'RIFT VALLEY, ETHIOPIA',
    year: '2025',
    category: 'Renovation / Remodeling',
    heroImage: projectImg9,
    previewImage: projectImg9,
    galleryImages: [projectImg9, projectImg4, projectImg1, projectImg2],
    description: 'An abandoned stone quarry converted into a subterranean geothermal wellness retreat. Retaining raw basalt cliff faces while inserting delicate glass walkways and heated mineral baths.',
    concept: 'Adaptive reuse celebrating geological patina while infusing refined modern wellness facilities.',
    specs: {
      area: '2,200 SQ. M',
      structuralType: 'Rock Anchor Stabilization & Suspended Steel Glass Bridges',
      materials: ['Exposed Basalt Cliff', 'Weathering Corten Steel', 'Thermal Glass'],
      timeline: '18 MONTHS',
      status: 'COMPLETED',
      climateStrategy: 'Natural geothermal rock temperature regulation and cavernous ventilation.'
    },
    floorPlan: {
      title: 'SUBTERRANEAN SPA & POOL CAVERN',
      image: projectImg9,
      spots: [
        {
          id: 'cavern-pool',
          label: 'HEATED MINERAL CAVERN',
          description: 'Thermal bath carved directly into volcanic quarry stone.',
          area: '260 SQ. M',
          x: 50,
          y: 50
        }
      ]
    },
    highlights: [
      'Zero new structural mass on pristine ecological hillside',
      'Preservation of 80-year-old quarry rock carving marks'
    ]
  },

  // 6. 3D Visualization & Rendering
  {
    id: 'photoreal-cinematic-render',
    number: '10',
    title: 'CANTILEVER CLIFF CHRONICLES',
    subtitle: 'Hyper-Realistic Architectural CGI & Atmospheric Simulation',
    location: 'STUDIO RENDER LAB',
    year: '2026',
    category: '3D Visualization & Rendering',
    heroImage: heroTowerImg,
    previewImage: heroTowerImg,
    galleryImages: [heroTowerImg, projectImg1, projectImg2, projectImg3, projectImg4],
    description: 'Ultra-high-definition ray-traced architectural renderings simulating seasonal light paths, micro-climate weather conditions, wind deflection, and tactile material shaders for international real estate developers.',
    concept: 'Uncompromising photorealism conveying emotional atmosphere long before groundbreaking.',
    specs: {
      area: '16K Ultra-Res Master Renders',
      structuralType: 'Physically Based Rendering (PBR) & Volumetric Lighting',
      materials: ['Path Tracing', 'Subsurface Scattering', 'Procedural Weather'],
      timeline: '4 WEEKS',
      status: 'DELIVERED',
      climateStrategy: 'Accurate solar simulation using latitude/longitude radiometric data.'
    },
    floorPlan: {
      title: 'VIRTUAL CAMERA CHOREOGRAPHY',
      image: heroTowerImg,
      spots: [
        {
          id: 'hero-cam',
          label: 'GOLDEN HOUR CLIFF ANGLE',
          description: '45-degree isometric camera capturing light reflection across glass balconies.',
          area: 'Full Virtual Scene',
          x: 50,
          y: 40
        }
      ]
    },
    highlights: [
      'Sub-millimeter procedural concrete displacement mapping',
      'Realistic real-time volumetric mist and dusk lighting'
    ]
  },

  // 7. Graphic Design
  {
    id: 'editorial-monograph-design',
    number: '11',
    title: 'AXIS SPATIAL MONOGRAPH',
    subtitle: 'Editorial Typography, Book Design & Print Finishes',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Graphic Design',
    heroImage: projectImg2,
    previewImage: projectImg2,
    galleryImages: [projectImg2, projectImg1, projectImg7, projectImg5],
    description: 'A limited-edition architectural monograph featuring minimalist Swiss typographic grids, debossed metallic foil on raw linen binding, and oversized high-fidelity architectural plates.',
    concept: 'Graphic design as a physical extension of architectural precision.',
    specs: {
      area: '320 Pages Hardcover',
      structuralType: 'Section Sewn Linen Hardcover with Gold Foil Deboss',
      materials: ['FSC Certified Uncoated Paper', 'Natural Linen', 'Gold Stamping Foil'],
      timeline: '3 MONTHS',
      status: 'PUBLISHED',
      climateStrategy: '100% recycled acid-free archival stock.'
    },
    floorPlan: {
      title: 'EDITORIAL GRID SPREAD',
      image: projectImg2,
      spots: [
        {
          id: 'grid-layout',
          label: '12-COLUMN MODULAR SPREAD',
          description: 'Mathematical proportion grid balancing vast white space and architectural imagery.',
          area: 'Spread 48-49',
          x: 40,
          y: 45
        }
      ]
    },
    highlights: [
      'Custom bespoke typeface paired with structural mono captions',
      'Hand-crafted Japanese binding techniques for flat 180° opening'
    ]
  },

  // 8. Branding & Visual Identity
  {
    id: 'nilo-brand-identity',
    number: '12',
    title: 'NILO AXIS STUDIO BRAND ECOSYSTEM',
    subtitle: 'Comprehensive Visual Identity & Luxury Atelier Guidelines',
    location: 'GLOBAL',
    year: '2026',
    category: 'Branding & Visual Identity',
    heroImage: projectImg3,
    previewImage: projectImg3,
    galleryImages: [projectImg3, projectImg1, projectImg8, projectImg2],
    description: 'An authoritative visual identity system embodying structural strength, geographic rootedness, and modernist poise. Featuring the iconic NA monogram, bespoke stationery, digital guidelines, and architectural signage.',
    concept: 'Rooted here. Designed beyond. Minimalist restraint paired with warm golden accents.',
    specs: {
      area: 'Comprehensive Brand Architecture & Guidelines',
      structuralType: 'Vector Master Assets, Typography System & Signage Specs',
      materials: ['Gold Foil', 'Heavyweight Cotton Paper', 'Anodized Aluminum Signage'],
      timeline: '12 WEEKS',
      status: 'ACTIVE',
      climateStrategy: 'Standardized digital brand portal reducing print collateral waste.'
    },
    floorPlan: {
      title: 'BRAND IDENTITY APPARATUS',
      image: projectImg3,
      spots: [
        {
          id: 'monogram-system',
          label: 'NA GOLD MONOGRAM',
          description: 'Golden concentric geometric emblem representing balance between nature and structure.',
          area: 'Identity Core',
          x: 50,
          y: 35
        }
      ]
    },
    highlights: [
      'Scalable from 16px digital favicons to 3-meter laser-cut facade badges',
      'Complete typography scale and luxury stationery suite'
    ]
  },

  // 9. Video Editing
  {
    id: 'cinematic-architectural-film',
    number: '13',
    title: 'HORIZON IN MOTION: ARCHITECTURAL CINEMA',
    subtitle: '4K Drone Cinematography, Sound Design & Color Grading',
    location: 'ADDIS ABABA & HAWASSA',
    year: '2026',
    category: 'Video Editing',
    heroImage: projectImg4,
    previewImage: projectImg4,
    galleryImages: [projectImg4, projectImg5, projectImg1, heroTowerImg],
    description: 'A series of poetic short films documenting the interplay of light, shadow, and materiality across NILO AXIS completed structures. Combining cinematic drone passes with analog synth audio compositions.',
    concept: 'Capturing the sensory experience of moving through architectural space across changing daylight.',
    specs: {
      area: '4K DCI Cinematic Master & Social Reels',
      structuralType: 'Anamorphic Drone & Gimbal Tracking',
      materials: ['ACES Color Science', 'Custom Foley Audio', 'Film Grain Emulation'],
      timeline: '6 WEEKS',
      status: 'RELEASED',
      climateStrategy: 'Filmed exclusively with natural available solar light.'
    },
    floorPlan: {
      title: 'FILM SEQUENCE TIMELINE',
      image: projectImg4,
      spots: [
        {
          id: 'drone-sweep',
          label: 'SUNSET CANTILEVER REVEAL',
          description: 'Slow 180-degree orbital drone shot catching dusk reflections across lake waters.',
          area: 'Act II Climax',
          x: 52,
          y: 45
        }
      ]
    },
    highlights: [
      'Custom binaural soundscape recorded on location',
      'Over 200,000 views across international architectural film festivals'
    ]
  },

  // 10. Web Development
  {
    id: 'nilo-digital-platform',
    number: '14',
    title: 'NILO AXIS INTERACTIVE WEB EXPERIENCE',
    subtitle: 'Full-Stack Performance, Interactive 3D & Smooth Motion Web Platform',
    location: 'CLOUD INFRASTRUCTURE',
    year: '2026',
    category: 'Web Development',
    heroImage: projectImg1,
    previewImage: projectImg1,
    galleryImages: [projectImg1, projectImg3, projectImg6, heroTowerImg],
    description: 'A bespoke, ultra-fluid digital studio experience engineered with modern React, Tailwind CSS, hardware-accelerated animations, live Telegram request integration, and no-code CMS capabilities.',
    concept: 'Digital architecture mirroring the precision, fluidity, and elegance of physical structures.',
    specs: {
      area: 'Responsive Single-Page Full-Stack Web Platform',
      structuralType: 'React 19 + TypeScript + Express Backend API',
      materials: ['Node.js', 'Vite', 'Tailwind CSS', 'Motion / GSAP'],
      timeline: 'CONTINUOUS EVOLUTION',
      status: 'LIVE',
      climateStrategy: 'Optimized CDN asset compression reducing data bandwidth emissions.'
    },
    floorPlan: {
      title: 'INTERACTIVE ARCHITECTURE',
      image: projectImg1,
      spots: [
        {
          id: 'web-engine',
          label: 'RESPONSIVE DYNAMIC GALLERY ENGINE',
          description: 'Multi-layout matrix with instant switching between 2-col, 3-col, 4-col, hero and masonry views.',
          area: 'Core Engine',
          x: 45,
          y: 40
        }
      ]
    },
    highlights: [
      'Sub-50ms instantaneous UI interactions and smooth layout transitions',
      'Encrypted server-side Telegram client request delivery'
    ]
  },

  // 11. Digital Storytelling
  {
    id: 'ethiopia-spatial-narratives',
    number: '15',
    title: 'TERRAIN & TRADITION: DIGITAL ESSAYS',
    subtitle: 'Interactive Multimedia Storytelling & Spatial Exploration',
    location: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    category: 'Digital Storytelling',
    heroImage: projectImg5,
    previewImage: projectImg5,
    galleryImages: [projectImg5, projectImg2, projectImg4, projectImg9],
    description: 'An interactive longform digital storytelling series exploring how indigenous Ethiopian vernacular techniques inform cutting-edge parametric high-rise engineering and zero-carbon building methods.',
    concept: 'Rooted here. Designed beyond. Bridging ancestral masonry wisdom with future parametric design.',
    specs: {
      area: 'Interactive Web Doc & Visual Essays',
      structuralType: 'Scrollytelling Audio/Visual Framework',
      materials: ['Rich Photography', '3D Topo Maps', 'Oral History Interviews'],
      timeline: '8 WEEKS',
      status: 'PUBLISHED',
      climateStrategy: 'Accessible low-bandwidth version for rural educational access.'
    },
    floorPlan: {
      title: 'STORY SCROLL CHAPTERS',
      image: projectImg5,
      spots: [
        {
          id: 'ch-1',
          label: 'CHAPTER 01: VOLCANIC ROOTS',
          description: 'Geological origins of rift stone in modern structural engineering.',
          area: 'Introduction',
          x: 40,
          y: 50
        }
      ]
    },
    highlights: [
      'Winner of the Digital Design Excellence Award 2026',
      'Over 50 hours of recorded master builder interviews digitized'
    ]
  },

  // 12. Social Media / Digital Campaigns
  {
    id: 'nilo-social-campaigns',
    number: '16',
    title: 'BEYOND HORIZONS: GLOBAL DIGITAL CAMPAIGN',
    subtitle: 'Curated Social Storytelling, Motion Graphics & Audience Growth',
    location: 'GLOBAL DIGITAL PLATFORMS',
    year: '2026',
    category: 'Social Media / Digital Campaigns',
    heroImage: projectImg8,
    previewImage: projectImg8,
    galleryImages: [projectImg8, projectImg7, projectImg3, heroTowerImg],
    description: 'A multi-channel digital campaign presenting NILO AXIS architectural philosophies to international commissioners, design connoisseurs, and architectural institutions across Instagram, LinkedIn, and ArchDaily.',
    concept: 'Translating complex spatial design philosophies into bite-sized, mesmerizing visual micro-moments.',
    specs: {
      area: 'Social Reels, Carousels, Animated Stills & Press Releases',
      structuralType: 'High-Impact Multi-Format Creative Production',
      materials: ['Motion Design', 'Micro-Interviews', 'Architectural Breakdown Cards'],
      timeline: 'QUARTERLY CAMPAIGNS',
      status: 'ACTIVE',
      climateStrategy: 'Organically grown community engagement without automated spam bots.'
    },
    floorPlan: {
      title: 'CAMPAIGN MATRIX',
      image: projectImg8,
      spots: [
        {
          id: 'social-matrix',
          label: 'WEEKLY ARCHITECTURAL MICRO-STUDY',
          description: 'Breakdown of structural cantilevers and sustainability benchmarks.',
          area: 'Content Series',
          x: 50,
          y: 45
        }
      ]
    },
    highlights: [
      '300%+ increase in qualified international commission inquiries',
      'Featured in top global architecture design publications'
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
