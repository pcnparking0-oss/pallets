import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  currency: Currency;
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  currency,
  onRemoveFromWishlist,
  onMoveToCart,
  onViewProduct
}) => {
  if (!isOpen) return null;

  const savedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div onClick={onClose} className="absolute inset-0" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-base font-black text-white">Your Saved Deals</h2>
              <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full font-mono">
                {savedProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {savedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-white">No saved deals yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any product to save items for later price drops.
                </p>
              </div>
            ) : (
              savedProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-3 group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => {
                      onViewProduct(product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            onViewProduct(product);
                            onClose();
                          }}
                          className="text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="font-mono font-bold text-white text-xs">
                          {formatCurrency(product.price, currency)}
                        </span>
                        <span className="text-[10px] text-slate-500 line-through">
                          {formatCurrency(product.originalMSRP, currency)}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1 rounded">
                          -{product.discountPercentage}%
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          onMoveToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex-1 py-1.5 px-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 shadow"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors text-center"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
