import Link from 'next/link';
import { Heart, Monitor, BookOpen, Quote } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-32 border-t border-white/5 relative overflow-hidden">
        {/* Subtle Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-accent opacity-5 blur-[150px] -z-0"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-20 mb-20 w-full animate-fade-in list-none">
                <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-gold-accent rounded-[2rem] flex items-center justify-center shadow-luxury group-hover:scale-110 transition-luxury">
                        <span className="text-emerald-950 font-black text-3xl">A</span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-white tracking-[0.05em] leading-none mb-1">
                            Ayah <span className="text-gold-accent opacity-80 backdrop-blur-sm">Finder</span>
                        </h2>
                        <p className="text-emerald-100/30 text-xs font-black uppercase tracking-[0.5em] leading-none">The Quran Search Standard</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-14">
                    <Link href="/" className="text-emerald-100/40 hover:text-white transition-luxury font-black text-sm uppercase tracking-[0.3em]">Home</Link>
                    <Link href="/app" className="text-emerald-100/40 hover:text-white transition-luxury font-black text-sm uppercase tracking-[0.3em]">App</Link>
                    <Link href="/#features" className="text-emerald-100/40 hover:text-white transition-luxury font-black text-sm uppercase tracking-[0.3em]">Features</Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/5 rounded-[1.5rem] border border-white/10 flex items-center justify-center group cursor-pointer hover:border-gold-accent/40 transition-luxury">
                        <Monitor className="w-6 h-6 text-gold-accent opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-luxury" />
                    </div>
                    <div className="w-14 h-14 bg-white/5 rounded-[1.5rem] border border-white/10 flex items-center justify-center group cursor-pointer hover:border-gold-accent/40 transition-luxury">
                        <Heart className="w-6 h-6 text-red-400 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-luxury" />
                    </div>
                </div>
            </div>

            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 w-full animate-fade-in list-none">
                <p className="text-emerald-100/20 text-xs font-black tracking-[0.5em] uppercase text-center md:text-left transition-luxury hover:text-emerald-100/40">
                    © {new Date().getFullYear()} Ayah Finder Workspace. Designed for Quranic Excellence.
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-emerald-100/20 font-black uppercase tracking-[0.3em] transition-luxury hover:text-emerald-100/40">
                    <span>Precision Matching</span>
                    <div className="w-1.5 h-1.5 bg-gold-accent opacity-20 rounded-full"></div>
                    <span>Global Recognition</span>
                    <div className="w-1.5 h-1.5 bg-gold-accent opacity-20 rounded-full"></div>
                    <span>English UI V1.0</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
