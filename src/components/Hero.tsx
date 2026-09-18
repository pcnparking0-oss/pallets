import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2,
  Box
} from 'lucide-react';
import { Currency, Product } from '../types';
import heroWarehouseWorker from '../assets/images/hero_warehouse_worker.jpg';

interface HeroProps {
  currency: Currency;
  onExploreCatalog: () => void;
  onViewProduct?: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currency,
  onExploreCatalog,
  onSelectCategory
}) => {
  return (
    <div className="relative overflow-hidden w-full min-h-[600px] md:min-h-[660px] lg:min-h-[720px] flex items-center border-b border-slate-800/90">
      {/* Full-width and full-length high-resolution hero image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src={heroWarehouseWorker}
          alt="Central Europe Liquidation Logistics and Pallet Warehouse Hub in Venlo"
          className="w-full h-full object-cover object-[center_28%] lg:object-[68%_25%]"
          referrerPolicy="no-referrer"
        />
        {/* Balanced gradient overlay: provides deep contrast for typography on the left while preserving high clarity and full detail across the warehouse scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/25 lg:from-slate-950/95 lg:via-slate-950/50 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="max-w-2xl space-y-6 text-left">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Central Europe Liquidation Outlet • Direct from Venlo Hub</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
            Europe's Premier <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Online Liquidation & Outlet
            </span> Shop
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-xl drop-shadow">
            Authentic consumer electronics, coffee machines, power tools, and smart home appliances sourced directly from major European retailer overstocks and returns. <span className="text-emerald-400 font-bold">Save up to 80% off standard retail MSRP</span> with fast, tracked home delivery.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Shop Today's Outlet Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectCategory('electronics-audio')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm flex items-center gap-2 transition-colors backdrop-blur-sm"
            >
              <Box className="w-4 h-4 text-emerald-400" />
              <span>Electronics Deals</span>
            </button>
          </div>

          {/* Consumer Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free EU Shipping over €50</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2-Year EU Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Tested</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
