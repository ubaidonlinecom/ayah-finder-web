import { Search, Shield, Zap, Layout, Share2, Bookmark } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/80 p-8 rounded-3xl border border-emerald-900/5 hover:border-gold-300 transition-all hover:shadow-2xl hover:-translate-y-2 group shadow-lg">
    <div className="w-14 h-14 bg-emerald-950 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-950/20 group-hover:bg-gold-accent transition-colors">
      <Icon className="w-7 h-7 text-gold-accent group-hover:text-emerald-950" />
    </div>
    <h3 className="text-2xl font-bold text-emerald-950 mb-4">{title}</h3>
    <p className="text-emerald-900/70 leading-relaxed font-medium">{description}</p>
  </div>
);

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Instant Arabic Search",
      description: "Search Quran by Arabic words instantly. Normalizes text automatically for accurate results every time."
    },
    {
      icon: Layout,
      title: "Mutashabihat Helper",
      description: "Perfect for Hifz students to find similar ayat and patterns that often create confusion during memorization."
    },
    {
      icon: Bookmark,
      title: "Save Your Discoveries",
      description: "Quickly save important ayat to your collections for future reference or study sessions."
    },
    {
      icon: Shield,
      title: "Harakat Preservation",
      description: "Displays the original Arabic text with all harakat and marks while highlighting the matched keyword."
    },
    {
      icon: Zap,
      title: "Blazing Fast Performance",
      description: "Built for speed. Search through the entire Quran and see results instantly on any device."
    },
    {
      icon: Share2,
      title: "Copy & Export",
      description: "Easily copy ayat in beautiful Arabic script with one click to share with students or use in research."
    }
  ];

  return (
    <section id="features" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-emerald-950 mb-6">Built for Quran Excellence</h2>
          <p className="text-xl text-emerald-900/60 max-w-2xl mx-auto font-medium">
            Everything you need for advanced Quranic search and study in a premium SaaS package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
