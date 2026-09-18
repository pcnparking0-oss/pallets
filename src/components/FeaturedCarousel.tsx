import React from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { Product, Currency } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface FeaturedCarouselProps {
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
  onViewAll
}) => {
  const trendingDeals = PRODUCTS.filter(p => p.featured).slice(0, 6);

  return (
    <section className="py-12 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Trending Liquidation Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Clearance Deals
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Deals ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trendingDeals.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
