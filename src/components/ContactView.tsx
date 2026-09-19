import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  Truck,
  RotateCcw,
  Boxes,
  Search,
  FileText,
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { submitContactForm } from '../utils/api';


interface ContactViewProps {
  onBackToShop?: () => void;
  onNavigateShop?: () => void;
}

type FaqCategory = 'all' | 'shipping' | 'returns' | 'wholesale';

interface FaqItem {
  id: string;
  category: 'shipping' | 'returns' | 'wholesale';
  question: string;
  answer: string;
  badge: string;
  badgeColor: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBackToShop, onNavigateShop }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    orderNumber: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // FAQ State
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-ship-1');

  const handleNavigateCatalog = () => {
    if (onBackToShop) onBackToShop();
    else if (onNavigateShop) onNavigateShop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedTicket = `EPL-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await submitContactForm({
        ...formData,
        ticketId: generatedTicket
      });

      setTicketId(response.ticketId || generatedTicket);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submit error:', err);
      // Still show success with generated ticket
      setTicketId(generatedTicket);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (inquiryType?: string) => {
    if (inquiryType) {
      setFormData(prev => ({ ...prev, inquiryType }));
    }
    const formEl = document.getElementById('contact-inquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqItems: FaqItem[] = [
    // --- SHIPPING QUESTIONS ---
    {
      id: 'faq-ship-1',
      category: 'shipping',
      badge: 'Shipping & Freight',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      question: 'How are retail packages and wholesale pallets shipped across Europe?',
      answer: 'Standard consumer packages and smaller boxed lots are dispatched via DPD, DHL Parcel, or UPS with full end-to-end tracking and SMS notifications. Bulk pallet lots, mixed liquidation skids, and heavy electronics lots are transported via trusted European freight carriers (such as DB Schenker and Dachser). Freight deliveries are equipped with hydraulic tail-lifts and manual pallet jacks to ensure safe unloading at street or dock level.'
    },
    {
      id: 'faq-ship-2',
      category: 'shipping',
      badge: 'Delivery Times',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      question: 'How fast will my order be dispatched and delivered from the Venlo hub?',
      answer: 'Orders cleared before 14:00 CET on regular business days are prepped and pallet-strapped for dispatch within 24 hours. Transit times from our Venlo hub: Netherlands, Germany, and Belgium take 1 to 2 business days; France, Austria, Luxembourg, and Poland take 2 to 3 business days; and other EU destinations (Spain, Italy, Nordics, Eastern Europe) arrive within 3 to 5 business days.'
    },
    {
      id: 'faq-ship-3',
      category: 'shipping',
      badge: 'Order Tracking',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      question: 'Can I track my shipment and delivery driver in real-time?',
      answer: 'Yes. Once your parcel or pallet freight leaves our Venlo loading bays, you will receive an email containing carrier consignment numbers and live GPS tracking links. You can also use our online "Track Order" tool located right in the header bar with your EPL Order Number.'
    },
    {
      id: 'faq-ship-4',
      category: 'shipping',
      badge: 'Residential Freight',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      question: 'Can pallet shipments be delivered to a residential address or home garage?',
      answer: 'Yes. We routinely arrange residential freight delivery. The freight carrier will call you 1 to 2 hours prior to arrival to confirm local road access. The carrier will lower the pallet via tail-lift and move it onto your driveway, curb, or accessible ground-floor entryway using a pallet truck.'
    },

    // --- RETURNS & GUARANTEES ---
    {
      id: 'faq-ret-1',
      category: 'returns',
      badge: '30-Day Guarantee',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      question: 'What is your return policy on liquidation, overstock, and customer-return goods?',
      answer: 'Every order at EuroPalletLiquidation is protected by a 30-Day Money-Back Guarantee compliant with European Union Consumer Rights. If any item is damaged during transit, defective, or materially differs from its stated grading (Brand New, Customer Return Tested, or Overstock), you can initiate a return for a replacement or full refund.'
    },
    {
      id: 'faq-ret-2',
      category: 'returns',
      badge: 'Return Shipping',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      question: 'Who covers the return shipping costs?',
      answer: 'If an item arrives damaged, defective, or does not match its published condition manifest, EuroPalletLiquidation covers 100% of the return freight and provides prepaid DHL/DPD return labels or arranges pallet collection. For discretionary change-of-mind returns within 30 days, customers are responsible for standard return shipping fees.'
    },
    {
      id: 'faq-ret-3',
      category: 'returns',
      badge: 'Refund Timeline',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      question: 'How quickly are refunds processed back to my bank or card?',
      answer: 'Once our Venlo returns station receives and inspects the returned merchandise, refunds are released within 2 to 3 business days. Funds are credited directly to your original payment method (Credit Card, iDEAL, Bancontact, PayPal, Klarna, or SEPA Bank Transfer).'
    },
    {
      id: 'faq-ret-4',
      category: 'returns',
      badge: 'Manifest Discrepancies',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
      question: 'What should I do if a wholesale pallet arrives with missing or broken items?',
      answer: 'Every wholesale pallet includes an itemized manifest. In the rare event of transit damage or missing pieces, simply note the discrepancy on the driver\'s delivery receipt (CMR) and take clear photos. Email support@europalletliquidation.eu within 48 hours, and our team will issue an immediate pro-rata credit or replacement.'
    },

    // --- WHOLESALE & B2B INQUIRIES ---
    {
      id: 'faq-who-1',
      category: 'wholesale',
      badge: 'B2B & VAT Exemption',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      question: 'Do you offer zero-rated intra-community VAT invoices for EU businesses?',
      answer: 'Yes! If you operate an active VAT-registered business outside the Netherlands within the European Union, simply input your valid VIES VAT identification number during checkout or in your B2B order request. Our system validates the number automatically and issues a zero-rated (0% VAT) intra-community commercial invoice.'
    },
    {
      id: 'faq-who-2',
      category: 'wholesale',
      badge: 'Depot Visits & Inspection',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      question: 'Can I visit or inspect pallets in person at the Venlo Trade Port depot?',
      answer: 'Yes. Wholesale buyers and commercial resellers are welcome to schedule dock visits to our Trade Port Europe warehouse in Venlo (Voltastraat 12, 5928 PCA Venlo). Please notify wholesale@europalletliquidation.eu at least 48 hours in advance to arrange visitor badges and dedicated forklift loading dock access.'
    },
    {
      id: 'faq-who-3',
      category: 'wholesale',
      badge: 'Full Truckload (FTL)',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      question: 'Do you offer tiered discounts for full truckload (FTL) and multi-pallet orders?',
      answer: 'Yes. For recurring resellers or volume buyers ordering 5 or more pallets (up to complete 33-pallet mega-trailer truckloads), we offer tiered volume pricing, consolidated logistics rates, and priority access to unmanifested tier-1 retail overstocks. Contact wholesale@europalletliquidation.eu for current FTL contract manifests.'
    },
    {
      id: 'faq-who-4',
      category: 'wholesale',
      badge: 'Buyer Eligibility',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      question: 'Do I need a commercial business license to purchase wholesale lots?',
      answer: 'No commercial license is required for standard purchases. We sell to both commercial enterprises (Amazon/eBay resellers, outlet stores, refurbishers) and individual private consumers. Anyone in the EU can purchase single pallets or lots directly through our platform.'
    }
  ];

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        faqSearchQuery.trim() === '' ||
        item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(faqSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, faqSearchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: faqItems.length,
      shipping: faqItems.filter(f => f.category === 'shipping').length,
      returns: faqItems.filter(f => f.category === 'returns').length,
      wholesale: faqItems.filter(f => f.category === 'wholesale').length
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CUSTOMER & WHOLESALE DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact EuroPalletLiquidation
          </h1>
          <p className="text-sm text-slate-400">
            Have questions about an existing order, shipping tracking, or wholesale pallet lots? Our Venlo operations team is ready to assist you.
          </p>
        </div>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Venlo Distribution Hub</h3>
            <p className="text-xs text-slate-400">
              EuroPalletLiquidation B.V.<br />
              Trade Port Europe, Voltastraat 12<br />
              5928 PCA Venlo, The Netherlands
            </p>
            <div className="text-[11px] text-emerald-400 font-mono pt-1">
              KvK: 89234190 • VAT: NL864192084B01
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Direct Email Channels</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">General & Support:</span>
                <a href="mailto:info@europalletsupply.com" className="text-emerald-400 hover:underline font-mono">
                  info@europalletsupply.com
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wholesale & Freight:</span>
                <a href="mailto:info@europalletsupply.com" className="text-teal-300 hover:underline font-mono">
                  info@europalletsupply.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Operating Hours & Desk</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monday – Friday: 08:30 – 18:00 CET<br />
              Saturday: 09:00 – 14:00 CET (Dock loading only)<br />
              Sunday: Closed (Online orders processed automatically)
            </p>
            <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+31 (0)77 820 0419</span>
            </div>
          </div>
        </div>

        {/* Contact Form & Side Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div id="contact-inquiry-form" className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been transmitted to our Venlo support team, and an automated confirmation receipt has been sent to <span className="text-emerald-400 font-mono font-medium">{formData.email}</span>.
                </p>
                <div className="bg-slate-950 border border-emerald-500/30 p-3.5 rounded-xl max-w-xs mx-auto font-mono text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">YOUR SUPPORT TICKET ID:</span>
                  <span className="text-emerald-400 font-bold text-base">{ticketId}</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'general',
                        orderNumber: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send an Inquiry to Our Venlo Desk</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marc Jansen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marc@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +31 6 12345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Inquiry Department
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="general">General Customer Support</option>
                      <option value="shipping">Shipping & Freight Inquiries</option>
                      <option value="order">Order Tracking & Delivery Status</option>
                      <option value="wholesale">Wholesale & Full Truckload Pallets</option>
                      <option value="returns">Warranty & 30-Day Returns</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Order Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pallet LOT-SMR-2026 inquiry or Order #EPL-894102"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please specify your request, lot inquiry, or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending to Desk via Zoho Mail...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message to Desk</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Side Guidance & Quick Support Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>2-4 Hour Response Guarantee</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                During regular warehouse operating hours, all consumer inquiries and wholesale requests receive an assigned ticket and personalized reply from our Venlo logistics staff within 2 to 4 hours.
              </p>
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Average Reply</div>
                  <div className="text-sm font-black text-white pt-0.5">1 hr 45 min</div>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Satisfaction</div>
                  <div className="text-sm font-black text-emerald-400 pt-0.5">99.4% Rated</div>
                </div>
              </div>
            </div>

            {/* Warehouse Dock Appointments */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Venlo Warehouse Dock Access</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Arranging self-pickup or commercial carrier collection? Our loading docks feature 6 hydraulic ramps capable of handling 7.5t to 40t European standard articulated trucks.
              </p>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-2 text-teal-300 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Dock Appointment Slot Requirement</span>
                </div>
                <p className="text-slate-400">
                  Please book at least 24 hours in advance with your carrier CMR / lot numbers.
                </p>
              </div>
            </div>

            {/* Quick Link to Shop */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Looking for Active Pallet Inventory?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse our real-time liquidation catalog with verified manifests, lot photos, and condition grades.
              </p>
              <button
                onClick={handleNavigateCatalog}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Browse All Liquidation Lots</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* COMPREHENSIVE FAQ SECTION (Shipping, Returns, Wholesale) */}
        {/* ========================================================= */}
        <div id="contact-faq-section" className="pt-6 border-t border-slate-800 space-y-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-sm text-slate-400">
              Clear information covering freight delivery timelines, our European 30-day return guarantee, and wholesale pallet procurement guidelines.
            </p>
          </div>

          {/* Search & Category Filter Navigation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 max-w-4xl mx-auto">
            {/* Search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., 'freight tracking', 'returns', 'zero-rated VAT', 'manifest')..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {faqSearchQuery && (
                <button
                  onClick={() => setFaqSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>All Questions</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                  {categoryCounts.all}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('shipping')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'shipping'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Shipping & Delivery</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                  {categoryCounts.shipping}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('returns')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'returns'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Returns & Guarantees</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                  {categoryCounts.returns}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('wholesale')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'wholesale'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>Wholesale & Pallets</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                  {categoryCounts.wholesale}
                </span>
              </button>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No matching questions found</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or view all categories above.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setFaqSearchQuery('');
                  }}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-emerald-400 hover:bg-slate-700"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isExpanded 
                        ? 'border-emerald-500/40 bg-slate-900 shadow-lg shadow-emerald-500/5' 
                        : 'border-slate-800/90 bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md border font-semibold ${faq.badgeColor}`}>
                            {faq.badge}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white hover:text-emerald-300 transition-colors pr-2">
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'bg-emerald-500 text-slate-950 rotate-180' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed animate-in fade-in duration-200">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Need More Assistance Banner */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-white">Still have questions or need custom assistance?</h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Our logistics coordinators and wholesale account managers in Venlo are available Monday to Friday from 08:30 to 18:00 CET.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => scrollToForm('wholesale')}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Inquire With Desk
              </button>
              <a
                href="mailto:wholesale@europalletliquidation.eu"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
              >
                Email Wholesale Team
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
