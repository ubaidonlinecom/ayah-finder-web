import Link from 'next/link';
import { Search, Heart, GitHub, Monitor } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-24 border-t border-gold-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold-accent rounded-xl flex items-center justify-center">
                 <span className="text-emerald-950 font-extrabold text-2xl">A</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Ayah<span className="text-gold-accent">Finder</span>
              </h2>
            </div>
            <p className="text-emerald-100/60 max-w-sm mb-8 leading-relaxed font-medium">
              The premium Quranic search utility designed for the modern Hifz student, researcher, and avid Quran learner. Find matching patterns across the entire Holy Quran in seconds.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-gold-accent transition-colors font-medium">Landing Page</Link></li>
              <li><Link href="/app" className="hover:text-gold-accent transition-colors font-medium">Search App</Link></li>
              <li><Link href="#features" className="hover:text-gold-accent transition-colors font-medium">Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">About</h4>
            <ul className="space-y-4">
               <li className="flex items-center gap-2 group cursor-pointer">
                  <Monitor className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Chrome Extension</span>
               </li>
               <li className="flex items-center gap-2 group cursor-pointer">
                  <Heart className="w-4 h-4 text-gold-accent group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Support the Project</span>
               </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-emerald-100/40 text-sm font-medium">
            © {new Date().getFullYear()} Ayah Finder. All rights reserved. Designed for excellence.
          </p>
          <div className="flex items-center gap-3 text-sm text-emerald-100/40">
             <span>Made with</span>
             <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
             <span>for the Ummah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
