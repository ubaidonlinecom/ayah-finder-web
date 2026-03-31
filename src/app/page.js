import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Footer from '@/components/layout/Footer';
import { Search, Brain, Users, Sparkles, BookOpen, Quote, Heart } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Problem/Solution Section */}
        <section className="py-32 px-4 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-700 rounded-full text-sm font-bold border border-red-100">
                  <Brain className="w-4 h-4" />
                  The Problem: Mutashabihat
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-950 leading-tight">
                  Confusion Ends where <span className="text-gold-700">Precision Begins</span>
                </h2>
                <div className="space-y-6 text-emerald-900/70 text-lg leading-relaxed font-medium">
                  <p>
                    For Huffaz (Quran memorizers) and students, similar ayat and word patterns often create heavy confusion. A single missing word or a slight variation in the same phrase from different Surahs can disrupt a smooth recitation.
                  </p>
                  <p>
                    Ayah Finder solves this by providing a dedicated, lightning-fast Arabic search tool. Enter any sequence of words and see every occurrence across the entire Quran instantly, with high-precision matching.
                  </p>
                </div>
                <div className="pt-8">
                   <Link href="/app" className="inline-flex items-center gap-3 bg-emerald-950 text-gold-accent px-10 py-5 rounded-3xl font-bold hover:bg-emerald-900 transition-all shadow-2xl hover:shadow-emerald-900/40 transform hover:-translate-y-1">
                      <Search className="w-5 h-5" />
                      Try the Search App
                   </Link>
                </div>
             </div>
             
             <div className="relative order-1 lg:order-2">
                <div className="absolute -inset-10 bg-gold-200/20 blur-3xl rounded-full"></div>
                <div className="relative bg-emerald-950 p-1 rounded-[40px] shadow-3xl overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                   <div className="p-8 space-y-6">
                      <div className="flex gap-4 items-center mb-6">
                         <div className="w-3 h-3 rounded-full bg-red-400"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                         <div className="w-3 h-3 rounded-full bg-green-400"></div>
                         <div className="ml-auto text-white/30 text-xs font-bold font-mono">/search-v1.0</div>
                      </div>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4 bg-white/5 py-4 px-6 rounded-2xl border border-white/10">
                            <div className="text-gold-accent font-bold">Search:</div>
                            <div className="text-white font-arabic text-xl">الحمد لله</div>
                         </div>
                         <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2 opacity-60">
                            <div className="text-gold-accent text-xs">Result 1</div>
                            <div className="text-white font-arabic h-4 w-full bg-white/10 rounded"></div>
                            <div className="text-white font-arabic h-4 w-3/4 bg-white/10 rounded"></div>
                         </div>
                         <div className="p-6 bg-white rounded-2xl border border-white/10 space-y-3 shadow-2xl transform scale-105">
                            <div className="flex justify-between items-center mb-2">
                               <div className="text-emerald-950 font-bold text-xs uppercase opacity-40">Result 2</div>
                               <div className="text-emerald-950 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded uppercase">Surah 1:2</div>
                            </div>
                            <div className="text-emerald-950 font-arabic text-2xl text-right leading-relaxed">
                               <span className="bg-gold-200 py-1 px-1 rounded-lg">الْحَمْدُ لِلَّهِ</span> رَبِّ الْعَالَمِينَ
                            </div>
                         </div>
                         <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2 opacity-60">
                            <div className="text-gold-accent text-xs">Result 3</div>
                            <div className="text-white font-arabic h-4 w-2/3 bg-white/10 rounded"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <Features />

        {/* Who it helps section */}
        <section id="about" className="py-32 bg-emerald-950 text-white relative">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-accent/5 blur-3xl rounded-full translate-x-1/2"></div>
           <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-24">
                 <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Empowering seekers of <span className="text-gold-accent">Divine Wisdom</span></h2>
                 <p className="text-xl text-emerald-100/60 max-w-3xl mx-auto font-medium">
                   Whether you are a teacher, a researcher, or a dedicated student, Ayah Finder was built for you with meticulous care and technical excellence.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                 {[
                    { icon: Users, title: "Students of Hifz", desc: "Master Mutashabihat and clear confusion between similar verses." },
                    { icon: Sparkles, title: "Teachers", desc: "Instantly find ayat references for your students during lesson planning." },
                    { icon: BookOpen, title: "Researchers", desc: "Quickly locate specific word patterns for linguistic or thematic studies." },
                    { icon: Heart, title: "Quran Enthusiasts", desc: "Deepen your connection with the Book by exploring its word-wide beauty." }
                 ].map((item, idx) => (
                    <div key={idx} className="p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-accent/40 transition-all group overflow-hidden relative">
                       <Quote className="absolute -top-6 -right-6 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
                       <div className="w-16 h-16 bg-gold-accent rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-gold-accent/10">
                          <item.icon className="w-8 h-8 text-emerald-950" />
                       </div>
                       <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                       <p className="text-emerald-100/50 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA section */}
        <section className="py-32 px-4 bg-cream-100 text-center relative overflow-hidden">
           <div className="max-w-4xl mx-auto space-y-10 relative z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold text-emerald-950 leading-tight">Ready to elevate your Quranic journey?</h2>
              <p className="text-xl text-emerald-900/60 font-medium">Free, fast, and remarkably powerful. Experience it now.</p>
              <div className="pt-6">
                 <Link href="/app" className="inline-flex items-center gap-4 bg-emerald-950 text-gold-accent px-12 py-6 rounded-[2rem] font-extrabold text-xl hover:bg-emerald-900 transition-all shadow-3xl hover:shadow-emerald-900/50 scale-110 hover:scale-125 duration-500">
                    <Search className="w-6 h-6" />
                    Launch Ayah Finder App
                 </Link>
              </div>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold-200/20 blur-3xl rounded-full"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/10 blur-3xl rounded-full"></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
