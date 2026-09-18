import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  CheckCircle2, 
  Lock, 
  Headphones 
} from 'lucide-react';

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '2-Year EU Warranty',
      description: 'Every product is certified and backed by full statutory 24-month consumer protection.'
    },
    {
      icon: RotateCcw,
      title: '30-Day Money Back',
      description: 'Try your purchase at home. Hassle-free 30-day return policy with prepaid shipping labels.'
    },
    {
      icon: Truck,
      title: 'Fast Tracked EU Shipping',
      description: 'Dispatched directly from Trade Port Europe in Venlo (NL) via DHL Express & DPD.'
    },
    {
      icon: Lock,
      title: '100% Secure Checkout',
      description: 'Encrypted payments via Visa, Mastercard, bunq, SEPA Bank Transfer, and USDT.'
    }
  ];

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
