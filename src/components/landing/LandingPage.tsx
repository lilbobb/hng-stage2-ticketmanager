import { Navigation } from '../layout/Navigation';
import { Footer } from '../layout/Footer';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeatureSection';
import { useAuth } from '../../hooks/useAuth';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#EDEDED]">
      <Navigation onNavigate={onNavigate} showAuth={!!user} />
      <main className="grow">
        <HeroSection onNavigate={onNavigate} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};