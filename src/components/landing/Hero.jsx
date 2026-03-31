"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

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
    <div className="pt-56 pb-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 group-hover:rotate-6 transition-all duration-[30s]">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-950/5 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-gold-accent/5 blur-[150px] rounded-full animate-float delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="animate-fade-in inline-flex items-center gap-2 mb-10 bg-gold-accent/10 border border-gold-accent/20 text-gold-700 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest leading-none shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5" />
          The Ultimate Quran Search Experience
        </div>

        <h1 className="animate-fade-in text-6xl md:text-8xl font-black text-emerald-950 mb-10 leading-[1.05] tracking-tighter">
          Find Similar Quranic <br />
          <span className="text-gold-700 underline decoration-gold-accent/20 decoration-8 underline-offset-8">Ayat Instantly</span>
        </h1>

        <p className="animate-fade-in delay-100 text-xl md:text-2xl text-emerald-900/50 max-w-2xl mb-16 leading-relaxed font-semibold">
          Locate identical word patterns and recurring verses across the entire Quran.
          The professional standard for Hifz students.
        </p>

        {/* Hero Search Area Polish */}
        <div className="animate-fade-in delay-200 w-full max-w-3xl relative">
            <form 
              onSubmit={handleSearch}
              className="bg-white p-3 rounded-[3.5rem] shadow-luxury border border-emerald-900/5 flex flex-col sm:flex-row gap-3 overflow-hidden group/form focus-within:shadow-gold-glow transition-luxury"
            >
                <div className="flex-grow flex items-center px-10 gap-5">
                    <Search className="w-7 h-7 text-emerald-900/20 group-focus-within/form:text-gold-accent transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search word or phrase..."
                        className="w-full py-6 text-emerald-950 font-bold bg-transparent focus:outline-none text-2xl text-right font-arabic placeholder:text-emerald-900/10 placeholder:font-sans placeholder:text-xl placeholder:tracking-tight"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-emerald-950 text-gold-accent px-14 py-6 rounded-[3rem] font-black text-xl hover:bg-emerald-900 transition-luxury shadow-2xl flex items-center justify-center gap-3 active:scale-95 group/btn"
                >
                    Search
                    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1.5 transition-luxury" />
                </button>
            </form>
            
            {/* Quick Link/Status under search */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-10 text-emerald-900/40 text-xs font-black uppercase tracking-[0.25em]">
                <div className="flex items-center gap-3">
                   <BookOpen className="w-4 h-4 text-emerald-900/20" />
                   <span>6,236 Verses</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-gold-accent animate-pulse"></div>
                   <span>Real-time Discovery</span>
                </div>
                <div className="flex items-center gap-3">
                   <span>English UI</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
