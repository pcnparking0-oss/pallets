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
  ArrowRight,
  Globe,
  Bot
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PageView } from '../types';
import { SiteLogo } from './SiteLogo';
import { MASTER_KEYWORDS_LIST } from '../data/keywords';
import { submitSubscription } from '../utils/api';


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

  const handleSubmitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEmail(email);
    if (!validation.valid) {
      setErrorMessage(validation.message || 'Please enter a valid email address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // Send welcome voucher email via Zoho SMTP
      await submitSubscription(cleanEmail, DISCOUNT_CODE);

      const stored = localStorage.getItem('epl_newsletter_subscribers');
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (list.includes(cleanEmail)) {
        setIsAlreadySubscribed(true);
      } else {
        list.push(cleanEmail);
        localStorage.setItem('epl_newsletter_subscribers', JSON.stringify(list));
        setIsAlreadySubscribed(false);
      }
      setIsSuccess(true);
    } catch (err) {
      console.warn('Subscription dispatch error:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCopyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApplyDirectly = () => {
    if (onApplyCoupon) {
      const success = onApplyCoupon(DISCOUNT_CODE);
      if (success) {
        setIsApplied(true);
        if (onOpenCart) {
          onOpenCart();
        }
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Value Propositions */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">24-48h Freight Dispatch</p>
                <p className="text-[11px] text-slate-400">Direct from Venlo, NL hub</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">Grade A+ Verified Lots</p>
                <p className="text-[11px] text-slate-400">100% manifest accuracy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">30-Day Guarantee</p>
                <p className="text-[11px] text-slate-400">EU consumer protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">EU-Wide Logistics</p>
                <p className="text-[11px] text-slate-400">Full tail-lift curb delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter & Discount Section */}
      <div className="border-b border-slate-800/80 bg-slate-900/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-1">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wholesale Manifest Alerts</span>
            </span>
            <h3 className="text-xl font-bold text-white">
              Get Notified on New Pallet Arrivals & 10% Off
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Join 12,000+ European resellers receiving instant manifest notifications when fresh Amazon returns and consumer tech lots arrive in Venlo.
            </p>
          </div>

          <div className="lg:col-span-7">
            {!isSuccess ? (
              <form onSubmit={handleSubmitNewsletter} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email (e.g. buyer@company.com)"
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Get Manifest Alerts & 10% Coupon'}
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </p>
                )}
              </form>
            ) : (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isAlreadySubscribed ? 'Welcome back!' : 'Subscribed!'} Use code <strong className="font-mono text-white">{DISCOUNT_CODE}</strong> for 10% off.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-mono cursor-pointer flex items-center gap-1"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleApplyDirectly}
                    className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-[11px] cursor-pointer"
                  >
                    {isApplied ? 'Applied!' : 'Apply Code'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Entity */}
          <div className="lg:col-span-2 space-y-3">
            <SiteLogo iconSize={32} textSize="sm" />
            <p className="text-slate-400 leading-relaxed text-xs">
              EuroPalletSupply (europalletsupply.com) is Europe&apos;s premier online wholesale liquidation and overstock clearance hub. Sourcing direct retail returns, electronics, laptops, phones, and power tools at up to 80% below retail MSRP with 24-48h EU freight delivery.
            </p>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">Registered Entity</span>
                <span className="text-slate-500 font-mono text-[10px]">KvK: 89234190 • VAT: NL864192084B01</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:info@europalletsupply.com" className="text-emerald-400 hover:underline">info@europalletsupply.com</a>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Departments</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <a
                    href={`/shop/${cat.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectCategory(cat.id);
                    }}
                    className="hover:text-emerald-400 transition-colors block"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pages & Support</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateView?.('shop');
                  }}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Shop Liquidation Lots
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateView?.('about');
                  }}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  About Venlo Hub
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateView?.('contact');
                  }}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Contact Logistics
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateView?.('blog');
                  }}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Reseller Blog & Guides
                </a>
              </li>
              <li>
                <a
                  href="/keywords"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateView?.('keywords');
                  }}
                  className="hover:text-emerald-400 font-semibold text-emerald-400 transition-colors block"
                >
                  Keywords Directory & Index
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTrackOrder}
                  className="hover:text-emerald-400 transition-colors text-left font-semibold text-emerald-400 cursor-pointer"
                >
                  Track My Order
                </button>
              </li>
            </ul>
          </div>

          {/* Payments & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Payment & Freight</h4>
            <p className="text-xs text-slate-400 leading-snug">
              Secure checkout with 256-bit SSL encryption & instant bank verification:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono font-bold text-slate-300">
              <span className="bg-slate-900 border border-slate-800 py-1 px-2 rounded-lg text-center flex items-center justify-center gap-1">
                <CreditCard className="w-3 h-3 text-emerald-400" />
                Credit Card
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1 px-2 rounded-lg text-center text-emerald-400">
                Bank Transfer
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1 px-2 rounded-lg text-center text-teal-300">
                Crypto USDT
              </span>
              <span className="bg-slate-900 border border-slate-800 py-1 px-2 rounded-lg text-center text-blue-300">
                SEPA Wire
              </span>
            </div>
            <div className="pt-2 text-xs text-slate-400">
              <span>Wholesale Direct: </span>
              <a href="mailto:info@europalletsupply.com" className="text-emerald-400 font-bold hover:underline">
                info@europalletsupply.com
              </a>
            </div>
          </div>
        </div>

        {/* Global & European SEO Keyword Directory Index Cloud */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>European & Global Liquidation Search Index</span>
            </h4>
            <a
              href="/keywords"
              onClick={(e) => {
                e.preventDefault();
                onNavigateView?.('keywords');
              }}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All 200+ Keywords</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
            {MASTER_KEYWORDS_LIST.map((kw) => (
              <a
                key={kw.id}
                href={kw.targetRoute}
                onClick={(e) => {
                  e.preventDefault();
                  if (kw.targetRoute.startsWith('/shop/')) {
                    onSelectCategory(kw.targetRoute.replace('/shop/', ''));
                  } else if (kw.targetRoute === '/shop') {
                    onNavigateView?.('shop');
                  } else if (kw.targetRoute.startsWith('/blog')) {
                    onNavigateView?.('blog');
                  } else if (kw.targetRoute === '/about') {
                    onNavigateView?.('about');
                  } else if (kw.targetRoute === '/contact') {
                    onNavigateView?.('contact');
                  } else {
                    onNavigateView?.('shop');
                  }
                }}
                className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                title={`${kw.keyword} - ${kw.directAiAnswer}`}
              >
                {kw.keyword}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            © 2026 EuroPalletSupply B.V. All rights reserved. Trade Port Europe, Venlo, Netherlands. Email: info@europalletsupply.com
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <a href="/about" onClick={(e) => { e.preventDefault(); onNavigateView?.('about'); }} className="hover:text-slate-300">About</a>
            <span>•</span>
            <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigateView?.('contact'); }} className="hover:text-slate-300">Contact</a>
            <span>•</span>
            <a href="/keywords" onClick={(e) => { e.preventDefault(); onNavigateView?.('keywords'); }} className="hover:text-slate-300">Keywords Directory</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
