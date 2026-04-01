import { Search, Shield, Zap, Layout, Layers } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 p-10 rounded-[3rem] border border-emerald-950/5 hover:border-gold-accent/40 transition-luxury hover:shadow-luxury hover:-translate-y-2 group relative overflow-hidden backdrop-blur-xl">
    <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center mb-6 shadow-luxury group-hover:bg-gold-accent transition-luxury group-hover:rotate-12">
      <Icon className="w-6 h-6 text-gold-accent group-hover:text-emerald-950 transition-luxury" />
    </div>
    <h3 className="text-xl font-bold text-emerald-950 mb-3 tracking-tight">{title}</h3>
    <p className="text-base text-emerald-900/40 leading-relaxed font-medium transition-luxury group-hover:text-emerald-900/60">{description}</p>
  </div>
);

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Fast Search",
      description: "Search 6,236 verses instantly with blazing fast result simulation."
    },
    {
      icon: Shield,
      title: "Arabic Friendly",
      description: "Optimized for the Arabic script with full Harakat preservation."
    },
    {
      icon: Layers,
      title: "Pattern Detection",
      description: "Identify global patterns and similar sequences across Surahs."
    },
    {
      icon: Layout,
      title: "Clean Interface",
      description: "A premium workspace designed for deep focus on Quranic text."
    }
  ];

  return (
    <section id="features" className="py-32 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <div className="text-emerald-950/20 text-xs font-bold uppercase tracking-[0.4em] mb-4">Functional Suite</div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 tracking-tight leading-tight">Standard of <span className="text-gold-700">Excellence</span></h2>
          <p className="text-lg md:text-xl text-emerald-900/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need for advanced Quranic search in a high-fidelity workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
