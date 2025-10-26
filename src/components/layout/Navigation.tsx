import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavigationProps {
  onNavigate?: (page: string) => void;
  showAuth?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, showAuth = false }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate('landing');
  };

  return (
    <nav className="w-full bg-black shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#EDEDED]" onClick={() => onNavigate?.('landing')}>Emprex</h1>
        
        {showAuth && user ? (
          <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 text-[#EDEDED] hover:bg-[#3B82F6] rounded-lg transition"
              >
                Dashboard
              </button>
            )}
            <span className="text-gray-600 hidden sm:inline">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-[#EDEDED] rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          onNavigate && (
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-[#EDEDED] hover:bg-[#3B82F6] rounded-lg transition"
            >
              Login
            </button>
          )
        )}
      </div>
    </nav>
  );
};