import { useState } from 'react';

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showSuccess = (message: string) => {
    setToast({ message, type: 'success' });
  };

  const showError = (message: string) => {
    setToast({ message, type: 'error' });
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showSuccess,
    showError,
    hideToast
  };
};