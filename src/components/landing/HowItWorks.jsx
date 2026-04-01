import { Search, ListChecks, Layers } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Input Word",
      description: "Enter any Arabic word or sequence to begin your discovery."
    },
    {
      icon: ListChecks,
      title: "Analyze Matches",
      description: "See every identical occurrence with high-fidelity rendering."
    },
    {
      icon: Layers,
      title: "Compare Patterns",
      description: "Identify recurring patterns and clarify similar verse sequences."
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden flex flex-col items-center">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] text-[15rem] font-black uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        Workflow
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-24 space-y-4">
          <div className="text-emerald-950/20 text-xs font-bold uppercase tracking-[0.4em] mb-4">Implementation</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 tracking-tight leading-tight">The Search <span className="text-gold-700">Architecture</span></h2>
          <div className="w-16 h-1.5 bg-gold-accent mx-auto rounded-full translate-y-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Decorative connector line for desktop */}
          <div className="hidden md:block absolute top-[30%] left-0 w-full h-[1px] bg-emerald-950/5 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-8 group transition-luxury hover:-translate-y-2">
              <div className="w-24 h-24 bg-emerald-950 rounded-[2rem] flex items-center justify-center shadow-luxury relative group-hover:rotate-12 transition-luxury">
                <span className="absolute -top-3 -right-3 w-9 h-9 bg-white border border-emerald-950/5 text-emerald-950 rounded-full flex items-center justify-center font-bold text-base shadow-sm">
                  {idx + 1}
                </span>
                <step.icon className="w-10 h-10 text-gold-accent" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-emerald-950 tracking-tight">{step.title}</h3>
                <p className="text-base text-emerald-900/40 leading-relaxed font-medium max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
