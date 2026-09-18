import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { ShopOrder, Currency } from '../types';
import { formatCurrency } from '../utils/formatters';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ShopOrder[];
  currency: Currency;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<ShopOrder | null>(
    orders.length > 0 ? orders[0] : null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const trimmed = searchQuery.trim().toLowerCase();
    const found = orders.find(
      o => o.orderNumber.toLowerCase().includes(trimmed) || 
           o.trackingNumber.toLowerCase().includes(trimmed) ||
           o.customer.email.toLowerCase().includes(trimmed)
    );

    if (found) {
      setActiveOrder(found);
      setError(null);
    } else {
      setError(`No order found matching "${searchQuery}". Please check your order reference.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-black text-white">Track Your Order</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order # (e.g. EPL-ORD-894102) or Email"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0"
            >
              Track
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}
        </form>

        {/* Active Order Details */}
        {activeOrder ? (
          <div className="space-y-4 pt-2">
            
            {/* Meta summary */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Order</span>
                <span className="font-mono font-bold text-white">{activeOrder.orderNumber}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Carrier</span>
                <span className="font-semibold text-emerald-400">{activeOrder.carrier}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Tracking ID</span>
                <span className="font-mono text-slate-300 text-[11px] truncate block">
                  {activeOrder.trackingNumber}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">ETA</span>
                <span className="font-semibold text-slate-200">{activeOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Live Shipment Milestones
              </span>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Payment Confirmed & Order Registered</h4>
                    <p className="text-[11px] text-slate-400">Order processed through EuroPalletLiquidation.eu shop.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold animate-pulse">
                    •
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400">Packaging at Venlo Central Logistics Hub</h4>
                    <p className="text-[11px] text-slate-400">Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, NL.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative opacity-60">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">Carrier Scan & Dispatch</h4>
                    <p className="text-[11px] text-slate-500">Handover to {activeOrder.carrier} priority dispatch line.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative opacity-60">
                  <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">Out for Final Delivery</h4>
                    <p className="text-[11px] text-slate-500">Direct delivery to {activeOrder.customer.city}, {activeOrder.customer.country}.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Destination */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Shipping To: <strong>{activeOrder.customer.fullName}</strong> • {activeOrder.customer.street}, {activeOrder.customer.postalCode} {activeOrder.customer.city}, {activeOrder.customer.country}
              </span>
            </div>

          </div>
        ) : (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <Package className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-xs">Enter your order confirmation number above to check real-time tracking.</p>
          </div>
        )}

      </div>
    </div>
  );
};
