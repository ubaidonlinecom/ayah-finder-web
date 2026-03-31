import { Search, Sparkles, Layout } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 px-4 group animate-fade-in list-none">
      <div className="relative group/input transition-luxury transform hover:scale-[1.01] duration-700">
        
        {/* Dynamic Shadow Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-gold-accent/10 to-emerald-900/5 blur-3xl rounded-[4.5rem] opacity-0 group-focus-within/input:opacity-100 transition-luxury duration-700"></div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none transition- luxury">
            <Search className="h-9 w-9 text-emerald-950/20 group-focus-within/input:text-gold-accent group-focus-within/input:rotate-12 transition-luxury" />
          </div>
          
          <input
            type="text"
            className="block w-full pl-24 pr-64 py-10 bg-white border border-emerald-950/5 rounded-[4rem] text-4xl font-extrabold text-emerald-950 placeholder:text-emerald-950/5 focus:outline-none focus:ring-0 focus:border-gold-accent/30 transition-luxury shadow-luxury group-focus-within/input:shadow-gold-glow font-arabic text-right selection:bg-gold-accent selection:text-white"
            placeholder="Search words or phrases..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            dir="rtl"
          />
          
          <div className="absolute inset-y-3 right-3 flex items-center">
            <button
              onClick={() => onSearch()}
              disabled={disabled || !value.trim()}
              className="h-full bg-emerald-950 hover:bg-emerald-800 text-gold-accent px-16 rounded-[3.5rem] font-black text-2xl tracking-tight transition-luxury shadow-luxury active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center gap-4 group/btn overflow-hidden relative"
            >
              <div className="relative z-10 flex items-center gap-4">
                <span>Search</span>
                <Sparkles className="w-7 h-7 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-luxury" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-luxury"></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Hints Area */}
      <div className="mt-8 flex flex-wrap justify-center gap-10 text-emerald-950/20 text-xs font-black uppercase tracking-[0.4em] animate-fade-in delay-500 overflow-hidden">
        <div className="flex items-center gap-4 group/hint cursor-default transition-all hover:text-gold-accent">
            <Layout className="w-4 h-4 opacity-10 group-hover/hint:opacity-100 transition-luxury" />
            <span>Exact Pattern Matching</span>
        </div>
        <div className="flex items-center gap-4 group/hint cursor-default transition-all hover:text-gold-accent">
            <div className="w-1.5 h-1.5 bg-gold-accent/20 rounded-full group-hover/hint:bg-gold-accent transition-luxury"></div>
            <span>Auto-Normalization</span>
        </div>
        <div className="flex items-center gap-4 group/hint cursor-default transition-all hover:text-gold-accent">
            <div className="w-1.5 h-1.5 bg-gold-accent/20 rounded-full group-hover/hint:bg-gold-accent transition-luxury"></div>
            <span>Global Dataset Sync</span>
        </div>
      </div>
    </div>
  );
}
