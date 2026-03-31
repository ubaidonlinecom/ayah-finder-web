import { Copy, Bookmark, BookmarkCheck, Check, Search, BookOpen, Layers } from 'lucide-react';
import { useState } from 'react';
import { highlightMatch } from '@/utils/arabic-utils';

export default function AyahCard({ ayah, query, isSaved, onSave, onRemove }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ayah.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[3.5rem] p-12 border border-emerald-950/5 hover:border-gold-accent/40 shadow-luxury hover:shadow-2xl transition-luxury group relative flex flex-col items-center">
      
      {/* Centered Top Reference */}
      <div className="flex items-center gap-3 mb-10 bg-emerald-50/50 px-6 py-2 rounded-2xl border border-emerald-950/5 transition-luxury group-hover:scale-105 group-hover:bg-gold-accent/5">
        <BookOpen className="w-5 h-5 text-emerald-900 group-hover:text-gold-700 transition-colors" />
        <span className="text-emerald-950 font-black uppercase text-sm tracking-[0.2em] leading-none">
          {ayah.surahName} • {ayah.surahNumber}:{ayah.ayahNumber}
        </span>
      </div>

      {/* Premium Arabic Script Display */}
      <div className="w-full text-center mb-12">
        <div 
          className="font-scheherazade text-5xl md:text-7xl leading-[1.8] text-emerald-950 selection:bg-gold-accent transition-luxury group-hover:scale-[1.02] duration-700" 
          dir="rtl"
        >
          {highlightMatch(ayah.text, query)}
        </div>
      </div>

      {/* Premium Divider */}
      <div className="w-24 h-1.5 bg-gold-accent/10 rounded-full mb-12"></div>

      {/* Integrated Action Buttons */}
      <div className="w-full flex flex-col md:flex-row gap-5 items-stretch">
        <button
          onClick={handleCopy}
          className={`group/copy flex-[2] flex items-center justify-center gap-3 py-5 rounded-[2.5rem] font-black text-lg transition-luxury shadow-luxury hover:shadow-2xl active:scale-95 border border-emerald-950/5 ${
            copied ? 'bg-gold-500 text-white border-transparent shadow-gold-glow' : 'bg-white text-emerald-950 hover:bg-emerald-50/50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-6 h-6 animate-fade-in" />
              <span>Copied Successfully</span>
            </>
          ) : (
            <>
              <Copy className="w-6 h-6 text-gold-accent group-hover/copy:rotate-12 transition-luxury" />
              <span>Copy Verse</span>
            </>
          )}
        </button>

        {isSaved ? (
          <button
            onClick={() => onRemove(ayah.id)}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-gold-accent text-emerald-950 rounded-[2.5rem] font-black text-lg hover:bg-gold-600 transition-luxury shadow-luxury active:scale-95 border border-white/10 group/saved"
          >
            <BookmarkCheck className="w-6 h-6 animate-pulse" />
            <span>Saved in Workspace</span>
          </button>
        ) : (
          <button
            onClick={() => onSave(ayah)}
            className="flex-1 flex items-center justify-center gap-3 py-5 bg-emerald-950 text-gold-accent rounded-[2.5rem] font-black text-lg hover:bg-emerald-900 transition-luxury shadow-luxury active:scale-95 border border-white/5 group/save"
          >
            <Bookmark className="w-6 h-6 group-hover/save:scale-110 transition-luxury" />
            <span>Archive</span>
          </button>
        )}
      </div>

      {/* Decorative Floating Icon (Bottom Corner) */}
      <div className="absolute -bottom-8 -right-8 opacity-0 group-hover:opacity-[0.03] transition-all duration-[1s] rotate-45 group-hover:rotate-12 group-hover:scale-150">
        <Layers className="w-48 h-48 text-emerald-950" />
      </div>

    </div>
  );
}
