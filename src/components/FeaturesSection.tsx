import { Code2, BookOpen, Trophy, Keyboard } from 'lucide-react';
import { memo } from 'react';

const FeaturesSection = memo(() => {
  const features = [
    {
      id: '01',
      title: 'Practice DSA',
      description: 'Train your problem-solving instincts with 5,000+ high-quality DSA questions. From fundamentals to interview-grade challenges, sharpen your thinking one problem at a time.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      id: '02',
      title: 'Type Forge',
      description: 'Build typing speed and accuracy with code-focused drills — practice that transfers to real development work.',
      icon: <Keyboard className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      id: '03',
      title: 'CTF & Security',
      description: 'Solve capture-the-flag challenges and learn security thinking through hands-on puzzles.',
      icon: <Code2 className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      id: '04',
      title: 'Leaderboards & Rewards',
      description: 'Every line of code leaves a mark. Climb the leaderboard, earn your rank, and turn consistency into recognition.',
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
  ];

  return (
    <section className="features-section relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 cyber-grid" style={{ zIndex: 1 }} />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 theme-text-primary">
            What you can do
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Practice, compete, and grow — without the noise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card rounded-2xl border border-border bg-card/50 p-6 sm:p-8 transition-colors hover:bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-foreground">{feature.icon}</div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{feature.id}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 theme-text-primary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
