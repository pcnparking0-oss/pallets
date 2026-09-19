import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Package, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Language, mockTranslate } from '../utils/translations';

interface FAQItem {
  id: string;
  icon: React.ReactNode;
  category: string;
  question: string;
  questionDe: string;
  questionFr: string;
  answer: string;
  answerDe: string;
  answerFr: string;
}

const HOME_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    icon: <Package className="w-4 h-4 text-emerald-400" />,
    category: 'Pallet Purchasing',
    question: 'How does buying liquidation overstocks and retail return pallets work?',
    questionDe: 'Wie funktioniert der Kauf von Restposten und Retouren-Paletten?',
    questionFr: 'Comment fonctionne l’achat de palettes de déstockage et retours clients ?',
    answer: 'We secure direct excess inventory, seasonal clearance, and customer-return lots from major European retail giants (Amazon EU, MediaMarkt, Coolblue, Fnac). Pallets are cataloged, serialized, and mounted on standard Euro-pallets at our Venlo hub. Resellers and private consumers can purchase individual pallets or full truckloads (FTL) at 70% to 85% below original MSRP with no auction bidding stress.',
    answerDe: 'Wir beziehen direkte Überhangwaren, Saisonabverkäufe und Retouren führender europäischer Handelskonzerne (Amazon EU, MediaMarkt, Coolblue, Fnac). Die Paletten werden in unserem Hub in Venlo erfasst, barcodiert und auf Standard-Europaletten bereitgestellt. Händler und Privatkunden können Einzelpaletten oder Komplettladungen (FTL) mit 70% bis 85% Rabatt unter UVP direkt kaufen.',
    answerFr: 'Nous rachetons directement les surplus d’inventaire, fins de séries et retours clients de grands distributeurs européens (Amazon EU, MediaMarkt, Fnac). Les lots sont référencés, scellés et préparés sur palettes Europe dans notre entrepôt de Venlo. Professionnels et particuliers peuvent commander à prix fixe avec 70% à 85% de remise sur le prix public conseillé.'
  },
  {
    id: 'faq-2',
    icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
    category: 'Condition & Grading',
    question: 'What is the difference between "Brand New Sealed", "Pristine Open Box", and "Refurbished"?',
    questionDe: 'Was ist der Unterschied zwischen "Fabrikneu versiegelt", "Open Box" und "Refurbished"?',
    questionFr: 'Quelle est la différence entre "Neuf Scellé", "Boîte Ouverte" et "Reconditionné" ?',
    answer: 'Brand New Sealed units have intact factory tamper seals directly from manufacturer cartons. Pristine Open Box items are undelivered or buyer-inspected returns with complete accessories, pristine cosmetic condition, and original packaging. Certified Refurbished units undergo multi-point technical testing, diagnostic firmware reset, and sanitization before release, backed by our warranty.',
    answerDe: 'Fabrikneu versiegelte Artikel besitzen intakte Originalsiegel direkt ab Werk. Pristine Open Box sind unzustellbare Sendungen oder kurze Käuferprüfungen mit komplettem Zubehör und neuwertiger Optik in Originalverpackung. Certified Refurbished Geräte durchlaufen einen mehrstufigen Funktionstest, Firmware-Reset und Reinigung, abgesichert durch unsere Garantie.',
    answerFr: 'Les produits "Neuf Scellé" conservent leurs scellés d’origine constructeur. Les produits "Boîte Ouverte" proviennent de retours clients avec tous leurs accessoires et un état cosmétique irréprochable. Les produits "Reconditionné Certifié" bénéficient d’un contrôle technique complet en atelier, réinitialisation logicielle et garantie fonctionnelle.'
  },
  {
    id: 'faq-3',
    icon: <Truck className="w-4 h-4 text-teal-400" />,
    category: 'Logistics & Delivery',
    question: 'How fast is freight delivery across Europe from your Venlo Logistics Hub?',
    questionDe: 'Wie schnell erfolgt die Speditionslieferung ab dem Logistik-Drehkreuz Venlo?',
    questionFr: 'Quels sont les délais de livraison par transporteur depuis le hub de Venlo ?',
    answer: 'Standard small parcel shipments ship via DPD / DHL Parcel within 24 hours. Full pallet freight lots are dispatched via DB Schenker and Dachser equipped with hydraulic tail-lifts and manual pallet jacks for curb delivery. Transit takes 24–48 hours for NL, DE, and BE; 48–72 hours for France, Austria, and Poland; and 3–5 business days for the rest of Europe with real-time GPS tracking.',
    answerDe: 'Paketware wird innerhalb von 24 Stunden mit DPD oder DHL versandt. Paletten-Speditionsgüter werden über DB Schenker und Dachser mit Ladebordwand und Hubwagen bis zur Bordsteinkante geliefert. Die Regellaufzeit beträgt 24–48 Stunden für NL, DE und BE; 48–72 Stunden für Frankreich, Österreich und Polen sowie 3–5 Werktage für das restliche Europa.',
    answerFr: 'Les colis individuels sont expédiés sous 24h par DPD ou DHL. Les palettes complètes sont acheminées par camion avec hayon élévateur (Dachser / DB Schenker). Comptez 24 à 48h pour les Pays-Bas, l’Allemagne et la Belgique ; 48 à 72h pour la France métropolitaine, l’Autriche et la Pologne ; et 3 à 5 jours ouvrés pour le reste de l’Europe.'
  },
  {
    id: 'faq-4',
    icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
    category: 'Protection & Guarantees',
    question: 'What is your 30-Day Money-Back Guarantee and manifest accuracy policy?',
    questionDe: 'Wie greift die 30-Tage Geld-zurück-Garantie und Manifest-Genauigkeit?',
    questionFr: 'Comment s’appliquent la garantie 30 jours et la précision des manifestes ?',
    answer: 'Every lot is covered by our 30-Day Money-Back Guarantee compliant with European Union Consumer Rights Directives. If an item arrives with transit damage or deviates materially from the published grading manifest, we issue a prepaid return label and prompt refund or replacement. All transactions include verifiable Dutch KvK invoice documentation.',
    answerDe: 'Jede Bestellung unterliegt unserer 30-Tage Geld-zurück-Garantie nach EU-Verbraucherschutzrichtlinien. Sollte ein Artikel Transportschäden aufweisen oder maßgeblich vom veröffentlichten Manifest abweichen, stellen wir ein kostenfreies Retourenetikett und erstatten den Betrag umgehend. Alle Rechnungen sind B2B-konform (KvK 89234190).',
    answerFr: 'Toutes les commandes bénéficient de notre garantie satisfait ou remboursé de 30 jours conforme aux directives de l’Union Européenne. En cas d’écart manifeste ou de dommage pendant le transport, nous fournissons un bon de retour prépayé et procédons au remboursement immédiat ou à l’échange.'
  }
];

interface HomeFAQSectionProps {
  language?: Language;
  onNavigateContact?: () => void;
}

export const HomeFAQSection: React.FC<HomeFAQSectionProps> = ({
  language = 'en',
  onNavigateContact
}) => {
  // First item open by default
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const getQuestion = (faq: FAQItem) => {
    if (language === 'de') return faq.questionDe;
    if (language === 'fr') return faq.questionFr;
    return faq.question;
  };

  const getAnswer = (faq: FAQItem) => {
    if (language === 'de') return faq.answerDe;
    if (language === 'fr') return faq.answerFr;
    return faq.answer;
  };

  return (
    <section className="py-8 sm:py-16 bg-slate-950 border-t border-slate-800/80 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ESSENTIAL BUYER CLARIFICATIONS • 4 FAQS</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            {mockTranslate('faqTitle', language)}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400">
            {mockTranslate('faqSubtitle', language)}
          </p>
        </div>

        {/* 4 Interactive Accordions */}
        <div className="space-y-3">
          {HOME_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-500/5' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {getQuestion(faq)}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-emerald-500/20 text-emerald-400' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-150 space-y-3">
                    <p>{getAnswer(faq)}</p>

                    <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>EU B2B Reverse-Charge & 30-Day Return Protection fully supported</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Desk Prompt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/20 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {mockTranslate('haveQuestions', language)}
              </h4>
              <p className="text-[11px] text-slate-400">
                Direct phone desk (+31 77 396 9012) & warehouse dock appointments in Venlo.
              </p>
            </div>
          </div>

          {onNavigateContact && (
            <button
              onClick={onNavigateContact}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-md shadow-emerald-500/10"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
