import { PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';

export interface AppRoute {
  view: PageView;
  categoryId: string | null;
  productId: string | null;
  blogSlug: string | null;
  searchQuery: string;
}

/**
 * Parses any incoming browser pathname and search query into an AppRoute.
 * Handles root, categories, products (/product/:id and /products/:id),
 * blog posts (/blog/:slug), pages, search queries, and fallback routes.
 */
export function parseUrlToRoute(pathname: string, search: string = ''): AppRoute {
  // Normalize pathname: remove trailing slash, lowercase
  const rawPath = pathname.trim();
  const cleanPath = (rawPath.replace(/\/$/, '') || '/').toLowerCase();

  // Parse query parameters
  const searchParams = new URLSearchParams(search);
  const qParam = searchParams.get('q') || searchParams.get('search') || searchParams.get('query') || '';
  const catParam = searchParams.get('cat') || searchParams.get('category') || null;

  // 1. Root / Home
  if (cleanPath === '/' || cleanPath === '' || cleanPath === '/home') {
    return {
      view: 'home',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 2. Direct Product Route: /product/:id OR /products/:id
  if (cleanPath.startsWith('/product/') || cleanPath.startsWith('/products/')) {
    const rawId = cleanPath.startsWith('/products/')
      ? cleanPath.replace('/products/', '')
      : cleanPath.replace('/product/', '');
    const cleanId = rawId.split('?')[0].replace(/\/$/, '');
    
    // Find matching product by id, sku, or slug-match
    const foundProd = PRODUCTS.find(p => 
      p.id.toLowerCase() === cleanId.toLowerCase() ||
      p.sku.toLowerCase() === cleanId.toLowerCase()
    );

    return {
      view: 'shop',
      categoryId: foundProd ? foundProd.categoryId : null,
      productId: foundProd ? foundProd.id : cleanId,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 3. Shop & Categories: /shop OR /shop/:catSlug
  if (cleanPath === '/shop' || cleanPath === '/catalog' || cleanPath === '/store') {
    let resolvedCatId: string | null = null;
    if (catParam) {
      const foundCategory = CATEGORIES.find(c => 
        c.id.toLowerCase() === catParam.toLowerCase() || 
        c.slug.toLowerCase() === catParam.toLowerCase()
      );
      resolvedCatId = foundCategory ? foundCategory.id : catParam;
    }

    return {
      view: 'shop',
      categoryId: resolvedCatId,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  if (cleanPath.startsWith('/shop/')) {
    const catSlug = cleanPath.replace('/shop/', '').split('?')[0].replace(/\/$/, '');
    const foundCategory = CATEGORIES.find(c => 
      c.slug.toLowerCase() === catSlug.toLowerCase() || 
      c.id.toLowerCase() === catSlug.toLowerCase()
    );

    return {
      view: 'shop',
      categoryId: foundCategory ? foundCategory.id : catSlug,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 4. Search View: /search
  if (cleanPath === '/search' || cleanPath === '/search/') {
    return {
      view: 'shop',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 5. Blog: /blog OR /blog/:slug
  if (cleanPath === '/blog' || cleanPath === '/guides' || cleanPath === '/insights') {
    return {
      view: 'blog',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  if (cleanPath.startsWith('/blog/')) {
    const rawSlug = cleanPath.replace('/blog/', '').split('?')[0].replace(/\/$/, '');
    const foundPost = BLOG_POSTS.find(p => p.slug.toLowerCase() === rawSlug.toLowerCase() || p.id === rawSlug);
    return {
      view: 'blog',
      categoryId: null,
      productId: null,
      blogSlug: foundPost ? foundPost.slug : rawSlug,
      searchQuery: qParam
    };
  }

  // 6. About: /about
  if (cleanPath === '/about' || cleanPath === '/about-us' || cleanPath === '/hub') {
    return {
      view: 'about',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 7. Contact: /contact
  if (cleanPath === '/contact' || cleanPath === '/contact-us' || cleanPath === '/support') {
    return {
      view: 'contact',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 8. Shipping & Returns: /shipping OR /shipping-returns OR /returns
  if (
    cleanPath === '/shipping' ||
    cleanPath === '/shipping-returns' ||
    cleanPath === '/returns' ||
    cleanPath === '/delivery' ||
    cleanPath === '/freight'
  ) {
    return {
      view: 'shipping-returns',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 9. Terms: /terms OR /terms-and-conditions
  if (cleanPath === '/terms' || cleanPath === '/terms-and-conditions' || cleanPath === '/agb') {
    return {
      view: 'terms',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 10. Privacy: /privacy OR /privacy-policy
  if (cleanPath === '/privacy' || cleanPath === '/privacy-policy' || cleanPath === '/gdpr') {
    return {
      view: 'privacy',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 11. FAQ: /faq OR /faqs
  if (cleanPath === '/faq' || cleanPath === '/faqs' || cleanPath === '/help') {
    return {
      view: 'faq',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // 12. Keywords: /keywords OR /keyword-index
  if (cleanPath === '/keywords' || cleanPath === '/keyword-index' || cleanPath === '/directory') {
    return {
      view: 'keywords',
      categoryId: null,
      productId: null,
      blogSlug: null,
      searchQuery: qParam
    };
  }

  // Fallback to Home
  return {
    view: 'home',
    categoryId: null,
    productId: null,
    blogSlug: null,
    searchQuery: qParam
  };
}

/**
 * Converts an AppRoute state into a clean, canonical URL path string.
 */
export function routeToUrl(route: Partial<AppRoute>): string {
  // If product is open
  if (route.productId) {
    return `/products/${route.productId}`;
  }

  // If blog post is open
  if (route.view === 'blog' && route.blogSlug) {
    return `/blog/${route.blogSlug}`;
  }

  // If viewing shop with category or search query
  if (route.view === 'shop') {
    if (route.categoryId) {
      const category = CATEGORIES.find(c => c.id === route.categoryId);
      const catSlug = category ? category.slug : route.categoryId;
      return `/shop/${catSlug}`;
    }
    if (route.searchQuery && route.searchQuery.trim().length > 0) {
      return `/shop?q=${encodeURIComponent(route.searchQuery.trim())}`;
    }
    return '/shop';
  }

  // Pages
  if (route.view === 'about') return '/about';
  if (route.view === 'contact') return '/contact';
  if (route.view === 'blog') return '/blog';
  if (route.view === 'shipping-returns') return '/shipping';
  if (route.view === 'faq') return '/faq';
  if (route.view === 'terms') return '/terms';
  if (route.view === 'privacy') return '/privacy';
  if (route.view === 'keywords') return '/keywords';

  // Default Home
  return '/';
}

/**
 * Updates browser history smoothly and pushes a new URL state if different.
 */
export function pushAppRoute(route: Partial<AppRoute>): string {
  const targetUrl = routeToUrl(route);
  const currentPathWithSearch = window.location.pathname + window.location.search;
  
  if (currentPathWithSearch !== targetUrl) {
    window.history.pushState({ route }, '', targetUrl);
  }
  return targetUrl;
}
