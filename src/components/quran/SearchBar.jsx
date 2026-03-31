import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSearch, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      <div className="relative group transition-all">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-emerald-900/40 group-focus-within:text-gold-700 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-16 pr-52 py-6 bg-white border-2 border-emerald-900/5 rounded-3xl text-2xl text-emerald-950 placeholder-emerald-900/20 focus:outline-none focus:ring-4 focus:ring-gold-accent/10 focus:border-gold-accent transition-all shadow-xl shadow-emerald-950/5 font-arabic text-right selection:bg-gold-200"
          placeholder="Search Arabic word... (ex: قل)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          dir="rtl"
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button
            onClick={onSearch}
            disabled={disabled || !value.trim()}
            className="h-full bg-emerald-950 hover:bg-emerald-800 text-gold-accent px-8 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center gap-2"
          >
            Search
            <span className="hidden sm:inline bg-gold-accent/20 px-2 py-0.5 rounded text-xs">Enter</span>
          </button>
        </div>
      </div>
      <p className="mt-4 text-emerald-900/40 text-sm font-medium text-center">
        Tip: You can search with or without harakat. We normalize all variations automatically.
      </p>
    </div>
  );
}
