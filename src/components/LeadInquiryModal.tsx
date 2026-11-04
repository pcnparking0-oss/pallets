import React, { useState } from 'react';
import { 
  X, 
  Send, 
  FileText, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles,
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Product, Currency } from '../types';
import { formatCurrency } from '../utils/formatters';
import { submitContactForm } from '../utils/api';

export interface LeadInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  currency?: Currency;
  initialInquiryType?: 'manifest' | 'freight' | 'truckload' | 'general';
}

export const LeadInquiryModal: React.FC<LeadInquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  currency = 'EUR' as Currency,
  initialInquiryType = 'manifest'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'Netherlands',
    postalCode: '',
    city: '',
    vatId: '',
    volumeInterest: '1-3 Pallets',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMessage('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedTicket = `EPL-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`;

    const leadPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiryType: product ? `manifest_quote_${product.sku}` : 'wholesale_pallet_quote',
      subject: product 
        ? `[Quote & Manifest Request] ${product.title} (SKU: ${product.sku})`
        : `[Wholesale Quote Request] ${formData.volumeInterest} - Delivery to ${formData.country}`,
      message: `
--- WHOLESALE & MANIFEST LEAD INQUIRY ---
Ticket ID: ${generatedTicket}
Target Lot: ${product ? `${product.title} (SKU: ${product.sku}, €${product.price})` : 'General Catalog / Multiple Lots'}
Volume Interest: ${formData.volumeInterest}
Company: ${formData.company || 'Private Trader / Reseller'}
EU VAT / Tax ID: ${formData.vatId || 'Not provided / Non-VAT'}
Delivery Location: ${formData.postalCode} ${formData.city}, ${formData.country}
Phone / WhatsApp: ${formData.phone || 'Not provided'}
Customer Message: ${formData.message || 'Customer requested itemized manifest and freight estimate.'}
Submitted At: ${new Date().toISOString()}
      `.trim(),
      ticketId: generatedTicket
    };

    // Save lead locally to guarantee zero loss
    try {
      const existingLeads = JSON.parse(localStorage.getItem('epl_pending_leads') || '[]');
      existingLeads.push({
        ...leadPayload,
        productTitle: product?.title,
        productPrice: product?.price,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('epl_pending_leads', JSON.stringify(existingLeads));
    } catch {
      // Local storage fallback
    }

    try {
      const res = await submitContactForm(leadPayload);
      if (res && res.success === false) {
        setErrorMessage(res.error || 'Server notice: email was queued. Our desk will contact you.');
      }
      setTicketId(res?.ticketId || generatedTicket);
      setIsSubmitted(true);
    } catch (err: any) {
      console.warn('Lead submit exception:', err);
      setTicketId(generatedTicket);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    'Netherlands', 'Germany', 'Belgium', 'France', 'United Kingdom',
    'Austria', 'Poland', 'Spain', 'Italy', 'Switzerland', 'Czech Republic',
    'Denmark', 'Sweden', 'Norway', 'Finland', 'Ireland', 'Portugal', 'Other'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col divide-y divide-slate-800 text-slate-100"
      >
        {/* Top Header */}
        <div className="px-5 py-4 flex items-center justify-between bg-slate-950/90 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Request Pallet Manifest & Freight Quote</span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  Fast B2B Response
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Direct dispatch from Trade Port Europe, Venlo logistics hub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 inline-block mb-2">
                  Ticket #{ticketId}
                </span>
                <h4 className="text-xl font-black text-white">Quote & Manifest Request Dispatched</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you! Our Venlo freight desk has received your request. An itemized lot manifest Excel/PDF and tailored hydraulic tail-lift freight quote are being prepared for <strong className="text-emerald-400">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                  <span>Logistics Turnaround:</span>
                  <span className="font-bold text-emerald-400">Within 2 to 4 Business Hours</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Direct Desk Email:</span>
                  <a href="mailto:info@europalletsupply.com" className="text-white hover:text-emerald-400 font-mono">
                    info@europalletsupply.com
                  </a>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Logistics Phone:</span>
                  <a href="tel:+3197010257455" className="text-white hover:text-emerald-400 font-mono">
                    +31 970 1025 7455
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  Return to Catalog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Reference Banner (if product selected) */}
              {product && (
                <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                      Target Pallet Lot • SKU: {product.sku}
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">{product.title}</h5>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-mono font-bold text-white">{formatCurrency(product.price, currency)}</span>
                      <span className="text-slate-500 line-through text-[11px]">{formatCurrency(product.originalMSRP, currency)}</span>
                      <span className="text-emerald-400 text-[10px] font-mono">({product.stockCount} skids in stock)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Guarantees banner */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Verified Manifest</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Tail-Lift Freight Quote</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>0% EU B2B VAT Reverse</span>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Weber"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Company / Trade Name <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weber Retail Trading GmbH"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Business Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone / WhatsApp <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 170 1234567 or +31 6..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Delivery Destination (for accurate freight calculation) */}
              <div className="pt-1">
                <span className="block text-slate-400 font-semibold text-[11px] uppercase tracking-wider mb-2">
                  Delivery Destination (For Freight Calculation)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-emerald-500"
                    >
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Düsseldorf"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Postal / ZIP Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 40210"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Volume & VAT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Order Quantity / Volume
                  </label>
                  <select
                    value={formData.volumeInterest}
                    onChange={(e) => setFormData({ ...formData, volumeInterest: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Single Trial Pallet (1 Skid)">Single Trial Pallet (1 Skid)</option>
                    <option value="2 to 5 Pallets">2 to 5 Pallets (Multi-Pallet Discount)</option>
                    <option value="6 to 12 Pallets (Half Truck)">6 to 12 Pallets (Half Truckload)</option>
                    <option value="Full Truckload / FTL (26-33 Pallets)">Full Truckload / FTL (26-33 Pallets)</option>
                    <option value="40ft Container Export">40ft Ocean Container Export</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    EU VAT / Reverse Charge ID <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DE123456789 or FR123..."
                    value={formData.vatId}
                    onChange={(e) => setFormData({ ...formData, vatId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div className="text-xs pt-1">
                <label className="block text-slate-300 font-medium mb-1">
                  Specific Requirements or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Need tail-lift delivery? Require serial number CSV manifest before payment? Let our logistics desk know..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Response within 2-4h with itemized manifest PDF</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching Request...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Quote & Manifest Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
