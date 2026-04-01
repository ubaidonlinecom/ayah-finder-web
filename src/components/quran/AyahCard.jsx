"use client";

import { Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';
import { highlightMatch } from '@/utils/arabic-utils';

export default function AyahCard({ ayah, index, query, isSaved, onSave, onRemove, onView }) {
  const toggleSave = (e) => {
    e.stopPropagation();
    isSaved ? onRemove(ayah.id) : onSave(ayah);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    onView(index);
  };

  return (
    <div 
        onClick={handleOpen}
        className="bg-white p-6 hover:bg-emerald-50/50 transition-all group/card relative flex items-center justify-between gap-6 cursor-pointer border-b border-gray-50 last:border-b-0"
    >
        <div className="flex items-center gap-8 flex-grow overflow-hidden">
            {/* Surah Ref Badge & Name (Updated for Visibility) */}
            <div className="flex-shrink-0 w-28 flex flex-col items-start gap-2">
                <div className="inline-flex items-center gap-2 bg-emerald-950 px-3 py-1.5 rounded-lg shadow-md border border-white/5">
                    <span className="text-gold-accent font-black text-[10px] uppercase tracking-tighter leading-none">
                    {ayah.surahNumber}<span className="text-gold-accent/40 mx-0.5">:</span>{ayah.ayahNumber}
                    </span>
                </div>
                <p 
                  className="font-arabic text-xl text-emerald-900 leading-none truncate max-w-full drop-shadow-sm" 
                  dir="rtl"
                  lang="ar"
                >
                    {ayah.surahName}
                </p>
            </div>

            {/* Ayah Preview Line (Refined Font Treatment) */}
            <div className="flex-grow overflow-hidden pr-6">
                <div 
                    className="font-preview text-2xl text-emerald-950 text-right truncate group-hover/card:text-black transition-colors" 
                    dir="rtl"
                    lang="ar"
                >
                    {highlightMatch(ayah.text, query)}
                </div>
            </div>
        </div>

        {/* Action Column */}
        <div className="flex items-center gap-4 flex-shrink-0">
           <button
             onClick={toggleSave}
             className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all shadow-sm border ${
                isSaved 
                  ? 'bg-gold-accent text-emerald-950 border-gold-accent' 
                  : 'bg-white border-gray-100 text-gray-300 hover:text-emerald-950 hover:border-emerald-950/20'
             }`}
           >
             {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
           </button>
           
           <button
             onClick={handleOpen}
             className="px-6 py-3.5 bg-emerald-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-800 transition-all shadow-lg active:scale-95 flex items-center gap-2"
           >
             <span>View Full Ayah</span>
             <ArrowRight className="w-4 h-4 text-gold-accent group-hover/card:translate-x-0.5 transition-all" />
           </button>
        </div>
    </div>
  );
}
