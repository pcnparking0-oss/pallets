import { Product, Category, BlogPost } from '../types';

const BASE_URL = 'https://europalletliquidation.eu';

export function createProductSchema(product: Product) {
  return {
    '@type': 'Product',
    '@id': `${BASE_URL}/product/${product.id}#product`,
    name: product.title,
    description: product.description,
    image: Array.isArray(product.images) && product.images.length > 0 ? product.images : [`${BASE_URL}/favicon.svg`],
    sku: product.sku || product.id,
    mpn: product.sku || product.palletCode || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'EuroPalletLiquidation'
    },
    category: product.categoryName,
    itemCondition: product.condition.includes('Brand New') 
      ? 'https://schema.org/NewCondition' 
      : product.condition.includes('Refurbished') 
        ? 'https://schema.org/RefurbishedCondition' 
        : 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${product.id}`,
      priceCurrency: 'EUR',
      price: product.price,
      priceValidUntil: '2026-12-31',
      itemCondition: product.condition.includes('Brand New') 
        ? 'https://schema.org/NewCondition' 
        : 'https://schema.org/UsedCondition',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'EuroPalletLiquidation.eu'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'EU',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.reviewCount || 45,
      bestRating: '5',
      worstRating: '1'
    }
  };
}

export function createBreadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `${BASE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}` : undefined
    }))
  };
}

export function createBlogSchema(post: BlogPost) {
  return {
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? [post.imageUrl] : [`${BASE_URL}/favicon.svg`],
    datePublished: '2026-03-01T08:00:00+01:00',
    dateModified: '2026-03-18T10:00:00+01:00',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole
    },
    publisher: {
      '@type': 'Organization',
      name: 'EuroPalletLiquidation.eu',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`
    }
  };
}

export function createCategoryItemListSchema(category: Category, products: Product[]) {
  return {
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/shop/${category.slug}#collection`,
    name: `${category.name} Liquidation Pallets & Overstock`,
    description: category.description,
    url: `${BASE_URL}/shop/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}/product/${p.id}`,
        name: p.title
      }))
    }
  };
}
