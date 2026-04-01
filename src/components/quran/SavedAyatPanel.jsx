import { Trash2, Bookmark, BookOpen } from 'lucide-react';

export default function SavedAyatPanel({ savedAyat, onRemove, onClear }) {
  if (savedAyat.length === 0) {
    return (
      <div className="bg-gray-100 rounded-3xl p-12 flex flex-col items-center text-center border-none shadow-sm animate-fade-in list-none group min-h-[400px] justify-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-8 transition-all group-hover:scale-105">
          <Bookmark className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 tracking-tight">Your Collection is Empty</h3>
        <p className="text-xs text-gray-400 max-w-[180px] font-medium leading-relaxed">
          Saved ayat will appear here for quick reference during your study sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury animate-fade-in list-none">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-950 rounded-xl flex items-center justify-center">
             <Bookmark className="w-5 h-5 text-gold-accent" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-gray-800 tracking-tight leading-none">Your Collection</h3>
          </div>
        </div>
        <button 
          onClick={onClear}
          className="text-red-400 hover:text-red-600 transition-all font-bold text-[10px] uppercase tracking-widest"
        >
          Clear
        </button>
      </div>

      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
        {savedAyat.map((ayah) => (
          <div key={ayah.id} className="group/item p-6 bg-gray-50 rounded-2xl border border-gray-100 relative hover:bg-emerald-50 transition-all hover:border-emerald-200">
             <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-1.5 opacity-40">
                    <BookOpen className="w-3 h-3 text-emerald-900" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-950">
                        {ayah.surahName} • {ayah.surahNumber}:{ayah.ayahNumber}
                    </span>
                </div>
                <button 
                   onClick={() => onRemove(ayah.id)}
                   className="text-gray-300 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
             </div>
             <p className="text-right font-scheherazade text-xl leading-[1.6] text-gray-800 line-clamp-3" dir="rtl">
                {ayah.text}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
