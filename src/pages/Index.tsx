import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import { SeoHead } from '../components/SeoHead';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <SeoHead
        title="TechMasterAI - Master Code. Win Competitions."
        description="The premier platform where developers showcase their skills, compete in real-world challenges, and unlock career opportunities. Practice DSA, 1v1 duels, Type Forge, and more."
        path="/"
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
