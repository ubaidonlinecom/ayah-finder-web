"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Copy, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

export default function AyahModal({ isOpen, onClose, results, activeIndex, onNavigate, isSaved, onSave, onRemove }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Body Scroll Lock & Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || !results || activeIndex === null) return null;

  const currentAyah = results[activeIndex];
  if (!currentAyah) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentAyah.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIsSaved = isSaved(currentAyah.id);

  const toggleSave = (e) => {
    e.stopPropagation();
    currentIsSaved ? onRemove(currentAyah.id) : onSave(currentAyah);
  };

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < results.length - 1;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8">
      
      {/* 1. Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity cursor-pointer duration-300"
        onClick={onClose}
      />

      {/* 2. Centered Modal Card (Refined Architecture) */}
      <div className="relative w-full max-w-[680px] max-h-[90vh] flex flex-col bg-[#fdfcf7] rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-500 border border-emerald-900/10">
        
        {/* A. STICKY HEADER (Fixed Height) */}
        <div className="flex-shrink-0 px-8 py-6 border-b border-emerald-950/5 flex items-center justify-between bg-white/60 backdrop-blur-md z-20">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                 <BookOpen className="w-5 h-5 text-gold-accent" />
              </div>
              <div className="flex flex-col">
                 <h3 className="text-2xl font-black text-emerald-950 font-scheherazade leading-none mb-1.5">{currentAyah.surahName}</h3>
                 <p className="text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.3em]">
                    Surah {currentAyah.surahNumber} • Ayah {currentAyah.ayahNumber}
                 </p>
              </div>
           </div>
           
           <button 
             onClick={onClose}
             className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-950/5 text-emerald-950/40 hover:text-emerald-950 hover:bg-emerald-950/10 transition-all"
           >
              <X className="w-5 h-5" />
           </button>
        </div>

        {/* B. SCROLLABLE BODY (Immersive Reading Area) */}
        <div className="flex-grow overflow-y-auto px-10 sm:px-14 py-12 bg-gradient-to-b from-white/20 to-transparent">
           <div className="flex flex-col items-center">
              {/* Subtle Decorative Mushaf Divider (Top) */}
              <div className="flex items-center justify-center gap-4 mb-14 opacity-20">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-950"></div>
                 <div className="w-24 h-[1.5px] bg-emerald-950/20"></div>
                 <div className="w-3 h-3 rotate-45 border-2 border-emerald-950"></div>
                 <div className="w-24 h-[1.5px] bg-emerald-950/20"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-950"></div>
              </div>

              {/* MAIN ARABIC TEXT BLOCK (CLEAN & BALANCED) */}
              <div 
                className="font-quran-reading text-3xl sm:text-4xl md:text-5xl text-emerald-950 selection:bg-gold-accent/20 transition-all duration-700 animate-in fade-in zoom-in-95 text-right w-full px-6" 
                dir="rtl"
                lang="ar"
              >
                {currentAyah.text}
              </div>

              {/* Reference Badge (Mushaf Styled) */}
              <div className="mt-16 flex items-center justify-center gap-4">
                  <span className="h-[1.5px] w-12 bg-emerald-950/5"></span>
                  <div className="px-6 py-3 bg-white border border-emerald-950/10 rounded-2xl text-[10px] font-black text-emerald-900/80 uppercase tracking-[0.2em] flex items-center gap-3 shadow-md">
                     {currentAyah.surahName}
                     <span className="w-1.5 h-1.5 bg-gold-accent rounded-full"></span>
                     Ayah {currentAyah.ayahNumber}
                  </div>
                  <span className="h-[1.5px] w-12 bg-emerald-950/5"></span>
              </div>

              {/* Decorative Mushaf Motif at bottom */}
              <div className="mt-20 mb-8 opacity-10">
                 <div className="text-3xl text-emerald-950">❁</div>
              </div>
           </div>
        </div>

        {/* C. STICKY FOOTER (Fixed Actions) */}
        <div className="flex-shrink-0 bg-white/95 backdrop-blur-2xl border-t border-emerald-950/5 p-8 space-y-6 z-20">
           
           {/* Navigation Row */}
           <div className="flex items-center justify-between gap-4">
              <button 
                 disabled={!hasPrev}
                 onClick={() => onNavigate(activeIndex - 1)}
                 className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                    hasPrev 
                    ? 'bg-white border border-emerald-950/10 text-emerald-950 hover:bg-emerald-50 hover:border-emerald-950/20 active:scale-95' 
                    : 'opacity-0 pointer-events-none'
                 }`}
              >
                 <ChevronLeft className="w-4 h-4 text-gold-accent" />
                 Prev Result
              </button>

              <button 
                 disabled={!hasNext}
                 onClick={() => onNavigate(activeIndex + 1)}
                 className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                    hasNext 
                    ? 'bg-white border border-emerald-950/10 text-emerald-950 hover:bg-emerald-50 hover:border-emerald-950/20 active:scale-95' 
                    : 'opacity-0 pointer-events-none'
                 }`}
              >
                 Next Result
                 <ChevronRight className="w-4 h-4 text-gold-accent" />
              </button>
           </div>

           {/* Quick Action Row */}
           <div className="flex items-center gap-4">
              <button
                onClick={handleCopy}
                className={`flex-grow flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all border shadow-sm ${
                  copied ? 'bg-emerald-600 text-white border-transparent' : 'bg-cream-50/10 text-emerald-950 border-emerald-950/10 hover:bg-emerald-950/5'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-gold-700" />}
                {copied ? 'Copied' : 'Copy Ayah'}
              </button>

              <button
                onClick={toggleSave}
                className={`flex items-center justify-center gap-3 px-10 py-5 rounded-2xl transition-all shadow-xl group/save ${
                  currentIsSaved ? 'bg-gold-accent text-emerald-950' : 'bg-emerald-950 text-gold-accent'
                }`}
              >
                {currentIsSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5 group-hover/save:scale-110 transition-transform" />}
              </button>
           </div>

           {/* Workspace Indicator */}
           <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-emerald-950/20">
                 Result {activeIndex + 1} of {results.length} • Ayah Reader
              </p>
           </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
