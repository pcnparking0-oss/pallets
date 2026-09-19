import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Boxes, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';

interface AboutViewProps {
  onNavigateShop: () => void;
  onNavigateContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateShop,
  onNavigateContact
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
            alt="EuroPalletLiquidation Venlo Distribution Hub"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />

          <div className="relative z-20 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE EUROPEAN OUTLET GATEWAY</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Direct Liquidation & Certified Overstock From Europe's Core Logistics Hub
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              EuroPalletSupply B.V. bridges the gap between major European retail distribution networks and consumers, resellers, and small businesses. We acquire verified overstock, seasonal shelf pulls, and certified returns, making them available at up to 80% below retail MSRP. Contact our wholesale team at <a href="mailto:info@europalletsupply.com" className="text-emerald-400 font-mono hover:underline">info@europalletsupply.com</a>.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Browse Current Lots</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateContact}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all"
              >
                Contact Warehouse Desk
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '€14.8M+', label: 'Retail Value Liquidated', desc: 'Across EU member states' },
            { value: '45,000+', label: 'Pallets Dispatched', desc: 'From our Venlo hub' },
            { value: '99.4%', label: 'Manifest Accuracy', desc: 'Barcoded item verification' },
            { value: '28', label: 'Countries Served', desc: 'Doorstep tracked freight' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Why European Buyers Trust EuroPalletLiquidation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Unlike blind mystery lots or unverified auctions, we provide structured, authentic merchandise with transparent condition grading and European consumer rights protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">100% Genuine Certified Stock</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All inventory is sourced under direct contract from recognized European retail groups and authorized electronics distributors in Germany, Netherlands, France, and Belgium. Guaranteed zero counterfeit goods.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Itemized Manifests & Testing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every pallet lot is scanned, itemized, and assigned a clear condition grade (Brand New Sealed, Pristine Open-Box, or Certified Refurbished) before leaving our facility.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Direct European Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Located at Trade Port Europe in Venlo (The Netherlands), adjacent to the German border. Direct daily departures via DPD, DHL Freight, and Dachser with full online tracking.
              </p>
            </div>
          </div>
        </div>

        {/* The Venlo Hub Facility */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Trade Port Europe • Venlo, The Netherlands</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Our 12,000 m² Central European Distribution Depot
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Venlo was deliberately chosen as our headquarters due to its strategic position at the crossroads of European commerce. With automated handling bays, climate-controlled tech storage, and dedicated pallet testing stations, our operations team processes thousands of consumer electronics and lifestyle units daily.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed Dutch entity: EuroPalletLiquidation B.V. (KvK 89234190)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Intra-community VAT clearance for registered EU businesses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Money-Back Guarantee on all consumer purchases</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80"
                alt="Pallet racking warehouse"
                className="rounded-xl border border-slate-800 object-cover h-44 sm:h-52 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
                alt="Forklift and shipping operations"
                className="rounded-xl border border-slate-800 object-cover h-44 sm:h-52 w-full"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
