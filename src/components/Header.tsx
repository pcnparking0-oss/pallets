import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Truck, 
  Search, 
  Globe2, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Package, 
  Menu, 
  X,
  Clock,
  RotateCcw,
  Home,
  Info,
  Mail,
  BookOpen
} from 'lucide-react';
import { Currency, Product, CartItem, PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { SearchAutocomplete } from './SearchAutocomplete';
import { ShopDropdownMenu } from './ShopDropdownMenu';
import { formatCurrency } from '../utils/formatters';
import { Language, LANGUAGES, mockTranslate } from '../utils/translations';

interface HeaderProps {
  currentView: PageView;
  onNavigateView: (view: PageView) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  language?: Language;
  onSelectLanguage?: (lang: Language) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateView,
  currency,
  onToggleCurrency,
  language = 'en',
  onSelectLanguage,
  cartItems,
  wishlistIds,
  onOpenCart,
  onOpenWishlist,
  onOpenTrackOrder,
  onSelectProduct,
  onSelectCategory,
  selectedCategoryId,
  onNavigateHome,
  onNavigateCatalog,
  isMobileMenuOpen: externalMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu
}) => {
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const isMobileMenuOpen = externalMobileMenuOpen !== undefined ? externalMobileMenuOpen : internalMobileMenuOpen;
  const handleToggleMenu = onToggleMobileMenu || (() => setInternalMobileMenuOpen(prev => !prev));
  const handleCloseMenu = onCloseMobileMenu || (() => setInternalMobileMenuOpen(false));

  const currentLanguageOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalEur = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800 transition-colors overflow-visible">
      
      {/* Top Retail Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-slate-800 text-[11px] text-slate-300 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{mockTranslate('flashSale', language)}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              {mockTranslate('freeShipping', language)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <RotateCcw className="w-3 h-3 text-emerald-400" />
              {mockTranslate('moneyBackGuarantee', language)}
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button 
              onClick={onOpenTrackOrder}
              className="hover:text-emerald-400 text-slate-300 font-medium flex items-center gap-1 transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>{mockTranslate('trackOrder', language)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo */}
          <div 
            onClick={() => {
              onNavigateHome();
              handleCloseMenu();
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors truncate">
                  EuroPallet<span className="text-emerald-400">Liquidation</span>
                </span>
                <span className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider bg-emerald-500 text-slate-950 px-1 sm:px-1.5 py-0.5 rounded shadow-sm shrink-0">
                  {mockTranslate('storeTag', language)}
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-400 tracking-wide">
                {mockTranslate('subLogo', language)}
              </p>
            </div>
          </div>

          {/* Search Autocomplete Bar (Desktop/Tablet) */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <SearchAutocomplete
              currency={currency}
              onSelectProduct={onSelectProduct}
              onSearchSubmit={() => onNavigateCatalog()}
            />
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher Dropdown (Desktop/Tablet) */}
            <div className="relative hidden sm:block">
              <button
                id="header-language-switcher"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                title={mockTranslate('selectLanguage', language)}
                className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
                <span className="uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLanguageDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {isLanguageDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLanguageDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 flex items-center justify-between">
                      <span>{mockTranslate('selectLanguage', language)}</span>
                      <span className="text-[9px] text-emerald-400 font-mono">3 LANGS</span>
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          if (onSelectLanguage) onSelectLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                          language === lang.code ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{lang.flag}</span>
                          <div>
                            <span className="block leading-tight font-medium">{lang.label}</span>
                            <span className="text-[10px] text-slate-500 block">{lang.country}</span>
                          </div>
                        </div>
                        {language === lang.code && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Currency Switcher (Desktop/Tablet) */}
            <button
              onClick={onToggleCurrency}
              title="Switch Currency (EUR / GBP)"
              className="hidden sm:flex px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-slate-600 transition-colors items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currency === 'EUR' ? 'EUR €' : 'GBP £'}</span>
            </button>

            {/* Wishlist Button (Desktop/Tablet) */}
            <button
              onClick={onOpenWishlist}
              title={mockTranslate('wishlist', language)}
              className="hidden sm:flex relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors items-center cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{mockTranslate('myCart', language)}</span>
              <span className="bg-slate-950 text-emerald-400 text-[11px] font-mono font-black px-1.5 py-0.5 rounded-full">
                {totalCartCount}
              </span>
              {cartSubtotalEur > 0 && (
                <span className="hidden md:inline font-mono font-bold text-slate-950 pl-0.5">
                  • {formatCurrency(cartSubtotalEur, currency)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button (ALWAYS visible on < md: 0px to 767px) */}
            <button
              id="header-mobile-menu-btn"
              onClick={handleToggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className={`md:hidden flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 ${
                isMobileMenuOpen 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20' 
                  : 'bg-slate-900 text-slate-100 hover:text-white border-emerald-500/40 hover:border-emerald-400'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-slate-950" />
              ) : (
                <Menu className="w-4 h-4 text-emerald-400" />
              )}
              <span className={isMobileMenuOpen ? 'text-slate-950 font-extrabold' : 'text-emerald-400 font-bold'}>
                Menu
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 sm:hidden">
          <SearchAutocomplete
            currency={currency}
            onSelectProduct={onSelectProduct}
            onSearchSubmit={() => onNavigateCatalog()}
          />
        </div>
      </div>

      {/* Header Menu & Navigation Bar (Desktop Only - Mobile has dedicated bottom nav & drawer) */}
      <div className="hidden md:block border-t border-slate-800/80 bg-slate-950/80 backdrop-blur relative z-30 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs overflow-visible">
          
          {/* Header Menu Pages Navigation */}
          <nav className="flex items-center gap-1.5 shrink-0 overflow-visible" aria-label="Header Menu Pages">
            {/* Home */}
            <button
              id="nav-menu-home"
              onClick={() => onNavigateView('home')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{mockTranslate('home', language)}</span>
            </button>

            {/* Shop (with Categories Dropdown) */}
            <ShopDropdownMenu
              onSelectCategory={onSelectCategory}
              selectedCategoryId={selectedCategoryId}
              onNavigateCatalog={() => onNavigateView('shop')}
              isActive={currentView === 'shop'}
            />

            {/* About */}
            <button
              id="nav-menu-about"
              onClick={() => onNavigateView('about')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'about'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{mockTranslate('about', language)}</span>
            </button>

            {/* Contact */}
            <button
              id="nav-menu-contact"
              onClick={() => onNavigateView('contact')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{mockTranslate('contact', language)}</span>
            </button>

            {/* Blog */}
            <button
              id="nav-menu-blog"
              onClick={() => onNavigateView('blog')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'blog'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{mockTranslate('blog', language)}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Slide-Out Navigation Drawer & Backdrop (Accessible on all devices < 768px) */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={handleCloseMenu}
            aria-hidden="true"
          />

          {/* Slide-Out Drawer Panel */}
          <div 
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-y-0 right-0 w-[88vw] max-w-sm bg-slate-950 border-l border-slate-800 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <span className="text-sm font-black text-white">
                    EuroPallet<span className="text-emerald-400">Hub</span>
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono leading-none">Navigation Menu</p>
                </div>
              </div>

              <button
                id="close-mobile-menu-btn"
                onClick={handleCloseMenu}
                aria-label="Close menu"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* Quick Preferences: Language & Currency */}
              <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 space-y-3">
                {/* Language Switcher */}
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px] mb-1.5">
                    {mockTranslate('selectLanguage', language)}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          if (onSelectLanguage) onSelectLanguage(lang.code);
                        }}
                        className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                          language === lang.code
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        <span className="text-sm leading-none">{lang.flag}</span>
                        <span>{lang.label.slice(0, 3)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency Switcher */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Currency
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        if (currency !== 'EUR') onToggleCurrency();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                        currency === 'EUR'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      EUR €
                    </button>
                    <button
                      onClick={() => {
                        if (currency !== 'GBP') onToggleCurrency();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                        currency === 'GBP'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      GBP £
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Store Pages */}
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px] mb-2 px-1">
                  Store Navigation
                </span>
                <div className="space-y-1">
                  {/* Home */}
                  <button
                    onClick={() => {
                      onNavigateView('home');
                      handleCloseMenu();
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      currentView === 'home'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4" />
                      <span>{mockTranslate('home', language)}</span>
                    </div>
                    {currentView === 'home' && (
                      <span className="text-[10px] font-mono uppercase bg-slate-950/20 px-1.5 py-0.5 rounded">Active</span>
                    )}
                  </button>

                  {/* Shop */}
                  <button
                    onClick={() => {
                      onNavigateView('shop');
                      handleCloseMenu();
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      currentView === 'shop'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{mockTranslate('shop', language)}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">20 Lots</span>
                  </button>

                  {/* About */}
                  <button
                    onClick={() => {
                      onNavigateView('about');
                      handleCloseMenu();
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      currentView === 'about'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Info className="w-4 h-4" />
                      <span>{mockTranslate('about', language)}</span>
                    </div>
                  </button>

                  {/* Contact */}
                  <button
                    onClick={() => {
                      onNavigateView('contact');
                      handleCloseMenu();
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      currentView === 'contact'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4" />
                      <span>{mockTranslate('contact', language)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Venlo, NL</span>
                  </button>

                  {/* Blog */}
                  <button
                    onClick={() => {
                      onNavigateView('blog');
                      handleCloseMenu();
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                      currentView === 'blog'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" />
                      <span>{mockTranslate('blog', language)}</span>
                    </div>
                  </button>

                  {/* Track Order */}
                  <button
                    onClick={() => {
                      onOpenTrackOrder();
                      handleCloseMenu();
                    }}
                    className="w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-emerald-400" />
                      <span>Track Order</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Live GPS</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      handleCloseMenu();
                    }}
                    className="w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>Saved Wishlist</span>
                    </div>
                    {wishlistIds.length > 0 && (
                      <span className="text-[10px] bg-rose-500 text-white font-mono px-1.5 py-0.5 rounded-full">
                        {wishlistIds.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Shop by Department */}
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px] mb-2 px-1">
                  Shop by Department
                </span>
                <div className="space-y-1 bg-slate-900/40 rounded-2xl p-2 border border-slate-850">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        onNavigateView('shop');
                        handleCloseMenu();
                      }}
                      className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        selectedCategoryId === cat.id && currentView === 'shop'
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">{cat.itemCount} items</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Depot & Logistics Badge */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Venlo Central Distribution Hub</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Voltastraat 12, 5928 PC Venlo, Netherlands. Direct international dispatch across Europe.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
};
