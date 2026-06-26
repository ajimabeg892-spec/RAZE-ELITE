import React from 'react';
import razeLogo from '../assets/images/raze_logo_1782462393500.jpg';

interface LogoProps {
  className?: string;
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', glow = true, size = 'md' }: LogoProps) {
  // Dimensions based on size
  const dimensions = {
    sm: 'h-8 w-8',
    md: 'h-14 w-14',
    lg: 'h-32 w-32',
    xl: 'h-56 w-56',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <img
        src={razeLogo}
        alt="Raze Elite Logo"
        referrerPolicy="no-referrer"
        className={`${dimensions} aspect-square object-cover rounded-xl transition-all duration-300 border border-brand-red/30`}
        style={{
          filter: glow ? 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.6))' : 'none',
        }}
      />
    </div>
  );
}
