import React, { useState } from 'react';
import { 
  FileText, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronUp, 
  X, 
  Truck, 
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';

interface QuickLeadBadgeProps {
  onOpenQuoteModal: () => void;
}

export const QuickLeadBadge: React.FC<QuickLeadBadgeProps> = ({ onOpenQuoteModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Contact Panel */}
      {isExpanded && (
        <div className="mb-3 w-80 max-w-[calc(100vw-2rem)] bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-4 text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200 divide-y divide-slate-800">
          <div className="pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-xs font-black text-white block">Venlo Logistics Desk</span>
                <span className="text-[10px] text-slate-400">Trade Port Europe, NL</span>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2.5">
            <button
              onClick={() => {
                setIsExpanded(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Request Manifest & Freight Quote</span>
            </button>

            <a
              href="mailto:info@europalletsupply.com?subject=Wholesale%20Pallet%20Manifest%20Inquiry"
              className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-xs flex items-center gap-2.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="truncate text-left">
                <span className="block text-[10px] text-slate-400">Direct Email:</span>
                <span className="font-mono text-emerald-300">info@europalletsupply.com</span>
              </div>
            </a>

            <a
              href="tel:+3197010257455"
              className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-xs flex items-center gap-2.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400">Freight Dispatch Phone:</span>
                <span className="font-mono text-white">+31 970 1025 7455</span>
              </div>
            </a>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              Mon-Fri 08:00 - 18:00 CET
            </span>
            <span className="text-emerald-400 font-mono font-bold">24-48h EU Freight</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-850 text-white border border-emerald-500/50 hover:border-emerald-400 shadow-xl shadow-slate-950/60 transition-all active:scale-95 cursor-pointer"
        aria-label="Contact Logistics Desk"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
          Wholesale Quote & Manifest
        </span>
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <FileText className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
