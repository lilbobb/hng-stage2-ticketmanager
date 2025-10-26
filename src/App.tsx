import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { TicketManagement } from './components/tickets/TicketManagement';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const savedRoute = sessionStorage.getItem('ticketapp_current_route');
    if (savedRoute && user) {
      setCurrentPage(savedRoute);
    }
    setIsInitialized(true);
  }, [user]);

  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('ticketapp_current_route', currentPage);
    }
  }, [currentPage, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    if ((currentPage === 'dashboard' || currentPage === 'tickets') && !user) {
      setCurrentPage('login');
      sessionStorage.removeItem('ticketapp_current_route');
    }
  }, [currentPage, user, isInitialized]);

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
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <AuthPage mode="login" onNavigate={setCurrentPage} />;
      case 'signup':
        return <AuthPage mode="signup" onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'tickets':
        return <TicketManagement onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default App;