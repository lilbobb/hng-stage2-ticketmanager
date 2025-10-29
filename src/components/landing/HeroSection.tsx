import React from 'react';
import { WaveBackground } from './WaveBackground';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-[#0B0B12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Manage Your Tickets Effortlessly
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-[#9CA3AF] max-w-2xl sm:max-w-3xl mx-auto px-2">
            Streamline your workflow with our powerful ticket management system. Track, organize, and resolve issues faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              onClick={() => onNavigate('signup')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Button>

            <Button
              onClick={() => onNavigate('login')}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/50 text-white hover:border-white transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-indigo-400 rounded-full opacity-20 blur-xl"></div>

      <WaveBackground />
    </div>
  );
};