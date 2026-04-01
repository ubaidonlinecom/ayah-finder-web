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
        className="bg-white p-8 sm:p-12 hover:bg-emerald-50/10 transition-luxury group/card relative flex flex-col items-center md:items-end justify-center gap-10 cursor-pointer rounded-[3rem] border border-transparent shadow-sm hover:shadow-2xl hover:shadow-emerald-950/5 mb-8"
    >
        {/* Top Header Row (Meta & Actions) */}
        <div className="w-full flex items-center justify-between pointer-events-none">
            <div className="flex flex-col items-start gap-2">
                <div className="bg-emerald-950 text-gold-accent px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {ayah.surahNumber}:{ayah.ayahNumber}
                </div>
                <p className="font-arabic text-xl text-emerald-900/60" dir="rtl" lang="ar">
                    {ayah.surahName}
                </p>
            </div>

            <div className="flex items-center gap-4 pointer-events-auto">
               <button
                 onClick={toggleSave}
                 className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-luxury border-2 ${
                    isSaved 
                      ? 'bg-gold-accent text-emerald-950 border-gold-accent shadow-xl shadow-gold-accent/20 scale-110' 
                      : 'bg-white border-emerald-950/[0.05] text-emerald-950/10 hover:text-emerald-950 hover:border-emerald-950/20'
                 }`}
               >
                 {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
               </button>
               
               <button
                 onClick={handleOpen}
                 className="w-12 h-12 bg-emerald-950 text-gold-accent rounded-2xl transition-luxury shadow-2xl hover:bg-emerald-800 active:scale-95 flex items-center justify-center group/btn"
               >
                 <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
        </div>

        {/* Main Reading Area (Full Width Focused) */}
        <div className="w-full">
            <div 
                className="font-quran-reading text-3xl sm:text-4xl text-emerald-950 text-right leading-[3.5] hover:text-black transition-colors selection:bg-gold-accent/20" 
                dir="rtl"
                lang="ar"
            >
                {highlightMatch(ayah.text, query)}
            </div>
        </div>
    </div>
  );
}
