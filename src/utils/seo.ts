import { Product, PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { MASTER_KEYWORDS_LIST, findKeywordTarget } from '../data/keywords';

export const DOMAIN = 'https://europalletsupply.com';
export const SITE_NAME = 'EuroPalletSupply.com';
export const SITE_EMAIL = 'info@europalletsupply.com';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  keywords?: string[];
  jsonLd?: Record<string, any>;
}

export function computeSeoMetadata(
  view: PageView,
  selectedCategoryId: string | null,
  selectedProduct: Product | null,
  isDetailModalOpen: boolean,
  currentSearchQuery?: string,
  blogSlug?: string | null
): SeoMetadata {
  // 1. If searching with a specific search query matching targeted keywords
  if (currentSearchQuery && currentSearchQuery.trim().length > 2) {
    const keywordMatch = findKeywordTarget(currentSearchQuery);
    if (keywordMatch) {
      return {
        title: `${capitalizePhrase(keywordMatch.keyword)} | Wholesale Clearance Lots | ${SITE_NAME}`,
        description: `${keywordMatch.directAiAnswer} Order verified liquidation pallets with 24-48h EU freight dispatch from our Venlo hub.`,
        canonicalUrl: `${DOMAIN}/search?q=${encodeURIComponent(keywordMatch.slug)}`,
        ogType: 'website',
        ogImage: `${DOMAIN}/favicon.svg`,
        keywords: [keywordMatch.keyword, ...keywordMatch.relatedKeywords.slice(0, 5), 'wholesale liquidation', 'EuroPalletSupply']
      };
    }
  }

  // 2. If product modal is open or selected
  if (isDetailModalOpen && selectedProduct) {
    const category = CATEGORIES.find(c => c.id === selectedProduct.categoryId);
    const categoryName = category ? category.name : selectedProduct.categoryName || 'Liquidation';
    const condition = selectedProduct.condition || 'Grade A+ Factory Sealed';
    const priceText = `€${selectedProduct.price}`;
    const msrpText = `€${selectedProduct.originalMSRP}`;
    
    return {
      title: `${selectedProduct.title} | ${priceText} (MSRP ${msrpText}) | ${SITE_NAME}`,
      description: `Buy ${selectedProduct.title} at ${priceText} (-${selectedProduct.discountPercentage}% off retail MSRP ${msrpText}). Verified ${condition} liquidation overstock lot ready for fast freight dispatch from Venlo hub.`,
      canonicalUrl: `${DOMAIN}/product/${selectedProduct.id}`,
      ogType: 'product',
      ogImage: selectedProduct.images[0] || `${DOMAIN}/favicon.svg`,
      keywords: [
        selectedProduct.brand,
        categoryName,
        'liquidation pallet',
        'pallet liquidation europe',
        'overstock lot',
        'wholesale clearance',
        'Grade A+ sealed',
        'phone for sale',
        'laptops for sale'
      ],
      jsonLd: {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': selectedProduct.title,
        'image': selectedProduct.images,
        'description': selectedProduct.description,
        'sku': selectedProduct.sku,
        'mpn': selectedProduct.id,
        'brand': {
          '@type': 'Brand',
          'name': selectedProduct.brand
        },
        'offers': {
          '@type': 'Offer',
          'url': `${DOMAIN}/product/${selectedProduct.id}`,
          'priceCurrency': 'EUR',
          'price': selectedProduct.price,
          'priceValidUntil': '2026-12-31',
          'itemCondition': selectedProduct.condition?.toLowerCase().includes('open') 
            ? 'https://schema.org/UsedCondition' 
            : 'https://schema.org/NewCondition',
          'availability': selectedProduct.stockCount > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': 'EuroPalletSupply.com',
            'url': DOMAIN
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': selectedProduct.rating || 4.9,
          'reviewCount': selectedProduct.reviewCount || 42
        }
      }
    };
  }

  // 3. If viewing Shop / Catalog
  if (view === 'shop') {
    if (selectedCategoryId && selectedCategoryId !== 'all') {
      const category = CATEGORIES.find(c => c.id === selectedCategoryId || c.slug === selectedCategoryId);
      if (category) {
        return {
          title: `${category.name} Liquidation & Overstock Pallets | ${SITE_NAME}`,
          description: `Shop authentic ${category.name.toLowerCase()} liquidation pallets, factory overstocks, and wholesale lots at 60-85% below MSRP. Verified manifests and fast EU freight delivery across Europe and the UK.`,
          canonicalUrl: `${DOMAIN}/shop/${category.slug}`,
          ogType: 'website',
          ogImage: category.image || `${DOMAIN}/favicon.svg`,
          keywords: [
            category.name,
            `${category.name} liquidation`,
            'pallet liquidation europe',
            'excess inventory',
            'wholesale pallets',
            'liquidation pallets for sale'
          ]
        };
      }
    }
    return {
      title: `Pallet Liquidation Europe & UK | Wholesale Overstock Pallets | ${SITE_NAME}`,
      description: 'Explore our complete catalog of verified consumer electronics, smartphones, laptops, power tools, appliances, and brand overstock pallets at 60-85% off retail. Direct from Venlo logistics hub.',
      canonicalUrl: `${DOMAIN}/shop`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: [
        'pallet liquidation europe',
        'liquidation pallet',
        'liquidation pallets for sale',
        'wholesale liquidation pallet deals',
        'liquidation pallets amazon',
        'laptops for sale',
        'phones for sale',
        'liquidation pallets uk'
      ]
    };
  }

  // 4. If viewing About
  if (view === 'about') {
    return {
      title: `About Our Venlo Logistics Hub & Liquidation Network | ${SITE_NAME}`,
      description: `Learn about EuroPalletSupply (${DOMAIN}), operating an 18,500 m² hub at Trade Port Europe in Venlo, Netherlands. We supply certified retail returns, overstock skids, and Grade A+ pallets across Europe. Contact: ${SITE_EMAIL}`,
      canonicalUrl: `${DOMAIN}/about`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: ['Venlo liquidation hub', 'pallet liquidation warehouse', 'Trade Port Europe', 'wholesale distributor', 'manifest inspection']
    };
  }

  // 5. If viewing Contact
  if (view === 'contact') {
    return {
      title: `Contact Logistics Desk & Freight Dispatch (${SITE_EMAIL}) | ${SITE_NAME}`,
      description: `Get in touch with our freight logistics desk at Trade Port Europe, Venlo, NL. Direct email: ${SITE_EMAIL}, phone: +31 970 1025 7455, warehouse visit appointments, and wholesale container bookings.`,
      canonicalUrl: `${DOMAIN}/contact`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: ['contact EuroPalletSupply', 'info@europalletsupply.com', 'Venlo warehouse address', 'freight dispatch phone', 'pallet liquidation depot']
    };
  }

  // 6. If viewing Blog
  if (view === 'blog') {
    return {
      title: `Liquidation Guides, Amazon Return Pallets & Reseller ROI | ${SITE_NAME}`,
      description: 'Expert guides on how to buy Amazon liquidation pallets in Europe, manifest grading, calculating reseller ROI on eBay/Amazon, and bulk laptop/phone wholesale arbitrage.',
      canonicalUrl: `${DOMAIN}/blog`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: [
        'how to buy amazon liquidation pallets',
        'pallet reselling guide',
        'liquidation arbitrage',
        'how to get return pallets from amazon',
        'retail overstock profits',
        'manifest grading guide'
      ]
    };
  }

  // 7. If viewing FAQs
  if (view === 'faq') {
    return {
      title: `Frequently Asked Questions (FAQ) | Pallet Liquidation & Freight | ${SITE_NAME}`,
      description: 'Find answers on European pallet liquidation condition tiers, itemized manifests, 24-48h EU road freight dispatch, tail-lift delivery, zero-rated intra-EU VAT, and our 14-day return guarantee.',
      canonicalUrl: `${DOMAIN}/faq`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: ['liquidation FAQ', 'pallet shipping FAQ', 'Venlo warehouse logistics', 'EU VAT reverse charge', 'pallet inspection guide']
    };
  }

  // 8. If viewing Terms & Conditions
  if (view === 'terms') {
    return {
      title: `Terms & Conditions of Sale | Commercial Agreement | ${SITE_NAME}`,
      description: `Official purchasing terms and conditions for EuroPalletSupply B.V. (Trade Port Europe, Venlo, NL - KvK 89234190). Covers order processing, 14-day warranty, freight transit, and Dutch governing law.`,
      canonicalUrl: `${DOMAIN}/terms`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: ['terms and conditions', 'EuroPalletSupply legal', 'pallet sales agreement', 'Venlo B2B terms']
    };
  }

  // 9. If viewing Privacy Policy
  if (view === 'privacy') {
    return {
      title: `Privacy Policy & EU GDPR Compliance | ${SITE_NAME}`,
      description: `Data protection and privacy policy for EuroPalletSupply B.V. Compliant with EU GDPR (Regulation 2016/679) and Dutch UAVG. Learn how your order and freight delivery data is securely processed.`,
      canonicalUrl: `${DOMAIN}/privacy`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: ['privacy policy', 'GDPR compliance', 'EuroPalletSupply data protection', 'Dutch privacy standards']
    };
  }

  // 10. If viewing Shipping & Returns Policy
  if (view === 'shipping-returns') {
    return {
      title: `Shipping & Returns Policy | European Freight Logistics & RMA | ${SITE_NAME}`,
      description: `Complete guide to European pallet freight shipping, 24-48h dispatch from our Venlo hub, tail-lift delivery across 27 EU countries, and 14-day return & RMA policy at EuroPalletSupply B.V.`,
      canonicalUrl: `${DOMAIN}/shipping`,
      ogType: 'website',
      ogImage: `${DOMAIN}/favicon.svg`,
      keywords: [
        'shipping and returns',
        'pallet freight shipping europe',
        'pallet delivery transit times',
        'RMA returns policy',
        'Venlo warehouse pickup',
        'tail lift delivery',
        'pallet liquidation shipping',
        'EuroPalletSupply logistics'
      ]
    };
  }

  // Default: Homepage
  return {
    title: `EuroPalletSupply.com | Europe's #1 Pallet Liquidation & Wholesale Overstock Hub`,
    description: "Europe's premier online pallet liquidation & clearance outlet shop. Shop verified Amazon overstock, electronics, laptops, phones, home goods, and tools at up to 80% off retail with 24-48h EU freight dispatch.",
    canonicalUrl: `${DOMAIN}/`,
    ogType: 'website',
    ogImage: `${DOMAIN}/favicon.svg`,
    keywords: [
      'pallet liquidation europe',
      'liquidation pallet',
      'liquidation pallets for sale',
      'liquidation pallets amazon',
      'wholesale liquidation pallet deals',
      'phones for sale',
      'laptops for sale',
      'liquidation pallets uk',
      'liquidation pallet germany'
    ]
  };
}

export function applySeoMetadata(meta: SeoMetadata): void {
  // 1. Update Title
  document.title = meta.title;

  // 2. Update or Create Meta Description
  updateMetaTag('name', 'description', meta.description);

  // 3. Update or Create Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // 4. Update OpenGraph Tags
  updateMetaTag('property', 'og:title', meta.title);
  updateMetaTag('property', 'og:description', meta.description);
  updateMetaTag('property', 'og:url', meta.canonicalUrl);
  updateMetaTag('property', 'og:type', meta.ogType || 'website');
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
  }

  // 5. Update Twitter Card Tags
  updateMetaTag('name', 'twitter:title', meta.title);
  updateMetaTag('name', 'twitter:description', meta.description);
  if (meta.ogImage) {
    updateMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // 6. Keywords
  if (meta.keywords && meta.keywords.length > 0) {
    updateMetaTag('name', 'keywords', meta.keywords.join(', '));
  }

  // 7. Dynamic Schema.org JSON-LD (e.g. Product Rich Snippets)
  const scriptId = 'dynamic-seo-jsonld';
  let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (meta.jsonLd) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = scriptId;
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.text = JSON.stringify(meta.jsonLd, null, 2);
  } else if (jsonLdScript) {
    jsonLdScript.remove();
  }
}

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function capitalizePhrase(phrase: string): string {
  return phrase
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
