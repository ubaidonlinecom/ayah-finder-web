"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Layout, 
  BookOpen, 
  Zap, 
  Shield, 
  ArrowRight,
  Command
} from 'lucide-react';

const DropdownItem = ({ icon: Icon, title, desc, href }) => (
  <Link href={href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-950/5 transition-all group">
    <div className="w-11 h-11 bg-white border border-emerald-950/5 rounded-xl flex items-center justify-center group-hover:bg-emerald-950 group-hover:text-gold-accent transition-all shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-emerald-950 transition-all">{title}</h4>
      <p className="text-xs text-emerald-900/30 font-medium group-hover:text-emerald-900/50 transition-all leading-relaxed">{desc}</p>
    </div>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const isApp = pathname === '/app';

  // State for scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync mobile menu scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-20 flex items-center ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-emerald-950/5 shadow-luxury' 
          : 'bg-white/40 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-emerald-950 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                  <span className="text-gold-accent font-black text-xl tracking-tighter">A</span>
                </div>
                <h1 className="text-xl font-bold text-emerald-950 tracking-tighter group-hover:translate-x-1 transition-all">
                  Ayah<span className="text-gold-700">Finder</span>
                </h1>
              </Link>
            </div>

            {/* Center: Navigation Links + Search */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2">
                {/* Dropdown 1: Features */}
                <div className="relative group px-1 flex items-center h-full">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-emerald-950/50 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all">
                    Features
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-all opacity-50" />
                    </button>
                    <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-80 bg-white border border-emerald-950/5 shadow-luxury rounded-3xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all translate-y-3 group-hover:translate-y-0">
                    <DropdownItem icon={Zap} title="Fast Discovery" desc="Instant search across 6,243 verses." href="/#features" />
                    <DropdownItem icon={Shield} title="Arabic Friendly" desc="Optimized for vocalized Quranic script." href="/#features" />
                    <DropdownItem icon={Layout} title="Clean Workspace" desc="Premium research-ready interface." href="/app" />
                    </div>
                </div>

                {/* Dropdown 2: Use Cases */}
                <div className="relative group px-1 flex items-center h-full">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-emerald-950/50 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all">
                    Use Cases
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-all opacity-50" />
                    </button>
                    <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-80 bg-white border border-emerald-950/5 shadow-luxury rounded-3xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all translate-y-3 group-hover:translate-y-0">
                    <DropdownItem icon={BookOpen} title="Memorization" desc="Master similar verses side-by-side." href="/#about" />
                    <DropdownItem icon={ArrowRight} title="Research" desc="Identify complex word patterns." href="/#about" />
                    </div>
                </div>

                <Link href="/docs" className="px-4 py-2 rounded-xl text-sm font-bold text-emerald-950/50 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all">Docs</Link>
                <Link href="/pricing" className="px-4 py-2 rounded-xl text-sm font-bold text-emerald-950/50 hover:text-emerald-950 hover:bg-emerald-950/5 transition-all">Pricing</Link>
              </div>

              {/* Navbar Search Field (Polished) */}
              <div className="ml-4 relative group/search">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/30 group-focus-within/search:text-emerald-950 transition-all" />
                <input 
                   type="text" 
                   placeholder="Quick search..."
                   className="pl-10 pr-10 py-2.5 w-44 bg-emerald-950/5 border border-transparent rounded-[1.25rem] text-[11px] font-bold text-emerald-950 focus:outline-none focus:w-60 focus:bg-white focus:border-emerald-950/10 transition-all shadow-inner"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-20 pointer-events-none group-focus-within/search:opacity-0 transition-all">
                   <Command className="w-3 h-3" />
                   <span className="text-[9px] font-black">K</span>
                </div>
              </div>
            </div>

            {/* Right: Dark Toggle + Login + CTA */}
            <div className="flex items-center gap-4">
               <button 
                  onClick={toggleDarkMode}
                  className="hidden sm:flex w-11 h-11 bg-white border border-emerald-950/5 rounded-2xl items-center justify-center text-emerald-950 hover:bg-emerald-950 hover:text-gold-accent transition-all active:scale-90 shadow-sm"
               >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>

               <Link href="/login" className="hidden md:block px-6 py-2.5 rounded-2xl text-sm font-bold text-emerald-950 hover:bg-emerald-950 hover:text-gold-accent transition-all shadow-sm">Login</Link>

               <Link 
                  href="/app" 
                  className="bg-emerald-950 text-gold-accent hover:bg-emerald-900 border border-white/10 font-black text-xs uppercase tracking-widest px-8 py-3 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center gap-2 group/cta"
               >
                  Start Searching
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all opacity-50" />
               </Link>

               {/* Mobile Toggle */}
               <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden w-11 h-11 bg-white border border-emerald-950/5 rounded-2xl flex items-center justify-center text-emerald-950 active:scale-90 transition-all shadow-sm"
               >
                  {isOpen ? <X className="w-6 h-6 animate-in zoom-in-75" /> : <Menu className="w-6 h-6 animate-in zoom-in-75" />}
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slidedown */}
      <div 
        className={`fixed inset-0 z-[90] bg-white transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col p-10 pt-32 gap-10 overflow-y-auto">
          <div className="space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900/20 px-4">Navigation</span>
             <Link href="/" className="block px-4 py-4 rounded-3xl bg-emerald-950/5 text-3xl font-black text-emerald-950 tracking-tighter">Home</Link>
             <Link href="/app" className="block px-4 py-4 rounded-3xl hover:bg-emerald-950/5 text-3xl font-black text-emerald-950 tracking-tighter">Search App</Link>
             <Link href="/#features" className="block px-4 py-4 rounded-3xl hover:bg-emerald-950/5 text-3xl font-black text-emerald-950 tracking-tighter">Features</Link>
             <Link href="/#about" className="block px-4 py-4 rounded-3xl hover:bg-emerald-950/5 text-3xl font-black text-emerald-950 tracking-tighter">Use Cases</Link>
          </div>

          <div className="mt-auto flex flex-col gap-6">
             <Link 
                href="/app" 
                className="w-full h-20 bg-emerald-950 rounded-[2.5rem] flex items-center justify-center text-gold-accent font-black text-2xl gap-3 shadow-xl active:scale-95 transition-all"
             >
                <Zap className="w-7 h-7" />
                Launch App
             </Link>
             <div className="flex justify-between items-center px-6">
                <span className="text-emerald-900/20 text-xs font-black uppercase tracking-widest leading-none">Pricing</span>
                <span className="text-emerald-900/20 text-xs font-black uppercase tracking-widest leading-none">Docs</span>
                <button onClick={toggleDarkMode} className="text-emerald-950 font-black uppercase text-[10px] tracking-widest p-2 bg-emerald-950/5 rounded-lg leading-none">Theme</button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
