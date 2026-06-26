import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Play, Tv, Trophy, ShieldAlert, ChevronRight, Clock, Award, CheckCircle } from 'lucide-react';
import { TournamentMatch } from '../types';

interface MatchesProps {
  matches: TournamentMatch[];
}

export default function Matches({ matches }: MatchesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [selectedMatchForStream, setSelectedMatchForStream] = useState<TournamentMatch | null>(null);
  const [countdownTime, setCountdownTime] = useState({ days: 5, hours: 14, minutes: 28, seconds: 42 });

  // Handle stream simulation countdown tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    return match.status.toLowerCase() === activeTab;
  });

  // Esports Bracket static nodes representing FFWC Finals tree for premium aesthetic
  const bracketRounds = [
    {
      roundName: 'Quarter Finals',
      matches: [
        { id: 'b1', team1: 'RAZE ELITE', score1: '4', team2: 'Fluxo', score2: '2', winner: 'team1' },
        { id: 'b2', team1: 'EVOS Divine', score1: '4', team2: 'RRQ Hades', score2: '3', winner: 'team1' },
        { id: 'b3', team1: 'LOUD', score1: '4', team2: 'Magic Squad', score2: '1', winner: 'team1' },
        { id: 'b4', team1: 'Buriram United', score1: '4', team2: 'REJECT', score2: '0', winner: 'team1' },
      ]
    },
    {
      roundName: 'Semi Finals',
      matches: [
        { id: 'b5', team1: 'RAZE ELITE', score1: '4', team2: 'EVOS Divine', score2: '1', winner: 'team1' },
        { id: 'b6', team1: 'LOUD', score1: '4', team2: 'Buriram United', score2: '3', winner: 'team1' },
      ]
    },
    {
      roundName: 'Grand Finals',
      matches: [
        { id: 'b7', team1: 'RAZE ELITE', score1: '4', team2: 'LOUD', score2: '2', winner: 'team1' }
      ]
    }
  ];

  return (
    <section id="matches" className="relative w-full py-24 bg-brand-charcoal/30 overflow-hidden cyber-grid">
      
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
            <Calendar className="h-3.5 w-3.5" />
            LIVE COMBAT GROUND
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            MATCHES & <span className="text-brand-red">STANDINGS</span>
          </h2>
          <div className="h-1 w-20 bg-brand-red mt-4" />
        </div>

        {/* 1. COUNTDOWN CLOCK BANNER */}
        <div className="w-full bg-black/60 border border-white/5 rounded-xl p-6 md:p-8 mb-16 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden clip-corner-br">
          <div className="absolute inset-0 cyber-grid opacity-10" />
          
          {/* Left info */}
          <div className="text-center lg:text-left shrink-0">
            <span className="inline-block px-3 py-1 bg-brand-red text-white text-[9px] font-mono tracking-widest uppercase rounded mb-3 animate-pulse">
              NEXT MAJOR OFFENSIVE
            </span>
            <h3 className="text-2xl md:text-3xl font-black font-display text-white uppercase tracking-wider">
              CONTINENTAL SERIES 2026
            </h3>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mt-1">
              GRAND CLASH vs EVOS DIVINE
            </p>
          </div>

          {/* Center countdown numbers */}
          <div className="flex flex-wrap justify-center gap-4 flex-1">
            {/* Days */}
            <div className="bg-brand-charcoal border border-white/10 rounded p-3 min-w-[75px] text-center">
              <span className="block font-display font-black text-3xl text-brand-red-light leading-none">
                {String(countdownTime.days).padStart(2, '0')}
              </span>
              <span className="font-mono text-[8px] tracking-widest text-gray-500 uppercase mt-1 block">DAYS</span>
            </div>
            {/* Hours */}
            <div className="bg-brand-charcoal border border-white/10 rounded p-3 min-w-[75px] text-center">
              <span className="block font-display font-black text-3xl text-white leading-none">
                {String(countdownTime.hours).padStart(2, '0')}
              </span>
              <span className="font-mono text-[8px] tracking-widest text-gray-500 uppercase mt-1 block">HOURS</span>
            </div>
            {/* Minutes */}
            <div className="bg-brand-charcoal border border-white/10 rounded p-3 min-w-[75px] text-center">
              <span className="block font-display font-black text-3xl text-white leading-none">
                {String(countdownTime.minutes).padStart(2, '0')}
              </span>
              <span className="font-mono text-[8px] tracking-widest text-gray-500 uppercase mt-1 block">MINUTES</span>
            </div>
            {/* Seconds */}
            <div className="bg-brand-charcoal border border-white/10 rounded p-3 min-w-[75px] text-center">
              <span className="block font-display font-black text-3xl text-brand-red leading-none animate-pulse">
                {String(countdownTime.seconds).padStart(2, '0')}
              </span>
              <span className="font-mono text-[8px] tracking-widest text-gray-500 uppercase mt-1 block">SECONDS</span>
            </div>
          </div>

          {/* Right Action */}
          <div className="shrink-0 w-full lg:w-auto">
            <button 
              id="btn-intel-countdown"
              onClick={() => alert("Combat intelligence dossier decrypted. Secure your access keys! Match broadcast begins on YouTube & Booyah Live on event day.")}
              className="w-full lg:w-auto px-6 py-4 bg-transparent hover:bg-white text-white hover:text-black font-display font-bold text-xs uppercase tracking-widest border border-white/20 hover:border-white transition-all duration-300 clip-corner-br"
            >
              ACQUIRE MILITARY INTEL
            </button>
          </div>
        </div>

        {/* 2. MATCH DIRECTORY FILTERS & LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left panel: Match List (7 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Nav Filters */}
            <div className="flex border-b border-white/5 pb-3 justify-between items-center flex-wrap gap-4">
              <h4 className="font-display font-black text-lg text-white uppercase tracking-wider">
                COMPETITIVE CHRONICLE
              </h4>
              <div className="flex gap-2 bg-black/40 border border-white/10 p-1 rounded">
                {(['all', 'live', 'upcoming', 'completed'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded transition-all ${
                      activeTab === tab 
                        ? 'bg-brand-red text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Matches List Container */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredMatches.map(match => (
                  <motion.div
                    key={match.id}
                    layout
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className={`p-5 rounded-lg border flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 ${
                      match.status === 'Live'
                        ? 'bg-gradient-to-r from-red-950/20 to-black border-brand-red shadow-[0_0_15px_rgba(255,0,0,0.1)]'
                        : 'bg-black/60 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Left: Tournament Details & Time */}
                    <div className="text-center md:text-left space-y-2 shrink-0 md:w-52">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="font-mono text-[9px] tracking-widest text-brand-red-light bg-brand-red/10 border border-brand-red/20 px-2 py-0.5 rounded uppercase">
                          {match.stage}
                        </span>
                        {match.status === 'Live' && (
                          <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded animate-pulse">
                            ● LIVE NOW
                          </span>
                        )}
                      </div>
                      <h5 className="font-display font-bold text-sm text-white uppercase tracking-wide leading-tight line-clamp-1">
                        {match.name}
                      </h5>
                      <p className="font-mono text-[10px] text-gray-500">
                        {match.date} @ {match.time} UTC
                      </p>
                    </div>

                    {/* Center: Matchup Arena */}
                    <div className="flex items-center gap-6 md:gap-8 justify-center flex-1">
                      
                      {/* RAZE ELITE team */}
                      <div className="text-right flex items-center gap-3 justify-end w-28 md:w-36">
                        <span className="font-display font-black text-sm text-white tracking-wide hidden sm:inline">RAZE ELITE</span>
                        <span className="font-display font-black text-sm text-white tracking-wide sm:hidden">RAZE</span>
                        <div className="h-9 w-9 rounded bg-brand-red/15 border border-brand-red/30 flex items-center justify-center p-1.5 font-display font-black text-brand-red-light">
                          RE
                        </div>
                      </div>

                      {/* SCOREBOARD BOARD */}
                      <div className="bg-brand-charcoal px-4 py-2 rounded-lg border border-white/10 font-mono flex items-center justify-center gap-3">
                        {match.status === 'Upcoming' ? (
                          <span className="text-xs text-gray-400 tracking-wider">VS</span>
                        ) : (
                          <>
                            <span className={`text-lg font-black ${match.ourScore && match.opponentScore && match.ourScore > match.opponentScore ? 'text-brand-red-light font-bold' : 'text-white'}`}>
                              {match.ourScore}
                            </span>
                            <span className="text-white/20">:</span>
                            <span className={`text-lg font-black ${match.ourScore && match.opponentScore && match.opponentScore > match.ourScore ? 'text-brand-red-light font-bold' : 'text-white'}`}>
                              {match.opponentScore}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Opponent team */}
                      <div className="text-left flex items-center gap-3 justify-start w-28 md:w-36">
                        <div className="h-9 w-9 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1 overflow-hidden">
                          <img src={match.opponentLogo} alt={match.opponent} className="h-full w-full object-contain filter invert opacity-80" />
                        </div>
                        <span className="font-display font-black text-sm text-gray-300 tracking-wide line-clamp-1">
                          {match.opponent}
                        </span>
                      </div>

                    </div>

                    {/* Right Action Stream */}
                    <div className="shrink-0 w-full md:w-auto flex justify-center">
                      {match.status === 'Live' ? (
                        <button 
                          onClick={() => setSelectedMatchForStream(match)}
                          className="w-full md:w-auto px-4 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,0,0.4)]"
                        >
                          <Tv className="h-4 w-4 animate-bounce" />
                          WATCH STREAM
                        </button>
                      ) : match.status === 'Completed' ? (
                        <div className="text-[10px] font-mono tracking-widest text-green-500 flex items-center gap-1 uppercase">
                          <CheckCircle className="h-4 w-4 shrink-0" />
                          COMPLETED
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                          STANDBY
                        </div>
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredMatches.length === 0 && (
                <div className="text-center py-12 border border-dashed border-white/5 rounded-lg text-gray-500 font-mono text-xs uppercase">
                  No match recordings found under the select category.
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Slogan / Highlight stats (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="glass-card rounded-xl p-6 border border-white/5 relative overflow-hidden clip-corner-br flex flex-col justify-between h-full min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <Trophy className="h-8 w-8 text-brand-red-light" />
                <h4 className="font-display font-black text-xl text-white uppercase tracking-wider">
                  THE CHAMPIONSHIP BENCHMARK
                </h4>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  We maintain an active, secure roster system. Standard operations require 4 active combat positions and up to 2 strategic reinforcements on standby. Current standings reflect #1 globally registered team.
                </p>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase">ACTIVE CHAMPIONSHIP</span>
                  <span className="text-white font-bold">FFWS 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase">OUR DIVISION SCORE</span>
                  <span className="text-brand-red-light font-bold">4,120 PTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase">WIN STREAK</span>
                  <span className="text-green-400 font-bold">8 CONSECUTIVE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. INTERACTIVE BRACKETS STANDINGS */}
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-2xl font-black font-display text-white tracking-widest uppercase text-center">
            FFWS CHAMPIONSHIP BRACKET
          </h3>
          <p className="text-gray-400 text-xs font-mono mt-2 tracking-widest uppercase text-center">
            INTERACTIVE MAP OF SQUAD ELIMINATION TO THE GOLD CUP
          </p>
          <div className="w-12 h-1 bg-brand-red mt-3" />
        </div>

        {/* Brackets Visualization Grid */}
        <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 md:p-8 overflow-x-auto">
          <div className="min-w-[800px] flex items-center justify-between gap-8 py-4">
            {bracketRounds.map((round, rIdx) => (
              <div key={rIdx} className="flex-1 flex flex-col gap-12 relative">
                
                {/* Round Header */}
                <div className="text-center border-b border-white/5 pb-2 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-brand-red-light uppercase font-bold">
                    {round.roundName}
                  </span>
                </div>

                {/* Match Cards */}
                <div className="flex flex-col justify-around gap-12 flex-1 h-full min-h-[300px]">
                  {round.matches.map((bMatch, mIdx) => (
                    <div 
                      key={bMatch.id}
                      className="glass-card p-4 rounded border border-white/5 hover:border-brand-red/40 hover:bg-brand-charcoal/50 transition-all duration-300 relative group"
                    >
                      {/* Connection lines on background */}
                      {rIdx < 2 && (
                        <div className="absolute top-1/2 -right-8 w-8 h-[2px] bg-white/10 group-hover:bg-brand-red/40 transition-colors pointer-events-none" />
                      )}

                      {/* Team 1 Row */}
                      <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                        <span className={`font-display text-xs uppercase tracking-wide ${bMatch.winner === 'team1' ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {bMatch.team1}
                        </span>
                        <span className={`font-mono text-xs ${bMatch.winner === 'team1' ? 'text-brand-red font-bold' : 'text-gray-500'}`}>
                          {bMatch.score1}
                        </span>
                      </div>

                      {/* Team 2 Row */}
                      <div className="flex justify-between items-center py-1.5 mt-1">
                        <span className={`font-display text-xs uppercase tracking-wide ${bMatch.winner === 'team2' ? 'text-white font-bold' : 'text-gray-500'}`}>
                          {bMatch.team2}
                        </span>
                        <span className={`font-mono text-xs ${bMatch.winner === 'team2' ? 'text-brand-red font-bold' : 'text-gray-500'}`}>
                          {bMatch.score2}
                        </span>
                      </div>

                      {/* Hover tag overlay info */}
                      <div className="absolute -top-3 left-3 px-2 py-0.5 bg-black border border-white/10 rounded font-mono text-[8px] text-gray-500 uppercase tracking-widest">
                        MATCH {bMatch.id.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. SIMULATED STREAM WATCHER OVERLAY POPUP */}
      <AnimatePresence>
        {selectedMatchForStream && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-brand-charcoal border border-brand-red/40 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Header bar */}
              <div className="bg-black/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-brand-red uppercase animate-pulse">
                    LIVE TOURNAMENT STREAM TRANSCEIVER
                  </span>
                  <h4 className="font-display font-black text-sm text-white uppercase tracking-wide">
                    RAZE ELITE vs {selectedMatchForStream.opponent} - {selectedMatchForStream.stage}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedMatchForStream(null)}
                  className="px-3 py-1 bg-brand-red text-white text-xs font-bold font-mono rounded hover:bg-brand-red-light uppercase"
                >
                  CLOSE TRANSMISSION
                </button>
              </div>

              {/* Simulated Esports Video Stream Panel */}
              <div className="relative aspect-video bg-zinc-950 flex items-center justify-center overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                  title="Simulated Esports Livestream Feed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                
                {/* Simulated overlay stats */}
                <div className="absolute top-4 left-4 bg-red-600/90 text-white px-2.5 py-1 rounded text-[10px] font-mono tracking-widest font-black uppercase flex items-center gap-1.5 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  FEED: LIVE (1080P60)
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded text-[10px] font-mono border border-white/5 text-gray-300">
                  🔴 VIEWERS: 182,249
                </div>
              </div>

              {/* Ticker bar bottom */}
              <div className="p-4 bg-black/60 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex justify-between">
                <span>RE_TRANS_SAT_ID: AX-7742</span>
                <span className="text-brand-red-light animate-pulse font-bold">CHAT STREAMS CONNECTED</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
