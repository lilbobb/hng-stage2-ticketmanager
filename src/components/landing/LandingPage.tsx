import { Navigation } from '../layout/Navigation';
import { Footer } from '../layout/Footer';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeatureSection';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-[#EDEDED]">
      <Navigation onNavigate={onNavigate} />
      <main className="flex-grow">
        <HeroSection onNavigate={onNavigate} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};