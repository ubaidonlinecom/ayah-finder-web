"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/quran/SearchBar';
import AyahCard from '@/components/quran/AyahCard';
import SavedAyatPanel from '@/components/quran/SavedAyatPanel';
import Footer from '@/components/layout/Footer';
import quranData from '@/data/quran-data.json';
import { normalizeArabic } from '@/utils/arabic-utils';
import { Search, Loader2, Sparkles, BookOpen, Quote, Info, ChevronRight, Layout } from 'lucide-react';
import Link from 'next/link';

function AppContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedAyat, setSavedAyat] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle initial query from URL
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate real search delay for professional UX/Feel
    setTimeout(() => {
      const normalizedQuery = normalizeArabic(searchQuery);
      
      const filtered = quranData.filter(ayah => {
        const normalizedText = normalizeArabic(ayah.text);
        const normalizedSurah = normalizeArabic(ayah.surahName);
        
        return normalizedText.includes(normalizedQuery) || 
               normalizedSurah.includes(normalizedQuery);
      });
      
      setResults(filtered);
      setIsSearching(false);
    }, 400);
  };

  // Saved Ayat Logic
  useEffect(() => {
    const saved = localStorage.getItem('ayah-finder-saved');
    if (saved) {
      try { setSavedAyat(JSON.parse(saved)); } catch (e) { console.error("Failed to parse saved ayat", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ayah-finder-saved', JSON.stringify(savedAyat));
  }, [savedAyat]);

  const handleSave = (ayah) => {
    if (!savedAyat.find(a => a.id === ayah.id)) {
      setSavedAyat([...savedAyat, ayah]);
    }
  };

  const handleRemoveSaved = (id) => {
    setSavedAyat(savedAyat.filter(a => a.id !== id));
  };

  const handleClearSaved = () => {
    if (confirm("Are you sure you want to clear all saved ayat?")) {
      setSavedAyat([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-100/50 islamic-bg">
      <Navbar />
      
      <main className="flex-grow pt-48 pb-32 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Workspace Header Area */}
          <div className="text-center mb-24 max-w-2xl mx-auto space-y-8 animate-fade-in list-none">
             <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-950 text-gold-accent rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-luxury">
                <Layout className="w-3.5 h-3.5" />
                Ayah Finder Web Workspace
             </div>
             <h1 className="text-6xl font-black text-emerald-950 tracking-tight leading-tight">
                Unlock Divine <br />
                <span className="text-gold-700">Patterns</span>
             </h1>
             <p className="text-xl text-emerald-900/40 font-bold leading-relaxed">
                Experience precision Quranic search designed for students of excellence.
             </p>
          </div>

          {/* Centered Search Area Polish */}
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch} 
            disabled={isSearching}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start mt-20 animate-fade-in delay-200">
            {/* Results Section */}
            <div className="lg:col-span-8 space-y-12 min-h-[600px]">
               {isSearching ? (
                 <div className="flex flex-col items-center justify-center py-52 bg-white/40 backdrop-blur-xl rounded-[4rem] border border-emerald-950/5 shadow-luxury list-none">
                    <Loader2 className="w-20 h-20 text-gold-accent animate-spin mb-10 transition-luxury" />
                    <h3 className="text-3xl font-black text-emerald-950 mb-4">Searching precisely...</h3>
                    <p className="text-emerald-900/40 text-sm font-black uppercase tracking-widest">Validating every word sequence</p>
                 </div>
               ) : !hasSearched ? (
                 /* Empty State Polish */
                 <div className="flex flex-col items-start p-16 bg-white/60 backdrop-blur-xl rounded-[4rem] border border-emerald-950/5 shadow-luxury group relative overflow-hidden list-none">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold-accent/5 blur-[100px] rounded-full group-hover:scale-110 transition- luxury"></div>
                    <div className="w-20 h-20 bg-emerald-950 rounded-[2rem] flex items-center justify-center mb-10 shadow-luxury group-hover:rotate-12 transition-luxury">
                       <Sparkles className="w-10 h-10 text-gold-accent" />
                    </div>
                    <h3 className="text-4xl font-black text-emerald-950 mb-6 font-sans">Ready to begin?</h3>
                    <p className="text-xl text-emerald-900/40 font-semibold leading-relaxed mb-12 max-w-md">
                       Launch your discovery by entering any Arabic word or sequence above. 
                       We normalize text to find exactly what you're looking for.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-3 px-6 py-3 bg-white shadow-luxury rounded-2xl text-emerald-900 font-bold border border-emerald-950/5 transition-luxury hover:-translate-y-1">
                            <Info className="w-5 h-5 text-gold-accent" />
                            Exact Matching
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-white shadow-luxury rounded-2xl text-emerald-900 font-bold border border-emerald-950/5 transition-luxury hover:-translate-y-1">
                            <Info className="w-5 h-5 text-gold-accent" />
                            All 6,236 Ayat
                        </div>
                    </div>
                 </div>
               ) : results.length === 0 ? (
                 /* No Results Polish */
                 <div className="flex flex-col items-center justify-center py-52 bg-white/60 backdrop-blur-xl rounded-[4rem] border border-red-100 text-center animate-fade-in list-none">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-12 shadow-inner">
                       <Search className="w-10 h-10 text-red-300" />
                    </div>
                    <h3 className="text-4xl font-black text-emerald-950 mb-6">Discovery Unsuccessful</h3>
                    <p className="text-xl text-emerald-900/40 font-semibold mb-12 max-w-sm mx-auto">
                       We couldn't find matches for "{query}". Try using shorter word sequences.
                    </p>
                    <button 
                       onClick={() => {setQuery(''); setHasSearched(false);}}
                       className="bg-emerald-950 text-gold-accent px-14 py-6 rounded-[2.5rem] font-black text-xl hover:bg-emerald-900 hover:shadow-2xl transition-luxury shadow-luxury active:scale-95"
                    >
                       Reset Discovery
                    </button>
                 </div>
               ) : (
                 /* Results List Polish */
                 <div className="space-y-12 animate-fade-in list-none">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 px-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black text-emerald-950 flex items-center gap-4">
                                <BookOpen className="w-10 h-10 text-gold-accent" />
                                Matches Found
                            </h2>
                            <p className="text-emerald-900/40 text-sm font-black uppercase tracking-[0.25em]">
                                Exploring {results.length} results for "{query}"
                            </p>
                        </div>
                        <div className="hidden md:flex gap-3">
                           <div className="w-14 h-14 bg-white shadow-luxury border border-emerald-950/5 rounded-2xl flex items-center justify-center text-emerald-900/20">
                             <Layout className="w-7 h-7" />
                           </div>
                           <div className="w-14 h-14 bg-emerald-950 shadow-luxury rounded-2xl flex items-center justify-center">
                             <ChevronRight className="w-7 h-7 text-gold-accent" />
                           </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {results.map((ayah) => (
                        <AyahCard 
                            key={ayah.id} 
                            ayah={ayah} 
                            query={query} 
                            isSaved={savedAyat.some(a => a.id === ayah.id)}
                            onSave={handleSave}
                            onRemove={handleRemoveSaved}
                        />
                        ))}
                    </div>
                 </div>
               )}
            </div>

            {/* Sticky Sidebar Workspace */}
            <div className="lg:col-span-4 sticky top-40 space-y-12 list-none">
               <SavedAyatPanel 
                 savedAyat={savedAyat} 
                 onRemove={handleRemoveSaved} 
                 onClear={handleClearSaved} 
               />
               
               {/* Context Card Polish */}
               <div className="p-10 bg-emerald-950 rounded-[3rem] shadow-luxury border border-white/5 relative overflow-hidden group list-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent opacity-5 blur-[50px] -z-10 group-hover:scale-150 transition-luxury duration-[2s]"></div>
                  <div className="flex items-center gap-4 mb-6">
                     <Quote className="w-7 h-7 text-gold-accent" />
                     <span className="font-black text-white text-xs uppercase tracking-[0.3em] leading-none">Memorization Tip</span>
                  </div>
                  <p className="text-lg text-emerald-100/60 font-semibold leading-relaxed leading-[1.6]">
                     Enter exactly what you memorize. Use our normalization to discover verses with similar Arabic roots.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-cream-50">
            <Loader2 className="w-16 h-16 text-emerald-950 animate-spin" />
        </div>
    }>
      <AppContent />
    </Suspense>
  );
}
