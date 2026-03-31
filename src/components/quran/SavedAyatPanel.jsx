import { Trash2, Bookmark, ExternalLink } from 'lucide-react';

export default function SavedAyatPanel({ savedAyat, onRemove, onClear }) {
  if (savedAyat.length === 0) {
    return (
      <div className="bg-emerald-950/5 rounded-3xl p-10 flex flex-col items-center text-center border-2 border-dashed border-emerald-900/10">
        <div className="w-20 h-20 bg-emerald-900/10 rounded-full flex items-center justify-center mb-6">
          <Bookmark className="w-10 h-10 text-emerald-900/30" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-950 mb-2">Your Collection is Empty</h3>
        <p className="text-emerald-900/50 max-w-xs font-medium">
          Saved ayat will appear here for quick reference during your study sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-emerald-900/10 shadow-3xl sticky top-24">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-pink-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-accent rounded-xl flex items-center justify-center">
             <Bookmark className="w-5 h-5 text-emerald-950" />
          </div>
          <h3 className="text-xl font-extrabold text-emerald-950">Saved Study Ayat</h3>
        </div>
        <button 
          onClick={onClear}
          className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
        {savedAyat.map((ayah) => (
          <div key={ayah.id} className="group p-5 bg-emerald-50 rounded-2xl border border-emerald-950/5 relative hover:bg-gold-50 transition-all hover:border-gold-300">
             <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest">
                  Surah {ayah.surahNumber}:{ayah.ayahNumber} {ayah.surahName}
                </span>
                <button 
                   onClick={() => onRemove(ayah.id)}
                   className="text-emerald-900/20 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>
             <p className="text-right font-scheherazade text-xl leading-relaxed text-emerald-950 line-clamp-3" dir="rtl">
                {ayah.text}
             </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-emerald-900/5">
        <p className="text-emerald-900/30 text-xs font-bold text-center uppercase tracking-widest">
          {savedAyat.length} Ayat Collected
        </p>
      </div>
    </div>
  );
}
