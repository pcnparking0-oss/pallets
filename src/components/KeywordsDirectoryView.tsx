import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Globe, 
  PackageCheck, 
  Laptop, 
  Wrench, 
  Truck, 
  BookOpen, 
  ArrowRight, 
  Tag, 
  HelpCircle, 
  Bot, 
  ExternalLink,
  Zap,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { MASTER_KEYWORDS_LIST, KEYWORD_CLUSTERS, KeywordTarget } from '../data/keywords';
import { DOMAIN, SITE_NAME, SITE_EMAIL } from '../utils/seo';

interface KeywordsDirectoryViewProps {
  onNavigateView: (view: any) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const KeywordsDirectoryView: React.FC<KeywordsDirectoryViewProps> = ({
  onNavigateView,
  onSelectCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordTarget | null>(MASTER_KEYWORDS_LIST[0]);

  const filteredKeywords = useMemo(() => {
    let list = MASTER_KEYWORDS_LIST;
    if (selectedCluster !== 'all') {
      list = list.filter(k => k.category === selectedCluster);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(k => 
        k.keyword.toLowerCase().includes(term) ||
        k.directAiAnswer.toLowerCase().includes(term) ||
        k.relatedKeywords.some(rk => rk.toLowerCase().includes(term))
      );
    }
    return list;
  }, [selectedCluster, searchTerm]);

  const handleRouteJump = (target: KeywordTarget) => {
    if (target.targetRoute.startsWith('/shop/')) {
      const catSlug = target.targetRoute.replace('/shop/', '');
      onSelectCategory(catSlug);
    } else if (target.targetRoute === '/shop') {
      onNavigateView('shop');
    } else if (target.targetRoute.startsWith('/blog')) {
      onNavigateView('blog');
    } else if (target.targetRoute === '/about') {
      onNavigateView('about');
    } else if (target.targetRoute === '/contact') {
      onNavigateView('contact');
    } else {
      onNavigateView('shop');
    }
  };

  const getClusterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'PackageCheck': return <PackageCheck className="w-4 h-4 text-amber-400" />;
      case 'Laptop': return <Laptop className="w-4 h-4 text-cyan-400" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-orange-400" />;
      case 'Truck': return <Truck className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-pink-400" />;
      default: return <Tag className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Knowledge Graph & Search Engine Index</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Europe Pallet Liquidation & Wholesale Keywords Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Index of over 200+ retail liquidation, Amazon overstock, laptops & phone clearance keywords mapped to {SITE_NAME}&apos;s Venlo logistics hub.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-emerald-400" /> Venlo Logistics Hub (NL)</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Official Email: {SITE_EMAIL}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Domain: {DOMAIN}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search any liquidation keyword (e.g. 'pallet liquidation europe', 'amazon return pallets', 'laptops for sale', 'phone for sale')..."
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setSelectedCluster('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCluster === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Keyword Clusters ({MASTER_KEYWORDS_LIST.length})
            </button>
            {Object.entries(KEYWORD_CLUSTERS).map(([key, cluster]) => (
              <button
                key={key}
                onClick={() => setSelectedCluster(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCluster === key
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {getClusterIcon(cluster.icon)}
                <span>{cluster.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Keyword List */}
          <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-1">
            <div className="text-xs font-semibold text-slate-400 px-1 py-1">
              Indexed Keywords ({filteredKeywords.length} results)
            </div>
            {filteredKeywords.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800">
                No matching keywords found for &quot;{searchTerm}&quot;.
              </div>
            ) : (
              filteredKeywords.map((target) => (
                <div
                  key={target.id}
                  onClick={() => setSelectedKeyword(target)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                    selectedKeyword?.id === target.id
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white capitalize">{target.keyword}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                      {target.searchIntent}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">{target.directAiAnswer}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="font-mono text-emerald-500/80">{target.targetRoute}</span>
                    <span>•</span>
                    <span>{target.relatedKeywords.length} synonyms mapped</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: AI Grounding & Knowledge Card */}
          <div className="lg:col-span-7">
            {selectedKeyword ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 sticky top-24">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Direct AI Answer & Knowledge Grounding</span>
                    </div>
                    <h2 className="text-2xl font-black text-white mt-1 capitalize">
                      {selectedKeyword.keyword}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleRouteJump(selectedKeyword)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                  >
                    <span>View Matching Inventory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* AI Summary Box */}
                <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <span>Search Engine Direct Answer (LLM & Google Grounding)</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {selectedKeyword.directAiAnswer}
                  </p>
                </div>

                {/* Mapping Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Target Landing Route:</span>
                    <a
                      href={selectedKeyword.targetRoute}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRouteJump(selectedKeyword);
                      }}
                      className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1"
                    >
                      {selectedKeyword.targetRoute}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">Search Intent & Demand:</span>
                    <span className="text-white font-semibold flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      {selectedKeyword.searchIntent} Intent • {selectedKeyword.searchVolumeTier} Volume
                    </span>
                  </div>
                </div>

                {/* Related Keywords Cloud */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mapped Synonyms & Long-Tail Variations</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedKeyword.relatedKeywords.map((rk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                      >
                        {rk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Logistics & Verification Badge */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="text-slate-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Supply Verification</span>
                  </div>
                  <p>
                    All inventory dispatched directly from EuroPalletSupply B.V. • Trade Port Europe, Voltastraat 12, 5928 PCA Venlo, Netherlands. Inquiries: <a href="mailto:info@europalletsupply.com" className="text-emerald-400 hover:underline">{SITE_EMAIL}</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 bg-slate-900 rounded-2xl border border-slate-800">
                Select a keyword from the left to inspect its AI grounding definition and mapped catalog route.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
