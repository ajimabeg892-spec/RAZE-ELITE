import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Skull, Globe, DollarSign, Users, ShieldAlert, Play } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  onJoinSquadClick: () => void;
  onExploreLegacyClick: () => void;
  statsData?: {
    wins: string;
    kills: string;
    rank: string;
    earnings: string;
    players: string;
  };
}

export default function Hero({ onJoinSquadClick, onExploreLegacyClick, statsData }: HeroProps) {
  const [lightningFlash, setLightningFlash] = useState(false);

  // Simulate occasional high-tension cyber arena lightning flashes
  useEffect(() => {
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 150);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setLightningFlash(true);
            setTimeout(() => setLightningFlash(false), 80);
          }
        }, 120);
      }
    }, 7000);

    return () => clearInterval(flashInterval);
  }, []);

  const defaultStats = {
    wins: '34',
    kills: '8,289+',
    rank: 'RANK #1',
    earnings: '$1,240,000',
    players: '6'
  };

  const finalStats = statsData || defaultStats;

  return (
    <div id="hero" className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center py-20 px-4 md:px-8 cyber-grid">
      
      {/* 1. ANIMATED RED/BLACK SMOKE & LIGHT STREAKS BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Subtle red background glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-red-600/5 rounded-full blur-[150px]" />

        {/* Ambient smoke drift (Simulated via multiple drifting blurred particles) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
        
        {/* Drifting smoke elements */}
        <div className="absolute bottom-10 left-[10%] w-[120px] h-[120px] bg-red-950/20 rounded-full blur-[60px] animate-smoke" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="absolute bottom-20 right-[15%] w-[150px] h-[150px] bg-red-900/15 rounded-full blur-[80px] animate-smoke" style={{ animationDelay: '2s', animationDuration: '14s' }} />
        <div className="absolute bottom-5 left-[45%] w-[100px] h-[100px] bg-brand-red-dark/10 rounded-full blur-[50px] animate-smoke" style={{ animationDelay: '4s', animationDuration: '9s' }} />
        <div className="absolute bottom-24 left-[75%] w-[180px] h-[180px] bg-red-950/25 rounded-full blur-[90px] animate-smoke" style={{ animationDelay: '6s', animationDuration: '16s' }} />

        {/* Moving red light streaks / energy beams */}
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent -rotate-12 transform scale-125 animate-pulse" />
        <div className="absolute bottom-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent rotate-6 transform scale-125" />

        {/* Dynamic scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0,0),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

        {/* Lightning Energy Flash Overlay */}
        <div 
          className={`absolute inset-0 bg-red-900/15 transition-opacity duration-75 pointer-events-none z-10 ${
            lightningFlash ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* 2. MAIN LOGO & HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl text-center px-4 w-full">
        
        {/* Floating Esports Ring Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-charcoal/80 border border-brand-red-dark/40 text-brand-red-light font-mono text-xs uppercase tracking-[0.25em] mb-8 shadow-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
          GLOBAL CHAMPIONSHIP DIRECTIVE
        </motion.div>

        {/* Large RAZE ELITE logo reveal with 3D Float animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for snappy high-end reveal
            delay: 0.2 
          }}
          className="relative mb-6 cursor-pointer group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Logo backdrop flare */}
          <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />
          
          <Logo size="xl" glow={true} className="hover:scale-[1.05] transition-transform duration-500" />

          {/* Holographic subtitle bar */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black border border-white/10 rounded font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
            RE_MODEL_V2026.06
          </div>
        </motion.div>

        {/* Aggressive Championship Headlines */}
        <div className="mb-6 space-y-2">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.25em' }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="text-5xl md:text-8xl font-black font-display tracking-tight text-white uppercase leading-none"
          >
            WE DON'T PLAY.
          </motion.h1>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-6xl md:text-9xl font-black font-display tracking-tighter text-brand-red uppercase leading-none red-glow-text"
          >
            WE DOMINATE.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-base md:text-2xl font-medium tracking-wide text-gray-300 font-sans max-w-2xl mb-12"
        >
          {finalStats.players === '6' ? (
            'RAZE ELITE — Professional Free Fire Esports Organization'
          ) : (
            'RAZE ELITE — Professional Multi-Squad & Free Fire Esports Organization'
          )}
        </motion.p>

        {/* Premium CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mb-20"
        >
          {/* JOIN THE SQUAD - Sharp aggressive button with hovering scan effect */}
          <button 
            onClick={onJoinSquadClick}
            id="btn-join-squad"
            className="relative group overflow-hidden bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-sm tracking-[0.2em] uppercase py-4 px-8 clip-corner-br transition-all duration-300 border-b-4 border-brand-red-dark shadow-[0_0_20px_rgba(255,0,0,0.4)]"
          >
            {/* Slide background light sweep on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            JOIN THE SQUAD
          </button>

          {/* EXPLORE OUR LEGACY - Matte outline glassmorphism */}
          <button 
            onClick={onExploreLegacyClick}
            id="btn-explore-legacy"
            className="relative group overflow-hidden bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-red/50 font-display font-bold text-sm tracking-[0.2em] uppercase py-4 px-8 clip-corner-br transition-all duration-300"
          >
            EXPLORE OUR LEGACY
          </button>
        </motion.div>

        {/* 3. DYNAMIC CHAMPIONSHIP STATISTICS TRACKER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 border-t border-b border-white/5 py-8 bg-black/60 backdrop-blur-md rounded-lg p-4 md:p-6"
        >
          {/* Stat 1: Wins */}
          <div className="flex flex-col items-center p-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 to-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Trophy className="h-6 w-6 text-brand-red-light mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">{finalStats.wins}</span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-1">TOURNAMENT WINS</span>
          </div>

          {/* Stat 2: Total Kills */}
          <div className="flex flex-col items-center p-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 to-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Skull className="h-6 w-6 text-brand-red-light mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">{finalStats.kills}</span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-1">TOTAL KILLS</span>
          </div>

          {/* Stat 3: Global Ranking */}
          <div className="flex flex-col items-center p-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 to-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Globe className="h-6 w-6 text-brand-red-light mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-2xl md:text-3xl font-black font-display text-brand-red tracking-tight">{finalStats.rank}</span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-1">GLOBAL RANK</span>
          </div>

          {/* Stat 4: Prize Earnings */}
          <div className="flex flex-col items-center p-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 to-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <DollarSign className="h-6 w-6 text-brand-red-light mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">{finalStats.earnings}</span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-1">PRIZE POOL WON</span>
          </div>

          {/* Stat 5: Active Roster */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center p-3 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 to-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Users className="h-6 w-6 text-brand-red-light mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">{finalStats.players}</span>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-1">ROSTER CHAMPIONS</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
