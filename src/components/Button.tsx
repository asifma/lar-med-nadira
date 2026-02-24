
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeType } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  style,
  ...props 
}) => {
  const { theme } = useTheme();

  const baseStyles = "inline-flex items-center justify-center font-black transition-all duration-200 active:translate-y-1 active:shadow-none disabled:opacity-50 cursor-pointer";
  
  const themeStyles = theme === ThemeType.UNICORN 
    ? "" 
    : "tracking-wider";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-10 py-5 text-2xl",
    xl: "px-16 py-8 text-4xl"
  };

  const variantStyles = {
    primary: "text-white hover:brightness-110 hover:translate-y-[-3px]",
    secondary: "bg-[var(--secondary-color)] text-[var(--text-color)] hover:brightness-95",
    accent: "bg-[var(--accent-color)] text-[var(--text-color)] hover:brightness-110"
  };

  const buttonStyle: React.CSSProperties = variant === 'primary' 
    ? {
        background: 'var(--primary-gradient, var(--primary-color))',
        borderRadius: 'var(--btn-radius)',
        boxShadow: 'var(--btn-shadow)',
        ...style
      }
    : { 
        borderRadius: 'var(--btn-radius)',
        ...style 
      };

  return (
    <button 
      className={`${baseStyles} ${themeStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
