import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Award, Send, Check, ShieldAlert, Sparkles, 
  Dribbble, ArrowRight, Star, Heart, Flame, Gamepad2, 
  HelpCircle, CheckCircle, Mail, MessageSquare, Instagram, Youtube, Facebook
} from 'lucide-react';
import { FanLeaderboardEntry, RecruitmentApplication, PlayerRole } from '../types';

interface FanZoneProps {
  leaderboard: FanLeaderboardEntry[];
  applications: RecruitmentApplication[];
  onSubmitApplication: (app: Omit<RecruitmentApplication, 'id' | 'status' | 'appliedAt'>) => void;
}

export default function FanZone({ leaderboard, applications, onSubmitApplication }: FanZoneProps) {
  // Recruitment states
  const [name, setName] = useState('');
  const [ign, setIgn] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(18);
  const [role, setRole] = useState<PlayerRole>('Rusher');
  const [kdRatio, setKdRatio] = useState(3.5);
  const [device, setDevice] = useState('iPhone 15 Pro Max');
  const [motivation, setMotivation] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Cheering interactive booster state
  const [cheerXp, setCheerXp] = useState(0);
  const [hasCheered, setHasCheered] = useState(false);

  const handleRecruitmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ign || !discordId || !email) {
      alert("Please fill out all mandatory identification coordinates.");
      return;
    }

    onSubmitApplication({
      name,
      ign,
      discordId,
      email,
      age: Number(age),
      role,
      kdRatio: Number(kdRatio),
      device,
      motivation
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setName('');
      setIgn('');
      setDiscordId('');
      setEmail('');
      setMotivation('');
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  const handleCheerAction = () => {
    if (hasCheered) return;
    setCheerXp(150);
    setHasCheered(true);
    setTimeout(() => setCheerXp(0), 2000);
  };

  return (
    <section id="fanzone" className="relative w-full py-24 bg-brand-black overflow-hidden cyber-grid">
      
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-[350px] h-[350px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
            <Flame className="h-3.5 w-3.5" />
            FAN ZONE & RECRUITMENT
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            JOIN THE <span className="text-brand-red">RAZE ALLIANCE</span>
          </h2>
          <div className="h-1 w-20 bg-brand-red mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* LEFT: RECRUITMENT APPLICATION FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 md:p-10 rounded-xl border border-white/5 relative overflow-hidden clip-corner-br">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                [ CODE_SQUAD_RECRUITMENT ]
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black font-display text-white uppercase tracking-wider flex items-center gap-3">
                  <Gamepad2 className="h-6 w-6 text-brand-red-light" />
                  APPLY FOR THE ROSTER
                </h3>
                <p className="text-gray-400 font-sans text-xs mt-2 leading-relaxed">
                  Do you have what it takes to fight alongside Viper and Maestro under the FFWC banner? Submit your combat biometrics below. Raze Elite command analyzes every entry against elite tournament standards.
                </p>
              </div>

              {submitSuccess ? (
                // SUCCESS SUBMISSION VIEW
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-red/10 border border-brand-red/30 p-8 rounded-lg text-center space-y-4"
                >
                  <CheckCircle className="h-12 w-12 text-brand-red-light mx-auto animate-bounce" />
                  <h4 className="font-display font-black text-lg text-white uppercase tracking-widest">
                    BIOMETRIC CORES SECURED
                  </h4>
                  <p className="text-gray-400 font-sans text-xs max-w-md mx-auto">
                    Your candidate profile has been logged on global sector database servers. Track status updates below. Our scouts will query you on Discord if qualifying parameters align.
                  </p>
                </motion.div>
              ) : (
                // FORM INPUT FIELD GRID
                <form onSubmit={handleRecruitmentSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Real Name */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        REAL IDENT NAME *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    {/* IGN */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        GAME NAME (IGN) *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={ign}
                        onChange={(e) => setIgn(e.target.value)}
                        placeholder="e.g. RAZE_CYPHER"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Discord ID */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        DISCORD COORD ID *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={discordId}
                        onChange={(e) => setDiscordId(e.target.value)}
                        placeholder="e.g. user#1234"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        SECURE EMAIL CORES *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. pilot@core.com"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        AGE LEVEL
                      </label>
                      <input 
                        type="number" 
                        min="13"
                        max="99"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Role Unit Select */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        DESIRED ROLE UNIT
                      </label>
                      <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value as PlayerRole)}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      >
                        <option value="IGL">IGL (Commander)</option>
                        <option value="Rusher">Rusher (Offensive Frontline)</option>
                        <option value="Sniper">Sniper (Marksman)</option>
                        <option value="Support">Support (Utility Backline)</option>
                        <option value="Entry Fragger">Entry Fragger (Breacher)</option>
                        <option value="Flex Player">Flex Player (Adapter)</option>
                      </select>
                    </div>

                    {/* K/D Ratio */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        LIFETIME K/D ACCURACY
                      </label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        value={kdRatio}
                        onChange={(e) => setKdRatio(Number(e.target.value))}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    {/* Device Used */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                        HARDWARE DEVICE CORE
                      </label>
                      <input 
                        type="text" 
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                        placeholder="e.g. ROG Phone 8 Pro"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>

                  {/* Motivation Description */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      PERFORMANCE MOTIVATION DOSSIER
                    </label>
                    <textarea 
                      rows={4}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="Detail your competitive accomplishments, achievements, team history, or what sets your combat spirit apart."
                      className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red resize-none"
                    />
                  </div>

                  {/* Action Trigger */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 border-b-4 border-brand-red-dark shadow-[0_0_15px_rgba(255,0,0,0.3)] flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    DISPATCH BIO CORES TO COMMAND
                  </button>

                </form>
              )}

              {/* Submitted Applications Track list */}
              {applications.length > 0 && (
                <div className="mt-8 border-t border-white/5 pt-8 space-y-4">
                  <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                    PENDING INDUCTION CORES
                  </h4>
                  <div className="space-y-3">
                    {applications.map(app => (
                      <div 
                        key={app.id}
                        className="bg-black/60 p-4 rounded border border-white/5 flex items-center justify-between font-mono text-xs"
                      >
                        <div>
                          <span className="font-bold text-white">{app.ign}</span>
                          <span className="text-gray-500 ml-2">({app.role} - K/D: {app.kdRatio})</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-bold ${
                          app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                          app.status === 'Declined' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT: FAN ZONE LEADERBOARD & INTERACTIVE STATS (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. FAN LEADERBOARD PANEL */}
            <div className="glass-card p-6 md:p-8 rounded-xl border border-white/5 relative overflow-hidden clip-corner-br">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                [ ALLIANCE_XP_TIERS ]
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-brand-red-light" />
                  FAN ZONE LEADERS
                </h3>
                <p className="text-gray-400 font-sans text-xs mt-1">
                  Alliance XP tracked through match cheers, event presence, and community hub cheering points.
                </p>
              </div>

              {/* List */}
              <div className="space-y-3">
                {leaderboard.map((fan, idx) => (
                  <div 
                    key={fan.id}
                    className="flex items-center justify-between p-3 bg-black/40 hover:bg-brand-charcoal/50 border border-white/5 rounded transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank number badge */}
                      <span className={`h-6 w-6 rounded flex items-center justify-center font-display font-black text-xs ${
                        idx === 0 ? 'bg-brand-red text-white' :
                        idx === 1 ? 'bg-white/20 text-white' :
                        idx === 2 ? 'bg-brand-red-dark text-white' :
                        'bg-zinc-900 text-gray-500'
                      }`}>
                        {idx + 1}
                      </span>
                      {/* Avatar */}
                      <div className="h-8 w-8 rounded-full bg-zinc-950 overflow-hidden border border-white/10">
                        <img src={fan.avatar} alt={fan.username} className="h-full w-full" />
                      </div>
                      <div>
                        <span className="font-display font-bold text-xs text-white block">
                          {fan.username}
                        </span>
                        <span className="font-mono text-[8px] tracking-wider text-gray-500 uppercase">
                          TIER: {fan.tier}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="block text-brand-red-light font-black text-xs">{fan.xp} XP</span>
                      <span className="text-[8px] text-gray-500 uppercase tracking-widest">{fan.activities} OPERATIONS</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cheer button interaction to boost user XP */}
              <div className="mt-6 border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="block font-mono text-[8px] text-gray-500 uppercase tracking-widest">WAVE THE RAZE FLAG</span>
                  <span className="font-display font-bold text-xs text-white">BOOST TEAM MORALE FOR XP!</span>
                </div>
                
                <button
                  onClick={handleCheerAction}
                  disabled={hasCheered}
                  className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-widest rounded flex items-center gap-2 transition-all relative ${
                    hasCheered 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-brand-red hover:bg-brand-red-light text-white shadow-md'
                  }`}
                >
                  <Flame className="h-4 w-4 text-white" />
                  {hasCheered ? 'SQUAD BOOSTED' : 'CHEER ROSTER'}
                  
                  {/* Floating animation XP indicator */}
                  <AnimatePresence>
                    {cheerXp > 0 && (
                      <motion.span 
                        initial={{ opacity: 0, y: 0, scale: 0.8 }}
                        animate={{ opacity: 1, y: -30, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 right-0 bg-green-500 text-black px-1.5 py-0.5 rounded text-[9px] font-black font-mono shadow-md"
                      >
                        +{cheerXp} XP!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </div>

            {/* 2. ELECTRONIC NEWSLETTER BLOCK */}
            <div className="glass-card p-6 md:p-8 rounded-xl border border-white/5 relative overflow-hidden clip-corner-br">
              <h4 className="font-display font-black text-sm text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-red-light" />
                TACTICAL WIRE NEWSLETTER
              </h4>
              <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6">
                Receive instant warnings when limited jerseys are released, tournament tickets go live, or new roster signings complete.
              </p>

              {newsletterSuccess ? (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-center text-green-400 font-mono text-xs uppercase tracking-widest">
                  Secure Newsletter Connection: ESTABLISHED
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email sector..."
                    className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white focus:outline-none focus:border-brand-red"
                  />
                  <button 
                    type="submit"
                    className="px-4 bg-brand-red hover:bg-brand-red-light text-white rounded font-mono text-xs uppercase font-bold transition-all"
                  >
                    LINK
                  </button>
                </form>
              )}
            </div>

            {/* 3. SOCIAL MEDIA INTEGRATION TILES */}
            <div className="grid grid-cols-3 gap-3">
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-brand-charcoal hover:bg-brand-red p-4 rounded border border-white/5 text-center flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <MessageSquare className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                <span className="font-mono text-[8px] text-gray-500 group-hover:text-white uppercase tracking-widest">DISCORD</span>
              </a>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-brand-charcoal hover:bg-brand-red p-4 rounded border border-white/5 text-center flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                <span className="font-mono text-[8px] text-gray-500 group-hover:text-white uppercase tracking-widest">YOUTUBE</span>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-brand-charcoal hover:bg-brand-red p-4 rounded border border-white/5 text-center flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all" />
                <span className="font-mono text-[8px] text-gray-500 group-hover:text-white uppercase tracking-widest">INSTAGRAM</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
