"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/app?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/app');
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 transition-all duration-[30s]">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-emerald-950/5 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] bg-gold-accent/5 blur-[120px] rounded-full animate-float delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="animate-fade-in inline-flex items-center gap-2 mb-4 bg-gold-accent/10 border border-gold-accent/20 text-gold-700 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          The Ultimate Quran Search Experience
        </div>

        <h1 className="animate-fade-in text-4xl md:text-7xl font-black text-emerald-950 mb-6 leading-tight tracking-tighter">
          Find Similar Quranic <br />
          <span className="text-gold-700 underline decoration-gold-accent/10 decoration-4 underline-offset-4">Ayat Instantly</span>
        </h1>

        <p className="animate-fade-in delay-100 text-lg md:text-xl text-emerald-950/80 max-w-2xl mb-8 leading-relaxed font-bold">
          Locate identical word patterns and recurring verses across the entire Quran.
        </p>

        {/* Compact Stats/Trust Row (Improved Readability) */}
        <div className="animate-fade-in delay-150 flex flex-wrap justify-center gap-10 mb-10 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-emerald-950/70">
            <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-emerald-950" />
                <span>6,243 Ayat Indexed</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold-accent rounded-full"></div>
                <span>Similar Phrase Search</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold-accent rounded-full"></div>
                <span>For Hifz Students</span>
            </div>
        </div>

        {/* Hero Search Area Professional Refinement */}
        <div className="animate-fade-in delay-200 w-full max-w-xl relative">
            <form 
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-2xl shadow-2xl border-2 border-gray-100 flex flex-col sm:flex-row gap-2 overflow-hidden group/form transition-all focus-within:border-emerald-950/20"
            >
                <div className="flex-grow flex items-center px-10 gap-6">
                    <Search className="w-6 h-6 text-emerald-950/30 group-focus-within/form:text-emerald-950 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search word or phrase..."
                        className="w-full py-5 text-emerald-950 font-black bg-transparent focus:outline-none text-xl text-left placeholder:text-gray-300 placeholder:font-sans placeholder:text-lg placeholder:tracking-normal"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-emerald-900 text-yellow-400 px-10 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-950 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group/btn relative overflow-hidden"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <span>Search Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </div>
                </button>
            </form>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-emerald-900/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2 text-emerald-900/40">
                   <BookOpen className="w-3 h-3" />
                   <span>6,236 Verses</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold-accent"></div>
                   <span>Real-time Discovery</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>English UI</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
