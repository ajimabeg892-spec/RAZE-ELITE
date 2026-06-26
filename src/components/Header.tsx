import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Shield, Settings, Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'OPERATIONS' },
    { id: 'about', label: 'THE SQUAD' },
    { id: 'roster', label: 'PILOTS' },
    { id: 'matches', label: 'COMBAT GRID' },
    { id: 'store', label: 'WAREHOUSE' },
    { id: 'media', label: 'VAULT' },
    { id: 'fanzone', label: 'INDUCTION' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
    
    // Smooth scroll to element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Simulate click sound
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        // AudioContext browser restrictions handled gracefully
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen
        ? 'bg-black/95 backdrop-blur-md border-b border-brand-red/30 py-3 shadow-[0_4px_30px_rgba(255,0,0,0.15)]' 
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      
      {/* Top micro scanning status line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-red opacity-60 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Identity Logo */}
        <div 
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <Logo className="h-10 w-auto group-hover:scale-105 transition-transform" glow={true} />
          <div className="hidden sm:block">
            <h1 className="font-display font-black text-sm tracking-widest text-white leading-none uppercase">
              RAZE <span className="text-brand-red">ELITE</span>
            </h1>
            <span className="font-mono text-[8px] text-gray-500 tracking-wider uppercase block mt-1">
              FFWS CHAMPIONS 2026
            </span>
          </div>
        </div>

        {/* Center: Main Navigation Hub Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => {
            const isCurrent = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-display font-black text-xs tracking-widest uppercase transition-all relative py-2 ${
                  isCurrent 
                    ? 'text-brand-red-light font-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {isCurrent && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sound Trigger & Admin Console Button */}
        <div className="flex items-center gap-4">
          
          {/* Sound control HUD indicator */}
          <button
            onClick={toggleSound}
            title="Toggle tactical audio logs"
            className="p-2 bg-brand-charcoal/40 hover:bg-white/5 border border-white/5 hover:border-white/10 rounded transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-brand-red-light" />
            ) : (
              <VolumeX className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {/* Secure CMS portal shortcut */}
          <button
            onClick={() => onNavigate('admin')}
            className={`px-3 py-2 border rounded font-mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 transition-all ${
              currentView === 'admin' 
                ? 'bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(255,0,0,0.4)] font-bold' 
                : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Settings className={`h-3 w-3 ${currentView === 'admin' ? 'animate-spin' : ''}`} />
            CMD_SECURE
          </button>

          {/* Mobile responsive toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-brand-red transition-all"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

      </div>

      {/* MOBILE HUD NAVIGATION SLIDEOUT */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-black border-b border-brand-red/30 px-6 py-6 absolute top-full left-0 z-50 flex flex-col gap-4 overflow-hidden"
          >
            {/* Lasers visual grids under mobile drawer */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

            {navLinks.map(link => {
              const isCurrent = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-3 text-left font-display font-bold text-sm tracking-widest uppercase border-b border-white/5 flex justify-between items-center ${
                    isCurrent ? 'text-brand-red-light' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                  <Cpu className={`h-4 w-4 ${isCurrent ? 'text-brand-red-light animate-pulse' : 'text-zinc-700'}`} />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
