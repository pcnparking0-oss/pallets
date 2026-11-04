import React, { useState } from 'react';
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Package, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight,
  Calendar,
  Building2,
  FileText,
  Search
} from 'lucide-react';
import { Language, mockTranslate } from '../utils/translations';

interface ShippingReturnsViewProps {
  language?: Language;
  onNavigateShop: () => void;
  onNavigateContact: () => void;
  onOpenTrackOrder: () => void;
}

export const ShippingReturnsView: React.FC<ShippingReturnsViewProps> = ({
  language = 'en',
  onNavigateShop,
  onNavigateContact,
  onOpenTrackOrder
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'inspection' | 'pickup'>('shipping');

  const TRANSIT_TIMES = [
    { region: 'The Netherlands & Belgium', time: '24 – 48 Hours', carrier: 'DPD / Mainfreight', cost: 'Free > €50 (or €4.95)' },
    { region: 'Germany & Austria', time: '2 – 3 Business Days', carrier: 'Dachser / DHL Express', cost: 'Free > €50 (or €4.95)' },
    { region: 'France & Luxembourg', time: '2 – 4 Business Days', carrier: 'DB Schenker / DPD', cost: 'Free > €50 (or €4.95)' },
    { region: 'Italy & Spain', time: '3 – 5 Business Days', carrier: 'Dachser Freight', cost: 'Free > €50 (or €4.95)' },
    { region: 'Poland & Czech Republic', time: '3 – 4 Business Days', carrier: 'DPD / Raben Group', cost: 'Free > €50 (or €4.95)' },
    { region: 'Scandinavia (SE, DK, FI)', time: '3 – 5 Business Days', carrier: 'DSV Road', cost: 'Free > €50 (or €4.95)' },
    { region: 'United Kingdom & Ireland', time: '3 – 5 Business Days', carrier: 'DHL Express / DPD', cost: 'Free > €50 (or €4.95)' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
              <Truck className="w-3.5 h-3.5" />
              <span>FREIGHT LOGISTICS & BUYER PROTECTION POLICY</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Shipping & Return Policies
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Complete dispatch schedules, tail-lift unloading protocols, insured European transit times, and our unconditional 14-day pallet inspection guarantee.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <MapPin className="w-3.5 h-3.5" />
                Dispatch Hub: Trade Port Europe, Venlo (NL)
              </span>
              <span>•</span>
              <span>Daily Freight Cutoff: 14:00 CET</span>
              <span>•</span>
              <span>Tracked Delivery via Dachser, Schenker & DHL</span>
            </div>
          </div>
        </div>

        {/* 4 Core Logistics Guarantees */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/70 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <p className="font-bold text-white text-sm">24–48h Dispatch</p>
            <p className="text-xs text-slate-400 leading-snug">Pallets staged, strapped, and dispatched from Venlo.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <p className="font-bold text-white text-sm">Tail-Lift Included</p>
            <p className="text-xs text-slate-400 leading-snug">Hydraulic liftgate curbside delivery; no forklift required.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <p className="font-bold text-white text-sm">14-Day Guarantee</p>
            <p className="text-xs text-slate-400 leading-snug">Full inspection period with RMA replacement or full refund.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="font-bold text-white text-sm">100% Insured Freight</p>
            <p className="text-xs text-slate-400 leading-snug">Every shipment covered against transit damage or loss.</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {[
            { id: 'shipping', label: 'Freight Shipping & Delivery', icon: Truck },
            { id: 'returns', label: '14-Day Return Policy & RMA', icon: RotateCcw },
            { id: 'inspection', label: 'Pallet Delivery Inspection Protocol', icon: ShieldCheck },
            { id: 'pickup', label: 'Venlo Hub Warehouse Pickup', icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Shipping Details */}
        {activeTab === 'shipping' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Transit Times Table */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Estimated Transit Times & Freight Coverage</h2>
                  <p className="text-xs text-slate-400">All shipments depart from Trade Port Europe, Venlo, Netherlands.</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  Free Over €50
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Destination Region</th>
                      <th className="py-3 px-4">Average Transit Time</th>
                      <th className="py-3 px-4">Logistics Carrier</th>
                      <th className="py-3 px-4 text-right">Standard Freight Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {TRANSIT_TIMES.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white">{row.region}</td>
                        <td className="py-3 px-4 font-mono text-emerald-400">{row.time}</td>
                        <td className="py-3 px-4 text-slate-300">{row.carrier}</td>
                        <td className="py-3 px-4 text-right font-mono text-slate-300">{row.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tail-Lift Delivery Instructions */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>How Pallet Delivery Works (Tail-Lift & Curbside)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You do not need a commercial loading dock or forklift to receive palletized lots. Every pallet shipment is booked with <strong className="text-white">tail-lift service</strong>. The delivery truck lowers the pallet to street level using an electric liftgate, and the driver wheels the pallet to your driveway, warehouse entrance, or garage with a pallet jack.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">1. Advance Call / SMS</p>
                  <p className="text-slate-400">The driver or dispatcher calls 1-2 hours prior to arrival to confirm the delivery window.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">2. Tail-Lift Lowering</p>
                  <p className="text-slate-400">Pallet is mechanically lowered from the 18-tonne or 7.5-tonne lorry to pavement level.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">3. Curbside Handover</p>
                  <p className="text-slate-400">Inspected and signed on the digital CMR consignment note before the driver departs.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Returns & RMA */}
        {activeTab === 'returns' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-emerald-400" />
                <span>14-Day Money-Back Guarantee & Return Process</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                EuroPalletSupply B.V. provides an unconditional 14-day inspection guarantee on all catalog items and pallet lots. If an item arrives damaged or the manifest contains an unresolvable discrepancy, you are entitled to a full replacement or refund.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Step-by-Step RMA Return Instructions
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    step: 'Step 1',
                    title: 'Contact Logistics Support to Request an RMA',
                    desc: 'Email info@europalletsupply.com or call +31 970 1025 7455 with your order reference (e.g. EPL-ORD-XXXX). Our team will issue a Return Merchandise Authorization (RMA) ticket within 2 hours.'
                  },
                  {
                    step: 'Step 2',
                    title: 'Receive Prepaid Freight Label or Pickup Booking',
                    desc: 'For small parcel items, a prepaid DPD/DHL return label will be emailed. For pallet lots, our carrier will schedule a freight collection truck directly from your address.'
                  },
                  {
                    step: 'Step 3',
                    title: 'Secure the Goods for Transit',
                    desc: 'Repackage the merchandise in its original protective packaging or strap the pallet to prevent shifting during return transit.'
                  },
                  {
                    step: 'Step 4',
                    title: 'Inspection & Instant Refund',
                    desc: 'Upon receipt at our Venlo cross-dock hub, our inspection team verifies the return. Refunds are processed within 3 to 5 business days back to your original payment method (Bank account, Card, Bunq, or Crypto USDT).'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded h-fit shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Ready to start a return or warranty inquiry?</span>
                <span className="text-slate-400">Our logistics desk is available Monday through Friday 08:00 – 18:00 CET.</span>
              </div>
              <button
                onClick={onNavigateContact}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Contact Logistics Support
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Inspection Protocol */}
        {activeTab === 'inspection' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Pallet Delivery Inspection Protocol</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Please follow these 4 essential steps upon pallet delivery before releasing the freight driver to ensure complete insurance coverage under CMR convention rules:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>1. Check Tamper-Evident Security Tape</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Every pallet from Venlo is bound with black or clear heavy stretch-wrap and green EuroPalletSupply security tape. Verify that the tape has not been sliced or resealed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>2. Note Any Damage on Consignment Note</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  If any carton is crushed or plastic wrap is torn, note <code className="text-amber-300 font-mono font-bold">&ldquo;DAMAGED ON ARRIVAL&rdquo;</code> on the driver&apos;s handheld PDA or paper CMR slip before signing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>3. Photograph Pallet from 4 Angles</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Take quick photos of the intact pallet from all four sides prior to cutting the plastic shrink-wrap and bands for simple claim validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>4. Verify Manifest Inventory</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Compare the unboxed items against the itemized manifest attached to the pallet pouch. You have 14 days to notify our desk of any discrepancies.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Warehouse Pickup */}
        {activeTab === 'pickup' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Self-Collection at Venlo Logistics Hub (Free of Charge)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Wholesale buyers, freight forwarders, and commercial resellers with their own trucks or vans can collect orders directly from our cross-dock terminal in Venlo, Netherlands.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Warehouse Cross-Dock Address</span>
                </span>
                <p className="font-mono text-slate-300">
                  EuroPalletSupply B.V.<br />
                  Trade Port Europe<br />
                  Voltastraat 12<br />
                  5928 PCA Venlo, Netherlands
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Loading Dock Hours</span>
                </span>
                <p className="text-slate-300">
                  Monday – Friday: 08:00 – 17:30 CET<br />
                  Saturday: 09:00 – 13:00 CET (by appointment)<br />
                  Sunday & Dutch Public Holidays: Closed
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p><strong className="text-emerald-400 font-mono">Loading Equipment:</strong> Standard Euro-pallet docks with electric reach trucks and counterbalance forklifts. Drivers must present safety shoes and valid Photo ID.</p>
              <p><strong className="text-emerald-400 font-mono">Appointment Booking:</strong> Schedule your loading bay at least 24 hours in advance by calling <strong className="text-white">+31 970 1025 7455</strong> or emailing <span className="text-white">info@europalletsupply.com</span>.</p>
            </div>
          </div>
        )}

        {/* Action Help Card at Bottom */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Already have an order in transit?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Check live GPS carrier tracking, dispatch timestamps, and estimated arrival in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTrackOrder}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track Your Order</span>
            </button>
            <button
              onClick={onNavigateShop}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
