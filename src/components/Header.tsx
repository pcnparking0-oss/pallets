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
  onNavigateCatalog
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

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
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  EuroPallet<span className="text-emerald-400">Liquidation</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm">
                  {mockTranslate('storeTag', language)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide">
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative">
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

            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              title="Switch Currency (EUR / GBP)"
              className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currency === 'EUR' ? 'EUR €' : 'GBP £'}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              title={mockTranslate('wishlist', language)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors flex items-center"
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
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 sm:hidden">
          <SearchAutocomplete
            currency={currency}
            onSelectProduct={onSelectProduct}
            onSearchSubmit={() => onNavigateCatalog()}
          />
        </div>
      </div>

      {/* Header Menu & Navigation Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur relative z-30 overflow-visible">
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Language Selector */}
          <div className="space-y-1.5 pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
              {mockTranslate('selectLanguage', language)}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    if (onSelectLanguage) onSelectLanguage(lang.code);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                    language === lang.code
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span>{lang.label.slice(0, 3)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Header Menu Pages */}
          <div className="space-y-1.5 pb-3 border-b border-slate-800">
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
              Store Pages
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigateView('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  currentView === 'home'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>{mockTranslate('home', language)}</span>
              </button>

              <button
                onClick={() => {
                  onNavigateView('shop');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  currentView === 'shop'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{mockTranslate('shop', language)}</span>
              </button>

              <button
                onClick={() => {
                  onNavigateView('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  currentView === 'about'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>{mockTranslate('about', language)}</span>
              </button>

              <button
                onClick={() => {
                  onNavigateView('contact');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  currentView === 'contact'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{mockTranslate('contact', language)}</span>
              </button>

              <button
                onClick={() => {
                  onNavigateView('blog');
                  setIsMobileMenuOpen(false);
                }}
                className={`col-span-2 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  currentView === 'blog'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{mockTranslate('blog', language)}</span>
              </button>
            </div>
          </div>

            <button
              onClick={() => {
                onOpenTrackOrder();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track Order</span>
            </button>

          <div className="pt-2 border-t border-slate-800 text-xs space-y-1.5 max-h-56 overflow-y-auto">
            <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
              Shop by Department
            </span>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigateView('shop');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left py-1.5 px-2 rounded-lg flex items-center justify-between transition-colors ${
                  selectedCategoryId === cat.id && currentView === 'shop'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-slate-500">{cat.itemCount} items</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
