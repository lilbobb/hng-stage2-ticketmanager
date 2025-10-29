import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { TicketManagement } from './components/tickets/TicketManagement';

interface NavigationProps {
  showForm?: boolean;
}

interface NavigationState {
  page: string;
  props?: NavigationProps;
}

const App: React.FC = () => {
  const [navigationState, setNavigationState] = useState<NavigationState>({ page: 'landing' });
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  console.log('🚀 App component - User:', user);
  console.log('📍 Current page:', navigationState.page);

  const handleNavigate = (page: string, props: NavigationProps = {}) => {
    console.log('🔄 Navigating to:', page, 'User exists:', !!user);
    setNavigationState({ page, props });
  };

  useEffect(() => {
    console.log('🎯 App useEffect - Checking saved route');
    const savedRoute = sessionStorage.getItem('ticketapp_current_route');
    console.log('💾 Saved route:', savedRoute);
    if (savedRoute && user) {
      setNavigationState({ page: savedRoute });
    }
    setIsInitialized(true);
  }, [user]);

  useEffect(() => {
    if (isInitialized) {
      console.log('💾 Saving route to sessionStorage:', navigationState.page);
      sessionStorage.setItem('ticketapp_current_route', navigationState.page);
    }
  }, [navigationState.page, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const protectedRoutes = ['dashboard', 'tickets'];
    const currentRoute = navigationState.page;

    console.log('🔒 Route protection check - Page:', currentRoute, 'User:', user);

    if (protectedRoutes.includes(currentRoute) && !user) {
      console.log('🚫 Redirecting to login - protected route without user');
      setNavigationState({ page: 'login' });
      sessionStorage.removeItem('ticketapp_current_route');
    }

    if (user && (currentRoute === 'login' || currentRoute === 'signup')) {
      console.log('✅ User logged in, redirecting from auth to dashboard');
      setNavigationState({ page: 'dashboard' });
    }
  }, [navigationState.page, user, isInitialized]);

  if (!isInitialized) {
    console.log('⏳ App showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('🎨 Rendering page:', navigationState.page);

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