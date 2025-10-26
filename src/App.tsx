import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { TicketManagement } from './components/tickets/TicketManagement';

interface NavigationState {
  page: string;
  props?: any;
}

const App: React.FC = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({ page: 'landing' });
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  // Update to handle both page and props
  const handleNavigate = (page: string, props: any = {}) => {
    setNavigationState({ page, props });
  };

  useEffect(() => {
    const savedRoute = sessionStorage.getItem('ticketapp_current_route');
    if (savedRoute && user) {
      setNavigationState({ page: savedRoute });
    }
    setIsInitialized(true);
  }, [user]);

  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('ticketapp_current_route', navigationState.page);
    }
  }, [navigationState.page, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    if ((navigationState.page === 'dashboard' || navigationState.page === 'tickets') && !user) {
      setNavigationState({ page: 'login' });
      sessionStorage.removeItem('ticketapp_current_route');
    }
  }, [navigationState.page, user, isInitialized]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (navigationState.page) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <AuthPage mode="login" onNavigate={handleNavigate} />;
      case 'signup':
        return <AuthPage mode="signup" onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'tickets':
        return <TicketManagement 
          onNavigate={handleNavigate} 
          initialShowForm={navigationState.props?.showForm || false} 
        />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return renderPage();
};

export default App;