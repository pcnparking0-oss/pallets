import React from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  selectedCategoryId
}) => {
  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Shop by Department</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore Liquidation Categories
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Direct excess inventory and certified overstock across {CATEGORIES.length} top consumer departments with up to 80% savings.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategoryId === category.id;

            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group cursor-pointer rounded-2xl p-2 sm:p-2.5 transition-all border flex flex-col ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-slate-900'
                    : 'border-slate-800/90 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 shadow-sm'
                }`}
              >
                {/* Clear Image Box without text overlays */}
                <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/85 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-emerald-400 border border-slate-800 shadow-sm">
                    {category.itemCount} Lots
                  </div>
                </div>

                {/* Category Title & Details Underneath Image Box */}
                <div className="pt-2.5 pb-1 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-1 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate mt-1">
                      {category.popularBrands.slice(0, 3).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/70 text-[10px]">
                    <span className="font-semibold text-emerald-400/90 group-hover:text-emerald-300">
                      Explore Deals
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
