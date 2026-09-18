import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Check, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Camera 
} from 'lucide-react';
import { Product, Currency } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onViewDetails
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const savingsEur = product.originalMSRP - product.price;

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const currentImage = product.images[activePhotoIndex] || product.images[0];

  return (
    <div 
      onClick={() => onViewDetails(product)}
      className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/5 transition-all flex flex-col cursor-pointer"
    >
      {/* Visual & Top Badges */}
      <div 
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950"
      >
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges & Wishlist */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-emerald-500 text-slate-950 font-mono font-black text-xs px-2 py-0.5 rounded shadow-md">
              -{product.discountPercentage}%
            </span>
            {product.badge && (
              <span className="bg-slate-900/90 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-500/30">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="bg-slate-950/80 backdrop-blur text-slate-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-slate-700/80">
              4 Photos
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur text-slate-300 hover:text-white transition-colors border border-slate-700/60"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick Photo Switcher Dots (Pallet, Live 1, Live 2, Seal) */}
        {product.images.length > 1 && (
          <div className="absolute top-12 right-2.5 flex flex-col gap-1 z-10 bg-slate-950/70 p-1 rounded-md backdrop-blur border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  activePhotoIndex === idx 
                    ? idx === 0 
                      ? 'bg-emerald-400 ring-2 ring-emerald-500/40 scale-125' 
                      : idx === 1 || idx === 2 
                      ? 'bg-cyan-400 ring-2 ring-cyan-500/40 scale-125' 
                      : 'bg-amber-400 ring-2 ring-amber-500/40 scale-125'
                    : 'bg-slate-600 hover:bg-slate-400'
                }`}
                title={
                  idx === 0 
                    ? 'Sealed Pallet photo' 
                    : idx === 1 
                    ? 'Live Product Photo #1' 
                    : idx === 2 
                    ? 'Live Product Photo #2' 
                    : 'Manifest & Seal'
                }
              />
            ))}
          </div>
        )}

        {/* Condition & Pallet / Live Status Tag Bottom */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] z-10 pointer-events-none">
          {activePhotoIndex === 0 ? (
            <span className="bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded text-emerald-300 font-medium border border-slate-700/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Sealed Pallet • Ready to Deliver
            </span>
          ) : activePhotoIndex === 1 ? (
            <span className="bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded text-cyan-300 font-medium border border-cyan-500/40 flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" />
              Live Product Photo #1
            </span>
          ) : activePhotoIndex === 2 ? (
            <span className="bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded text-cyan-300 font-medium border border-cyan-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Live Detail Photo #2
            </span>
          ) : (
            <span className="bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded text-amber-300 font-medium border border-amber-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              Manifest & Tamper Seal
            </span>
          )}

          {product.stockCount <= 5 && (
            <span className="text-amber-400 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-700/40">
              Only {product.stockCount} left
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <div className="flex items-center gap-1.5">
              {product.palletCode && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] border border-emerald-500/30">
                  {product.palletCode}
                </span>
              )}
              <span className="font-bold text-emerald-400 uppercase tracking-wide">
                {product.brand}
              </span>
            </div>
            <span className="text-[11px] truncate max-w-[120px]">
              {product.categoryName}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-slate-300 text-[11px]">{product.rating}</span>
            <span className="text-[10px] text-slate-500">({product.reviewCount})</span>
          </div>

          {/* Product Quality & Unboxed Valuation Banner */}
          <div className="mt-2.5 bg-slate-950/80 border border-slate-800/90 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[10px] tracking-tight">Grade A+ Sealed</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <span className="text-[10px] text-slate-400">Unboxed Worth:</span>
              <span className="font-mono font-bold text-amber-300 text-[11px]">
                {formatCurrency(product.unboxedTotalWorth || product.originalMSRP, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2.5 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Outlet Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-white font-mono">
                  {formatCurrency(product.price, currency)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.originalMSRP, currency)}
                </span>
              </div>
            </div>

            <span className="text-[11px] text-emerald-400 font-semibold font-mono">
              Save {formatCurrency(savingsEur, currency)}
            </span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={handleAddClick}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-98'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
