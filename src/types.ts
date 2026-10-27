export type FragranceFamily =
  | 'Oriental'
  | 'Woody'
  | 'Floral'
  | 'Gourmand'
  | 'Fruity'
  | 'Citrus'
  | 'Fresh';

export type EnergyCategory =
  | 'summer-fresh'
  | 'date-night'
  | 'starboy'
  | 'office-fresh';

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  inspiredBy: string;
  inspiredByBrand: string;
  category: FragranceFamily;
  categoryAr: string;
  price: number;
  originalPrice?: number;
  volume: string;
  character: string;
  characterAr: string;
  description: string;
  descriptionAr: string;
  topNotes: string[];
  topNotesAr: string[];
  heartNotes: string[];
  heartNotesAr: string[];
  baseNotes: string[];
  baseNotesAr: string[];
  gender: 'men' | 'women' | 'unisex';
  energyCategory?: EnergyCategory;
  image: string;
  rating: number;
  reviewsCount: number;
  isNewDrop?: boolean;
  isBestseller?: boolean;
  isDiscoverySet?: boolean;
  sampleOptions?: string[];
  longevity: '6-8 Hours' | '8-12 Hours' | '12+ Hours';
  sillage: 'Moderate' | 'Heavy' | 'Enormous';
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSamples?: string[];
}

export interface Review {
  id: string;
  author: string;
  authorAr?: string;
  rating: number;
  date: string;
  text: string;
  textAr?: string;
  productName: string;
  verified: boolean;
  isPhoto?: boolean;
}

export interface CartTotals {
  subtotal: number;
  bundleDiscount: number;
  promoDiscount: number;
  deliveryFee: number;
  isFreeDelivery: boolean;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  totalSavings: number;
  grandTotal: number;
  bottle100mlCount: number;
  bundlePairsCount: number;
}
