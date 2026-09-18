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
import { Language, mockTranslate } from '../utils/translations';

interface HomeBlogSectionProps {
  language?: Language;
  onNavigateBlog: (post?: BlogPost) => void;
}

export const HomeBlogSection: React.FC<HomeBlogSectionProps> = ({
  language = 'en',
  onNavigateBlog
}) => {
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  // We have exactly 4 blog posts
  const posts = BLOG_POSTS.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-slate-900/60 border-t border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LIQUIDATION KNOWLEDGE BASE • 4 GUIDES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {mockTranslate('blogTitle', language)}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {mockTranslate('blogSubtitle', language)}
            </p>
          </div>

          <button
            onClick={() => onNavigateBlog()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer border border-slate-700 shadow-sm"
          >
            <span>{mockTranslate('viewAllPosts', language)}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* 4 Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveModalPost(post)}
              className="bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image & Category Pill */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-300 flex items-center gap-1 font-mono bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Read Link */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-[11px] text-slate-300 font-medium truncate">
                      {post.author}
                    </span>
                  </div>

                  <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal for Selected Blog Post */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="relative aspect-video sm:aspect-[21/9] overflow-hidden bg-slate-950 shrink-0">
              <img
                src={activeModalPost.imageUrl}
                alt={activeModalPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                  {activeModalPost.category}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {activeModalPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {activeModalPost.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{activeModalPost.author}</span>
                    <span className="text-[11px] text-slate-500">{activeModalPost.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {activeModalPost.publishedAt}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    {activeModalPost.readTime}
                  </span>
                </div>
              </div>

              {/* Excerpt Lead */}
              <p className="text-sm sm:text-base text-emerald-300/90 font-medium leading-relaxed bg-emerald-950/20 border-l-2 border-emerald-500 pl-4 py-2 rounded-r-lg">
                {activeModalPost.excerpt}
              </p>

              {/* Body paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveModalPost(null);
                    onNavigateBlog(activeModalPost);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Open in Full Blog Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveModalPost(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
