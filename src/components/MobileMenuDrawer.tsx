import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ShoppingBag, 
  Home, 
  Info, 
  Mail, 
  BookOpen, 
  Package, 
  Heart, 
  Truck 
} from 'lucide-react';
import { Currency, PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { Language, LANGUAGES, mockTranslate } from '../utils/translations';
import { SiteLogo } from './SiteLogo';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: PageView;
  onNavigateView: (view: PageView) => void;
  language?: Language;
  onSelectLanguage?: (lang: Language) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
  wishlistIds: string[];
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigateView,
  language = 'en',
  onSelectLanguage,
  currency,
  onToggleCurrency,
  onOpenWishlist,
  onOpenTrackOrder,
  onSelectCategory,
  selectedCategoryId,
  wishlistIds
}) => {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[70] overflow-hidden pointer-events-auto">
      {/* Dark Backdrop covering the entire viewport above hero and all elements */}
      <div 
        id="mobile-drawer-backdrop"
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[70] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Out Drawer Panel */}
      <div 
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className="fixed inset-y-0 right-0 w-[88vw] max-w-sm bg-slate-950 border-l border-slate-800 z-[75] flex flex-col shadow-2xl animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Drawer Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur shrink-0">
          <SiteLogo iconSize={32} textSize="sm" showBadge={false} />

          <button
            id="close-mobile-menu-btn"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 overscroll-contain">
          
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
              <a
                id="drawer-nav-home"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('home');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
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
                  <span className="text-[10px] font-mono uppercase bg-slate-950/20 px-1.5 py-0.5 rounded font-black">Active</span>
                )}
              </a>

              {/* Shop */}
              <a
                id="drawer-nav-shop"
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('shop');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  currentView === 'shop'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{mockTranslate('shop', language)}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">All Lots</span>
              </a>

              {/* About */}
              <a
                id="drawer-nav-about"
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('about');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  currentView === 'about'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4" />
                  <span>{mockTranslate('about', language)}</span>
                </div>
              </a>

              {/* Contact */}
              <a
                id="drawer-nav-contact"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('contact');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
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
              </a>

              {/* Blog */}
              <a
                id="drawer-nav-blog"
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('blog');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  currentView === 'blog'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{mockTranslate('blog', language)}</span>
                </div>
              </a>

              {/* Keywords Index */}
              <a
                id="drawer-nav-keywords"
                href="/keywords"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateView('keywords');
                  onClose();
                }}
                className={`w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  currentView === 'keywords'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>Keywords Index</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">200+ Keys</span>
              </a>

              {/* Track Order */}
              <button
                id="drawer-nav-track-order"
                onClick={() => {
                  onOpenTrackOrder();
                  onClose();
                }}
                className="w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>Track Order</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Live GPS</span>
              </button>

              {/* Wishlist */}
              <button
                id="drawer-nav-wishlist"
                onClick={() => {
                  onOpenWishlist();
                  onClose();
                }}
                className="w-full p-3 rounded-xl text-xs font-bold flex items-center justify-between bg-slate-900/60 text-slate-200 hover:bg-slate-800 border border-slate-850 transition-colors cursor-pointer"
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
                <a
                  key={cat.id}
                  id={`drawer-category-${cat.id}`}
                  href={`/shop/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(cat.id);
                    onNavigateView('shop');
                    onClose();
                  }}
                  className={`w-full text-left py-2 px-2.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    selectedCategoryId === cat.id && currentView === 'shop'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{cat.itemCount} items</span>
                </a>
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
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};
