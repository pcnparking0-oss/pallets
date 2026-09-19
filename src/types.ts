export type Currency = 'EUR' | 'GBP';

export type ProductCondition = 
  | 'Brand New (Factory Sealed)'
  | 'Pristine Open Box'
  | 'Certified Refurbished';

export interface ProductReview {
  id: string;
  userName: string;
  userCountry: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  price: number; // Liquidation outlet price
  originalMSRP: number;
  unboxedTotalWorth?: number; // Total verified retail worth after unboxing the pallet
  resaleValue?: number; // Estimated second-hand / marketplace resale value when customer resells
  productQuality?: string; // Quality rating & certification description
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  condition: ProductCondition;
  inStock: boolean;
  stockCount: number; // e.g., 3 left
  featured?: boolean;
  dealOfTheDay?: boolean;
  badge?: string; // "BESTSELLER", "FLASH DEAL", "LIMITED STOCK", "-70% OUTLET"
  images: string[];
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  variants?: ProductVariant[];
  warrantyMonths: number;
  reviews: ProductReview[];
  freeShippingEligible: boolean;
  sourceLot?: string; // Origin liquidation lot reference
  palletNumber?: number; // 1 to 20
  palletCode?: string; // e.g. "PLT-01" to "PLT-20"
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  itemCount: number;
  popularBrands: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ShippingMethod {
  id: 'standard' | 'express';
  name: string;
  carrier: string;
  transitTime: string;
  priceEur: number;
  freeThresholdEur: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ShopOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotalEur: number;
  discountEur: number;
  couponCode?: string;
  shippingEur: number;
  shippingMethod: ShippingMethod;
  vatEur: number;
  totalEur: number;
  paymentMethod: 'bank_transfer' | 'card' | 'crypto' | 'wire_transfer' | 'bunq' | 'usdt';
  customer: OrderCustomerInfo;
  status: 'Order Confirmed' | 'Packing in Venlo' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export type PageView = 'home' | 'shop' | 'about' | 'contact' | 'blog' | 'keywords';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}
