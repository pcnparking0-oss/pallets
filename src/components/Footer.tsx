import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  ExternalLink,
  Tag,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PageView } from '../types';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
  onOpenTrackOrder: () => void;
  onNavigateView?: (view: PageView) => void;
  onApplyCoupon?: (code: string) => boolean;
  onOpenCart?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTrackOrder,
  onNavigateView,
  onApplyCoupon,
  onOpenCart
}) => {
  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const DISCOUNT_CODE = 'WELCOME10';

  // Email validation check
  const validateEmail = (emailStr: string): { valid: boolean; message?: string } => {
    const trimmed = emailStr.trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your email address.' };
    }
    
    // Check basic email structure
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      if (!trimmed.includes('@')) {
        return { valid: false, message: "Email must include an '@' character." };
      }
      const parts = trimmed.split('@');
      if (parts.length > 2 || !parts[1]) {
        return { valid: false, message: 'Please provide a valid domain name after the @.' };
      }
      if (!parts[1].includes('.')) {
        return { valid: false, message: 'Domain must include a dot and valid extension (e.g. .com, .de, .eu).' };
      }
      return { valid: false, message: 'Please enter a valid email address (e.g., name@example.com).' };
    }
    return { valid: true };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEmail(email);
    if (!validation.valid) {
      setErrorMessage(validation.message || 'Please enter a valid email address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    // Simulate verified subscription & record in localStorage
    setTimeout(() => {
      setIsSubmitting(false);
      const cleanEmail = email.trim().toLowerCase();
      
      try {
        const stored = localStorage.getItem('epl_newsletter_subscribers');
        const list: string[] = stored ? JSON.parse(stored) : [];
        if (list.includes(cleanEmail)) {
          setIsAlreadySubscribed(true);
        } else {
          list.push(cleanEmail);
          localStorage.setItem('epl_newsletter_subscribers', JSON.stringify(list));
          setIsAlreadySubscribed(false);
        }
      } catch {
        setIsAlreadySubscribed(false);
      }

      setIsSuccess(true);
    }, 450);
  };

  const handleCopyCode = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(DISCOUNT_CODE);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleApplyDiscount = () => {
    if (onApplyCoupon) {
      onApplyCoupon(DISCOUNT_CODE);
      setIsApplied(true);
    }
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleResetNewsletter = () => {
    setEmail('');
    setIsSuccess(false);
    setIsAlreadySubscribed(false);
    setIsCopied(false);
    setIsApplied(false);
    setErrorMessage(null);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Top Value Banner - Compact */}
      <div className="border-b border-slate-800/80 py-3 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-300 text-[11px]">
                <strong>Certified European Overstock</strong> • 100% genuine with warranty
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-300 text-[11px]">
                <strong>Fast Dispatch from Venlo Hub (NL)</strong> • Daily EU departures
              </span>
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-300 text-[11px]">
                <strong>30-Day Money-Back Guarantee</strong> • Easy returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section with Validation & Discount Code */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/95 to-emerald-950/30 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Proposition */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>FIRST-TIME SUBSCRIBER SPECIAL • 10% OFF</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Subscribe to Liquidation Drop Alerts
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Get notified the minute unmanifested retail overstocks, clearance electronics, and sealed customer-return pallets arrive at our Venlo logistics hub. First-time subscribers receive an instant discount code!
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Instant 10% Discount Code
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Early Access to Liquidation Pallets
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  No Spam, Unsubscribe Anytime
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Form / Discount Code Result */}
            <div className="lg:col-span-6">
              {!isSuccess ? (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
                  <form onSubmit={handleSubmitNewsletter} noValidate className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          placeholder="Enter your email (e.g., alex@company.eu)"
                          aria-label="Email Address for Newsletter"
                          className={`w-full bg-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errorMessage 
                              ? 'border-2 border-rose-500/80 focus:border-rose-500' 
                              : 'border border-slate-700 focus:border-emerald-500'
                          }`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            Validating...
                          </span>
                        ) : (
                          <>
                            <span>Claim 10% Off</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Email Validation Error Message */}
                    {errorMessage && (
                      <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/30 border border-rose-500/30 px-3 py-2 rounded-xl animate-in fade-in duration-150">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}
                  </form>

                  <p className="text-[11px] text-slate-400">
                    🔒 By signing up, you agree to receive wholesale liquidation alerts. Strictly protected under EU GDPR.
                  </p>
                </div>
              ) : (
                /* Success & Discount Code Voucher Box */
                <div className="bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-xl shadow-emerald-500/10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {isAlreadySubscribed 
                            ? 'Welcome back to our Priority Dispatch!' 
                            : 'Subscription Confirmed! 10% Discount Unlocked'}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Sent confirmation to <span className="text-emerald-400 font-mono font-medium">{email}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleResetNewsletter}
                      className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {/* Promo Code Box */}
                  <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
                          Your Exclusive Discount Code
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-black font-mono text-emerald-400 tracking-wider">
                            {DISCOUNT_CODE}
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                            10% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleCopyCode}
                        className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>

                      {onApplyCoupon && (
                        <button
                          onClick={handleApplyDiscount}
                          className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <Tag className="w-3.5 h-3.5" />
                          <span>{isApplied ? 'Applied!' : 'Apply to Cart'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    Apply code <strong className="text-white font-mono">{DISCOUNT_CODE}</strong> at checkout or during pallet reservation to deduct 10% from your order.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links - Compact Spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Brand & Entity Details (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-emerald-500/20">
                <ShoppingBag className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-sm font-black tracking-tight text-white">
                EuroPallet<span className="text-emerald-400">Liquidation</span>.eu
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-[11px]">
              Europe's premier online liquidation and outlet store. Directly connecting excess European retail overstocks and sealed returns with consumers at wholesale discounts.
            </p>

            {/* Verified Entity Details - Slim Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 space-y-1 text-[10px] text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-emerald-400 text-[9px]">
                  Registered Entity
                </span>
                <span className="text-slate-500">KvK: 89234190 • VAT: NL864192084B01</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-400 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Voltastraat 12, 5928 PCA Venlo (NL)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>support@europalletliquidation.eu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Departments */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Departments
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pages & Support
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onNavigateView?.('shop')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Shop & Liquidation Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView?.('about')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  About EuroPallet Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView?.('contact')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact & Venlo Depot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView?.('blog')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Blog & Resale Guides
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="hover:text-emerald-400 transition-colors text-left font-semibold text-emerald-400"
                >
                  Track My Order
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Accepted Payment Methods
            </h4>
            <p className="text-[10px] text-slate-400 leading-snug">
              Secure payments with instant verification & 256-bit encryption:
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono font-bold text-slate-300">
              <span className="bg-slate-900 border border-slate-800 py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1">
                <CreditCard className="w-3 h-3 text-emerald-400" />
                Credit card
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1.5 px-2 rounded-lg text-center text-emerald-400">
                Bank Transfer
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1.5 px-2 rounded-lg text-center text-teal-300">
                Crypto (USDT)
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1.5 px-2 rounded-lg text-center text-blue-300">
                Wire Transfer
              </span>
            </div>

            <div className="pt-1 text-[10px] text-slate-400">
              <span>Merchant / wholesale: </span>
              <a 
                href="mailto:wholesale@europalletliquidation.eu"
                className="text-emerald-400 hover:underline"
              >
                wholesale@europalletliquidation.eu
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line - Slim */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <p>
            © 2026 EuroPalletLiquidation B.V. All rights reserved. Trade Port Europe, Venlo.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">EU Consumer Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
