"use client";

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/quran/SearchBar';
import AyahCard from '@/components/quran/AyahCard';
import SavedAyatPanel from '@/components/quran/SavedAyatPanel';
import Footer from '@/components/layout/Footer';
import quranData from '@/data/quran-data.json';
import { normalizeArabic } from '@/utils/arabic-utils';
import { Search, Loader2, Sparkles, BookOpen, Bookmark, Trash2 } from 'lucide-react';

export default function AppPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedAyat, setSavedAyat] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load saved ayat from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ayah-finder-saved');
    if (saved) {
      try {
        setSavedAyat(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved ayat", e);
      }
    }
  }, []);

  // Save to localStorage when savedAyat changes
  useEffect(() => {
    localStorage.setItem('ayah-finder-saved', JSON.stringify(savedAyat));
  }, [savedAyat]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate real search delay for UX
    setTimeout(() => {
      const normalizedQuery = normalizeArabic(query);
      
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="text-center mb-16 space-y-6">
             <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-950 text-gold-accent rounded-full text-sm font-bold border border-gold-accent/20 animate-pulse shadow-xl shadow-emerald-950/20">
                <Sparkles className="w-4 h-4" />
                Real-time Quran Search App
             </div>
             <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-950 tracking-white leading-tight">
                Find any Ayah <span className="text-gold-700">Instantly</span>
             </h1>
             <p className="text-xl text-emerald-900/50 max-w-2xl mx-auto font-medium">
                Enter an Arabic word or phrase to see matching results everywhere in the Holy Quran.
             </p>
          </div>

          {/* Search Section */}
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch} 
            disabled={isSearching}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16">
            {/* Results Section */}
            <div className="lg:col-span-3 space-y-8">
               <div className="flex justify-between items-center mb-10 px-2">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white shadow-md rounded-xl flex items-center justify-center border border-emerald-900/5">
                        <BookOpen className="w-5 h-5 text-emerald-900" />
                     </div>
                     <h2 className="text-2xl font-extrabold text-emerald-950">
                        {isSearching ? 'Finding matches...' : hasSearched ? `${results.length} Matching Results` : 'Recommended Start'}
                     </h2>
                  </div>
                  {results.length > 0 && !isSearching && (
                    <div className="text-emerald-900/40 text-sm font-bold uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-emerald-900/5">
                       Quran Search V1.0
                    </div>
                  )}
               </div>

               {isSearching ? (
                 <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] shadow-3xl border border-emerald-900/5">
                    <Loader2 className="w-16 h-16 text-gold-accent animate-spin mb-6" />
                    <p className="text-emerald-950 font-extrabold text-2xl">Consulting the Dataset...</p>
                    <p className="text-emerald-900/40 font-medium">Verifying patterns and matching Harakat</p>
                 </div>
               ) : hasSearched && results.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] shadow-3xl border border-emerald-900/5 text-center px-6">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
                       <Search className="w-12 h-12 text-red-300" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-emerald-950 mb-4">No results found for "{query}"</h3>
                    <p className="text-emerald-900/50 max-w-md font-medium text-lg leading-relaxed">
                       Try searching for a shorter word or verify the spelling. Our normalization system handles Harakat, but the base characters must match.
                    </p>
                    <button 
                       onClick={() => setQuery('')}
                       className="mt-10 bg-emerald-950 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                    >
                       <Trash2 className="w-5 h-5" />
                       Clear Search
                    </button>
                 </div>
               ) : (
                 <div className="space-y-6 animate-fade-in">
                    {(hasSearched ? results : quranData.slice(1, 4)).map((ayah) => (
                      <AyahCard 
                        key={ayah.id} 
                        ayah={ayah} 
                        query={query} 
                        isSaved={savedAyat.some(a => a.id === ayah.id)}
                        onSave={handleSave}
                        onRemove={handleRemoveSaved}
                      />
                    ))}
                    {!hasSearched && (
                       <div className="py-20 text-center opacity-40">
                          <p className="font-bold uppercase tracking-[0.2em] text-emerald-950 mb-4">Start your search above to see full results</p>
                          <div className="flex justify-center gap-4">
                             <div className="w-2 h-2 rounded-full bg-emerald-950/20"></div>
                             <div className="w-2 h-2 rounded-full bg-emerald-950/20"></div>
                             <div className="w-2 h-2 rounded-full bg-emerald-950/20"></div>
                          </div>
                       </div>
                    )}
                 </div>
               )}
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-1">
               <SavedAyatPanel 
                 savedAyat={savedAyat} 
                 onRemove={handleRemoveSaved} 
                 onClear={handleClearSaved} 
               />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
