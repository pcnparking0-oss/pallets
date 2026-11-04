import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Package, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  RotateCcw, 
  Building2, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Language } from '../utils/translations';

interface FAQViewProps {
  language?: Language;
  onNavigateShop: () => void;
  onNavigateContact: () => void;
  onOpenTrackOrder: () => void;
}

interface FAQItem {
  id: string;
  category: 'all' | 'lots' | 'shipping' | 'vat' | 'b2b' | 'returns';
  categoryLabel: string;
  question: string;
  answer: string;
  badge?: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'lots',
    categoryLabel: 'Pallet Lots & Grading',
    question: 'Where does your liquidation and excess inventory come from?',
    answer: 'We secure direct excess inventory, seasonal clearance, retail overstocks, and customer return lots directly from major European retail giants and top logistics centers (Amazon EU, MediaMarkt, Coolblue, Fnac). All lots arrive at our 18,500 m² distribution hub at Trade Port Europe in Venlo, Netherlands, where they are sorted, serialized, barcoded, and prepared for direct dispatch without auction markups.',
    badge: 'Direct Sourcing'
  },
  {
    id: 'faq-2',
    category: 'b2b',
    categoryLabel: 'B2B & Purchasing',
    question: 'Who can buy from EuroPalletSupply? Is a commercial tax license required?',
    answer: 'Both registered businesses (retailers, eBay/Amazon marketplace resellers, discount outlets) and private individuals can purchase from us. You do not need a commercial wholesale license to purchase individual pallets or outlet clearance lots. For European VAT-registered companies outside the Netherlands, you can apply your valid EU VAT ID at checkout for intra-community zero-rated VAT invoice billing.',
    badge: 'Open to All'
  },
  {
    id: 'faq-3',
    category: 'lots',
    categoryLabel: 'Pallet Lots & Grading',
    question: 'How are condition tiers graded (Factory Sealed, Open Box, Refurbished)?',
    answer: 'Every lot is classified under one of three strict condition grades: 1) Brand New (Factory Sealed): Unopened original retail manufacturer packaging with intact factory security seals. 2) Pristine Open Box: Verified retail returns or display units in 100% cosmetic and functional condition, tested and repackaged. 3) Certified Refurbished: Professionally inspected, cleaned, diagnostic-checked, and packaged with all essential power cables and accessories.',
    badge: 'Grading Protocol'
  },
  {
    id: 'faq-4',
    category: 'lots',
    categoryLabel: 'Pallet Lots & Grading',
    question: 'Are pallet manifests guaranteed and accurate?',
    answer: 'Yes. Every serialized pallet lot features an itemized manifest detailing the exact SKU count, item descriptions, brands (such as Sony, Dyson, Bosch, Apple, Nintendo, Philips), and original retail MSRP. We maintain a verified 98%+ manifest accuracy guarantee across all cataloged lots.',
    badge: '98%+ Accuracy'
  },
  {
    id: 'faq-5',
    category: 'shipping',
    categoryLabel: 'Shipping & Logistics',
    question: 'How long does shipping take and how are pallets delivered?',
    answer: 'Orders are dispatched within 24 to 48 hours directly from our Venlo hub. Delivery transit times average 2–4 business days across Western Europe (Germany, France, Benelux, Austria) and 3–5 business days to the United Kingdom, Scandinavia, and Southern Europe. Orders over €50 qualify for Free Tracked EU Freight Delivery.',
    badge: '24-48h Dispatch'
  },
  {
    id: 'faq-6',
    category: 'shipping',
    categoryLabel: 'Shipping & Logistics',
    question: 'Do freight delivery trucks have tail-lifts for residential or non-dock delivery?',
    answer: 'Yes! All road freight deliveries are operated by contracted logistics carriers (Dachser, DB Schenker, Mainfreight) using tail-lift trucks and manual/electric pallet jacks. Deliveries are made curbside at street level directly to your warehouse, store, or residential driveway without requiring an industrial loading dock or forklift.',
    badge: 'Tail-Lift Included'
  },
  {
    id: 'faq-7',
    category: 'vat',
    categoryLabel: 'Invoicing & EU VAT',
    question: 'How does EU reverse-charge VAT work for European registered businesses?',
    answer: 'If your business is established and registered for VAT in an EU member state outside the Netherlands (e.g., Germany, France, Italy, Spain, Poland), you qualify for a 0% VAT intra-community reverse-charge invoice pursuant to Article 138 of EU Directive 2006/112/EC. Simply provide your company name and valid EU VAT number during checkout.',
    badge: '0% Intra-EU VAT'
  },
  {
    id: 'faq-8',
    category: 'vat',
    categoryLabel: 'Invoicing & EU VAT',
    question: 'Which payment methods are accepted and are transactions secure?',
    answer: 'We support secure, 256-bit encrypted checkout via Instant SEPA Bank Transfer, International Wire Transfer, Major Credit/Debit Cards, Bunq Instant, and Crypto USDT (TRC-20/ERC-20). Official digital VAT invoices with complete corporate registration numbers (KvK 89234190, VAT NL864192084B01) are automatically generated upon payment receipt.',
    badge: 'Bank & Card Verified'
  },
  {
    id: 'faq-9',
    category: 'returns',
    categoryLabel: 'Warranties & Returns',
    question: 'What is your 14-day inspection guarantee and return policy?',
    answer: 'We provide an unconditional 14-Day Money-Back Guarantee on all cataloged lots. Upon delivery, you have 14 days to inspect the pallet contents against the manifest. In the unlikely event of physical transit damage or manifest discrepancies exceeding our tolerance, contact our support desk to receive an RMA replacement lot or full refund.',
    badge: '14-Day Guarantee'
  },
  {
    id: 'faq-10',
    category: 'b2b',
    categoryLabel: 'B2B & Purchasing',
    question: 'Can I order full truckloads (FTL) or customized container volumes?',
    answer: 'Yes. We regularly supply high-volume volume buyers, retail chains, and export clients with Full Truckloads (33 Euro-pallets) or Less-Than-Truckload (LTL) skids. Contact our wholesale manifest desk directly at info@europalletsupply.com or call +31 970 1025 7455 for customized volume quotes and tiered freight discounts.',
    badge: 'Full Truckloads (FTL)'
  },
  {
    id: 'faq-11',
    category: 'b2b',
    categoryLabel: 'B2B & Purchasing',
    question: 'Can I visit the warehouse in Venlo to inspect lots in person?',
    answer: 'Yes! Qualified buyers and commercial partners are welcome to visit our cross-dock facility at Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands. Due to high-traffic forklift movements and customs safety protocols, warehouse visits must be scheduled at least 24 hours in advance by contacting our logistics desk.',
    badge: 'Warehouse Visits'
  },
  {
    id: 'faq-12',
    category: 'shipping',
    categoryLabel: 'Shipping & Logistics',
    question: 'How do I track my active shipment after placing an order?',
    answer: 'Once your pallet is loaded onto the linehaul freight truck at our Venlo terminal, you receive an automated dispatch notification email containing carrier details, pro number, and live tracking. You can also click "Track Order" in our site header or enter your EPL order code directly into our live tracking portal anytime.',
    badge: 'Live GPS Tracking'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'lots', label: 'Pallet Lots & Grading' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'vat', label: 'Invoicing & VAT' },
  { id: 'b2b', label: 'B2B & Truckloads' },
  { id: 'returns', label: 'Returns & Guarantee' }
];

export const FAQView: React.FC<FAQViewProps> = ({
  onNavigateShop,
  onNavigateContact,
  onOpenTrackOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-5': true
  });

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10 lg:p-12 text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS & BUYER KNOWLEDGE BASE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Everything You Need To Know
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Clear answers on pallet condition tiers, 24-48h EU freight dispatch, tail-lift unloading, zero-rated VAT invoicing, and our 14-day buyer guarantee.
            </p>

            {/* Live Search Input */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g. shipping, manifest, tail-lift, VAT, returns)..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-base font-semibold text-white">No questions matched your search query</p>
              <p className="text-xs text-slate-400">Try searching for keywords like &ldquo;manifest&rdquo;, &ldquo;freight&rdquo;, or &ldquo;VAT&rdquo;.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'bg-slate-900/80 border-slate-700/80 shadow-md' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {item.question}
                      </h2>
                    </div>
                    <div className={`p-1.5 rounded-xl bg-slate-800 text-slate-300 transition-transform duration-200 shrink-0 mt-0.5 ${isOpen ? 'rotate-180 bg-emerald-500 text-slate-950' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 animate-in fade-in duration-150">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Card */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT LOGISTICS ASSISTANCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Have a question not listed here?
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Our logistics and wholesale desk at Trade Port Europe in Venlo is available Monday through Friday to answer custom freight inquiries, manifest requests, and container volume quotes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+3197010257455"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+31 970 1025 7455</span>
              </a>
              <button
                onClick={onNavigateContact}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Logistics Desk</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Email response in under 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mon–Fri 08:00 – 18:00 CET</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Venlo Hub Cross-Dock Support</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
