import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  couponCode: string;
  appliedDiscountEur: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onUpdateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  onRemoveItem: (productId: string, variantId?: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onViewProduct: (product: CartItem['product']) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  couponCode,
  appliedDiscountEur,
  onApplyCoupon,
  onRemoveCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onViewProduct
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotalEur = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 
    0
  );

  const FREE_SHIPPING_THRESHOLD = 50;
  const isFreeShipping = subtotalEur >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalEur);
  const shippingEur = cartItems.length === 0 ? 0 : (isFreeShipping ? 0 : 4.95);

  const finalTotalEur = Math.max(0, subtotalEur - appliedDiscountEur + shippingEur);
  const vatIncludedEur = finalTotalEur * 0.21 / 1.21;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = onApplyCoupon(inputCoupon.trim());
    if (success) {
      setInputCoupon('');
      setCouponError(null);
    } else {
      setCouponError('Invalid promo code. Try "OUTLET10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={onClose}
        className="absolute inset-0" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-black text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full font-mono">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-slate-950 px-5 py-2.5 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                <Truck className="w-4 h-4 text-emerald-400" />
                {isFreeShipping ? (
                  <span className="text-emerald-400 font-bold">You unlocked FREE Tracked EU Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-emerald-400">{formatCurrency(amountToFreeShipping, currency)}</strong> more for FREE delivery
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Threshold: €50
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotalEur / FREE_SHIPPING_THRESHOLD) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Your cart is currently empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Discover brand new electronics, espresso machines, and tools at up to 80% off retail prices.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Start Shopping Outlet Deals
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.id || 'std'}`}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-3 group relative"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    onClick={() => {
                      onViewProduct(item.product);
                      onClose();
                    }}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 
                        onClick={() => {
                          onViewProduct(item.product);
                          onClose();
                        }}
                        className="text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedVariant?.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.selectedVariant.name}: {item.selectedVariant.value}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity adjuster */}
                      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-slate-800 font-bold"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-mono font-bold text-white text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-slate-800 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Price */}
                      <div className="text-right">
                        <span className="text-xs font-black text-white font-mono block">
                          {formatCurrency(item.product.price * item.quantity, currency)}
                        </span>
                        <span className="text-[10px] text-slate-500 line-through">
                          {formatCurrency(item.product.originalMSRP * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-3">
              
              {/* Promo code form */}
              {couponCode ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Coupon <strong>{couponCode}</strong> applied (-{formatCurrency(appliedDiscountEur, currency)})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-slate-400 hover:text-rose-400 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                        placeholder="Promo code (e.g. OUTLET10)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {couponError}
                    </p>
                  )}
                </form>
              )}

              {/* Subtotal & Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cart Subtotal</span>
                  <span className="font-mono">{formatCurrency(subtotalEur, currency)}</span>
                </div>

                {appliedDiscountEur > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({couponCode})</span>
                    <span className="font-mono">-{formatCurrency(appliedDiscountEur, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-400">Tracked EU Shipping</span>
                  <span className="font-mono">
                    {shippingEur === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase">Free</span>
                    ) : (
                      formatCurrency(shippingEur, currency)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Included 21% EU VAT</span>
                  <span className="font-mono">{formatCurrency(vatIncludedEur, currency)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-base text-emerald-400">
                    {formatCurrency(finalTotalEur, currency)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  256-Bit SSL Secured
                </span>
                <span>•</span>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
