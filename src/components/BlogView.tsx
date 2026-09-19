import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  ChevronRight,
  Share2,
  CheckCircle2,
  X
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';

interface BlogViewProps {
  onNavigateShop: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigateShop }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Reselling Strategy', 'Logistics & Quality', 'Market Trends', 'Payment & Compliance'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EUROPEAN LIQUIDATION KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            EuroPallet Liquidation & Resale Insights
          </h1>
          <p className="text-sm text-slate-400">
            Guides, market analyses, and operational secrets on buying, certifying, and reselling retail overstocks for maximum ROI.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Banner */}
        {featuredPost && selectedCategory === 'All' && (
          <article 
            className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-6 sm:p-10 transition-all hover:border-slate-700"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                    FEATURED GUIDE
                  </span>
                  <span className="text-slate-400">{featuredPost.category}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(featuredPost);
                    }}
                    className="hover:underline focus:outline-none"
                  >
                    {featuredPost.title}
                  </a>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <span>{featuredPost.author} • {featuredPost.authorRole}</span>
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(featuredPost);
                    }}
                    className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={featuredPost.imageUrl}
                  alt={`${featuredPost.title} - Resale and liquidation guide by EuroPalletLiquidation`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </article>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-xl hover:shadow-slate-950/40"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={post.imageUrl}
                  alt={`${post.title} - liquidation guide`}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-400 border border-slate-800">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPost(post);
                      }}
                      className="hover:underline focus:outline-none"
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{post.author}</span>
                  <a
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                    }}
                    className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Read Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-8">
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded">
                    {selectedPost.category}
                  </span>
                  <span className="text-slate-400">{selectedPost.publishedAt}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{selectedPost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-[10px]">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <span>Written by <strong className="text-white">{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-80 w-full">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800 pt-4">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-white block">Ready to source liquidation inventory?</span>
                  <span className="text-[11px] text-slate-400">Browse live tested pallets ready for dispatch in Venlo.</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onNavigateShop();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0"
                >
                  Explore Pallet Deals
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
