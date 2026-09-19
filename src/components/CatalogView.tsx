import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Grid3X3, 
  LayoutList, 
  Search, 
  X, 
  Sparkles, 
  Tag, 
  RotateCcw 
} from 'lucide-react';
import { Product, Currency, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';
import { PalletDropdownMenu } from './PalletDropdownMenu';
import { formatCurrency } from '../utils/formatters';

interface CatalogViewProps {
  currency: Currency;
  selectedCategoryId: string | null;
  onSelectCategory: (catId: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  currency,
  selectedCategoryId,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating-desc'>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
    return brands.sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategoryId && product.categoryId !== selectedCategoryId) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match = 
          product.title.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.categoryName.toLowerCase().includes(q) ||
          (product.description && product.description.toLowerCase().includes(q)) ||
          (product.keyFeatures && product.keyFeatures.some(f => f.toLowerCase().includes(q))) ||
          (q.includes('phone') && (product.categoryId === 'smartphones-tablets' || product.title.toLowerCase().includes('iphone') || product.title.toLowerCase().includes('samsung') || product.title.toLowerCase().includes('pixel'))) ||
          (q.includes('laptop') && (product.categoryId === 'computing-gaming' || product.title.toLowerCase().includes('laptop') || product.title.toLowerCase().includes('macbook') || product.title.toLowerCase().includes('thinkpad') || product.title.toLowerCase().includes('dell'))) ||
          (q.includes('amazon') && (product.title.toLowerCase().includes('amazon') || product.title.toLowerCase().includes('echo') || product.condition.toLowerCase().includes('return') || product.condition.toLowerCase().includes('overstock'))) ||
          (q.includes('tool') && (product.categoryId === 'power-tools' || product.brand.toLowerCase().includes('dewalt') || product.brand.toLowerCase().includes('bosch') || product.brand.toLowerCase().includes('makita')));
        if (!match) return false;
      }

      // Condition filter
      if (selectedCondition !== 'all') {
        if (!product.condition.toLowerCase().includes(selectedCondition.toLowerCase())) {
          return false;
        }
      }

      // Price range
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under-150' && product.price >= 150) return false;
        if (selectedPriceRange === '150-300' && (product.price < 150 || product.price > 300)) return false;
        if (selectedPriceRange === '300-500' && (product.price < 300 || product.price > 500)) return false;
        if (selectedPriceRange === 'over-500' && product.price <= 500) return false;
      }

      // Brand
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }

      // In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount-desc') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    selectedCategoryId,
    searchQuery,
    selectedCondition,
    selectedPriceRange,
    selectedBrand,
    inStockOnly,
    sortBy
  ]);

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategoryId);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCondition('all');
    setSelectedPriceRange('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    onSelectCategory('all');
  };

  const hasActiveFilters = 
    selectedCategoryId !== null ||
    selectedCondition !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedBrand !== 'all' ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Category Heading / Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <span>Central Outlet Catalog</span>
            <span>•</span>
            <span>Dispatched from Venlo Hub (NL)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {activeCategory ? activeCategory.name : 'All Outlet Deals & Clearance'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {activeCategory 
              ? activeCategory.description 
              : 'Save up to 80% on brand-name consumer electronics, appliances, and tools with full EU warranty.'}
          </p>
        </div>

        {/* Sort & Quick Filter Trigger */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Featured Deals</option>
              <option value="discount-desc" className="bg-slate-900">Highest Discount %</option>
              <option value="price-asc" className="bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
              <option value="rating-desc" className="bg-slate-900">Top Customer Rated</option>
            </select>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>
        </div>
      </div>

      {/* Prominent Quick Pallet Dropdown Selector Bar */}
      <div className="mb-4 sm:mb-6">
        <PalletDropdownMenu
          currency={currency}
          onSelectProduct={onViewDetails}
          variant="catalog"
        />
      </div>

      {/* Mobile Horizontal Quick Category Pills Scroll */}
      <div className="md:hidden mb-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 -mx-4 px-4">
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategoryId === null
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          All Deals ({PRODUCTS.length})
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategoryId === cat.id
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            <span>{cat.name}</span>
            <span className="text-[10px] opacity-70">({cat.itemCount})</span>
          </button>
        ))}
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            onClick={() => setIsMobileFiltersOpen(false)} 
            className="absolute inset-0" 
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-screen max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Top */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-black text-white uppercase tracking-wider">Filter Deals</span>
                </div>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Search within deals */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Search within Deals</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Keyword, brand, or SKU..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Department</label>
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => onSelectCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                        selectedCategoryId === null
                          ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                          : 'bg-slate-950 text-slate-300 border border-slate-800/80'
                      }`}
                    >
                      <span>All Categories</span>
                      <span className="text-[10px] text-slate-500">{PRODUCTS.length}</span>
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                          selectedCategoryId === cat.id
                            ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                            : 'bg-slate-950 text-slate-300 border border-slate-800/80'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] text-slate-500">{cat.itemCount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Conditions</option>
                    <option value="factory sealed">Factory Sealed Only</option>
                    <option value="certified">Certified Overstock</option>
                    <option value="grade a">Grade A+ (Brand New)</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Price Range</label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-150">Under €150</option>
                    <option value="150-300">€150 - €300</option>
                    <option value="300-500">€300 - €500</option>
                    <option value="over-500">Over €500</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Brands ({allBrands.length})</option>
                    {allBrands.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* In stock */}
                <div className="pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
                    />
                    <span>In Stock only ({PRODUCTS.filter(p => p.inStock).length})</span>
                  </label>
                </div>
              </div>

              {/* Drawer Apply Bottom Action */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 safe-area-bottom">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Show {filteredProducts.length} Deals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Sidebar Filters + Products List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Filters Sidebar (3 cols - Desktop Only) */}
        <div className="hidden md:block md:col-span-3 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm sticky top-24">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                Filter Deals
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* In-Catalog Search */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Search within Deals</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keyword or SKU..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Department</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategoryId === null
                      ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-slate-600">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategoryId === cat.id
                        ? 'bg-emerald-500/10 text-emerald-400 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] text-slate-600">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Price Range</label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-150', label: 'Under €150' },
                  { id: '150-300', label: '€150 – €300' },
                  { id: '300-500', label: '€300 – €500' },
                  { id: 'over-500', label: 'Over €500' }
                ].map(r => (
                  <label
                    key={r.id}
                    onClick={() => setSelectedPriceRange(r.id)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="price-range"
                      checked={selectedPriceRange === r.id}
                      onChange={() => setSelectedPriceRange(r.id)}
                      className="text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Condition</label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Conditions' },
                  { id: 'Brand New', label: 'Brand New (Factory Sealed)' },
                  { id: 'Open Box', label: 'Pristine Open Box' },
                  { id: 'Refurbished', label: 'Certified Refurbished' }
                ].map(c => (
                  <label
                    key={c.id}
                    onClick={() => setSelectedCondition(c.id)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer py-1"
                  >
                    <input
                      type="radio"
                      name="condition-filter"
                      checked={selectedCondition === c.id}
                      onChange={() => setSelectedCondition(c.id)}
                      className="text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">All Brands ({allBrands.length})</option>
                {allBrands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* In Stock toggle */}
            <div className="pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-500 bg-slate-950 border-slate-800"
                />
                <span>In Stock only ({PRODUCTS.filter(p => p.inStock).length})</span>
              </label>
            </div>

          </div>
        </div>

        {/* Right Products Showcase (9 cols) */}
        <div className="md:col-span-9 space-y-4">
          {/* Status line */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredProducts.length}</strong> liquidation deals
            </span>
            <span className="text-[11px] text-emerald-400">
              ✓ All prices include 21% EU VAT
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
                <Tag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">No products match your current filters</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try broadening your price range, choosing another category, or clearing your search keywords.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
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
          )}
        </div>

      </div>
    </div>
  );
};
