import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Download, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { ShopOrder, Currency } from '../types';
import { formatCurrency, downloadOrderReceipt } from '../utils/formatters';

interface OrderConfirmationModalProps {
  order: ShopOrder | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onContinueShopping: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  currency,
  onContinueShopping
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 space-y-5"
      >
        {/* Success Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Thank you for your order!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your payment has been approved and order confirmation has been sent to <strong className="text-white">{order.customer.email}</strong>.
          </p>
        </div>

        {/* Order Meta Box */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Order Number</span>
            <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tracking Number</span>
            <span className="font-mono font-bold text-emerald-400 text-xs flex items-center gap-1 mt-0.5">
              <Truck className="w-3.5 h-3.5" />
              {order.trackingNumber}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Arrival</span>
            <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {order.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Shipment Tracker Bar */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
            Fulfillment Status (Trade Port Europe, Venlo)
          </span>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mb-1">
                ✓
              </div>
              <span className="font-bold text-emerald-400">Order Placed</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center justify-center mb-1 animate-pulse">
                •
              </div>
              <span className="font-bold text-slate-200">Packing in Venlo</span>
            </div>

            <div className="flex flex-col items-center opacity-50">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center mb-1">
                3
              </div>
              <span className="font-medium text-slate-400">Out with {order.carrier}</span>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
          <span className="font-bold text-white block">Items in this Delivery</span>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <img src={item.product.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                  <div>
                    <span className="font-semibold text-slate-200 line-clamp-1">{item.product.title}</span>
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(item.product.price * item.quantity, currency)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 text-xs font-bold text-slate-200">
            <div>
              <span>Total Paid</span>
              <span className="text-[10px] text-slate-400 block font-normal">
                Method: {
                  order.paymentMethod === 'bank_transfer' 
                    ? 'Bank Transfer (Direct SEPA)' 
                    : order.paymentMethod === 'wire_transfer'
                    ? 'Wire Transfer (SWIFT / International)'
                    : (order.paymentMethod === 'crypto' || order.paymentMethod === 'usdt')
                    ? 'Crypto Payment'
                    : 'Credit card'
                }
              </span>
            </div>
            <span className="text-emerald-400 font-mono text-sm">
              {formatCurrency(order.totalEur, currency)}
            </span>
          </div>
        </div>

        {order.paymentMethod === 'bank_transfer' && (
          <div className="bg-blue-950/40 border border-blue-800/60 p-3 rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">
              SEPA Wire Instructions (Stock Held 48 Hours)
            </span>
            <p className="text-[11px] text-slate-300">
              Please transfer <strong className="text-white">{formatCurrency(order.totalEur, currency)}</strong> to IBAN: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono">NL84 BUNQ 2049 8192 44</code> (BIC: <code className="font-mono text-slate-300">BUNQNL2A</code>) using reference: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">{order.orderNumber}</code>.
            </p>
          </div>
        )}

        {order.paymentMethod === 'usdt' && (
          <div className="bg-teal-950/40 border border-teal-800/60 p-3 rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
              USDT Crypto Clearing
            </span>
            <p className="text-[11px] text-slate-300">
              Amount: <strong className="text-white">{(order.totalEur * 1.08).toFixed(2)} USDT</strong>. Transaction broadcast registered. Dispatched upon standard network confirmation.
            </p>
          </div>
        )}

        {order.paymentMethod === 'bunq' && (
          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
              bunq Instant SEPA Authorized
            </span>
            <p className="text-[11px] text-slate-300">
              Instant mobile payment authorized with Trade Port Venlo merchant escrow. Order dispatched via {order.carrier}.
            </p>
          </div>
        )}

        {/* Delivery Address */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Delivery Destination:</span>
            <p className="text-slate-400">
              {order.customer.fullName} • {order.customer.street}, {order.customer.postalCode} {order.customer.city}, {order.customer.country}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={() => downloadOrderReceipt(order)}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice Receipt (.txt)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
