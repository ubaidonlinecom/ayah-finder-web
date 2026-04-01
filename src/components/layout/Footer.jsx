import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                {/* Brand Section */}
                <div className="md:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-accent rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-emerald-950 font-black text-2xl">A</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Ayah<span className="text-gold-accent opacity-80 backdrop-blur-sm">Finder</span>
                        </h2>
                    </div>
                    <p className="text-emerald-100/30 text-xs font-semibold leading-relaxed max-w-sm">
                        The premium Quranic search utility designed for the modern Hifz student, researcher, and avid Quran learner. Find matching patterns across the entire Holy Quran in seconds.
                    </p>
                </div>

                {/* Connect Section */}
                <div className="md:col-span-3 space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-accent/40">Connect</h3>
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-emerald-100/40 hover:text-white transition-all font-bold text-[11px] uppercase tracking-widest">Landing Page</Link>
                        <Link href="/app" className="text-emerald-100/40 hover:text-white transition-all font-bold text-[11px] uppercase tracking-widest">Search App</Link>
                        <Link href="/#features" className="text-emerald-100/40 hover:text-white transition-all font-bold text-[11px] uppercase tracking-widest">Features</Link>
                    </div>
                </div>

                {/* About Section */}
                <div className="md:col-span-4 space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-accent/40">About</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-emerald-100/40 hover:text-white transition-all group cursor-pointer">
                            <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white transition-all"></div>
                            <span className="font-bold text-[11px] uppercase tracking-widest">Chrome Extension</span>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-100/40 hover:text-white transition-all group cursor-pointer">
                            <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white transition-all"></div>
                            <span className="font-bold text-[11px] uppercase tracking-widest">Support the Project</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Credits (Matched to Image) */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
                <p className="text-[10px] font-bold tracking-widest uppercase">
                    © {new Date().getFullYear()} Ayah Finder. All rights reserved. Designed for excellence.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <span>Made with ❤️ for the Ummah</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
