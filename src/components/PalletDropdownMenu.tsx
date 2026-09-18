import React, { useState, useRef, useEffect } from 'react';
import { Package, ChevronDown, Check, Sparkles, Search, ExternalLink } from 'lucide-react';
import { Product, Currency } from '../types';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/formatters';

interface PalletDropdownMenuProps {
  currency: Currency;
  onSelectProduct: (product: Product) => void;
  selectedProductId?: string;
  variant?: 'header' | 'catalog' | 'compact';
}

export const PalletDropdownMenu: React.FC<PalletDropdownMenuProps> = ({
  currency,
  onSelectProduct,
  selectedProductId,
  variant = 'header'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.palletCode && p.palletCode.toLowerCase().includes(q)) ||
      `pallet #${p.palletNumber}`.includes(q)
    );
  });

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId);

  // Compact Native Select mode (often used in forms or mobile headers)
  if (variant === 'compact') {
    return (
      <div className="relative inline-block w-full">
        <label htmlFor="pallet-select-compact" className="sr-only">
          Select from all {PRODUCTS.length} Pallet Products
        </label>
        <div className="relative flex items-center">
          <Package className="absolute left-3 w-4 h-4 text-emerald-400 pointer-events-none" />
          <select
            id="pallet-select-compact"
            value={selectedProductId || ''}
            onChange={(e) => {
              const prod = PRODUCTS.find(p => p.id === e.target.value);
              if (prod) onSelectProduct(prod);
            }}
            className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-500 rounded-xl text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer transition-all"
          >
            <option value="" disabled>
              📦 Select from all {PRODUCTS.length} Pallet Products ({PRODUCTS.length} Available)...
            </option>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                #{String(p.palletNumber || 0).padStart(2, '0')} [{p.palletCode || 'PLT'}] {p.brand} - {p.title.slice(0, 45)}... ({formatCurrency(p.price, currency)})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Catalog bar mode (prominent banner with direct dropdown selector)
  if (variant === 'catalog') {
    return (
      <div 
        ref={dropdownRef}
        id="catalog-pallet-dropdown-container"
        className="w-full bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-xl relative"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight text-white uppercase">
                  ALL {PRODUCTS.length} PALLET PRODUCTS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-mono font-extrabold uppercase">
                  {PRODUCTS.length} / {PRODUCTS.length} IN STOCK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Browse our complete verified inventory of {PRODUCTS.length} liquidation pallets from one dropdown
              </p>
            </div>
          </div>

          {/* Direct Dropdown Selector */}
          <div className="flex-1 max-w-lg relative">
            <label htmlFor="catalog-pallet-select" className="sr-only">
              Jump to any of the {PRODUCTS.length} Pallet Products
            </label>
            <div className="relative">
              <select
                id="catalog-pallet-select"
                value={selectedProductId || ''}
                onChange={(e) => {
                  const prod = PRODUCTS.find(p => p.id === e.target.value);
                  if (prod) onSelectProduct(prod);
                }}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-xl text-xs sm:text-sm font-semibold text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner appearance-none cursor-pointer"
              >
                <option value="">
                  ▾ Click here to choose from all {PRODUCTS.length} Pallet Products...
                </option>
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    Pallet #{String(prod.palletNumber).padStart(2, '0')} [{prod.palletCode}]: {prod.title.slice(0, 50)} — {formatCurrency(prod.price, currency)} (-{prod.discountPercentage}%)
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1 text-emerald-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Header Interactive Menu mode
  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="header-all-pallets-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
          isOpen
            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
            : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-emerald-500/60'
        }`}
        title={`View All ${PRODUCTS.length} Liquidation Pallet Products`}
      >
        <Package className={`w-4 h-4 ${isOpen ? 'text-slate-950' : 'text-emerald-400'}`} />
        <span className="tracking-tight">All {PRODUCTS.length} Pallets</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-black ${
          isOpen ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        }`}>
          {PRODUCTS.length}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Flyout Dropdown Menu */}
      {isOpen && (
        <div 
          id="header-pallets-dropdown-menu"
          className="absolute left-0 mt-2 w-[340px] sm:w-[460px] md:w-[540px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Header of Dropdown */}
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Full {PRODUCTS.length}-Pallet Inventory List
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
              Showing {filteredProducts.length} of {PRODUCTS.length} Lots
            </span>
          </div>

          {/* Quick Filter Search inside Dropdown */}
          <div className="p-2.5 bg-slate-900/90 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Filter the ${PRODUCTS.length} pallets by name, brand, or #...`}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700/70 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Scrollable list of all products */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-800/60 p-1.5 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredProducts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No pallet product found matching "{searchQuery}".
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isSelected = product.id === selectedProductId;
                return (
                  <button
                    key={product.id}
                    id={`pallet-item-${product.palletNumber}`}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-colors group ${
                      isSelected 
                        ? 'bg-emerald-500/15 border border-emerald-500/40' 
                        : 'hover:bg-slate-800/70'
                    }`}
                  >
                    {/* Pallet # Badge */}
                    <div className="shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                      <span className="text-[9px] font-mono text-slate-400 uppercase leading-none">Lot</span>
                      <span className="text-xs font-mono font-black text-emerald-400 leading-tight">
                        #{String(product.palletNumber || 0).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0 relative">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0 right-0 bg-slate-950/90 text-emerald-400 text-[8px] font-mono px-1 rounded-tl">
                        -{product.discountPercentage}%
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                          {product.palletCode}
                        </span>
                        <span className="text-slate-600 text-[10px]">•</span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide truncate">
                          {product.brand}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-white truncate transition-colors">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {formatCurrency(product.price, currency)}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 line-through">
                          {formatCurrency(product.originalMSRP, currency)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({product.stockCount} in stock)
                        </span>
                      </div>
                    </div>

                    {/* View Action Icon */}
                    <div className="shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors pl-1">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note in dropdown */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-300">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              All {PRODUCTS.length} lots include European Warranty
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-emerald-400 hover:underline font-bold text-[11px]"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
