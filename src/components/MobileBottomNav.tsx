import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  Menu,
  X
} from 'lucide-react';
import { PageView, CartItem, Currency } from '../types';
import { Language, mockTranslate } from '../utils/translations';
import { formatCurrency } from '../utils/formatters';

interface MobileBottomNavProps {
  currentView: PageView;
  onNavigateView: (view: PageView) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  currency: Currency;
  language?: Language;
  isMenuOpen?: boolean;
  onToggleMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigateView,
  cartItems,
  wishlistIds,
  onOpenCart,
  onOpenWishlist,
  currency,
  language = 'en',
  isMenuOpen = false,
  onToggleMenu
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalEur = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-area-bottom"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto px-1 items-center">
        
        {/* Home */}
        <button
          id="mobile-nav-home"
          onClick={() => onNavigateView('home')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative active:scale-95 cursor-pointer ${
            currentView === 'home' && !isMenuOpen ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {currentView === 'home' && !isMenuOpen && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">
            {mockTranslate('home', language)}
          </span>
        </button>

        {/* Shop / Catalog */}
        <button
          id="mobile-nav-shop"
          onClick={() => onNavigateView('shop')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative active:scale-95 cursor-pointer ${
            currentView === 'shop' && !isMenuOpen ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {currentView === 'shop' && !isMenuOpen && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">
            {mockTranslate('shop', language)}
          </span>
        </button>

        {/* Wishlist */}
        <button
          id="mobile-nav-wishlist"
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative active:scale-95 cursor-pointer text-slate-400 hover:text-slate-200"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-rose-500 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">
            {mockTranslate('wishlist', language)}
          </span>
        </button>

        {/* Cart */}
        <button
          id="mobile-nav-cart"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative active:scale-95 cursor-pointer text-slate-400 hover:text-slate-200"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-emerald-500 text-slate-950 text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-semibold text-emerald-400 tracking-tight leading-none">
            {totalCartCount > 0 ? formatCurrency(cartSubtotalEur, currency) : mockTranslate('myCart', language)}
          </span>
        </button>

        {/* Menu (Always Visible on Mobile) */}
        <button
          id="mobile-nav-menu"
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
          className={`flex flex-col items-center justify-center h-full w-full py-1 transition-colors relative active:scale-95 cursor-pointer ${
            isMenuOpen ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            {isMenuOpen ? (
              <X className="w-5 h-5 text-emerald-400" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            {isMenuOpen && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight leading-none">
            Menu
          </span>
        </button>

      </div>
    </nav>
  );
};
