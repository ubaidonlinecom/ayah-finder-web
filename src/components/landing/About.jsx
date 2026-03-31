import { Users, GraduationCap, BookOpen, Quote, Sparkles } from 'lucide-react';

export default function About() {
  const groups = [
    { icon: Users, title: "Students of Hifz", desc: "Instantly master Mutashabihat and clear confusion between similar word sequences." },
    { icon: GraduationCap, title: "Teachers", desc: "Locate specific ayat references for your students with effortless precision." },
    { icon: BookOpen, title: "Researchers", desc: "Identify linguistic word patterns across the entire Holy Quran in seconds." },
    { icon: Sparkles, title: "Seekers", desc: "Deepen your connection with the Book by exploring its divine word-wide beauty." }
  ];

  return (
    <section id="about" className="py-48 bg-emerald-950 text-white relative overflow-hidden">
       {/* High-end Decorative Branding */}
       <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 opacity-[0.03] text-[35rem] font-black uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap -z-0">
          Divine Wisdom
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32 space-y-8 animate-fade-in list-none">
             <div className="inline-flex items-center gap-3 px-6 py-2 bg-white text-emerald-950 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-luxury">
                <Users className="w-3.5 h-3.5" />
                Target Seekers
             </div>
             <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-tight">
                Empowering every <br />
                <span className="text-gold-accent underline decoration-gold-accent/20 decoration-8 underline-offset-8">Divine Seeker</span>
             </h2>
             <p className="text-2xl text-emerald-100/40 max-w-4xl mx-auto font-semibold leading-relaxed">
               Whether you are a specialized researcher or a dedicated learner, 
               Ayah Finder is built for you with meticulous care.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {groups.map((group, idx) => (
                <div key={idx} className="p-12 rounded-[5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-accent/40 transition-luxury group relative overflow-hidden backdrop-blur-3xl">
                   <Quote className="absolute -top-12 -right-12 w-48 h-48 text-white/5 group-hover:scale-110 transition-luxury" />
                   <div className="w-20 h-20 bg-gold-accent rounded-[2.5rem] flex items-center justify-center mb-10 shadow-luxury group-hover:rotate-12 transition-luxury">
                      <group.icon className="w-10 h-10 text-emerald-950" />
                   </div>
                   <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{group.title}</h3>
                   <p className="text-xl text-emerald-100/40 leading-relaxed font-semibold transition-luxury group-hover:text-emerald-100/60 leading-[1.6]">{group.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}
