import { Search, Shield, Zap, Layout, Share2, Bookmark, Layers, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 p-12 rounded-[4rem] border border-emerald-950/5 hover:border-gold-accent/40 transition-luxury hover:shadow-luxury hover:-translate-y-4 group relative overflow-hidden backdrop-blur-xl">
    {/* Floating Decorative Glow */}
    <div className="absolute -top-16 -right-16 w-32 h-32 bg-gold-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-luxury"></div>
    
    <div className="w-16 h-16 bg-emerald-950 rounded-3xl flex items-center justify-center mb-8 shadow-luxury group-hover:bg-gold-accent transition-luxury group-hover:rotate-12">
      <Icon className="w-8 h-8 text-gold-accent group-hover:text-emerald-950 transition-luxury" />
    </div>
    <h3 className="text-3xl font-black text-emerald-950 mb-4 tracking-tight">{title}</h3>
    <p className="text-xl text-emerald-900/40 leading-relaxed font-semibold transition-luxury group-hover:text-emerald-900/60">{description}</p>
  </div>
);

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Fast Search",
      description: "Search 6,236 verses instantly. Blazing fast results for even the most complex word sequences."
    },
    {
      icon: Shield,
      title: "Arabic Friendly",
      description: "Optimized for the Arabic script with full Harakat preservation and linguistic normalization."
    },
    {
      icon: Layers,
      title: "Pattern Detection",
      description: "Identify global Mutashabihat and clarify similar sequences with exact side-by-side matches."
    },
    {
      icon: Layout,
      title: "Clean Interface",
      description: "A premium workspace designed for deep focus. No distractions, just the Quranic text."
    }
  ];

  return (
    <section id="features" className="py-40 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24 space-y-4">
          <div className="text-emerald-950/20 text-xs font-black uppercase tracking-[0.5em] mb-4">Functional Suite</div>
          <h2 className="text-5xl md:text-7xl font-black text-emerald-950 tracking-tight">Standard of <span className="text-gold-700">Excellence</span></h2>
          <p className="text-2xl text-emerald-900/40 max-w-3xl mx-auto font-semibold leading-relaxed">
            Everything you need for advanced Quranic search in a high-fidelity workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
