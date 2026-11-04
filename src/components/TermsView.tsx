import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Scale, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TermsViewProps {
  onNavigateShop: () => void;
  onNavigateContact: () => void;
}

export const TermsView: React.FC<TermsViewProps> = ({
  onNavigateShop,
  onNavigateContact
}) => {
  const [activeSection, setActiveSection] = useState<string>('scope');

  const SECTIONS = [
    { id: 'scope', title: '1. Scope & Company Identity' },
    { id: 'orders', title: '2. Contract Formation & Orders' },
    { id: 'grading', title: '3. Grading & Manifest Accuracy' },
    { id: 'pricing', title: '4. Pricing, VAT & Payment' },
    { id: 'shipping', title: '5. Freight Shipping & Dispatch' },
    { id: 'inspection', title: '6. Delivery & Pallet Inspection' },
    { id: 'returns', title: '7. Returns & 14-Day Guarantee' },
    { id: 'liability', title: '8. Warranties & Liability' },
    { id: 'governing-law', title: '9. Applicable Law & Jurisdiction' },
    { id: 'contact', title: '10. Legal Notice & Contact' }
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide">
              <Scale className="w-3.5 h-3.5" />
              <span>LEGAL FRAMEWORK & PURCHASING AGREEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Terms & Conditions of Sale
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Standard commercial terms governing the purchase, freight dispatch, manifests, and warranty for European liquidation, excess inventory, and palletized lots supplied by EuroPalletSupply B.V.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
              <span>Effective Date: January 1, 2026</span>
              <span>•</span>
              <span>Registered in the Netherlands (KvK: 89234190)</span>
              <span>•</span>
              <span>EU VAT: NL864192084B01</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Quick-Jump Navigation Sidebar */}
          <div className="lg:col-span-1 sticky top-24 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-800">
              Contents
            </p>
            <nav className="space-y-1">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-emerald-500/15 text-emerald-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  {activeSection === sec.id && <ChevronRight className="w-3 h-3 text-emerald-400 shrink-0" />}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={onNavigateContact}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+31 970 1025 7455</span>
              </button>
              <button
                onClick={onNavigateShop}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legal Document Clauses */}
          <div className="lg:col-span-3 space-y-8 text-sm leading-relaxed text-slate-300">

            {/* Section 1 */}
            <section id="scope" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Building2 className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">1. Scope & Company Identity</h2>
              </div>
              <p>
                These General Terms and Conditions (the &ldquo;Terms&rdquo;) govern all quotations, order placements, sales, and freight deliveries of wholesale pallets, excess inventory lots, consumer electronics, and returned goods offered via the web portal <strong className="text-white">europalletsupply.com</strong>.
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 font-mono text-slate-300">
                <p><strong className="text-emerald-400">Operating Company:</strong> EuroPalletSupply B.V.</p>
                <p><strong className="text-emerald-400">Trade Register (KvK):</strong> 89234190 (Chamber of Commerce Limburg, Netherlands)</p>
                <p><strong className="text-emerald-400">VAT Identification:</strong> NL864192084B01</p>
                <p><strong className="text-emerald-400">Warehouse & Hub:</strong> Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands</p>
                <p><strong className="text-emerald-400">Official Support:</strong> info@europalletsupply.com | +31 970 1025 7455</p>
              </div>
              <p>
                By placing an order or requesting an itemized pallet manifest on this platform, the Buyer agrees unconditionally to be bound by these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="orders" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <FileText className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">2. Contract Formation & Order Processing</h2>
              </div>
              <p>
                Product listings, lots, and pallet manifests displayed on our portal constitute an invitation to treat. A legally binding purchase contract is formed when EuroPalletSupply B.V. issues an official order confirmation containing a unique order reference (e.g., <code className="text-emerald-400">EPL-XXXX</code>) and dispatches the corresponding digital commercial invoice.
              </p>
              <p>
                Due to the dynamic liquidation nature of palletized stock, lot availability is allocated on a strictly first-come, first-served basis upon receipt of confirmed payment or payment proof verification. In the rare event an item or lot becomes unavailable prior to dispatch, the Buyer will receive an immediate full refund or equivalent grade substitution upon mutual consent.
              </p>
            </section>

            {/* Section 3 */}
            <section id="grading" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">3. Condition Grading & Manifest Accuracy</h2>
              </div>
              <p>
                EuroPalletSupply operates strict inbound grading protocols at our 18,500 m² Venlo distribution facility. Every lot is categorized under one of three clear condition tiers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Brand New (Factory Sealed)</p>
                  <p className="text-slate-400">Original manufacturer packaging, unbroken seals, complete with all factory accessories.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-teal-400">Pristine Open Box</p>
                  <p className="text-slate-400">Verified retail returns or display models in 100% cosmetic and functional condition, re-inspected.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-blue-400">Certified Refurbished</p>
                  <p className="text-slate-400">Professionally cleaned, diagnostic-tested, repackaged with required charging cables and safety warranty.</p>
                </div>
              </div>
              <p>
                Itemized manifests state the verified quantity, SKU, brand, and retail MSRP at time of original distribution. We guarantee a minimum 98% manifest accuracy for single serialized lots.
              </p>
            </section>

            {/* Section 4 */}
            <section id="pricing" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Scale className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">4. Pricing, Currency & EU Reverse Charge VAT</h2>
              </div>
              <p>
                All wholesale prices are quoted in Euros (EUR €) or British Pounds (GBP £) as selected. Prices are exclusive of standard shipping fees unless designated under promotional Free Shipping thresholds (orders over €50 qualify for free EU delivery).
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">EU Business Buyers (Intra-Community):</strong> Companies registered for VAT within the European Union outside the Netherlands are eligible for 0% VAT intra-community reverse-charge supply upon validation of their VIES VAT number.</li>
                <li><strong className="text-white">Dutch Entities & Private Consumers:</strong> Standard Dutch statutory VAT (21%) applies and is itemized on the final invoice.</li>
                <li><strong className="text-white">Payment Options:</strong> Instant Bank Transfer (SEPA / Wire), Credit/Debit Card, Bunq Instant, and Crypto USDT are accepted through encrypted 256-bit checkout channels.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="shipping" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Truck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">5. Freight Shipping & Dispatch Times</h2>
              </div>
              <p>
                All inventory is stocked physically at our European logistics cross-dock: <strong className="text-white">Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Standard Dispatch:</strong> 24 to 48 hours following order confirmation and cleared payment.</li>
                <li><strong className="text-white">Delivery Windows:</strong> 2–4 business days across Western & Central Europe (Benelux, Germany, France, Austria), 3–5 business days to the United Kingdom, Scandinavia, and Southern Europe.</li>
                <li><strong className="text-white">Pallet Transport:</strong> Shipped via specialized road freight carriers (Schenker, Dachser, Mainfreight) equipped with tail-lift trucks and electric pallet jacks for curb-side unloading.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="inspection" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">6. Delivery Acceptance & Pallet Inspection</h2>
              </div>
              <p>
                The Buyer or authorized recipient must inspect the pallet shrink-wrap, strapping, and tamper-evident EuroPalletSupply security seals upon delivery before signing the consignment note (CMR):
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Important Pallet Receipt Instructions:</span>
                </div>
                <p>1. If any stretch-wrap is torn or security tape appears broken, clearly annotate <code className="text-amber-300 font-mono font-bold">&ldquo;DAMAGED / WRAP BROKEN ON ARRIVAL&rdquo;</code> on the driver&apos;s digital PDA or paper CMR note.</p>
                <p>2. Photograph the pallet from four angles prior to cutting the outer plastic wrap.</p>
                <p>3. Notify our claims desk within 48 hours at <a href="mailto:info@europalletsupply.com" className="text-emerald-400 underline font-mono">info@europalletsupply.com</a> or call <strong className="text-white font-mono">+31 970 1025 7455</strong>.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="returns" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <RotateCcw className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">7. Returns & 14-Day Money-Back Guarantee</h2>
              </div>
              <p>
                We stand behind the authenticity and quality of every lot we ship. Private consumers and qualifying business buyers are protected by our <strong className="text-emerald-400">14-Day Inspection Guarantee</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Eligibility:</strong> Goods must remain in the condition delivered, with original serialized components intact and without customer alterations.</li>
                <li><strong className="text-white">RMA Initiation:</strong> Contact logistics support to obtain a Return Merchandise Authorization (RMA) number.</li>
                <li><strong className="text-white">Refund Processing:</strong> Refunds are disbursed within 3 to 5 business days of physical receipt and verification at our Venlo hub back to the original payment source.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="liability" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Scale className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">8. Limitation of Liability & Force Majeure</h2>
              </div>
              <p>
                To the maximum extent permitted by applicable Dutch and European consumer law, EuroPalletSupply B.V. shall not be held liable for indirect, incidental, or consequential damages, including loss of anticipated resale profits, commercial interruption, or third-party marketplace penalties.
              </p>
              <p>
                Our aggregate liability arising out of or in connection with any individual lot purchase shall never exceed the total invoice amount paid by the Buyer for that specific product or lot.
              </p>
            </section>

            {/* Section 9 */}
            <section id="governing-law" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Scale className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">9. Governing Law & Dispute Resolution</h2>
              </div>
              <p>
                These Terms and Conditions and any non-contractual obligations arising from them shall be governed exclusively by the laws of the <strong className="text-white">Kingdom of the Netherlands</strong>, excluding the United Nations Convention on Contracts for the International Sale of Goods (CISG).
              </p>
              <p>
                Any dispute, claim, or controversy that cannot be amicably settled shall be submitted to the exclusive jurisdiction of the competent District Court of Limburg (Rechtbank Limburg), Venlo location.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Mail className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">10. Legal Notice & Support Contact</h2>
              </div>
              <p>
                For official legal notices, manifest inquiries, or invoice adjustments, please contact our administrative desk:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Written Correspondence</span>
                  </p>
                  <p className="text-xs text-slate-400 font-mono">EuroPalletSupply B.V.<br />Trade Port Europe, Voltastraat 12<br />5928 PCA Venlo, Netherlands</p>
                  <p className="text-xs text-emerald-400 font-mono">Email: info@europalletsupply.com</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="font-bold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Direct Telephone Assistance</span>
                  </p>
                  <p className="text-xs text-slate-400">Logistics dispatch hotline available Mon–Fri, 08:00 – 18:00 CET:</p>
                  <p className="text-xs text-emerald-400 font-mono font-bold">+31 970 1025 7455</p>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};
