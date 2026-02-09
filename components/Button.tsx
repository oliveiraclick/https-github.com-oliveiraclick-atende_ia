
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'white' | 'ghost';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = "px-10 py-5 font-bold text-[11px] tech-mono uppercase tracking-[0.2em] transition-all duration-300 inline-block text-center rounded-full border-none cursor-pointer active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    dark: "bg-slate-950 text-white hover:bg-slate-900",
    white: "bg-white text-slate-950 hover:bg-slate-50 shadow-2xl shadow-black/10",
    ghost: "bg-transparent text-slate-600 hover:text-slate-900 px-4"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
