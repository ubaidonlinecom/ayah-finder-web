"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronRight, Menu, X, BookOpen, Layers, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isApp = pathname === '/app';

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '/', isActive: !isApp && pathname === '/' },
    { name: 'Search', href: '/app', isActive: isApp },
    { name: 'About', href: '/#about', isActive: false },
  ];

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 glass border-b border-emerald-950/5 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-emerald-950 rounded-2xl flex items-center justify-center shadow-luxury group-hover:scale-110 transition-luxury">
                  <span className="text-gold-accent font-black text-xl">A</span>
                </div>
                <h1 className="text-2xl font-black text-emerald-950 tracking-tight leading-none group-hover:translate-x-1 transition-luxury">
                  Ayah <span className="text-gold-700">Finder</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-black uppercase tracking-[0.25em] transition-luxury relative group ${
                      link.isActive ? 'text-emerald-950' : 'text-emerald-950/40 hover:text-emerald-950'
                    }`}
                  >
                    {link.name}
                    <div className={`absolute -bottom-2 left-0 h-0.5 bg-gold-accent transition-all duration-500 ${
                      link.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                ))}
              </div>

              {/* Action Button */}
              {!isApp && (
                <Link 
                  href="/app" 
                  className="bg-emerald-950 text-gold-accent px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-luxury hover:shadow-emerald-950/30 hover:-translate-y-0.5 transition-luxury flex items-center gap-2 group/btn"
                >
                  <Search className="w-3.5 h-3.5" />
                  Launch Workspace
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover/btn:translate-x-1 transition-all" />
                </Link>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-gold-accent shadow-luxury active:scale-90 transition-luxury"
            >
              {isOpen ? <X className="w-6 h-6 animate-fade-in" /> : <Menu className="w-6 h-6 animate-fade-in" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar / Fullscreen Menu */}
      <div 
        className={`fixed inset-0 z-[90] bg-emerald-950 transition-all duration-700 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="h-full flex flex-col p-10 pt-32 gap-12 overflow-y-auto">
          {/* Logo in Menu */}
          <div className="flex flex-col items-start gap-4 mb-10 opacity-30">
            <BookOpen className="w-12 h-12 text-gold-accent" />
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Ayah Finder</h2>
          </div>

          {/* Links for Mobile */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.name}
                href={link.href}
                className={`text-5xl font-black tracking-tighter transition-luxury ${
                  link.isActive ? 'text-gold-accent' : 'text-emerald-100/40'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-10">
            <Link 
              href="/app" 
              className="w-full h-24 bg-gold-accent rounded-[2rem] flex items-center justify-center text-emerald-950 font-black text-2xl tracking-tight gap-3 shadow-luxury shadow-gold-accent/20"
            >
              <Search className="w-8 h-8" />
              Launch Web App
            </Link>

            {/* Footer-like details in Menu */}
            <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-3 text-emerald-100/20 text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  Divine Patterns
                </div>
                <div className="w-1.5 h-1.5 bg-gold-accent rounded-full animate-pulse"></div>
                <div className="text-emerald-100/20 text-xs font-black uppercase tracking-widest">
                  English UI V1.
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
