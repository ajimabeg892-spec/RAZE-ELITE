import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', glow = true, size = 'md' }: LogoProps) {
  // Dimensions based on size
  const dimensions = {
    sm: 'h-8 w-auto',
    md: 'h-14 w-auto',
    lg: 'h-32 w-auto',
    xl: 'h-56 w-auto',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        className={`${dimensions} transition-all duration-300`}
        viewBox="0 0 400 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: glow ? 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.45))' : 'none',
        }}
      >
        <defs>
          {/* Neon Red Glow Filter */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Linear Gradients */}
          <linearGradient id="white-grad" x1="50" y1="50" x2="250" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#ECECEC" />
            <stop offset="100%" stopColor="#A8A8A8" />
          </linearGradient>

          <linearGradient id="red-grad" x1="180" y1="50" x2="380" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF3333" />
            <stop offset="40%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>
        </defs>

        {/* Backgroud subtle red/black mesh (Only visible when large) */}
        {size === 'xl' && (
          <path
            d="M 200,20 L 380,110 L 380,240 L 200,330 L 20,240 L 20,110 Z"
            fill="none"
            stroke="rgba(255, 0, 0, 0.1)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {/* STYLIZED WHITE 'R' PATH */}
        {/* Aggressive angles, sharp points, cutouts */}
        <path
          d="M 180 35 L 75 35 L 140 135 L 85 135 L 70 235 L 125 155 L 175 155 L 210 245 L 235 245 L 180 135 L 215 135 Z M 165 75 L 185 110 L 135 110 Z"
          fill="url(#white-grad)"
          className="transition-all duration-500"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="bevel"
        />

        {/* Sharp bottom-left wing of R */}
        <path
          d="M 68 245 L 50 215 L 80 175 Z"
          fill="#FFFFFF"
        />

        {/* STYLIZED RED 'E' PATH */}
        {/* Slanted, three aggressive horizontal bars */}
        <path
          d="M 175 115 L 290 115 L 290 145 L 200 145 L 190 175 L 275 175 L 275 205 L 180 205 L 170 235 L 305 235 L 305 265 L 150 265 L 175 115 Z"
          fill="url(#red-grad)"
          className="transition-all duration-500"
          stroke="#FF0000"
          strokeWidth="1"
          strokeLinejoin="bevel"
          filter="url(#red-glow-subtle)"
        />

        {/* Sharp accents */}
        {/* Top bar accent of E */}
        <path
          d="M 290 115 L 325 115 L 285 145 Z"
          fill="#FF3333"
        />
        
        {/* Middle bar accent of E */}
        <path
          d="M 275 175 L 300 175 L 270 205 Z"
          fill="#FF0000"
        />

        {/* Bottom bar accent of E */}
        <path
          d="M 305 235 L 340 235 L 300 265 Z"
          fill="#990000"
        />

        {/* Visual geometric cuts to highlight futuristic esports look */}
        <path d="M 40 100 L 15 120 L 30 140 Z" fill="rgba(255, 0, 0, 0.4)" />
        <path d="M 350 210 L 375 190 L 360 170 Z" fill="rgba(255, 255, 255, 0.3)" />

      </svg>
    </div>
  );
}
