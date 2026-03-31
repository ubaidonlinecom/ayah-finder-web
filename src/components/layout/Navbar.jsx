import Link from 'next/link';
import { Search, BookOpen, Bookmark } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <span className="text-gold-accent font-bold text-xl">A</span>
            </div>
            <Link href="/" className="text-2xl font-bold text-emerald-950 tracking-tight">
              Ayah<span className="text-gold-700">Finder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-emerald-900/70 hover:text-emerald-950 font-medium transition-colors">
              Features
            </Link>
            <Link href="/#about" className="text-emerald-900/70 hover:text-emerald-950 font-medium transition-colors">
              Who it helps
            </Link>
            <Link href="/app" className="bg-emerald-900 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-800 transition-all shadow-md hover:shadow-xl flex items-center gap-2">
              <Search className="w-4 h-4" />
              Open App
            </Link>
          </div>

          <div className="md:hidden">
            <Link href="/app" className="p-2 text-emerald-900">
              <Search className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
