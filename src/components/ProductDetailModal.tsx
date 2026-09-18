import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Check, 
  Heart, 
  Share2, 
  Flame, 
  Package, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  Layers,
  TrendingUp
} from 'lucide-react';
import { Product, Currency, ProductVariant } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, variant?: ProductVariant) => void;
  onBuyNow: (product: Product, quantity: number, variant?: ProductVariant) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');
  const [isCopied, setIsCopied] = useState(false);

  const savingsEur = product.originalMSRP - product.price;
  const resaleValueEur = product.resaleValue || Math.round((product.unboxedTotalWorth || product.originalMSRP) * 0.92);
  const customerResaleProfitEur = Math.max(0, resaleValueEur - product.price);
  const resaleRoiPercent = Math.round((customerResaleProfitEur / product.price) * 100);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative divide-y divide-slate-800"
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur z-20 px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs flex-wrap">
            {product.palletCode && (
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono font-black text-[11px] shadow-sm">
                PALLET #{String(product.palletNumber).padStart(2, '0')} [{product.palletCode}]
              </span>
            )}
            <span className="font-bold text-emerald-400 uppercase tracking-wide">
              {product.brand}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono text-[11px]">SKU: {product.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="Share deal link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCopied ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Gallery (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black font-mono text-xs px-2.5 py-1 rounded-lg shadow-md z-10">
                -{product.discountPercentage}% OUTLET PRICE
              </div>

              {/* Dynamic Status Badge based on active image */}
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-mono font-bold border flex items-center gap-1.5 shadow-md z-10">
                {selectedImageIndex === 0 ? (
                  <span className="text-amber-300 border-amber-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SEALED PALLET • READY TO DELIVER</span>
                  </span>
                ) : selectedImageIndex === 1 ? (
                  <span className="text-cyan-300 border-cyan-500/30 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LIVE PRODUCT PHOTO #1 • UNBOXED</span>
                  </span>
                ) : selectedImageIndex === 2 ? (
                  <span className="text-cyan-300 border-cyan-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LIVE PRODUCT PHOTO #2 • DETAIL ANGLE</span>
                  </span>
                ) : (
                  <span className="text-emerald-300 border-emerald-500/30 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>TAMPER-PROOF MANIFEST SEAL</span>
                  </span>
                )}
              </div>

              {/* Prev / Next Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur border border-slate-700/80 transition-transform active:scale-95 opacity-80 group-hover:opacity-100 shadow-md"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur border border-slate-700/80 transition-transform active:scale-95 opacity-80 group-hover:opacity-100 shadow-md"
                    title="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Condition Tag & Image Counter Bottom */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                  {product.condition}
                </span>
                <span className="bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-slate-700">
                  {selectedImageIndex + 1} / {product.images.length} Photos
                </span>
              </div>
            </div>

            {/* Labeled Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 pt-1">
                {product.images.map((img, idx) => {
                  const label = idx === 0 
                    ? 'Sealed Pallet' 
                    : idx === 1 
                    ? 'Live Photo 1' 
                    : idx === 2 
                    ? 'Live Photo 2' 
                    : 'Manifest Seal';
                  const isSelected = selectedImageIndex === idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`group/thumb relative rounded-xl overflow-hidden border-2 transition-all flex flex-col items-center bg-slate-950 ${
                        isSelected 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-[1.02]' 
                          : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-full h-14 overflow-hidden relative">
                        <img 
                          src={img} 
                          alt={label} 
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform" 
                          referrerPolicy="no-referrer" 
                        />
                        {idx === 0 ? (
                          <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
                        ) : idx === 1 || idx === 2 ? (
                          <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950"></span>
                        ) : (
                          <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-950"></span>
                        )}
                      </div>
                      <div className={`w-full py-1 text-center text-[10px] font-mono font-bold tracking-tight truncate px-1 transition-colors ${
                        isSelected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {label}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Live Social Urgency */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-300">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400 animate-pulse" />
              <span>
                High demand: <strong>14 customers</strong> are currently viewing this item.
              </span>
            </div>
          </div>

          {/* Right Column: Buying Controls & Info (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                {product.title}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} reviews)</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock in Venlo ({product.stockCount} left)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mt-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Liquidation Outlet Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {formatCurrency(product.price, currency)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {formatCurrency(product.originalMSRP, currency)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 rounded-md">
                      You save {formatCurrency(savingsEur, currency)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Includes 21% EU VAT
                    </span>
                  </div>
                </div>
              </div>

              {/* Pallet Unboxing Valuation & Certified Quality Box */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 rounded-xl p-3.5 mt-2.5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Quality: {product.productQuality || 'Grade A+ Factory Sealed (100% Brand New, Untampered Seals)'}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                    CERTIFIED UNOPENED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block tracking-wider">
                      Total Worth After Unboxing
                    </span>
                    <span className="font-mono font-black text-amber-300 text-base sm:text-lg">
                      {formatCurrency(product.unboxedTotalWorth || product.originalMSRP, currency)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">Verified EU Retail MSRP</span>
                  </div>
                  <div className="border-l border-slate-800/80 pl-3">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block tracking-wider">
                      Unboxed Resale Margin
                    </span>
                    <span className="font-mono font-black text-emerald-400 text-base sm:text-lg">
                      +{formatCurrency(savingsEur, currency)}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 block font-semibold">
                      +{product.discountPercentage}% Unboxed Equity
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Resale Value When Resold */}
              <div className="bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950 border border-teal-500/40 rounded-xl p-3.5 mt-2.5 shadow-sm space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                    <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Customer Resale Valuation</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-teal-500/15 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                    ESTIMATED RESALE RETURN
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-1 text-center">
                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-medium">When You Resell</span>
                    <span className="font-mono font-black text-teal-300 text-sm sm:text-base">
                      {formatCurrency(resaleValueEur, currency)}
                    </span>
                    <span className="text-[9px] text-slate-500 block">Est. Resale Price</span>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-medium">Net Resale Profit</span>
                    <span className="font-mono font-black text-emerald-400 text-sm sm:text-base">
                      +{formatCurrency(customerResaleProfitEur, currency)}
                    </span>
                    <span className="text-[9px] text-emerald-400/80 block font-semibold">Your Pocket Gain</span>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-medium">Resale ROI</span>
                    <span className="font-mono font-black text-emerald-400 text-sm sm:text-base">
                      +{resaleRoiPercent}%
                    </span>
                    <span className="text-[9px] text-slate-500 block">Return on Cost</span>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-1 text-[10px] text-slate-400">
                  <span>
                    Resale marketplaces: <strong className="text-slate-300">eBay EU • Marktplaats • Amazon • Vinted</strong>
                  </span>
                  <span className="text-teal-400 font-medium">
                    100% Sealed Factory Condition
                  </span>
                </div>
              </div>

              {/* Variant Selector (if available) */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-3">
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Select {product.variants[0].name}:
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-emerald-500 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-3 flex items-center gap-3">
                <label className="text-xs font-bold text-slate-300">Quantity:</label>
                <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-slate-800 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-slate-800 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">
                  (Max {product.stockCount} per customer)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onAddToCart(product, quantity, selectedVariant)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {quantity} to Shopping Cart</span>
              </button>

              <button
                onClick={() => onBuyNow(product, quantity, selectedVariant)}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Buy Now with 1-Click Checkout</span>
              </button>
            </div>

            {/* Delivery & Warranty Guarantees */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{product.freeShippingEligible ? 'Free Tracked Shipping' : '€4.95 EU Shipping'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Free Return Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{product.warrantyMonths}-Month EU Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dispatched from Venlo, NL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section (Features, Specs, Reviews) */}
        <div className="p-4 sm:p-6 bg-slate-950/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'features' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Key Features & Details
              {activeTab === 'features' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'specs' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'reviews' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({product.reviews.length})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          </div>

          <div className="pt-4 text-xs sm:text-sm text-slate-300">
            {activeTab === 'features' && (
              <div className="space-y-4">
                {/* Visual Unboxing Worth & Quality Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                        Verified Product Quality
                      </span>
                      <span className="text-xs font-bold text-emerald-300">
                        {product.condition}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Grade A+ pristine European liquidation lot. Sealed at origin factory with untampered holographic stickers and full warranty.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                        Total Worth After Unboxing
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {formatCurrency(product.unboxedTotalWorth || product.originalMSRP, currency)} Retail Worth
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        Instant profit / equity surplus of <strong className="text-emerald-400">+{formatCurrency(savingsEur, currency)} ({product.discountPercentage}%)</strong> compared to the {formatCurrency(product.price, currency)} pallet lot price.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full Manifest Description */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-white block text-xs uppercase tracking-wider">
                    Pallet Description, Quality & Valuation:
                  </span>
                  <p className="leading-relaxed text-slate-300 text-xs sm:text-sm">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-1.5 mt-2">
                  <span className="font-bold text-white block text-xs uppercase tracking-wider">
                    Highlighted Features:
                  </span>
                  {product.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-teal-500/30 flex justify-between">
                    <span className="text-teal-300 font-medium">Customer Resale Value</span>
                    <span className="font-mono font-bold text-teal-300">{formatCurrency(resaleValueEur, currency)}</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-lg border border-emerald-500/30 flex justify-between">
                    <span className="text-emerald-300 font-medium">Customer Resale Margin</span>
                    <span className="font-mono font-bold text-emerald-400">+{formatCurrency(customerResaleProfitEur, currency)} (+{resaleRoiPercent}%)</span>
                  </div>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                      <span className="text-slate-400">{key}</span>
                      <span className="font-semibold text-white">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {product.reviews.map(rev => (
                  <div key={rev.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{rev.userName}</span>
                        <span className="text-[10px] text-slate-500">({rev.userCountry})</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/20 font-medium">
                            Verified Outlet Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-700'}`}
                        />
                      ))}
                    </div>

                    <h4 className="font-semibold text-xs text-slate-200">{rev.title}</h4>
                    <p className="text-xs text-slate-400">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
