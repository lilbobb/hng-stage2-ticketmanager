import React, { useState } from 'react';
import { LogOut, Menu, X, Ticket, Home, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface NavigationProps {
  onNavigate?: (page: string) => void;
  showAuth?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, showAuth = false }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate('landing');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    if (onNavigate) onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
  ];

  return (
    <nav className="w-full bg-black shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation('landing')}
          >
            <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
              <Ticket size={18} className="text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Emprex</h1>
          </div>

          {showAuth && user ? (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 mr-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="flex items-center gap-2 px-3 py-2 text-[#EDEDED] hover:bg-[#8B5CF6] rounded-lg transition-all duration-200 text-sm"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                <span className="text-gray-400 text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            onNavigate && (
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => handleNavigation('login')}
                  className="px-4 py-2 text-[#EDEDED] hover:bg-[#8B5CF6] rounded-lg transition text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation('signup')}
                  className="px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#3B82F6] transition text-sm"
                >
                  Sign Up
                </button>
              </div>
            )
          )}

          {(showAuth && user) || onNavigate ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#EDEDED] hover:bg-gray-800 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : null}
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            {showAuth && user ? (
              <div className="space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[#EDEDED] hover:bg-[#8B5CF6] rounded-lg transition text-left"
                  >
                    <item.icon size={20} />
                    <span className="text-base">{item.label}</span>
                  </button>
                ))}

                <div className="px-4 py-3 border-t border-gray-800 mt-3">
                  <p className="text-gray-400 text-sm mb-2">Signed in as</p>
                  <p className="text-[#EDEDED] text-base truncate">{user.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut size={20} />
                  <span className="text-base">Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation('login')}
                  className="w-full flex items-center justify-center px-4 py-3 text-[#EDEDED] hover:bg-[#8B5CF6] rounded-lg transition text-base"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation('signup')}
                  className="w-full flex items-center justify-center px-4 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#3B82F6] transition text-base"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};