import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  MessageSquare, 
  ThumbsUp, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { Language, mockTranslate } from '../utils/translations';

interface TrustpilotReviewItem {
  id: string;
  author: string;
  location: string;
  countryCode: string;
  rating: number;
  timeAgo: string;
  timestamp: number; // For live sorting
  title: string;
  content: string;
  orderType: string;
  verified: boolean;
  helpfulCount: number;
}

const INITIAL_REVIEWS: TrustpilotReviewItem[] = [
  {
    id: 'tp-1',
    author: 'Markus Weber',
    location: 'Munich, Germany',
    countryCode: '🇩🇪',
    rating: 5,
    timeAgo: 'Just now',
    timestamp: Date.now() - 1000 * 60 * 2, // 2 mins ago
    title: 'Flawless pallet lot, manifest matched 100%',
    content: 'Ordered 2 pallets of certified open-box consumer electronics (Sony headphones, Dyson accessories). Every unit matched the manifest barcode. Freight arrived via DB Schenker in 48 hours to Bavaria. Great ROI on our eBay shop!',
    orderType: 'Pallet Lot #04 • Consumer Electronics',
    verified: true,
    helpfulCount: 24
  },
  {
    id: 'tp-2',
    author: 'Sophie Dubois',
    location: 'Lyon, France',
    countryCode: '🇫🇷',
    rating: 5,
    timeAgo: '12 minutes ago',
    timestamp: Date.now() - 1000 * 60 * 12,
    title: 'Service logistique exceptionnel depuis Venlo',
    content: 'Première commande de lot Dyson et audio. Très satisfaite de la traçabilité CMR et de la rapidité du service logistique de Venlo. Facturation intracommunautaire 0% TVA validée immédiatement. Je recommande sans hésiter.',
    orderType: 'Pallet Lot #01 • Premium Lifestyle & Audio',
    verified: true,
    helpfulCount: 18
  },
  {
    id: 'tp-3',
    author: 'Bram van Dijk',
    location: 'Utrecht, Netherlands',
    countryCode: '🇳🇱',
    rating: 5,
    timeAgo: '28 minutes ago',
    timestamp: Date.now() - 1000 * 60 * 28,
    title: 'Betrouwbare partij voor bulk overstock',
    content: 'Zelf afgehaald bij het Venlo Trade Port depot. Vriendelijk team, heftruck direct ingezet en goederen in perfecte staat met fabrieksverzegeling. Veel betere kwaliteit dan de blinde veilingen elders.',
    orderType: 'Pallet Lot #07 • Smart Home & Robotics',
    verified: true,
    helpfulCount: 31
  },
  {
    id: 'tp-4',
    author: 'Liam Gallagher',
    location: 'Manchester, United Kingdom',
    countryCode: '🇬🇧',
    rating: 5,
    timeAgo: '45 minutes ago',
    timestamp: Date.now() - 1000 * 60 * 45,
    title: 'Top margin resale lot – already cleared 50% ROI',
    content: 'Picked up the Bosch and DeWalt cordless tools pallet. Tested every single battery and motor upon delivery – all factory working condition. Listed on local marketplace and made back full investment within 9 days.',
    orderType: 'Pallet Lot #12 • Professional Cordless Tools',
    verified: true,
    helpfulCount: 14
  },
  {
    id: 'tp-5',
    author: 'Hans Becker',
    location: 'Cologne, Germany',
    countryCode: '🇩🇪',
    rating: 5,
    timeAgo: '1 hour ago',
    timestamp: Date.now() - 1000 * 60 * 65,
    title: 'Top Ware! Sehr schnelle Speditionsabwicklung',
    content: 'Die Sony WH-1000XM5 und Marshall Lautsprecher waren wie neu im Originalkarton. Spediteur hat telefonisch avisiert und mit Hubwagen bis in unsere Werkstatt geliefert. Wir bestellen nächsten Monat einen vollen LKW.',
    orderType: 'Pallet Lot #09 • Premium Audio & Studio Gear',
    verified: true,
    helpfulCount: 19
  },
  {
    id: 'tp-6',
    author: 'Chloe Laurent',
    location: 'Brussels, Belgium',
    countryCode: '🇧🇪',
    rating: 4,
    timeAgo: '2 hours ago',
    timestamp: Date.now() - 1000 * 60 * 125,
    title: 'Très bon rapport qualité-prix pour notre boutique',
    content: 'Un carton avait un léger accroc extérieur dû au cerclage transport, mais les appareils à l’intérieur étaient 100% impeccables. Support client réactif qui a répondu en moins de 10 minutes.',
    orderType: 'Pallet Lot #03 • Kitchen Appliances & Espresso',
    verified: true,
    helpfulCount: 9
  }
];

const INCOMING_SIMULATED_REVIEWS: TrustpilotReviewItem[] = [
  {
    id: 'tp-live-1',
    author: 'Tobias Lindner',
    location: 'Frankfurt, Germany',
    countryCode: '🇩🇪',
    rating: 5,
    timeAgo: 'Just now',
    timestamp: Date.now(),
    title: 'SEPA Überweisung & prompte Auslieferung',
    content: 'Hatte Bedenken wegen Vorkasse, aber die B.V. Registrierung und niederländische IBAN waren absolut seriös. Ware kam nach 2 Werktagen an. Erstklassige Abwicklung.',
    orderType: 'Pallet Lot #15 • Computing & Displays',
    verified: true,
    helpfulCount: 3
  },
  {
    id: 'tp-live-2',
    author: 'Claire Mercier',
    location: 'Lille, France',
    countryCode: '🇫🇷',
    rating: 5,
    timeAgo: 'Just now',
    timestamp: Date.now(),
    title: 'Excellente rentabilité pour les soldes de printemps',
    content: 'Les aspirateurs Dyson et robots Roborock se vendent en quelques heures. Manifeste certifié conforme, emballage sous film étirable haute résistance.',
    orderType: 'Pallet Lot #08 • Floorcare & Air Treatment',
    verified: true,
    helpfulCount: 5
  }
];

interface HomeTrustpilotReviewsProps {
  language?: Language;
}

export const HomeTrustpilotReviews: React.FC<HomeTrustpilotReviewsProps> = ({
  language = 'en'
}) => {
  const [reviews, setReviews] = useState<TrustpilotReviewItem[]>(INITIAL_REVIEWS);
  const [starFilter, setStarFilter] = useState<'all' | '5' | '4'>('all');
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [lastLivePing, setLastLivePing] = useState<string>('Live synchronization active');
  const [newReviewBadge, setNewReviewBadge] = useState(false);

  // Periodic real-time simulator to demonstrate live incoming buyer reviews
  useEffect(() => {
    if (!isLiveActive) return;

    const timer = setTimeout(() => {
      const nextIncoming = INCOMING_SIMULATED_REVIEWS[0];
      if (nextIncoming && !reviews.some(r => r.id === nextIncoming.id)) {
        setReviews(prev => [nextIncoming, ...prev]);
        setNewReviewBadge(true);
        setLastLivePing(`New verified review from ${nextIncoming.author} (${nextIncoming.location})`);
        setTimeout(() => setNewReviewBadge(false), 5000);
      }
    }, 18000);

    return () => clearTimeout(timer);
  }, [isLiveActive, reviews]);

  const handleManualRefresh = () => {
    const nextIncoming = INCOMING_SIMULATED_REVIEWS.find(r => !reviews.some(item => item.id === r.id));
    if (nextIncoming) {
      setReviews(prev => [nextIncoming, ...prev]);
      setNewReviewBadge(true);
      setLastLivePing(`Fetched latest review from ${nextIncoming.author}`);
      setTimeout(() => setNewReviewBadge(false), 4000);
    } else {
      setLastLivePing('All latest European reviews up to date (1,842 verified)');
    }
  };

  const handleLikeReview = (id: string) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)
    );
  };

  const filteredReviews = reviews.filter(r => {
    if (starFilter === '5') return r.rating === 5;
    if (starFilter === '4') return r.rating === 4;
    return true;
  });

  return (
    <section className="py-12 sm:py-16 bg-slate-950 border-t border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>TRUSTPILOT VERIFIED COMMUNITY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{mockTranslate('trustpilotTitle', language)}</span>
              {newReviewBadge && (
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 animate-bounce">
                  +1 NEW
                </span>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {mockTranslate('trustpilotSubtitle', language)}
            </p>
          </div>

          {/* Trustpilot Score Summary Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-5 shadow-xl shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white">4.8</span>
                <span className="text-xs font-bold text-slate-400">/ 5.0</span>
                <span className="text-xs font-black tracking-wide text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                  {mockTranslate('excellent', language)}
                </span>
              </div>

              {/* 5 Green Trustpilot Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm text-white shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00b67a]" />
                <span>{mockTranslate('basedOnReviews', language)}</span>
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4 space-y-2 hidden sm:block">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Business</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Venlo Trade Port Hub • KvK 89234190
              </p>
            </div>
          </div>
        </div>

        {/* Live Real-Time Activity Bar & Star Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 rounded-xl px-4 py-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400">
              {lastLivePing}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs hidden md:inline">Filter rating:</span>
            <button
              onClick={() => setStarFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                starFilter === 'all' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setStarFilter('5')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                starFilter === '5' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>5★ Only</span>
            </button>
            <button
              onClick={() => setStarFilter('4')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                starFilter === '4' 
                  ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>4★</span>
            </button>

            <button
              onClick={handleManualRefresh}
              title="Sync latest live reviews"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real-time Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3.5 transition-all flex flex-col justify-between shadow-lg"
            >
              {/* Card Top: Author & Rating */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-white leading-none">
                          {review.author}
                        </h4>
                        <span className="text-xs" title={review.location}>
                          {review.countryCode}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-slate-500" />
                        {review.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 shrink-0">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{review.timeAgo}</span>
                  </div>
                </div>

                {/* Stars and Verified Status */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div 
                        key={s} 
                        className={`w-4 h-4 flex items-center justify-center rounded-xs ${
                          s <= review.rating ? 'bg-[#00b67a] text-white' : 'bg-slate-800 text-slate-600'
                        }`}
                      >
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    ))}
                  </div>

                  {review.verified && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3 h-3 text-[#00b67a]" />
                      <span>{mockTranslate('verifiedBuyer', language)}</span>
                    </div>
                  )}
                </div>

                {/* Review Title & Content */}
                <h5 className="text-xs font-bold text-white pt-1 line-clamp-1">
                  "{review.title}"
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Card Footer: Verified Lot & Likes */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-mono text-slate-400 truncate max-w-[180px] sm:max-w-[200px]" title={review.orderType}>
                  {review.orderType}
                </span>

                <button
                  onClick={() => handleLikeReview(review.id)}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer shrink-0"
                >
                  <ThumbsUp className="w-3 h-3 text-slate-400" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Seal & Link */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
            <span>Powered by Trustpilot Open European Transparency</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">98.4% 5-Star Satisfaction</span>
          </div>
        </div>

      </div>
    </section>
  );
};
