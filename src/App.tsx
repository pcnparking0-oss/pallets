import React, { useState, useEffect, useCallback } from 'react';
import { Currency, Product, CartItem, ShopOrder, ProductVariant, PageView } from './types';
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
import { Language } from './utils/translations';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { computeSeoMetadata, applySeoMetadata } from './utils/seo';
import { KeywordsDirectoryView } from './components/KeywordsDirectoryView';


export default function App() {
  // Navigation & View
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Initialize Route from URL Path on mount
  useEffect(() => {
    const parsePath = (path: string) => {
      const cleanPath = path.replace(/\/$/, '') || '/';
      
      if (cleanPath === '/' || cleanPath === '') {
        setCurrentView('home');
        setSelectedCategoryId(null);
        setIsDetailModalOpen(false);
      } else if (cleanPath === '/shop') {
        setCurrentView('shop');
        setSelectedCategoryId(null);
        setIsDetailModalOpen(false);
      } else if (cleanPath.startsWith('/shop/')) {
        const catSlug = cleanPath.replace('/shop/', '');
        const foundCategory = CATEGORIES.find(c => c.slug === catSlug || c.id === catSlug);
        setCurrentView('shop');
        setSelectedCategoryId(foundCategory ? foundCategory.id : catSlug);
        setIsDetailModalOpen(false);
      } else if (cleanPath.startsWith('/product/')) {
        const prodId = cleanPath.replace('/product/', '');
        const foundProd = PRODUCTS.find(p => p.id === prodId);
        if (foundProd) {
          setSelectedProduct(foundProd);
          setIsDetailModalOpen(true);
        }
      } else if (cleanPath === '/about') {
        setCurrentView('about');
        setIsDetailModalOpen(false);
      } else if (cleanPath === '/contact') {
        setCurrentView('contact');
        setIsDetailModalOpen(false);
      } else if (cleanPath.startsWith('/blog')) {
        setCurrentView('blog');
        setIsDetailModalOpen(false);
      } else if (cleanPath === '/keywords' || cleanPath === '/keyword-index') {
        setCurrentView('keywords');
        setIsDetailModalOpen(false);
      }
    };


    parsePath(window.location.pathname);

    const handlePopState = () => {
      parsePath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Dynamic SEO Metadata whenever route / modal changes
  useEffect(() => {
    const meta = computeSeoMetadata(
      currentView,
      selectedCategoryId,
      selectedProduct,
      isDetailModalOpen
    );
    applySeoMetadata(meta);
  }, [currentView, selectedCategoryId, selectedProduct, isDetailModalOpen]);

  const handleNavigateView = useCallback((view: PageView, pushHistory = true) => {
    if (view === 'home') {
      setSelectedCategoryId(null);
    }
    setCurrentView(view);
    setIsDetailModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      let targetUrl = '/';
      if (view === 'shop') targetUrl = selectedCategoryId ? `/shop/${selectedCategoryId}` : '/shop';
      else if (view === 'about') targetUrl = '/about';
      else if (view === 'contact') targetUrl = '/contact';
      else if (view === 'blog') targetUrl = '/blog';
      else if (view === 'keywords') targetUrl = '/keywords';


      if (window.location.pathname !== targetUrl) {
        window.history.pushState(null, '', targetUrl);
      }
    }
  }, [selectedCategoryId]);

  // Global Currency State (EUR / GBP)
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Multi-Language Switcher State (English, German, French)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('europallet_language');
    return (saved === 'de' || saved === 'fr' || saved === 'en') ? saved : 'en';
  });

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('europallet_language', lang);
    const langNames: Record<Language, string> = {
      en: 'English (UK / EU)',
      de: 'Deutsch (DE / AT)',
      fr: 'Français (FR / BE)'
    };
    showToast(`Language switched to ${langNames[lang]}`);
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
  const handleAddToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
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

  // View product detail
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    const targetUrl = `/product/${product.id}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    let targetUrl = '/';
    if (currentView === 'shop') {
      targetUrl = selectedCategoryId ? `/shop/${selectedCategoryId}` : '/shop';
    } else if (currentView === 'about') targetUrl = '/about';
    else if (currentView === 'contact') targetUrl = '/contact';
    else if (currentView === 'blog') targetUrl = '/blog';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
  };

  // Category navigation
  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
    const targetCat = categoryId === 'all' ? null : categoryId;
    setCurrentView('shop');
    setIsDetailModalOpen(false);
    const targetUrl = targetCat ? `/shop/${targetCat}` : '/shop';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
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
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
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
            onSelectCategory={(catId) => {
              if (catId === 'all') setSelectedCategoryId(null);
              else setSelectedCategoryId(catId);
            }}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onViewDetails={handleViewProduct}
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
          />
        )}

        {currentView === 'keywords' && (
          <KeywordsDirectoryView
            onNavigateView={handleNavigateView}
            onSelectCategory={handleSelectCategory}
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

    </div>
  );
}
