import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-50 flex items-start sm:items-center gap-2 p-3 sm:p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white max-w-[90vw] sm:max-w-md animate-slide-in mx-4 sm:mx-0 ${
        'top-4 left-1/2 transform -translate-x-1/2 sm:left-auto sm:transform-none sm:top-4 sm:right-4'
      }`}
    >
      <div className="shrink-0 mt-0.5 sm:mt-0">
        {type === 'success' ? (
          <CheckCircle size={20} className="sm:w-5 sm:h-5" />
        ) : (
          <AlertCircle size={20} className="sm:w-5 sm:h-5" />
        )}
      </div>

      <span className="flex-1 text-sm sm:text-base pr-2">{message}</span>

      <button 
        onClick={onClose} 
        className="shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Close notification"
      >
        <X size={16} className="sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};