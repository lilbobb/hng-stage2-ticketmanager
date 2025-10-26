import React from 'react';
import { WaveBackground } from './WaveBackground';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-[#0B0B12] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Manage Your Tickets Effortlessly
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-[#9CA3AF] max-w-3xl mx-auto">
            Streamline your workflow with our powerful ticket management system. Track, organize, and resolve issues faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-[#8B5CF6] text-[#EDEDED] rounded-lg font-semibold text-lg hover:bg-[#3B82F6] transition shadow-lg cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="px-8 py-4 bg-[#8B5CF6] text-[#EDEDED] rounded-lg font-semibold text-lg hover:bg-[#3B82F6] transition border-2 border-white cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-indigo-400 rounded-full opacity-20 blur-xl"></div>

      <WaveBackground />
    </div>
  );
};