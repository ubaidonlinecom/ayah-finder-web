import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import About from '@/components/landing/About';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <HowItWorks />
        
        <Features />

        <About />

        {/* CTA section scaled down */}
        <section className="py-40 px-4 bg-cream-100 text-center relative overflow-hidden flex flex-col items-center">
           {/* Decorative elements */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-gold-200/10 blur-[120px] rounded-full"></div>
           <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/5 blur-[120px] rounded-full"></div>

           <div className="max-w-4xl mx-auto space-y-10 relative z-10 animate-fade-in flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-emerald-950 leading-tight tracking-tight">
                Ready to elevate your <br />
                <span className="text-gold-700">Quranic journey?</span>
              </h2>
              <p className="text-xl md:text-2xl text-emerald-900/60 font-medium max-w-xl mx-auto leading-relaxed">
                Free, fast, and remarkably powerful. Experience the next generation of Quranic search today.
              </p>
              <div className="pt-8">
                 <Link href="/app" className="inline-flex items-center gap-3 bg-emerald-950 text-gold-accent px-10 py-5 rounded-[2.5rem] font-extrabold text-xl hover:bg-emerald-900 transition-all shadow-xl hover:shadow-emerald-900/40 active:scale-95 duration-300">
                    Launch Ayah Finder Web
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
