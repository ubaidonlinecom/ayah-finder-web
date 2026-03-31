import { Trash2, Bookmark, BookOpen, Layers } from 'lucide-react';

export default function SavedAyatPanel({ savedAyat, onRemove, onClear }) {
  if (savedAyat.length === 0) {
    return (
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-16 flex flex-col items-center text-center border border-emerald-950/5 shadow-luxury animate-fade-in list-none group">
        <div className="w-24 h-24 bg-emerald-950 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-luxury group-hover:rotate-12 transition-luxury">
          <Bookmark className="w-10 h-10 text-gold-accent" />
        </div>
        <h3 className="text-3xl font-black text-emerald-950 mb-4 tracking-tight">Workspace Empty</h3>
        <p className="text-xl text-emerald-900/40 max-w-[200px] font-semibold leading-relaxed">
          Collect similar verses here for study.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3.5rem] p-10 border border-emerald-900/10 shadow-luxury animate-fade-in group list-none">
      <div className="flex justify-between items-center mb-12 pb-6 border-b border-emerald-950/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold-accent rounded-2xl flex items-center justify-center shadow-luxury">
             <Bookmark className="w-6 h-6 text-emerald-950" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-emerald-950 tracking-tight leading-none">Workspace</h3>
            <p className="text-emerald-900/30 text-[10px] font-black uppercase tracking-[0.3em]">Research Bench</p>
          </div>
        </div>
        <button 
          onClick={onClear}
          className="w-10 h-10 bg-red-50 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-luxury flex items-center justify-center active:scale-95"
          title="Clear Collection"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-950/10 scrollbar-track-transparent">
        {savedAyat.map((ayah) => (
          <div key={ayah.id} className="group/item p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-950/5 relative hover:bg-white transition-luxury hover:shadow-luxury hover:-translate-y-1 overflow-hidden">
             {/* Decorative Background Icon */}
             <div className="absolute -top-4 -right-4 opacity-0 group-hover/item:opacity-5 transition-luxury rotate-12 scale-150 pointer-events-none">
                <Layers className="w-20 h-20 text-emerald-950" />
             </div>

             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-gold-700 opacity-40" />
                    <span className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em] leading-none">
                        Surah {ayah.surahNumber}:{ayah.ayahNumber}
                    </span>
                </div>
                <button 
                   onClick={() => onRemove(ayah.id)}
                   className="text-emerald-900/10 hover:text-red-500 transition-luxury group-hover/item:text-emerald-900/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
             </div>
             <p className="text-right font-scheherazade text-2xl leading-[1.8] text-emerald-950 line-clamp-3 group-hover/item:scale-[1.01] transition-luxury" dir="rtl">
                {ayah.text}
             </p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-emerald-950/5 flex justify-between items-center px-4 animate-fade-in">
        <p className="text-emerald-900/20 text-xs font-black uppercase tracking-[0.4em]">
          {savedAyat.length} Collected
        </p>
        <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-gold-accent opacity-20 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gold-accent opacity-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
