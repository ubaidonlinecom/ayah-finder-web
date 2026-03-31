import Link from 'next/link';
import { Search, ChevronRight, Book } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="animate-fade-in inline-flex items-center gap-2 mb-8 bg-gold-50 border border-gold-200 text-gold-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
          <Book className="w-4 h-4" />
          The Ultimate Quran Search
        </div>

        <h1 className="animate-fade-in text-5xl md:text-7xl font-extrabold text-emerald-950 mb-6 leading-tight">
          Quran Word Search<br />
          <span className="text-gold-accent">Perfected</span>
        </h1>

        <p className="animate-fade-in delay-100 text-xl text-emerald-900/80 max-w-2xl mb-12 leading-relaxed">
          Search the Holy Quran by Arabic words and find matching ayat instantly. 
          Designed for Hifz students and researchers to master similar ayat (Mutashabihat).
        </p>

        <div className="animate-fade-in delay-200 flex flex-col sm:flex-row gap-4">
          <Link href="/app" className="bg-emerald-900 text-white text-lg px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl hover:shadow-emerald-900/40">
            <Search className="w-5 h-5" />
            Open Ayah Finder App
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="bg-white text-emerald-950 text-lg px-8 py-4 rounded-2xl font-bold border-2 border-emerald-900/10 hover:border-emerald-900/30 transition-all text-center">
            Explore Features
          </Link>
        </div>

        <div className="mt-20 relative w-full overflow-hidden rounded-3xl border border-emerald-900/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop" 
            alt="Quran Search App Mockup" 
            className="w-full h-auto object-cover opacity-90"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-3xl border border-white/50 animate-pulse">
                <Search className="w-12 h-12 text-gold-accent mx-auto mb-4" />
                <div className="text-emerald-950 font-bold text-2xl">Searching...</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
