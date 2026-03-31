import { Search, ListChecks, Layers } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Input Word or Phrase",
      description: "Enter any Arabic word or complex sequence to begin your discovery across the entire Quran."
    },
    {
      icon: ListChecks,
      title: "Analyze Matches",
      description: "See every identical occurrence with high-fidelity Arabic rendering and precise referencing."
    },
    {
      icon: Layers,
      title: "Master Mutashabihat",
      description: "Compare verses side-by-side to identify recurring patterns and clarify similar verse sequences."
    }
  ];

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Decorative Branding Text (Background) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-[20rem] font-black uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        Workflow Discovery
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32 space-y-4">
          <div className="text-emerald-950/20 text-xs font-black uppercase tracking-[0.5em] mb-4">Implementation</div>
          <h2 className="text-5xl md:text-7xl font-black text-emerald-950 tracking-tight">The Search <span className="text-gold-700 underline decoration-gold-accent/10">Architecture</span></h2>
          <div className="w-24 h-2 bg-gold-accent mx-auto rounded-full translate-y-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
          {/* Decorative connector line for desktop */}
          <div className="hidden md:block absolute top-[35%] left-0 w-full h-[1px] bg-emerald-950/5 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-10 group transition-luxury hover:-translate-y-4">
              <div className="w-32 h-32 bg-emerald-950 rounded-[2.5rem] flex items-center justify-center shadow-luxury relative group-hover:rotate-12 transition-luxury">
                <span className="absolute -top-4 -right-4 w-12 h-12 bg-white border border-emerald-950/10 text-emerald-950 rounded-full flex items-center justify-center font-black text-xl shadow-luxury">
                  {idx + 1}
                </span>
                <step.icon className="w-12 h-12 text-gold-accent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-emerald-950 tracking-tight">{step.title}</h3>
                <p className="text-xl text-emerald-900/40 leading-relaxed font-semibold max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
