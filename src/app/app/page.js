"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/quran/SearchBar';
import AyahCard from '@/components/quran/AyahCard';
import AyahModal from '@/components/quran/AyahModal';
import SavedAyatPanel from '@/components/quran/SavedAyatPanel';
import Footer from '@/components/layout/Footer';
import quranData from '@/data/quran-data.json';
import { normalizeArabic } from '@/utils/arabic-utils';
import { Search, Loader2, Sparkles, BookOpen } from 'lucide-react';

function AppContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedAyat, setSavedAyat] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeAyahIndex, setActiveAyahIndex] = useState(null);

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

  const handleViewAyah = (index) => {
    setActiveAyahIndex(index);
  };

  const handleNavigateAyah = (newIndex) => {
    if (newIndex >= 0 && newIndex < results.length) {
      setActiveAyahIndex(newIndex);
    }
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
    <div className="flex flex-col min-h-screen bg-gray-50/20 islamic-bg">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Header Section (Matched to Image) */}
          <div className="text-center mb-6 max-w-xl mx-auto flex flex-col items-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950 text-gold-accent rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg mb-6">
                <Search className="w-3 h-3" />
                Real-time Quran Search App
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight mb-4">
                Find any Ayah <span className="text-gold-700">Instantly</span>
             </h1>
             <p className="text-base text-gray-600 font-bold leading-relaxed max-w-sm">
                Enter an Arabic word or phrase to see matching results everywhere in the Holy Quran.
             </p>
          </div>

          {/* Search Area (Matched to Image) */}
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch} 
            disabled={isSearching}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8 w-full animate-fade-in list-none">
            {/* Results Section */}
            <div className="lg:col-span-8 space-y-8 min-h-[500px]">
               {isSearching ? (
                 <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                    <Loader2 className="w-8 h-8 text-emerald-950 animate-spin mb-4" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Searching Quran...</p>
                 </div>
               ) : !hasSearched ? (
                 /* Recommended Start Section */
                 <div className="space-y-8">
                    <div className="flex items-center gap-2 px-4 mb-4 opacity-70">
                       <BookOpen className="w-4 h-4 text-emerald-900" />
                       <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Recommended Start</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {quranData.slice(1, 4).map((ayah, index) => (
                        <AyahCard 
                            key={ayah.id} 
                            ayah={ayah} 
                            index={index}
                            query={query} 
                            isSaved={(id) => savedAyat.some(a => a.id === id)}
                            onSave={handleSave}
                            onRemove={handleRemoveSaved}
                            onView={(idx) => {
                                // Since these are from quranData directly, we hack a results context
                                setResults(quranData.slice(1, 4));
                                setActiveAyahIndex(idx);
                            }}
                        />
                        ))}
                    </div>
                 </div>
               ) : results.length > 0 ? (
                 /* Results List */
                 <div className="w-full flex-grow pb-40">
                    <div className="flex justify-between items-end mb-6 px-4">
                        <div className="space-y-1">
                            <h2 className="text-lg font-black text-slate-800 flex items-center gap-3 tracking-tighter">
                                <div className="w-8 h-8 bg-emerald-950 rounded-xl flex items-center justify-center">
                                   <BookOpen className="w-4 h-4 text-gold-700 shadow-emerald-950/20" />
                                </div>
                                {results.length} Matches Found
                            </h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-emerald-950/5 overflow-hidden divide-y divide-gray-50 mb-40">
                        {results.map((ayah, index) => (
                        <AyahCard 
                            key={ayah.id} 
                            ayah={ayah} 
                            index={index}
                            query={query} 
                            isSaved={(id) => savedAyat.some(a => a.id === id)}
                            onSave={handleSave}
                            onRemove={handleRemoveSaved}
                            onView={handleViewAyah}
                        />
                        ))}
                    </div>
                 </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-gray-100 rounded-[2rem] text-center">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-4">No results found</h3>
                    <p className="text-sm text-gray-400 font-medium mb-10 max-w-xs mx-auto">
                        Try searching for a different word or removing harakat.
                    </p>
                    <button 
                        onClick={() => {setQuery(''); setHasSearched(false);}}
                        className="bg-emerald-950 text-gold-accent px-8 py-3 rounded-lg font-bold text-xs"
                    >
                        Reset Search
                    </button>
                </div>
              )}
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-4 sticky top-24 space-y-8 list-none">
               <SavedAyatPanel 
                 savedAyat={savedAyat} 
                 onRemove={handleRemoveSaved} 
                 onClear={handleClearSaved} 
               />
            </div>
          </div>
        </div>
      </main>

      {/* GLOBAL MUSHAF-STYLE MODAL VIEWER */}
      <AyahModal 
        isOpen={activeAyahIndex !== null}
        onClose={() => setActiveAyahIndex(null)}
        results={results}
        activeIndex={activeAyahIndex}
        onNavigate={handleNavigateAyah}
        isSaved={(id) => savedAyat.some(a => a.id === id)}
        onSave={handleSave}
        onRemove={handleRemoveSaved}
      />

      <Footer />
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-50/20">
            <Loader2 className="w-8 h-8 text-emerald-950 animate-spin" />
        </div>
    }>
      <AppContent />
    </Suspense>
  );
}
