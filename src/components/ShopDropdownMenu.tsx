import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, ChevronDown, ArrowRight, Sparkles, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

interface ShopDropdownMenuProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string | null;
  onNavigateCatalog: () => void;
  isActive?: boolean;
}

export const ShopDropdownMenu: React.FC<ShopDropdownMenuProps> = ({
  onSelectCategory,
  selectedCategoryId,
  onNavigateCatalog,
  isActive = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    onNavigateCatalog();
    setIsOpen(false);
  };

  const handleAllDealsClick = () => {
    onSelectCategory('all');
    onNavigateCatalog();
    setIsOpen(false);
  };

  const handleShopButtonClick = () => {
    onNavigateCatalog();
    setIsOpen(false);
  };

  return (
    <div 
      className={`relative inline-block ${isOpen ? 'z-50' : 'z-20'}`} 
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shop Dropdown Trigger Button */}
      <a
        id="shop-categories-dropdown-btn"
        href="/shop"
        onClick={(e) => {
          e.preventDefault();
          handleShopButtonClick();
        }}
        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
          isOpen || isActive
            ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400/40 shadow-sm'
            : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span className="tracking-wide">Shop</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </a>

      {/* Dropdown Menu Panel with continuous hover bridge */}
      {isOpen && (
        <div className="absolute left-0 top-full pt-1.5 z-50">
          <div 
            className="w-[320px] sm:w-[500px] max-w-[calc(100vw-2rem)] max-h-[75vh] overflow-y-auto bg-slate-900/98 backdrop-blur-md border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/80 ring-1 ring-slate-700/60 p-3.5 divide-y divide-slate-800 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin scrollbar-thumb-slate-700"
            role="menu"
            aria-orientation="vertical"
          >
            {/* Top Row: Browse All Liquidation Lots */}
            <div className="pb-3">
              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  handleAllDealsClick();
                }}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-all text-left group cursor-pointer ${
                  selectedCategoryId === null
                    ? 'bg-emerald-500/15 border border-emerald-500/50 text-white'
                    : 'bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white">All Liquidation Lots</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1.5 py-0.5 rounded">
                        {PRODUCTS.length} Total Lots
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">View complete European pallet inventory</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Categories Arranged in a 2-Column Grid */}
            <div className="pt-3 space-y-2">
              <div className="px-1 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Shop by Category</span>
                <span className="text-emerald-400 font-normal lowercase">{CATEGORIES.length} departments</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <a
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(cat.id);
                      }}
                      className={`p-2 rounded-xl text-left flex items-center gap-2.5 transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500/60 text-white'
                          : 'bg-slate-950/60 hover:bg-slate-800/90 border-slate-800/80 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={`${cat.name} liquidation overstock lots`}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white truncate block">
                            {cat.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono block">
                          {cat.itemCount} Lots
                        </span>
                        <span className="text-[9px] text-slate-400 truncate block">
                          {cat.popularBrands.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
