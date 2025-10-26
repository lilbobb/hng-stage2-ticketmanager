import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#8B5CF6] text-white hover:bg-[#3B82F6]',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-600 text-white hover:bg-green-700'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};