import { Search, Sparkles, ArrowRight } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4 group/search animate-fade-in list-none">
      <div className="relative group/input transition-all transform hover:scale-[1.005] duration-500">
        
        {/* Defined background with sharper shadow */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_12px_45px_rgb(0,0,0,0.06)] pointer-events-none"></div>
        
        <div className="relative">
          {/* Enhanced Search Icon */}
          <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none z-10">
            <Search className="h-6 w-6 text-emerald-950/30 group-focus-within/input:text-emerald-900 transition-colors" />
          </div>
          
          <input
            type="text"
            className="block w-full pl-16 pr-44 py-6 bg-white border-2 border-gray-100 rounded-2xl text-xl font-bold text-emerald-950 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:border-emerald-950/30 transition-all text-left selection:bg-gold-accent selection:text-white"
            placeholder="Search word or phrase..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          
          {/* Vibrant Deep Dark Green Search Button - Removed grayscale so color is always visible */}
          <div className="absolute inset-y-2 right-2 flex items-center">
            <button
              onClick={() => onSearch()}
              disabled={disabled || !value.trim()}
              className="h-full bg-emerald-900 text-yellow-400 px-10 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:bg-emerald-950 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2 group/btn relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-2">
                <span>Discovery</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-all" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* High Contrast sub-hints */}
      <div className="mt-8 flex flex-wrap justify-center gap-10 text-emerald-950/60 text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden">
        <div className="flex items-center gap-3 transition-all hover:text-emerald-950 cursor-default">
            <Sparkles className="w-4 h-4 text-gold-accent shadow-sm" />
            <span>Contextual Alignment</span>
        </div>
        <div className="flex items-center gap-3 transition-all hover:text-emerald-950 cursor-default" title="Auto Indexing System Active">
            <div className="w-2 h-2 bg-gold-accent rounded-full animate-pulse"></div>
            <span>Auto-Indexing</span>
        </div>
      </div>
    </div>
  );
}
