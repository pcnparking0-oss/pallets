import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Folder, 
  FolderOpen, 
  Search, 
  Check, 
  ChevronDown, 
  Globe2, 
  X, 
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { 
  Language, 
  LanguageRegion, 
  LANGUAGES, 
  REGIONS_META, 
  LanguageOption,
  mockTranslate 
} from '../utils/translations';

interface LanguageDropdownFolderProps {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  isMobile?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const LanguageDropdownFolder: React.FC<LanguageDropdownFolderProps> = ({
  language,
  onSelectLanguage,
  isMobile = false,
  onCloseMobileDrawer
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<LanguageRegion>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentOption = useMemo(() => {
    return LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  }, [language]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Auto-focus search input when opened on desktop
    if (!isMobile && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobile]);

  // Filter languages by active folder region and search query
  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(item => {
      const matchesRegion = activeRegion === 'all' || item.region === activeRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.label.toLowerCase().includes(q) ||
        item.englishName.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);

      return matchesRegion && matchesSearch;
    });
  }, [activeRegion, searchQuery]);

  const handleSelect = (code: Language) => {
    onSelectLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
    if (isMobile && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button: Folder style */}
      <button
        id="european-languages-folder-button"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Open European Languages Folder (24 EU & Continental Languages)"
        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer border shadow-sm ${
          isOpen
            ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20'
            : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-850'
        }`}
      >
        <span className="text-base leading-none" role="img" aria-label={currentOption.label}>
          {currentOption.flag}
        </span>
        <span className="font-extrabold tracking-wider uppercase text-xs">
          {currentOption.code}
        </span>
        <span className="hidden lg:inline text-[11px] font-sans font-medium text-slate-400 max-w-[80px] truncate">
          {currentOption.label}
        </span>
        <div className="flex items-center gap-0.5 opacity-80">
          {isOpen ? (
            <FolderOpen className={`w-3.5 h-3.5 ${isOpen ? 'text-slate-950' : 'text-emerald-400'}`} />
          ) : (
            <Folder className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'}`} />
        </div>
      </button>

      {/* Dropdown Folder Overlay / Modal */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="European Languages Directory"
          className={`absolute ${
            isMobile ? 'left-0 right-0' : 'right-0'
          } mt-2 w-[92vw] sm:w-[480px] md:w-[540px] max-w-[95vw] bg-slate-950/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
          style={{ maxHeight: '85vh' }}
        >
          {/* Folder Tab Header Bar */}
          <div className="p-3 sm:p-4 bg-slate-900/95 border-b border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <span>European Languages Folder</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      24 EU Languages
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Select your native European language for instant real-time translation
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close language folder"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Live Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language or country (e.g. Polish, Nederlands, DE, Spain)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Regional Folder Tabs */}
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
              {REGIONS_META.map(region => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer border ${
                    activeRegion === region.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                      : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{region.icon}</span>
                  <span>{region.label}</span>
                  <span className={`text-[9px] font-mono px-1 rounded ${activeRegion === region.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {region.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Languages Grid Body */}
          <div className="p-3 sm:p-4 overflow-y-auto max-h-[380px] space-y-1.5 overscroll-contain">
            {filteredLanguages.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <Globe2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p>No language found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveRegion('all'); }}
                  className="mt-2 text-emerald-400 font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredLanguages.map((item) => {
                  const isCurrent = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelect(item.code)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between border cursor-pointer group ${
                        isCurrent
                          ? 'bg-emerald-500/15 border-emerald-500/60 text-white shadow-sm'
                          : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl leading-none shrink-0" role="img" aria-label={item.label}>
                          {item.flag}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs truncate group-hover:text-emerald-300 transition-colors">
                              {item.label}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                              {item.code}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {item.englishName} • {item.country}
                          </span>
                        </div>
                      </div>

                      {isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-slate-700 shrink-0 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Folder Footer Note */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EU Cross-Border Trade & Logistics Compliant</span>
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Active: {currentOption.englishName} ({currentOption.code.toUpperCase()})
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
