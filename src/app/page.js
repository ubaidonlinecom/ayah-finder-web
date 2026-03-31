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

        {/* CTA section */}
        <section className="py-48 px-4 bg-cream-100 text-center relative overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-200/20 blur-[150px] rounded-full"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/10 blur-[150px] rounded-full"></div>

           <div className="max-w-5xl mx-auto space-y-12 relative z-10 animate-fade-in">
              <h2 className="text-6xl md:text-8xl font-extrabold text-emerald-950 leading-[1.1] tracking-tight">
                Ready to elevate your <br />
                <span className="text-gold-700">Quranic journey?</span>
              </h2>
              <p className="text-2xl text-emerald-900/60 font-medium max-w-2xl mx-auto">
                Free, fast, and remarkably powerful. Experience the next generation of Quranic search today.
              </p>
              <div className="pt-12">
                 <Link href="/app" className="inline-flex items-center gap-4 bg-emerald-950 text-gold-accent px-16 py-8 rounded-[3rem] font-extrabold text-2xl hover:bg-emerald-900 transition-all shadow-3xl hover:shadow-emerald-900/50 scale-110 hover:scale-[1.15] duration-500">
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
