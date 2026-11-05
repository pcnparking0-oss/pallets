import React, { useState, useEffect, useCallback } from 'react';
import { Currency, Product, CartItem, ShopOrder, ProductVariant, PageView, BlogPost } from './types';
import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { ValueProps } from './components/ValueProps';
import { CatalogView } from './components/CatalogView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { BlogView } from './components/BlogView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { TrackOrderModal } from './components/TrackOrderModal';
import { Footer } from './components/Footer';
import { PalletDropdownMenu } from './components/PalletDropdownMenu';
import { HomeTrustpilotReviews } from './components/HomeTrustpilotReviews';
import { HomeBlogSection } from './components/HomeBlogSection';
import { HomeFAQSection } from './components/HomeFAQSection';
import { Language, LANGUAGES } from './utils/translations';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { computeSeoMetadata, applySeoMetadata } from './utils/seo';
import { KeywordsDirectoryView } from './components/KeywordsDirectoryView';
import { LeadInquiryModal } from './components/LeadInquiryModal';
import { QuickLeadBadge } from './components/QuickLeadBadge';
import { TermsView } from './components/TermsView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { FAQView } from './components/FAQView';
import { ShippingReturnsView } from './components/ShippingReturnsView';
import { formatCurrency } from './utils/formatters';
import { parseUrlToRoute, pushAppRoute, routeToUrl } from './utils/router';

export default function App() {
  // Navigation, Route & View State
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(null);
  const [catalogSearchQuery, setCatalogSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // B2B Wholesale & Manifest Lead Quote Modal
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);

  const handleOpenQuoteModal = (product?: Product | null) => {
    setQuoteProduct(product || null);
    setIsQuoteModalOpen(true);
  };

  // Synchronize State from Browser URL on initial mount and Back/Forward buttons
  useEffect(() => {
    const syncRouteFromBrowser = () => {
      const route = parseUrlToRoute(window.location.pathname, window.location.search);
      setCurrentView(route.view);
      setSelectedCategoryId(route.categoryId);
      setActiveBlogSlug(route.blogSlug);
      setCatalogSearchQuery(route.searchQuery);

      if (route.productId) {
        const found = PRODUCTS.find(
          p => p.id.toLowerCase() === route.productId?.toLowerCase() ||
               p.sku.toLowerCase() === route.productId?.toLowerCase()
        );
        if (found) {
          setSelectedProduct(found);
          setIsDetailModalOpen(true);
        } else {
          setSelectedProduct(null);
          setIsDetailModalOpen(false);
        }
      } else {
        setSelectedProduct(null);
        setIsDetailModalOpen(false);
      }
    };

    // Hydrate route on mount
    syncRouteFromBrowser();

    // Listen to browser Back and Forward navigation buttons
    const handlePopState = () => {
      syncRouteFromBrowser();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Dynamic SEO Metadata whenever route, category, product, query, or blog changes
  useEffect(() => {
    const meta = computeSeoMetadata(
      currentView,
      selectedCategoryId,
      selectedProduct,
      isDetailModalOpen,
      catalogSearchQuery,
      activeBlogSlug
    );
    applySeoMetadata(meta);
  }, [currentView, selectedCategoryId, selectedProduct, isDetailModalOpen, catalogSearchQuery, activeBlogSlug]);

  const handleNavigateView = useCallback((view: PageView, pushHistory = true) => {
    if (view === 'home') {
      setSelectedCategoryId(null);
      setCatalogSearchQuery('');
    }
    setCurrentView(view);
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
    setActiveBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      pushAppRoute({
        view,
        categoryId: view === 'shop' ? selectedCategoryId : null,
        searchQuery: view === 'shop' ? catalogSearchQuery : ''
      });
    }
  }, [selectedCategoryId, catalogSearchQuery]);

  // Global Currency State (EUR / GBP)
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Multi-Language Switcher State (All 24 European Languages)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('europallet_language');
    return (LANGUAGES.some(l => l.code === saved) ? saved : 'en') as Language;
  });

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('europallet_language', lang);
    const langOption = LANGUAGES.find(l => l.code === lang);
    showToast(`Language switched to ${langOption ? `${langOption.label} (${langOption.flag})` : lang}`);
  };

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 } // Pre-seed with Sony WH-1000XM5
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Promo Coupon State
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscountEur, setAppliedDiscountEur] = useState<number>(0);

  // Checkout & Order State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmedOpen, setIsOrderConfirmedOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<ShopOrder | null>(null);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  // Orders History
  const [orders, setOrders] = useState<ShopOrder[]>([
    {
      id: 'ORD-894102',
      orderNumber: 'EPL-ORD-894102',
      date: '2026-03-08',
      items: [{ product: PRODUCTS[1], quantity: 1 }],
      subtotalEur: 279,
      discountEur: 0,
      shippingEur: 0,
      shippingMethod: {
        id: 'standard',
        name: 'Standard EU Tracked Delivery',
        carrier: 'DPD Europe',
        transitTime: '3-4 Business Days',
        priceEur: 0,
        freeThresholdEur: 50
      },
      vatEur: 48.42,
      totalEur: 279,
      paymentMethod: 'card',
      customer: {
        fullName: 'Alexander Weber',
        email: 'alex.weber@example.de',
        phone: '+49 211 9840 210',
        street: 'Industriestraße 45',
        city: 'Düsseldorf',
        postalCode: '40213',
        country: 'Germany'
      },
      status: 'Packing in Venlo',
      trackingNumber: 'DPD-EU-48192049',
      carrier: 'DPD Europe',
      estimatedDelivery: '3-4 Business Days'
    }
  ]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Coupon handling
  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.toUpperCase();
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (cleanCode === 'OUTLET10' || cleanCode === 'WELCOME10' || cleanCode === 'FIRST10') {
      const discount = Math.round(subtotal * 0.10 * 100) / 100;
      setCouponCode(cleanCode);
      setAppliedDiscountEur(discount);
      showToast(`Promo code ${cleanCode} applied: 10% discount added!`);
      return true;
    } else if (cleanCode === 'SAVE20') {
      const discount = Math.min(20, subtotal);
      setCouponCode('SAVE20');
      setAppliedDiscountEur(discount);
      showToast('Promo code SAVE20 applied: €20 discount added!');
      return true;
    } else if (cleanCode === 'WELCOME5') {
      const discount = Math.min(5, subtotal);
      setCouponCode('WELCOME5');
      setAppliedDiscountEur(discount);
      showToast('Promo code WELCOME5 applied: €5 discount added!');
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedDiscountEur(0);
    showToast('Promo coupon removed.');
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: ProductVariant, openCart = true) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedVariant?.id === variant?.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });

    if (openCart) {
      setIsCartOpen(true);
    }
    showToast(`Added ${quantity}x "${product.title}" to your cart.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, variantId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedVariant?.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, variantId?: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product.id === productId && item.selectedVariant?.id === variantId))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // 1-Click Buy Now
  const handleBuyNow = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const existing = cartItems.find(
      item => item.product.id === product.id && item.selectedVariant?.id === variant?.id
    );
    if (!existing) {
      setCartItems(prev => [...prev, { product, quantity, selectedVariant: variant }]);
    }
    setIsDetailModalOpen(false);
    setIsCheckoutOpen(true);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        showToast('Item removed from your wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Item saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  // View product detail: sets product and updates browser URL to /products/[id]
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    pushAppRoute({ productId: product.id });
  };

  // Close product detail: hides modal and restores underlying URL
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
    pushAppRoute({
      view: currentView,
      categoryId: selectedCategoryId,
      searchQuery: catalogSearchQuery,
      blogSlug: activeBlogSlug
    });
  };

  // Category navigation: updates selected category and updates URL to /shop/[categorySlug]
  const handleSelectCategory = (categoryId: string) => {
    const targetCat = categoryId === 'all' ? null : categoryId;
    setSelectedCategoryId(targetCat);
    setCatalogSearchQuery('');
    setCurrentView('shop');
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
    setActiveBlogSlug(null);

    pushAppRoute({ view: 'shop', categoryId: targetCat, searchQuery: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Blog article navigation: opens specific guide with shareable /blog/[slug] URL
  const handleSelectBlogPost = (post: BlogPost) => {
    setActiveBlogSlug(post.slug);
    pushAppRoute({ view: 'blog', blogSlug: post.slug });
  };

  const handleBackToAllBlogPosts = () => {
    setActiveBlogSlug(null);
    pushAppRoute({ view: 'blog' });
  };

  // Search submission: navigates to /shop?q=[query]
  const handleSearchSubmit = (query: string) => {
    setCatalogSearchQuery(query);
    setCurrentView('shop');
    setSelectedCategoryId(null);
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
    setActiveBlogSlug(null);

    pushAppRoute({ view: 'shop', searchQuery: query });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order completion
  const handleOrderCompleted = (order: ShopOrder) => {
    setOrders(prev => [order, ...prev]);
    setLatestOrder(order);
    setCartItems([]);
    setCouponCode('');
    setAppliedDiscountEur(0);
    setIsOrderConfirmedOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Toast Notification with Instant Checkout Action */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="max-w-xs truncate">{toastMessage}</span>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                setToastMessage(null);
                setIsCheckoutOpen(true);
              }}
              className="ml-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-emerald-500/20 shrink-0"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Main Header with Menu: Home, Shop, About, Contact, Blog */}
      <Header
        currentView={currentView}
        onNavigateView={(view) => {
          setIsMobileMenuOpen(false);
          handleNavigateView(view);
        }}
        currency={currency}
        onToggleCurrency={() => setCurrency(prev => prev === 'EUR' ? 'GBP' : 'EUR')}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        cartItems={cartItems}
        wishlistIds={wishlistIds}
        onOpenCart={() => {
          setIsMobileMenuOpen(false);
          setIsCartOpen(true);
        }}
        onOpenWishlist={() => {
          setIsMobileMenuOpen(false);
          setIsWishlistOpen(true);
        }}
        onOpenTrackOrder={() => {
          setIsMobileMenuOpen(false);
          setIsTrackOrderOpen(true);
        }}
        onSelectProduct={handleViewProduct}
        onSelectCategory={(catId) => {
          setIsMobileMenuOpen(false);
          handleSelectCategory(catId);
        }}
        selectedCategoryId={selectedCategoryId}
        onNavigateHome={() => {
          setIsMobileMenuOpen(false);
          handleNavigateView('home');
        }}
        onNavigateCatalog={() => {
          setIsMobileMenuOpen(false);
          handleNavigateView('shop');
        }}
        onSearchQuery={(q) => {
          setIsMobileMenuOpen(false);
          handleSearchSubmit(q);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content View (Home / Shop / About / Contact / Blog) */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Retail Hero with Deal of the Day */}
            <Hero
              currency={currency}
              onExploreCatalog={() => handleNavigateView('shop')}
              onViewProduct={handleViewProduct}
              onSelectCategory={handleSelectCategory}
            />

            {/* Quick 20 Pallet Products Dropdown Selector Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-6 relative z-20">
              <PalletDropdownMenu
                currency={currency}
                onSelectProduct={handleViewProduct}
                variant="catalog"
              />
            </section>

            {/* Department Categories Grid */}
            <CategoryGrid
              onSelectCategory={handleSelectCategory}
              selectedCategoryId={selectedCategoryId}
            />

            {/* Featured Outlet Deals Carousel */}
            <FeaturedCarousel
              currency={currency}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onBuyNow={(p) => handleBuyNow(p, 1)}
              onViewDetails={handleViewProduct}
              onViewAll={() => handleNavigateView('shop')}
            />

            {/* Consumer Trust Pillars */}
            <ValueProps />

            {/* Trustpilot Review Section with Real-Time Live Reviews */}
            <HomeTrustpilotReviews
              language={language}
            />

            {/* 4 Featured Resale Guides & Blog Posts */}
            <HomeBlogSection
              language={language}
              onNavigateBlog={() => handleNavigateView('blog')}
            />

            {/* 4 Essential Liquidation Buyer FAQs */}
            <HomeFAQSection
              language={language}
              onNavigateContact={() => handleNavigateView('contact')}
            />
          </div>
        )}

        {currentView === 'shop' && (
          <CatalogView
            currency={currency}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onBuyNow={(p) => handleBuyNow(p, 1)}
            onViewDetails={handleViewProduct}
            initialSearchQuery={catalogSearchQuery}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onExploreShop={() => handleNavigateView('shop')}
            onContactUs={() => handleNavigateView('contact')}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onBackToShop={() => handleNavigateView('shop')}
          />
        )}

        {currentView === 'blog' && (
          <BlogView
            onExploreShop={() => handleNavigateView('shop')}
            onSelectCategory={handleSelectCategory}
            activeBlogSlug={activeBlogSlug}
            onSelectPost={handleSelectBlogPost}
            onClosePost={handleBackToAllBlogPosts}
          />
        )}

        {currentView === 'keywords' && (
          <KeywordsDirectoryView
            onNavigateView={handleNavigateView}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'terms' && (
          <TermsView
            onNavigateShop={() => handleNavigateView('shop')}
            onNavigateContact={() => handleNavigateView('contact')}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyView
            onNavigateShop={() => handleNavigateView('shop')}
            onNavigateContact={() => handleNavigateView('contact')}
          />
        )}

        {currentView === 'faq' && (
          <FAQView
            language={language}
            onNavigateShop={() => handleNavigateView('shop')}
            onNavigateContact={() => handleNavigateView('contact')}
            onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          />
        )}

        {currentView === 'shipping-returns' && (
          <ShippingReturnsView
            language={language}
            onNavigateShop={() => handleNavigateView('shop')}
            onNavigateContact={() => handleNavigateView('contact')}
            onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          />
        )}
      </main>

      {/* Store Footer */}

      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onNavigateView={handleNavigateView}
        onApplyCoupon={handleApplyCoupon}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onRequestQuote={(prod) => handleOpenQuoteModal(prod)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        couponCode={couponCode}
        appliedDiscountEur={appliedDiscountEur}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onViewProduct={handleViewProduct}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(p) => handleAddToCart(p, 1)}
        onViewProduct={handleViewProduct}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        couponCode={couponCode}
        appliedDiscountEur={appliedDiscountEur}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal
        order={latestOrder}
        isOpen={isOrderConfirmedOpen}
        onClose={() => setIsOrderConfirmedOpen(false)}
        currency={currency}
        onContinueShopping={() => {
          setCurrentView('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Track My Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        orders={orders}
        currency={currency}
      />

      {/* Mobile Slide-Out Navigation Drawer & Backdrop (Mounted via Portal at root body level) */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentView={currentView}
        onNavigateView={(view) => {
          setIsMobileMenuOpen(false);
          handleNavigateView(view);
        }}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        currency={currency}
        onToggleCurrency={() => setCurrency(prev => prev === 'EUR' ? 'GBP' : 'EUR')}
        onOpenWishlist={() => {
          setIsMobileMenuOpen(false);
          setIsWishlistOpen(true);
        }}
        onOpenTrackOrder={() => {
          setIsMobileMenuOpen(false);
          setIsTrackOrderOpen(true);
        }}
        onSelectCategory={(catId) => {
          setIsMobileMenuOpen(false);
          handleSelectCategory(catId);
        }}
        selectedCategoryId={selectedCategoryId}
        wishlistIds={wishlistIds}
      />

      {/* Floating Sticky Checkout Bar for Easy Instant Ordering */}
      {cartItems.length > 0 && !isCheckoutOpen && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} {cartItems.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'Pallet Lot' : 'Lots'} in Cart
              </p>
              <p className="text-[11px] font-mono font-bold text-emerald-400">
                {formatCurrency(cartItems.reduce((acc, i) => acc + (i.product.price * i.quantity), 0), currency)} • Free EU Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cart
            </button>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating B2B Wholesale Manifest & Quote Lead Trigger */}
      <QuickLeadBadge onOpenQuoteModal={() => handleOpenQuoteModal(null)} />

      {/* B2B Pallet Manifest & Freight Quote Modal */}
      <LeadInquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={quoteProduct}
        currency={currency}
      />

    </div>
  );
}
