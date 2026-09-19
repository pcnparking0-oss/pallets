import React from 'react';

interface SiteLogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textSize?: 'sm' | 'base' | 'lg' | 'xl';
  showBadge?: boolean;
}

export const SiteLogo: React.FC<SiteLogoProps> = ({
  className = '',
  iconSize = 38,
  showText = true,
  textSize = 'base',
  showBadge = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Vector Icon Mark */}
      <div 
        style={{ width: iconSize, height: iconSize }}
        className="relative shrink-0 rounded-xl overflow-hidden shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform"
      >
        <svg 
          viewBox="0 0 64 64" 
          width="100%" 
          height="100%" 
          className="w-full h-full block"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020617"/>
              <stop offset="100%" stopColor="#0f172a"/>
            </linearGradient>
            <linearGradient id="logoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399"/>
              <stop offset="100%" stopColor="#059669"/>
            </linearGradient>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a"/>
              <stop offset="50%" stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#d97706"/>
            </linearGradient>
          </defs>

          {/* Background Squircle */}
          <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#logoBg)" stroke="#10b981" strokeWidth="2.2"/>
          <circle cx="32" cy="32" r="26" fill="#10b981" fillOpacity="0.06"/>

          {/* Pallet Lot Cargo Box */}
          <rect x="13" y="11" width="38" height="26" rx="4" fill="url(#logoEmerald)"/>
          
          {/* Packaging Security Straps */}
          <rect x="22" y="11" width="3.5" height="26" fill="#047857" opacity="0.6"/>
          <rect x="38.5" y="11" width="3.5" height="26" fill="#047857" opacity="0.6"/>
          
          {/* Gold Verified Liquidation Seal */}
          <circle cx="32" cy="24" r="8.5" fill="#020617" stroke="url(#logoGold)" strokeWidth="1.8"/>
          
          {/* Euro Symbol € */}
          <path d="M34.5 21 C32.5 20.4 30 21.5 30 24 C30 26.5 32.5 27.6 34.5 27" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="28.5" y1="23.1" x2="33.5" y2="23.1" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="28.5" y1="24.9" x2="33" y2="24.9" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Euro Pallet Timber Base */}
          <rect x="9" y="39" width="46" height="4.5" rx="1.5" fill="#64748b" stroke="#334155" strokeWidth="0.6"/>
          <rect x="11" y="44.5" width="7.5" height="5" rx="1" fill="#475569"/>
          <rect x="28.25" y="44.5" width="7.5" height="5" rx="1" fill="#475569"/>
          <rect x="45.5" y="44.5" width="7.5" height="5" rx="1" fill="#475569"/>
          <rect x="9" y="50.5" width="46" height="3.5" rx="1.2" fill="#334155"/>

          {/* Active Live Status Dot */}
          <circle cx="53" cy="11" r="3.5" fill="#10b981" stroke="#020617" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-black tracking-tight text-white transition-colors group-hover:text-emerald-300 ${
              textSize === 'xl' ? 'text-xl' :
              textSize === 'lg' ? 'text-lg' :
              textSize === 'sm' ? 'text-sm' :
              'text-base sm:text-lg'
            }`}>
              EuroPallet<span className="text-emerald-400">Supply</span>
            </span>
            {showBadge && (
              <span className="text-[9px] uppercase font-extrabold tracking-wider bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded shadow-sm shrink-0">
                .COM
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-mono tracking-wide hidden sm:block">
            Official European Pallet Liquidation &amp; Wholesale Hub
          </p>
        </div>
      )}
    </div>
  );
};
