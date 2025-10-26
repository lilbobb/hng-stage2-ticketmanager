import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  showAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onNavigate, 
  showAuth = false 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation onNavigate={onNavigate} showAuth={showAuth} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};