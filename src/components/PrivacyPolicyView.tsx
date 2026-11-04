import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileCheck, 
  Server, 
  UserCheck, 
  Bell, 
  Mail, 
  Phone, 
  ArrowRight,
  ChevronRight,
  Database
} from 'lucide-react';

interface PrivacyPolicyViewProps {
  onNavigateShop: () => void;
  onNavigateContact: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
  onNavigateShop,
  onNavigateContact
}) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const SECTIONS = [
    { id: 'intro', title: '1. Overview & Controller' },
    { id: 'data-collected', title: '2. Information We Collect' },
    { id: 'legal-basis', title: '3. Legal Basis for Processing' },
    { id: 'usage', title: '4. How We Use Your Data' },
    { id: 'sharing', title: '5. Logistics & Data Processors' },
    { id: 'security', title: '6. Storage & Security Measures' },
    { id: 'retention', title: '7. Retention Periods' },
    { id: 'rights', title: '8. Your Rights Under GDPR' },
    { id: 'cookies', title: '9. Cookies & Local Storage' },
    { id: 'contact', title: '10. Privacy Officer Contact' }
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EU GDPR & DUTCH UAVG PRIVACY STANDARD</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              EuroPalletSupply B.V. respects your privacy and is committed to protecting your personal data in full compliance with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR) and the Dutch Implementation Act (UAVG).
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
              <span>Last Revised: January 1, 2026</span>
              <span>•</span>
              <span>Data Protection Officer: privacy@europalletsupply.com</span>
              <span>•</span>
              <span>Venlo Hub, Netherlands</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Quick-Jump Navigation Sidebar */}
          <div className="lg:col-span-1 sticky top-24 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 pb-1 border-b border-slate-800">
              Clauses
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

          {/* Privacy Document Clauses */}
          <div className="lg:col-span-3 space-y-8 text-sm leading-relaxed text-slate-300">

            {/* Section 1 */}
            <section id="intro" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Lock className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">1. Overview & Data Controller Identification</h2>
              </div>
              <p>
                The entity responsible as Data Controller for processing personal data across <strong className="text-white">europalletsupply.com</strong> is:
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 font-mono text-slate-300">
                <p><strong className="text-emerald-400">Controller Name:</strong> EuroPalletSupply B.V.</p>
                <p><strong className="text-emerald-400">Corporate Address:</strong> Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands</p>
                <p><strong className="text-emerald-400">Dutch KvK:</strong> 89234190 • VAT: NL864192084B01</p>
                <p><strong className="text-emerald-400">Direct Contact:</strong> info@europalletsupply.com | +31 970 1025 7455</p>
              </div>
              <p>
                We do not sell, rent, or trade your personal data to commercial third parties or advertisers.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Eye className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
              </div>
              <p>
                Depending on how you interact with our platform (ordering lots, requesting B2B manifests, or contacting support), we may collect the following categories of data:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li><strong className="text-white">Identity & Contact Data:</strong> Full name, company name, EU VAT number, billing address, freight delivery address, email address, and telephone number.</li>
                <li><strong className="text-white">Transaction Data:</strong> Ordered pallets/lots, date, payment method, invoice details, order reference numbers, and delivery status.</li>
                <li><strong className="text-white">Logistics Data:</strong> Delivery notes, delivery time slot preferences, tail-lift requirements, and signature confirmation upon handover.</li>
                <li><strong className="text-white">Technical & Usage Data:</strong> IP address, browser type, device information, and interactions with our catalog to maintain session security and prevent fraudulent inquiries.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="legal-basis" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <FileCheck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">3. Legal Basis for Processing (GDPR Art. 6)</h2>
              </div>
              <p>We only process your personal data where permitted under applicable EU law:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Performance of Contract (Art. 6(1)(b))</p>
                  <p className="text-slate-400">Processing orders, booking road freight, providing GPS tracking, and issuing invoices.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Legal Obligation (Art. 6(1)(c))</p>
                  <p className="text-slate-400">Compliance with Dutch tax laws (Belastingdienst) and EU VAT accounting regulations.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Legitimate Interests (Art. 6(1)(f))</p>
                  <p className="text-slate-400">Protecting against fraudulent transactions, improving catalog performance, and warehouse safety.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-emerald-400">Consent (Art. 6(1)(a))</p>
                  <p className="text-slate-400">Subscribing to wholesale liquidation manifest alerts (revocable anytime).</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="usage" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Database className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">4. How We Use Your Data</h2>
              </div>
              <p>Your personal data is strictly utilized for operational wholesale purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Processing and fulfilling your pallet orders from our Venlo hub.</li>
                <li>Communicating delivery appointments and carrier dispatch tracking links.</li>
                <li>Verifying EU VAT numbers through the European Commission VIES portal.</li>
                <li>Responding to manifest queries and customer support phone calls.</li>
                <li>Fulfilling statutory audit and tax bookkeeping requirements in the Netherlands.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="sharing" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Server className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">5. Logistics Carriers & Third-Party Processors</h2>
              </div>
              <p>
                To deliver palletized shipments, your delivery contact details are shared exclusively with verified European logistics partners under Data Processing Agreements (DPAs):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Freight Carriers:</strong> Licensed transport operators (Dachser, DB Schenker, Mainfreight) who receive your name, destination address, and phone number to arrange driver arrival.</li>
                <li><strong className="text-white">Payment & Settlement Gateways:</strong> PCI-DSS certified gateways to process card payments, SEPA bank transfers, and wire transfers securely.</li>
                <li><strong className="text-white">Transactional Notifications:</strong> Secure mail server infrastructure (Zoho Mail) to send purchase confirmations and dispatch PDFs.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="security" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">6. Data Security & Encryption</h2>
              </div>
              <p>
                We employ industry-standard technical and organizational security measures to protect your personal data from accidental loss, unauthorized access, or disclosure.
              </p>
              <p>
                All data transmission between your browser and our servers is encrypted using 256-bit Transport Layer Security (TLS / HTTPS). Order databases and customer records are protected behind multi-factor authentication firewalls hosted within secure European data centers.
              </p>
            </section>

            {/* Section 7 */}
            <section id="retention" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <FileCheck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">7. Data Retention Periods</h2>
              </div>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Fiscal & Commercial Records:</strong> Retained for 7 years as mandated by Article 52 of the Dutch State Tax Act (Algemene wet inzake rijksbelastingen).</li>
                <li><strong className="text-white">Customer Support Inquiries:</strong> Retained for up to 18 months following resolution to assist with potential warranty claims.</li>
                <li><strong className="text-white">Marketing Subscriptions:</strong> Stored until you unsubscribe or request deletion.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="rights" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <UserCheck className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">8. Your Rights Under GDPR</h2>
              </div>
              <p>As an individual in the EU, you possess extensive statutory rights regarding your personal data:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Right of Access (Art. 15)</p>
                  <p className="text-slate-400">Request a complete copy of all personal data held concerning you.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Right to Rectification (Art. 16)</p>
                  <p className="text-slate-400">Correct any inaccurate or incomplete billing and address information.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Right to Erasure (Art. 17)</p>
                  <p className="text-slate-400">Request deletion of your data when retention is no longer legally required.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Right to Data Portability (Art. 20)</p>
                  <p className="text-slate-400">Obtain your transaction data in a structured, machine-readable format.</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-2">
                You also have the right to lodge a formal complaint with the Dutch Data Protection Authority (<em className="text-white">Autoriteit Persoonsgegevens</em>) at <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">autoriteitpersoonsgegevens.nl</a>.
              </p>
            </section>

            {/* Section 9 */}
            <section id="cookies" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Bell className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">9. Cookies & Local Storage</h2>
              </div>
              <p>
                Our web platform utilizes strictly necessary cookies and local storage entries to maintain essential site functionality:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Shopping Cart & Wishlist:</strong> Remembering items added to your basket and saved pallets between browser refreshes.</li>
                <li><strong className="text-white">Currency & Language:</strong> Storing your selected currency (EUR/GBP) and active language (EN/DE/FR).</li>
              </ul>
              <p>
                We do not use invasive third-party tracking beacons or sell browsing footprints to advertising networks.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Mail className="w-5 h-5 shrink-0" />
                <h2 className="text-xl font-bold text-white">10. Data Protection Officer Contact</h2>
              </div>
              <p>
                To exercise any of your statutory rights or submit a data inquiry, please contact our dedicated Privacy Officer:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <p className="font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Email Inquiries</span>
                  </p>
                  <p className="text-xs text-slate-400 font-mono">EuroPalletSupply B.V.<br />Attn: Data Protection Officer<br />Trade Port Europe, Voltastraat 12<br />5928 PCA Venlo, Netherlands</p>
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
