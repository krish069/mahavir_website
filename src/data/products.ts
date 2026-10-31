import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-ind-boilersuit',
    name: 'Industrial Heavy Cotton Drill Coverall (Boilersuit)',
    sector: 'Industrial',
    subCategory: 'Boilersuits & Factory Coveralls',
    image: '/src/assets/images/model_industrial_boilersuit_1793444001730.jpg',
    description: '100% Cotton drill heavy-duty plant coverall. Double-needle lap seams, concealed heavy brass two-way zipper, action-pleat back for workshop mobility, and dual-layer reinforced knees.',
    hsnCode: '6211',
    fabric: '100% Pre-Shrunk Long-Staple Cotton Drill',
    gsm: 280,
    features: [
      'Pre-shrunk sanforized fabric (residual shrinkage < 1.5%)',
      'Heavy-gauge two-way anti-spark brass front zipper with safety storm flap',
      'Reinforced double-fabric articulated knee pockets for knee pad inserts',
      '14 bar-tacks at high-stress points (crotch, pocket mouths, zipper ends)',
      'Dual chest pockets with brass zippers, sleeve pen stall, tool ruler pocket'
    ],
    baseMoq: 50,
    leadTimeDays: 7,
    colors: [
      { name: 'Navy Blue', hex: '#1B2A4A' },
      { name: 'Petroleum Royal', hex: '#1E40AF' },
      { name: 'Graphite Grey', hex: '#374151' },
      { name: 'Plant Khaki', hex: '#785A3C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 780, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 720, savingsPercentage: 8 },
      { minQty: 250, maxQty: 499, unitPrice: 670, savingsPercentage: 14 },
      { minQty: 500, maxQty: undefined, unitPrice: 620, savingsPercentage: 21 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: true
  },
  {
    id: 'prod-ind-dangri',
    name: 'Mechanical Heavy Dangri (Bib & Brace Work Dungaree)',
    sector: 'Industrial',
    subCategory: 'Dangris & Plant Overalls',
    image: '/src/assets/images/model_industrial_boilersuit_1793444001730.jpg',
    description: 'Heavy twill mechanic dangri with adjustable elasticated buckle shoulder harness, large zippered chest utility bib, hammer loop, side tool slot, and knee reinforcement.',
    hsnCode: '6211',
    fabric: 'High-Density Poly-Cotton Twill (65/35 Heavy Mill Weave)',
    gsm: 260,
    features: [
      'Heavy-duty non-slip metal clasp buckle adjustment with reinforced straps',
      'Multi-compartment chest bib pocket with secured zipper & dual pencil slots',
      'Waist closure buttons with double-needle waistband reinforcement',
      'Abrasion-resistant double-layer knee patches for floor mechanics',
      'Oil, grease and coolant resistant mill-finish treatment'
    ],
    baseMoq: 50,
    leadTimeDays: 7,
    colors: [
      { name: 'Deep Navy', hex: '#111827' },
      { name: 'Royal Blue', hex: '#1D4ED8' },
      { name: 'Charcoal Grey', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 680, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 630, savingsPercentage: 7 },
      { minQty: 250, maxQty: 499, unitPrice: 590, savingsPercentage: 13 },
      { minQty: 500, maxQty: undefined, unitPrice: 540, savingsPercentage: 20 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: true
  },
  {
    id: 'prod-corp-polo',
    name: 'Executive 240 GSM Bio-Wash Combed Cotton Pique Polo',
    sector: 'Corporate',
    subCategory: 'Corporate T-Shirts & Polos',
    image: '/src/assets/images/model_corporate_polo_1793444004339.jpg',
    description: 'Heavyweight corporate polo knitted from long-staple combed cotton. Double bio-washed with silicone enzyme treatment for zero piling, anti-curl knitted jacquard collar, and color fastness grade 4.5.',
    hsnCode: '6109',
    fabric: '100% Combed Compact Ring-Spun Cotton Honeycomb Pique',
    gsm: 240,
    features: [
      'Double bio-wash silicone enzyme treated against fuzz and lint balling',
      'Anti-curl knitted ribbed collar reinforced with German fusible stay',
      'Taped neck and shoulder seams with twin-needle flatlock hem',
      'Dyed-to-match 3-button placket with cross-stitched shatterproof buttons',
      'Specifically engineered base for dense corporate chest logo embroidery'
    ],
    baseMoq: 50,
    leadTimeDays: 5,
    colors: [
      { name: 'Corporate Navy', hex: '#0F1E36' },
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Executive Black', hex: '#18181B' },
      { name: 'Royal Blue', hex: '#1D4ED8' },
      { name: 'Deep Burgundy', hex: '#651A2C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 380, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 330, savingsPercentage: 13 },
      { minQty: 250, maxQty: 499, unitPrice: 295, savingsPercentage: 22 },
      { minQty: 500, maxQty: undefined, unitPrice: 260, savingsPercentage: 31 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: true
  },
  {
    id: 'prod-corp-shirt',
    name: 'Corporate Formal Easy-Care Oxford Work Shirt',
    sector: 'Corporate',
    subCategory: 'Executive & Staff Shirts',
    image: '/src/assets/images/model_corporate_polo_1793444004339.jpg',
    description: 'Wrinkle-resistant fine poly-cotton micro-oxford uniform shirt. Features fused German interlining in collar and cuffs, single-needle clean armholes, and reinforced chest pocket.',
    hsnCode: '6205',
    fabric: '65% Polyester / 35% Combed Cotton Fine Micro-Oxford',
    gsm: 160,
    features: [
      'Easy-care resin finish resists wrinkles across continuous 10-hour shifts',
      'Collar fused with original Wendler German interlining for structured hold',
      'Flat-felled side seams with clean single-needle armhole stitching',
      'Reinforced mitered pocket with subtle logo embroidery placement area',
      'Offered in both Full Sleeve and Half Sleeve custom specifications'
    ],
    baseMoq: 50,
    leadTimeDays: 6,
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Executive Sky Blue', hex: '#C7E2FE' },
      { name: 'French Navy', hex: '#1E293B' },
      { name: 'Steel Micro-Stripe', hex: '#E2E8F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 520, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 470, savingsPercentage: 10 },
      { minQty: 250, maxQty: 499, unitPrice: 420, savingsPercentage: 19 },
      { minQty: 500, maxQty: undefined, unitPrice: 380, savingsPercentage: 27 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: false
  },
  {
    id: 'prod-hivis-jacket',
    name: 'EN ISO 20471 Class 3 High-Visibility Safety Parka',
    sector: 'High-Vis Safety',
    subCategory: 'High-Visibility Workwear',
    image: '/src/assets/images/model_hivis_safety_1793444005478.jpg',
    description: 'All-weather certified high-visibility safety jacket. Fitted with 50mm genuine 3M Scotchlite 8910 silver reflective tape, waterproof PU coated 300D polyester shell, radio loops, and heavy brass hardware.',
    hsnCode: '6201',
    fabric: '300D Oxford Polyester with Breathable Waterproof PU Coating',
    gsm: 320,
    features: [
      'Certified EN ISO 20471 Class 3 compliant 360-degree road visibility',
      '50mm certified genuine 3M Scotchlite reflective bands heat-bonded',
      'Fully taped waterproof seams with 8,000mm hydrostatic head rating',
      'Concealed storm hood, fleece-lined collar, and dual radio mic tabs',
      'Anti-wicking lower body hem and heavy dual-slider zipper'
    ],
    baseMoq: 50,
    leadTimeDays: 7,
    colors: [
      { name: 'Fluorescent Yellow & Navy', hex: '#EAB308' },
      { name: 'Fluorescent Orange & Navy', hex: '#EA580C' }
    ],
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 1150, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 1040, savingsPercentage: 10 },
      { minQty: 250, maxQty: 499, unitPrice: 950, savingsPercentage: 17 },
      { minQty: 500, maxQty: undefined, unitPrice: 870, savingsPercentage: 24 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: true
  },
  {
    id: 'prod-security-suit',
    name: 'Security Guard Epaulette Shirt & Structured Trouser Uniform Set',
    sector: 'Security & Facility',
    subCategory: 'Security Guard Uniforms',
    image: '/src/assets/images/model_security_uniform_1793444004858.jpg',
    description: 'Heavy duty guard uniform set. Structured button-down shirt with shoulder epaulettes for rank stars, whistle cord loop, dual pleated chest flap pockets, and heavy gabardine utility trousers.',
    hsnCode: '6203',
    fabric: 'High-Twist Poly-Viscose Worsted Uniform Suiting',
    gsm: 250,
    features: [
      'Reinforced shoulder epaulettes anchored with cross-box stitching',
      'Pleated chest pockets with button-down flaps and dedicated pen pocket',
      'Trousers with 2.5-inch heavy belt loops to support tactical duty belts',
      'Deep front slant pockets and reinforced inner seat seam with extra margin',
      'Colorfast reactive dyeing resistant to UV sunlight degradation'
    ],
    baseMoq: 50,
    leadTimeDays: 7,
    colors: [
      { name: 'Security Dark Navy', hex: '#0B132B' },
      { name: 'Tactical Gunmetal Grey', hex: '#374151' },
      { name: 'Security Khaki', hex: '#854D0E' },
      { name: 'Night Black', hex: '#18181B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 850, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 780, savingsPercentage: 8 },
      { minQty: 250, maxQty: 499, unitPrice: 720, savingsPercentage: 15 },
      { minQty: 500, maxQty: undefined, unitPrice: 660, savingsPercentage: 22 }
    ],
    supportsEmbroidery: true,
    supportsPrinting: false
  },
  {
    id: 'prod-corp-trousers',
    name: 'Industrial & Staff Flat-Front Work Trousers',
    sector: 'Corporate',
    subCategory: 'Work & Formal Trousers',
    image: '/src/assets/images/model_corporate_polo_1793444004339.jpg',
    description: 'Heavy gabardine uniform trousers engineered for plant supervisors, corporate teams, and field executives. Permanent crease retention, anti-slip waistband shirt-gripper, and brass YKK zip fly.',
    hsnCode: '6203',
    fabric: '70% Polyester / 30% Viscose Heavy Uniform Gabardine',
    gsm: 270,
    features: [
      'Wrinkle-free gabardine weave holds sharp permanent crease',
      'YKK brass metal zip fly with dual hook-and-bar waistband reinforcement',
      'Anti-slip inner waistband tape prevents shirt from pulling out on movement',
      'Deep pocket bags cut from 100% durable cotton sheeting',
      'Reinforced crotch and seat seam with 2.5cm internal tailoring margin'
    ],
    baseMoq: 50,
    leadTimeDays: 6,
    colors: [
      { name: 'Charcoal Grey', hex: '#1F2937' },
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Black', hex: '#09090B' },
      { name: 'Industrial Khaki', hex: '#78716C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    priceTiers: [
      { minQty: 50, maxQty: 99, unitPrice: 590, savingsPercentage: 0 },
      { minQty: 100, maxQty: 249, unitPrice: 530, savingsPercentage: 10 },
      { minQty: 250, maxQty: 499, unitPrice: 480, savingsPercentage: 19 },
      { minQty: 500, maxQty: undefined, unitPrice: 430, savingsPercentage: 27 }
    ],
    supportsEmbroidery: false,
    supportsPrinting: false
  }
];

export const COMPANY_INFO = {
  name: 'Mahavir Corporation',
  tradeName: 'Mahavir Corporation Uniforms & Workwear Mills',
  since: 1994,
  locationUrl: 'https://share.google/eSgPiM4GDa52ZbRxb',
  address: {
    line1: 'Plot No. 42/B, Industrial Area, Sector 10',
    city: 'Pimpri-Chinchwad / Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '411018'
  },
  phone: '+91 98220 54128',
  phoneAlt: '+91 20 2747 8899',
  whatsapp: '919822054128',
  email: 'sales@mahavircorp.in',
  inquiryEmail: 'procurement@mahavircorp.in',
  gstin: '27AABCM8492C1Z4',
  pan: 'AABCM8492C',
  bankDetails: {
    bankName: 'HDFC Bank Ltd',
    accountName: 'MAHAVIR CORPORATION',
    accountNumber: '50200039281744',
    ifsc: 'HDFC0000148',
    branch: 'Pimpri Industrial Estate'
  }
};
