import { Users, GraduationCap, BookOpen, Quote, Sparkles } from 'lucide-react';

export default function About() {
  const groups = [
    { icon: Users, title: "Students", desc: "Master Mutashabihat and clear confusion between similar word sequences." },
    { icon: GraduationCap, title: "Teachers", desc: "Locate specific ayat references for your students with precision." },
    { icon: BookOpen, title: "Researchers", desc: "Identify linguistic word patterns across the Holy Quran in seconds." },
    { icon: Sparkles, title: "Seekers", desc: "Deepen your connection with the Book by exploring its divine beauty." }
  ];

  return (
    <section id="about" className="py-40 bg-emerald-950 text-white relative overflow-hidden flex flex-col items-center">
       {/* Background Decoration Scale Down */}
       <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 opacity-[0.02] text-[20rem] font-black uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap -z-0">
          Divine Wisdom
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center mb-24 space-y-6 animate-fade-in list-none">
             <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-emerald-950 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                <Users className="w-3 h-3" />
                Target Seekers
             </div>
             <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Empowering every <br />
                <span className="text-gold-accent">Divine Seeker</span>
             </h2>
             <p className="text-lg md:text-xl text-emerald-100/40 max-w-2xl mx-auto font-medium leading-relaxed">
               Whether you are a researcher or a student, Ayah Finder is built for you with meticulous care.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {groups.map((group, idx) => (
                <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-luxury group relative overflow-hidden backdrop-blur-3xl">
                   <Quote className="absolute -top-8 -right-8 w-32 h-32 text-white/5 transition-luxury" />
                   <div className="w-14 h-14 bg-gold-accent rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-luxury">
                      <group.icon className="w-7 h-7 text-emerald-950" />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{group.title}</h3>
                   <p className="text-base text-emerald-100/40 leading-relaxed font-medium group-hover:text-emerald-100/60">{group.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}
