"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/quran/SearchBar';
import AyahCard from '@/components/quran/AyahCard';
import AyahModal from '@/components/quran/AyahModal';
import Pagination from '@/components/quran/Pagination';
import SavedAyatPanel from '@/components/quran/SavedAyatPanel';
import Footer from '@/components/layout/Footer';
import { searchQuran } from '@/utils/search-engine';
import { normalizeArabic } from '@/utils/arabic-utils';
import { Search, Loader2, BookOpen } from 'lucide-react';
import quranData from '@/data/quran-data.json';

function AppContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedAyat, setSavedAyat] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeAyahIndex, setActiveAyahIndex] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    setCurrentPage(1); // Reset to first page
    
    // Use centralized search engine
    setTimeout(() => {
      const searchResults = searchQuran(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
    }, 400);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAyah = (index) => {
    // Correct index mapping for modal from paginated subset
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    setActiveAyahIndex(actualIndex);
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
          
          {/* Header Section */}
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

          {/* Search Area */}
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            onSearch={handleSearch} 
            disabled={isSearching}
          />

          <div className="flex flex-col items-center mt-8 w-full animate-fade-in list-none pb-40">
            {/* Results Section (Now Full Width & Focused) */}
            <div className="w-full max-w-5xl space-y-12 min-h-[500px]">
               {isSearching ? (
                 <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                    <Loader2 className="w-10 h-10 text-emerald-950 animate-spin mb-6 opacity-20" />
                    <p className="text-emerald-900/40 text-[10px] font-black uppercase tracking-[0.4em]">Perusing the Holy Quran...</p>
                 </div>
               ) : !hasSearched ? (
                 /* Recommended Start Section */
                 <div className="space-y-10">
                    <div className="flex items-center justify-center gap-4 px-4 opacity-70">
                       <div className="h-[1px] flex-grow bg-emerald-950/10"></div>
                       <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-900" />
                          <h2 className="text-[10px] font-black text-emerald-950 uppercase tracking-[0.3em]">Foundation Verses</h2>
                       </div>
                       <div className="h-[1px] flex-grow bg-emerald-950/10"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {quranData.slice(1, 4).map((ayah, index) => (
                        <AyahCard 
                            key={ayah.id} 
                            ayah={ayah} 
                            index={index}
                            query={query} 
                            isSaved={savedAyat.some(a => a.id === ayah.id)}
                            onSave={handleSave}
                            onRemove={handleRemoveSaved}
                            onView={(idx) => {
                                setResults(quranData.slice(1, 4));
                                setActiveAyahIndex(idx);
                            }}
                        />
                        ))}
                    </div>
                 </div>
               ) : results.length > 0 ? (
                 /* Results List */
                 <div className="w-full space-y-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center px-4 gap-6">
                        <div className="flex items-center gap-6">
                             <div className="w-16 h-16 bg-emerald-950 rounded-[2rem] flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-luxury cursor-pointer group">
                                <BookOpen className="w-6 h-6 text-gold-accent group-hover:scale-110 transition-transform" />
                             </div>
                             <div className="space-y-1.5">
                                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">Search Results</h2>
                                 <div className="flex items-center gap-3">
                                    <p className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.3em]">
                                        {results.length} total matches
                                    </p>
                                    <span className="w-1 h-1 bg-emerald-900/20 rounded-full"></span>
                                    <p className="text-[10px] font-black text-gold-700 uppercase tracking-[0.3em]">
                                        Page {currentPage} of {totalPages}
                                    </p>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] border border-emerald-950/5 shadow-2xl shadow-emerald-950/5 overflow-hidden divide-y divide-emerald-950/[0.03]">
                        {paginatedResults.map((ayah, index) => (
                        <AyahCard 
                            key={ayah.id} 
                            ayah={ayah} 
                            index={index}
                            query={query} 
                            isSaved={savedAyat.some(a => a.id === ayah.id)}
                            onSave={handleSave}
                            onRemove={handleRemoveSaved}
                            onView={handleViewAyah}
                        />
                        ))}
                    </div>

                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                 </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 bg-white border border-emerald-950/5 rounded-[4rem] text-center px-10 shadow-3xl shadow-emerald-950/5">
                    <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center mb-10">
                       <Search className="w-12 h-12 text-emerald-900/20" />
                    </div>
                    <h3 className="text-4xl font-black text-emerald-950 mb-6 tracking-tighter">No Ayahs Found</h3>
                    <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed">
                        The text could not be located in the current indices. Try these refinements:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-lg mx-auto mb-14">
                        <div className="p-6 bg-gray-50/50 rounded-3xl border border-emerald-950/[0.03]">
                             <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest mb-3">Refinement 1</p>
                             <p className="text-sm font-bold text-gray-700 leading-relaxed">Remove manual Harakat (Zabar, Zer, Pesh) from your search query.</p>
                        </div>
                        <div className="p-6 bg-gray-50/50 rounded-3xl border border-emerald-950/[0.03]">
                             <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest mb-3">Refinement 2</p>
                             <p className="text-sm font-bold text-gray-700 leading-relaxed">Ensure you are using standard Arabic keyboard characters.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {setQuery(''); setHasSearched(false);}}
                        className="bg-emerald-950 text-gold-accent px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-emerald-800 transition-luxury active:scale-95"
                    >
                        Clear Workspace
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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
