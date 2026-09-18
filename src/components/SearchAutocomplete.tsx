import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Star, ArrowRight, Tag } from 'lucide-react';
import { Product, Currency } from '../types';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/formatters';

interface SearchAutocompleteProps {
  currency: Currency;
  onSelectProduct: (product: Product) => void;
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  currency,
  onSelectProduct,
  onSearchSubmit,
  placeholder = 'Search deals by brand (Apple, Hugo Boss, Nike, Dyson) or category (Apparel, Audio)...'
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const results = trimmed.length >= 2 ? PRODUCTS.filter(product => {
    return (
      product.title.toLowerCase().includes(trimmed) ||
      product.brand.toLowerCase().includes(trimmed) ||
      product.categoryName.toLowerCase().includes(trimmed) ||
      product.sku.toLowerCase().includes(trimmed) ||
      product.description.toLowerCase().includes(trimmed)
    );
  }).slice(0, 6) : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && onSearchSubmit && trimmed.length > 0) {
        onSearchSubmit(query);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onSelectProduct(results[selectedIndex]);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && trimmed.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
          <div className="px-3 py-2 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Matching Outlet Deals ({results.length})
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              Press Enter ↵
            </span>
          </div>

          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
              {results.map((product, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                      isSelected ? 'bg-slate-800/90' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-700/60 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {product.categoryName}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-100 truncate mt-0.5">
                        {product.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-extrabold text-white text-xs">
                          {formatCurrency(product.price, currency)}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatCurrency(product.originalMSRP, currency)}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded">
                          -{product.discountPercentage}%
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-400 text-[10px] ml-auto">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-5 text-center text-slate-400">
              <p className="text-xs font-medium text-slate-300">No outlet deals matched "{query}"</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for Apparel, Footwear, Hugo Boss, Nike, Apple, or Dyson</p>
            </div>
          )}

          {trimmed.length >= 2 && onSearchSubmit && (
            <div className="p-2.5 bg-slate-950/80 text-center">
              <button
                onClick={() => {
                  onSearchSubmit(query);
                  setIsOpen(false);
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                View all results in shop catalog →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
