import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, User, Award, Shield, Calendar, MapPin, 
  ChevronRight, ArrowLeft, Instagram, Youtube, Facebook, 
  MessageSquare, Heart, Play, Activity, CheckCircle, 
  Compass, Eye, Film, BarChart2
} from 'lucide-react';
import { Player, PlayerRole, PlayerStatus } from '../types';

interface RosterProps {
  players: Player[];
  onSelectPlayer?: (player: Player) => void;
}

export default function Roster({ players }: RosterProps) {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeProfile, setActiveProfile] = useState<Player | null>(null);

  // Filter logic
  const filteredPlayers = players.filter(player => {
    const roleMatches = selectedRole === 'All' || player.role === selectedRole;
    const statusMatches = selectedStatus === 'All' || player.status === selectedStatus;
    return roleMatches && statusMatches;
  });

  const rolesList = ['All', 'IGL', 'Rusher', 'Sniper', 'Support', 'Entry Fragger', 'Flex Player'];
  const statusList = ['All', 'Active', 'Substitute', 'Former Player'];

  return (
    <section id="roster" className="relative w-full py-24 bg-black overflow-hidden cyber-grid">
      
      {/* Dynamic light effects */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        <AnimatePresence mode="wait">
          {!activeProfile ? (
            // MAIN ROSTER DIRECTORY VIEW
            <motion.div
              key="directory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
                    <Users className="h-3.5 w-3.5" />
                    APEX COMBAT UNITS
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
                    TEAM <span className="text-brand-red">ROSTER</span>
                  </h2>
                  <div className="h-1 w-20 bg-brand-red mt-4 mx-auto md:mx-0" />
                </div>

                {/* Stat quick summ */}
                <div className="hidden md:flex gap-8 border-l border-white/10 pl-8 py-2">
                  <div>
                    <span className="block text-2xl font-black font-display text-white">4.49</span>
                    <span className="font-mono text-[9px] tracking-wider text-gray-400 uppercase">TEAM AVG K/D</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black font-display text-brand-red">78.5%</span>
                    <span className="font-mono text-[9px] tracking-wider text-gray-400 uppercase">PEAK HEADSHOT %</span>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-col gap-4 mb-12 bg-brand-charcoal/40 border border-white/5 p-5 rounded-lg backdrop-blur-sm">
                
                {/* Role Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase min-w-[80px]">
                    ROLE UNIT:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {rolesList.map(role => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`px-3 py-1 rounded font-display font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                          selectedRole === role 
                            ? 'bg-brand-red border-brand-red text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                            : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase min-w-[80px]">
                    STATUS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {statusList.map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1 rounded font-display font-bold text-xs uppercase tracking-wider border transition-all duration-200 ${
                          selectedStatus === status 
                            ? 'bg-white border-white text-black font-bold' 
                            : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Cards Grid */}
              {filteredPlayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlayers.map((player) => (
                    <PlayerCard 
                      key={player.id} 
                      player={player} 
                      onClick={() => setActiveProfile(player)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
                  <User className="h-10 w-10 text-gray-500 mx-auto mb-4 animate-bounce" />
                  <p className="text-gray-400 font-display uppercase tracking-wider">No Combat Units Found Matching Criteria</p>
                  <button 
                    onClick={() => { setSelectedRole('All'); setSelectedStatus('All'); }}
                    className="mt-4 text-xs font-mono text-brand-red-light uppercase hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            // DETAILED PLAYER PROFILE PAGE VIEW
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <PlayerProfilePage 
                player={activeProfile} 
                onBack={() => setActiveProfile(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ==========================================
   3D PERSPECTIVE TILT PLAYER CARD COMPONENT
   ========================================== */
interface PlayerCardProps {
  key?: string;
  player: Player;
  onClick: () => void;
}

function PlayerCard({ player, onClick }: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Mouse hover tilt calculation for 3D physical feel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Set rot multiplier (e.g. max 12 degrees rotation)
    setRotateX(-y / (box.height / 2) * 12);
    setRotateY(x / (box.width / 2) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isActive = player.status === 'Active';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative h-[530px] rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 border bg-brand-black flex flex-col justify-between p-5 ${
        isActive 
          ? 'border-brand-red/30 hover:border-brand-red shadow-[0_0_20px_rgba(255,0,0,0.05)] hover:shadow-[0_0_30px_rgba(255,0,0,0.25)]' 
          : 'border-white/10 hover:border-white/30'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      
      {/* Active Aura Energy Sweep Effect */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-brand-red/10 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Cyber scanning visual laser line */}
      <div className="absolute inset-0 cyber-scanner opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      {/* CARD HEADER */}
      <div className="relative z-10 flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
        
        {/* Role Badge */}
        <span className="px-3 py-1 bg-black/80 border border-brand-red/40 rounded font-mono text-[10px] tracking-widest text-brand-red-light uppercase shadow-md">
          {player.role}
        </span>

        {/* Status indicator / Jersey number */}
        <div className="flex items-center gap-2">
          {player.status !== 'Active' && (
            <span className="text-[9px] font-mono tracking-widest uppercase bg-white/15 text-white px-1.5 py-0.5 rounded">
              {player.status}
            </span>
          )}
          <span className="font-display font-black text-2xl text-white/40 group-hover:text-brand-red-light transition-colors duration-300">
            #{player.jerseyNumber}
          </span>
        </div>
      </div>

      {/* MIDDLE: LARGE PLAYER IMAGE IN HOVER FRAME */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-lg bg-zinc-950/40 border border-white/5" style={{ transform: 'translateZ(10px)' }}>
        
        {/* Holographic grid lines in card backdrop */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Giant glowing red R/E logo shadow behind player */}
        <div className="absolute h-36 w-36 bg-brand-red/10 rounded-full blur-[40px] opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

        {/* Player Photo */}
        <img
          src={player.image}
          alt={player.ign}
          className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-[1.08] transition-all duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Form indicator glowing beacon in top right of image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 px-2 py-0.5 rounded-full border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[8px] font-mono text-green-400 uppercase tracking-widest">FORM: EXCELLENT</span>
        </div>

        {/* Country Flag & Origin Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded border border-white/5 flex items-center gap-2">
          <span className="text-sm leading-none">{player.flag}</span>
          <span className="font-mono text-[9px] tracking-widest text-white/80 uppercase">{player.country}</span>
        </div>
      </div>

      {/* CARD FOOTER (STATS PREVIEW) */}
      <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(40px)' }}>
        
        {/* Name Block */}
        <div>
          <h3 className="text-2xl font-black font-display text-white tracking-wide uppercase leading-none group-hover:text-brand-red-light transition-colors duration-300">
            {player.ign}
          </h3>
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase mt-1">
            {player.realName}
          </p>
        </div>

        {/* Performance Stats Sparkline Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
          
          {/* Matches */}
          <div className="text-center bg-black/40 p-1.5 rounded border border-white/5">
            <span className="block text-xs font-mono text-gray-500 uppercase tracking-wider">MATCHES</span>
            <span className="font-display font-bold text-sm text-white">{player.stats.matches}</span>
          </div>

          {/* K/D Ratio */}
          <div className="text-center bg-black/40 p-1.5 rounded border border-white/5">
            <span className="block text-xs font-mono text-gray-500 uppercase tracking-wider">K/D</span>
            <span className="font-display font-bold text-sm text-brand-red-light">{player.stats.kdRatio.toFixed(2)}</span>
          </div>

          {/* Win Rate */}
          <div className="text-center bg-black/40 p-1.5 rounded border border-white/5">
            <span className="block text-xs font-mono text-gray-500 uppercase tracking-wider">WIN RATE</span>
            <span className="font-display font-bold text-sm text-white">{player.stats.winRate}%</span>
          </div>

        </div>

        {/* Kills progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 uppercase tracking-widest">
            <span>SQUAD ELIMINATIONS</span>
            <span className="text-white font-bold">{player.stats.kills} KILLS</span>
          </div>
          {/* Progress bar container */}
          <div className="w-full h-1.5 bg-brand-charcoal rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(100, (player.stats.kills / 2200) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-brand-red-dark to-brand-red shadow-[0_0_8px_rgba(255,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Small Form Graph Sparkline */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-brand-red-light" />
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">RECENT KILLS FORM:</span>
          </div>
          <svg className="h-6 w-24 overflow-visible" viewBox="0 0 100 20">
            <polyline
              fill="none"
              stroke="#FF0000"
              strokeWidth="2"
              points={player.stats.recentKills.map((val, idx) => `${idx * 11},${20 - (val / 15) * 20}`).join(' ')}
              className="drop-shadow-[0_0_3px_rgba(255,0,0,0.5)]"
            />
            {player.stats.recentKills.map((val, idx) => (
              <circle
                key={idx}
                cx={idx * 11}
                cy={20 - (val / 15) * 20}
                r="1.5"
                fill="#FFFFFF"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            ))}
          </svg>
        </div>

      </div>

    </div>
  );
}

/* ==========================================
   IMMERSIVE PLAYER PROFILE PAGE COMPONENT
   ========================================== */
function PlayerProfilePage({ player, onBack }: { player: Player; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'career' | 'matches' | 'media'>('overview');

  const tabs = [
    { id: 'overview', label: 'Combat Overview', icon: BarChart2 },
    { id: 'career', label: 'Career & Legacy', icon: Award },
    { id: 'matches', label: 'Combat Log', icon: Activity },
    { id: 'media', label: 'Media Highlights', icon: Film },
  ];

  return (
    <div className="w-full">
      
      {/* Navigation Return Hook */}
      <button 
        onClick={onBack}
        id="btn-back-to-roster"
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-charcoal hover:bg-brand-red hover:text-white rounded text-gray-300 font-display font-bold text-xs uppercase tracking-wider border border-white/5 transition-all duration-300 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        BACK TO COMBAT FORCE
      </button>

      {/* PROFILE BANNER BLOCK */}
      <div className="relative w-full rounded-xl overflow-hidden glass-card border border-white/5 mb-8">
        
        {/* Holographic cybergrid in background */}
        <div className="absolute inset-0 cyber-grid opacity-35" />
        
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-6 md:p-10 items-center">
          
          {/* Avatar Graphic Frame */}
          <div className="h-44 w-44 md:h-56 md:w-56 rounded-lg overflow-hidden border-2 border-brand-red shadow-[0_0_20px_rgba(255,0,0,0.3)] relative shrink-0">
            <img 
              src={player.image} 
              alt={player.ign} 
              className="h-full w-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            {/* Country Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded border border-white/10 text-xs">
              {player.flag} {player.country}
            </div>
          </div>

          {/* Profile Name details */}
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
              <span className="px-3 py-1 bg-brand-red text-white font-mono text-[10px] tracking-widest uppercase rounded">
                {player.role}
              </span>
              <span className="px-3 py-1 bg-black/60 border border-white/10 text-gray-300 font-mono text-[10px] tracking-widest uppercase rounded">
                UNIT STATUS: {player.status}
              </span>
              <span className="font-display font-black text-xl text-brand-red">
                #{player.jerseyNumber}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none mb-2">
              {player.ign}
            </h1>
            <p className="text-base text-gray-400 font-mono tracking-widest uppercase mb-6">
              REAL NAME: {player.realName}
            </p>

            {/* Social Media Link Hub */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {player.socialLinks.instagram && (
                <a 
                  href={player.socialLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 bg-black hover:bg-brand-red text-gray-400 hover:text-white rounded border border-white/5 hover:border-brand-red transition-all duration-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {player.socialLinks.youtube && (
                <a 
                  href={player.socialLinks.youtube} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 bg-black hover:bg-brand-red text-gray-400 hover:text-white rounded border border-white/5 hover:border-brand-red transition-all duration-300"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {player.socialLinks.discord && (
                <a 
                  href={player.socialLinks.discord} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 bg-black hover:bg-brand-red text-gray-400 hover:text-white rounded border border-white/5 hover:border-brand-red transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4" />
                </a>
              )}
              {player.socialLinks.facebook && (
                <a 
                  href={player.socialLinks.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 bg-black hover:bg-brand-red text-gray-400 hover:text-white rounded border border-white/5 hover:border-brand-red transition-all duration-300"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Win Circle */}
          <div className="hidden lg:flex flex-col items-center p-6 bg-black/60 border border-white/5 rounded-lg text-center shrink-0 w-44">
            <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-3">OVERALL WIN RATE</span>
            <div className="relative h-24 w-24 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
                <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  fill="transparent" 
                  stroke="#FF0000" 
                  strokeWidth="6" 
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * player.stats.winRate) / 100}
                  className="drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
                />
              </svg>
              <span className="font-display font-black text-2xl text-white">{player.stats.winRate}%</span>
            </div>
          </div>

        </div>
      </div>

      {/* TABBED INTERFACES */}
      <div className="flex border-b border-white/5 mb-8 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 px-6 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all duration-200 shrink-0 ${
                isSelected 
                  ? 'border-brand-red text-brand-red-light bg-brand-red/5' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CORE PROFILE CONTENT DIRECTED BY TABS */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Matches played */}
              <div className="glass-card rounded-lg p-6 hover:border-brand-red/20 transition-all">
                <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase mb-2">TOTAL MATCHES</span>
                <span className="text-4xl font-black font-display text-white">{player.stats.matches}</span>
                <span className="block text-xs font-mono text-gray-500 mt-2">Active Competitive Season</span>
              </div>

              {/* Total Kills */}
              <div className="glass-card rounded-lg p-6 hover:border-brand-red/20 transition-all">
                <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase mb-2">TOTAL KILLS</span>
                <span className="text-4xl font-black font-display text-brand-red">{player.stats.kills}</span>
                <span className="block text-xs font-mono text-gray-500 mt-2">Squad Record Carrier</span>
              </div>

              {/* KD Ratio */}
              <div className="glass-card rounded-lg p-6 hover:border-brand-red/20 transition-all">
                <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase mb-2">KILL / DEATH RATIO</span>
                <span className="text-4xl font-black font-display text-white">{player.stats.kdRatio.toFixed(2)}</span>
                <span className="block text-xs font-mono text-gray-500 mt-2">Peak Division Tier</span>
              </div>

              {/* Headshot % */}
              <div className="glass-card rounded-lg p-6 hover:border-brand-red/20 transition-all">
                <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase mb-2">HEADSHOT ACCURACY</span>
                <span className="text-4xl font-black font-display text-white">{player.stats.headshotPercent}%</span>
                <span className="block text-xs font-mono text-gray-500 mt-2">High Precision Gunplay</span>
              </div>

              {/* Secondary statistics group */}
              <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <div className="glass-card rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase">AVG DAMAGE / ROUND</span>
                    <span className="text-2xl font-black font-display text-white mt-1 block">{player.stats.avgDamage} HP</span>
                  </div>
                </div>

                <div className="glass-card rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase">BOOYAH COUNT</span>
                    <span className="text-2xl font-black font-display text-white mt-1 block">{player.stats.booyahCount} Victories</span>
                  </div>
                </div>

                <div className="glass-card rounded-lg p-6 flex justify-between items-center">
                  <div>
                    <span className="block font-mono text-[9px] tracking-widest text-gray-400 uppercase">INDIVIDUAL MVP AWARDS</span>
                    <span className="text-2xl font-black font-display text-brand-red mt-1 block">{player.stats.mvpAwards} Awards</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: CAREER */}
          {activeTab === 'career' && (
            <motion.div
              key="career-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Timeline join history */}
              <div className="glass-card rounded-lg p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                    BIOMETRICS & COMMENCEMENT
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between font-mono text-xs border-b border-white/5 pb-2">
                      <span className="text-gray-400">JOINING DATE</span>
                      <span className="text-white font-bold">{player.career.joiningDate}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs border-b border-white/5 pb-2">
                      <span className="text-gray-400">TOTAL TOURNAMENT WINS</span>
                      <span className="text-brand-red font-bold">{player.stats.tournamentWins} Champion Cups</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">FORMER FACTIONS</h4>
                  <div className="flex flex-wrap gap-2">
                    {player.career.previousTeams.map((team, idx) => (
                      <span key={idx} className="px-3 py-1 bg-black rounded border border-white/10 font-mono text-xs text-gray-300">
                        {team}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements Trophies */}
              <div className="glass-card rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  TROPHIES & DECORATIONS
                </h3>
                <div className="space-y-4">
                  {player.achievements.map((ach, idx) => (
                    <div key={idx} className="flex gap-3 items-start p-3 bg-black/40 rounded border border-white/5">
                      <div className="h-6 w-6 shrink-0 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-xs text-brand-red-light font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-gray-300 text-sm font-sans leading-relaxed">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MATCHES */}
          {activeTab === 'matches' && (
            <motion.div
              key="matches-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card rounded-lg p-6 md:p-8"
            >
              <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider mb-6">
                HISTORIC COMBAT RECORDS
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase">
                      <th className="pb-4 font-bold tracking-wider">Tournament</th>
                      <th className="pb-4 font-bold tracking-wider">Opponent</th>
                      <th className="pb-4 font-bold tracking-wider">Placement</th>
                      <th className="pb-4 font-bold tracking-wider">Kills</th>
                      <th className="pb-4 font-bold tracking-wider">HP Damage</th>
                      <th className="pb-4 font-bold tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {player.matchRecords.map((match) => (
                      <tr key={match.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 font-semibold text-white">{match.tournamentName}</td>
                        <td className="py-4">{match.opponent}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded ${
                            match.placement === '1st' 
                              ? 'bg-brand-red/15 text-brand-red-light border border-brand-red/30 font-bold' 
                              : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {match.placement}
                          </span>
                        </td>
                        <td className="py-4 font-bold text-white">{match.kills}</td>
                        <td className="py-4 text-brand-red-light">{match.damage} HP</td>
                        <td className="py-4 text-gray-500">{match.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 4: MEDIA HIGHLIGHTS */}
          {activeTab === 'media' && (
            <motion.div
              key="media-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Highlight Clip 1 */}
              <div className="glass-card rounded-lg overflow-hidden group border border-white/5 hover:border-brand-red/30 transition-all">
                <div className="relative aspect-video bg-zinc-900 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" 
                    alt="Viper Clip" 
                    className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-45 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="relative h-12 w-12 rounded-full bg-brand-red border-2 border-white/15 flex items-center justify-center group-hover:scale-110 shadow-lg cursor-pointer transition-transform">
                    <Play className="h-5 w-5 fill-white text-white ml-1" />
                  </div>
                </div>
                <div className="p-4 bg-brand-charcoal/80">
                  <span className="font-mono text-[9px] tracking-wider bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 rounded text-brand-red-light uppercase">
                    PRO SQUAD HIGHLIGHT
                  </span>
                  <h4 className="font-display font-bold text-sm text-white uppercase mt-2 tracking-wide">
                    {player.ign} - SQUAD WIPING MASTERCLASS
                  </h4>
                </div>
              </div>

              {/* Highlight Clip 2 */}
              <div className="glass-card rounded-lg overflow-hidden group border border-white/5 hover:border-brand-red/30 transition-all">
                <div className="relative aspect-video bg-zinc-900 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600" 
                    alt="Team Vlog Clip" 
                    className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-45 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="relative h-12 w-12 rounded-full bg-brand-red border-2 border-white/15 flex items-center justify-center group-hover:scale-110 shadow-lg cursor-pointer transition-transform">
                    <Play className="h-5 w-5 fill-white text-white ml-1" />
                  </div>
                </div>
                <div className="p-4 bg-brand-charcoal/80">
                  <span className="font-mono text-[9px] tracking-wider bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 rounded text-brand-red-light uppercase">
                    CHAMPIONSHIP VLOG
                  </span>
                  <h4 className="font-display font-bold text-sm text-white uppercase mt-2 tracking-wide">
                    BEHIND THE SCENES: THE FINAL BATTLE FOR THE GOLD COUPE
                  </h4>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
