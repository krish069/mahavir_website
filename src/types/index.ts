export interface PriceTier {
  minQty: number;
  maxQty?: number;
  unitPrice: number;
  savingsPercentage: number;
}

export type SectorType = 'All' | 'Corporate' | 'Industrial' | 'High-Vis Safety' | 'Security & Facility' | 'Hospitality';

export interface Product {
  id: string;
  name: string;
  sector: SectorType;
  subCategory: string;
  image: string;
  description: string;
  hsnCode: string;
  fabric: string;
  gsm: number;
  features: string[];
  baseMoq: number;
  leadTimeDays: number;
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | '2XL' | '3XL')[];
  priceTiers: PriceTier[];
  supportsEmbroidery: boolean;
  supportsPrinting: boolean;
}

export interface SizeBreakdown {
  S: number;
  M: number;
  L: number;
  XL: number;
  '2XL': number;
  '3XL': number;
}

export type CustomizationTechnique = 'embroidery' | 'printing' | 'both' | 'plain';

export interface LogoPlacementConfig {
  leftChest: boolean;
  rightChest: boolean;
  fullBack: boolean;
  leftSleeve: boolean;
  rightSleeve: boolean;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  color: string;
  sizeBreakdown: SizeBreakdown;
  totalQty: number;
  unitBasePrice: number;
  customizationTechnique: CustomizationTechnique;
  placements: LogoPlacementConfig;
  logoDataUrl?: string;
  logoFileName?: string;
  customizationSurchargePerPiece: number;
  subtotal: number;
  hsnCode: string;
}

export interface RfqCompanyDetails {
  companyName: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  gstin: string;
  deliveryCity: string;
  deliveryState: string;
  pincode: string;
  notes: string;
  poReference?: string;
}

export interface InvoiceRecord {
  invoiceNumber: string;
  date: string;
  validUntil: string;
  clientDetails: RfqCompanyDetails;
  items: QuoteItem[];
  subtotal: number;
  bulkDiscount: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  isInterState: boolean;
}
