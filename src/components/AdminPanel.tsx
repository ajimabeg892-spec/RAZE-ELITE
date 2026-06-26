import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Shield, Settings, Users, Tag, Award, Calendar, 
  Film, Users2, FileText, Check, X, Plus, Trash2, Edit, Save, 
  TrendingUp, Percent, DollarSign, Database, HardDrive, Key, Globe, LayoutDashboard
} from 'lucide-react';
import { 
  Player, PlayerRole, PlayerStatus, Merchandise, Achievement, 
  TournamentMatch, MediaItem, Sponsor, RecruitmentApplication 
} from '../types';

interface AdminPanelProps {
  players: Player[];
  onUpdatePlayers: (newPlayers: Player[]) => void;
  merchandise: Merchandise[];
  onUpdateMerchandise: (newMerch: Merchandise[]) => void;
  achievements: Achievement[];
  onUpdateAchievements: (newAch: Achievement[]) => void;
  matches: TournamentMatch[];
  onUpdateMatches: (newMatches: TournamentMatch[]) => void;
  media: MediaItem[];
  onUpdateMedia: (newMedia: MediaItem[]) => void;
  sponsors: Sponsor[];
  onUpdateSponsors: (newSponsors: Sponsor[]) => void;
  applications: RecruitmentApplication[];
  onUpdateApplications: (newApps: RecruitmentApplication[]) => void;
}

export default function AdminPanel({
  players, onUpdatePlayers,
  merchandise, onUpdateMerchandise,
  achievements, onUpdateAchievements,
  matches, onUpdateMatches,
  media, onUpdateMedia,
  sponsors, onUpdateSponsors,
  applications, onUpdateApplications
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'players' | 'merch' | 'achievements' | 'tournaments' | 'media' | 'sponsors' | 'applications'>('dashboard');

  // Form states - Players
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isNewPlayer, setIsNewPlayer] = useState<boolean>(false);

  // Form states - Merch
  const [editingMerch, setEditingMerch] = useState<Merchandise | null>(null);
  const [isNewMerch, setIsNewMerch] = useState<boolean>(false);

  // Form states - Achievements
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);
  const [isNewAch, setIsNewAch] = useState<boolean>(false);

  // Form states - Tournaments
  const [editingMatch, setEditingMatch] = useState<TournamentMatch | null>(null);
  const [isNewMatch, setIsNewMatch] = useState<boolean>(false);

  // Form states - Media
  const [editingMediaItem, setEditingMediaItem] = useState<MediaItem | null>(null);
  const [isNewMediaItem, setIsNewMediaItem] = useState<boolean>(false);

  // Form states - Sponsors
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [isNewSponsor, setIsNewSponsor] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'RAZE2026') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('CRYPTOGRAPHIC SECURITY VIOLATION: PASSCODE INVALID');
    }
  };

  /* ==========================================
     SQUAD ROSTER OPERATIONS
     ========================================== */
  const handleEditPlayer = (player: Player) => {
    setEditingPlayer({ ...player });
    setIsNewPlayer(false);
  };

  const handleAddNewPlayer = () => {
    const defaultNewPlayer: Player = {
      id: `pl-${Date.now()}`,
      ign: 'RAZE_NEWCOMER',
      realName: 'New Recruit Name',
      country: 'Indonesia',
      flag: '🇮🇩',
      jerseyNumber: 1,
      role: 'Rusher',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
      stats: {
        matches: 0,
        kills: 0,
        kdRatio: 1.0,
        headshotPercent: 30,
        avgDamage: 500,
        booyahCount: 0,
        mvpAwards: 0,
        tournamentWins: 0,
        winRate: 50,
        recentKills: [1, 2, 1, 3, 2]
      },
      career: {
        joiningDate: new Date().toISOString().split('T')[0],
        previousTeams: [],
        competitiveHistory: []
      },
      matchRecords: [],
      achievements: [],
      socialLinks: {}
    };
    setEditingPlayer(defaultNewPlayer);
    setIsNewPlayer(true);
  };

  const handleSavePlayer = () => {
    if (!editingPlayer) return;
    let updated: Player[];
    if (isNewPlayer) {
      updated = [...players, editingPlayer];
    } else {
      updated = players.map(p => p.id === editingPlayer.id ? editingPlayer : p);
    }
    onUpdatePlayers(updated);
    setEditingPlayer(null);
  };

  const handleDeletePlayer = (id: string) => {
    if (confirm("Execute combat force ejection of this pilot ID?")) {
      onUpdatePlayers(players.filter(p => p.id !== id));
    }
  };

  /* ==========================================
     JERSEY INVENTORY OPERATIONS
     ========================================== */
  const handleEditMerch = (merch: Merchandise) => {
    setEditingMerch({ ...merch });
    setIsNewMerch(false);
  };

  const handleAddNewMerch = () => {
    const defaultNewMerch: Merchandise = {
      id: `merch-${Date.now()}`,
      name: 'NEW APPAREL PIECE',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=300',
      description: 'Futuristic combat gear.',
      stock: 50,
      category: 'Jersey',
      isLimitedDrop: false
    };
    setEditingMerch(defaultNewMerch);
    setIsNewMerch(true);
  };

  const handleSaveMerch = () => {
    if (!editingMerch) return;
    let updated: Merchandise[];
    if (isNewMerch) {
      updated = [...merchandise, editingMerch];
    } else {
      updated = merchandise.map(m => m.id === editingMerch.id ? editingMerch : m);
    }
    onUpdateMerchandise(updated);
    setEditingMerch(null);
  };

  const handleDeleteMerch = (id: string) => {
    if (confirm("Delete product asset entirely from warehouse tracking?")) {
      onUpdateMerchandise(merchandise.filter(m => m.id !== id));
    }
  };

  /* ==========================================
     ACHIEVEMENT TROPHY OPERATIONS
     ========================================== */
  const handleEditAch = (ach: Achievement) => {
    setEditingAch({ ...ach });
    setIsNewAch(false);
  };

  const handleAddNewAch = () => {
    const defaultNewAch: Achievement = {
      id: `ach-${Date.now()}`,
      title: 'CHAMPIONSHIP VICTORY',
      tournament: 'Free Fire Grand Series',
      placement: '1st',
      date: new Date().toISOString().split('T')[0],
      prize: '$50,000 USD'
    };
    setEditingAch(defaultNewAch);
    setIsNewAch(true);
  };

  const handleSaveAch = () => {
    if (!editingAch) return;
    let updated: Achievement[];
    if (isNewAch) {
      updated = [...achievements, editingAch];
    } else {
      updated = achievements.map(a => a.id === editingAch.id ? editingAch : a);
    }
    onUpdateAchievements(updated);
    setEditingAch(null);
  };

  const handleDeleteAch = (id: string) => {
    if (confirm("Delete this trophy entry? This erases team milestone records.")) {
      onUpdateAchievements(achievements.filter(a => a.id !== id));
    }
  };

  /* ==========================================
     TOURNAMENT SCHEDULE OPERATIONS
     ========================================== */
  const handleEditMatch = (match: TournamentMatch) => {
    setEditingMatch({ ...match });
    setIsNewMatch(false);
  };

  const handleAddNewMatch = () => {
    const defaultNewMatch: TournamentMatch = {
      id: `match-${Date.now()}`,
      name: 'Free Fire Championship',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      opponent: 'EVOS Esports',
      opponentLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=evos',
      stage: 'Grand Opening Match',
      status: 'Upcoming'
    };
    setEditingMatch(defaultNewMatch);
    setIsNewMatch(true);
  };

  const handleSaveMatch = () => {
    if (!editingMatch) return;
    let updated: TournamentMatch[];
    if (isNewMatch) {
      updated = [...matches, editingMatch];
    } else {
      updated = matches.map(m => m.id === editingMatch.id ? editingMatch : m);
    }
    onUpdateMatches(updated);
    setEditingMatch(null);
  };

  const handleDeleteMatch = (id: string) => {
    if (confirm("Cancel and delete this match operation schedule?")) {
      onUpdateMatches(matches.filter(m => m.id !== id));
    }
  };

  /* ==========================================
     MEDIA VAULT OPERATIONS
     ========================================== */
  const handleEditMediaItem = (item: MediaItem) => {
    setEditingMediaItem({ ...item });
    setIsNewMediaItem(false);
  };

  const handleAddNewMediaItem = () => {
    const defaultNewItem: MediaItem = {
      id: `media-${Date.now()}`,
      title: 'TEAM HIGHLIGHT CLIPS',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=300',
      category: 'Highlight'
    };
    setEditingMediaItem(defaultNewItem);
    setIsNewMediaItem(true);
  };

  const handleSaveMediaItem = () => {
    if (!editingMediaItem) return;
    let updated: MediaItem[];
    if (isNewMediaItem) {
      updated = [...media, editingMediaItem];
    } else {
      updated = media.map(m => m.id === editingMediaItem.id ? editingMediaItem : m);
    }
    onUpdateMedia(updated);
    setEditingMediaItem(null);
  };

  const handleDeleteMediaItem = (id: string) => {
    if (confirm("Delete this media segment from visual feeds?")) {
      onUpdateMedia(media.filter(m => m.id !== id));
    }
  };

  /* ==========================================
     SPONSOR LEDGER OPERATIONS
     ========================================== */
  const handleEditSponsor = (sponsor: Sponsor) => {
    setEditingSponsor({ ...sponsor });
    setIsNewSponsor(false);
  };

  const handleAddNewSponsor = () => {
    const defaultNewSponsor: Sponsor = {
      id: `sp-${Date.now()}`,
      name: 'CORP PARTNER',
      logo: 'ROG',
      tier: 'Global'
    };
    setEditingSponsor(defaultNewSponsor);
    setIsNewSponsor(true);
  };

  const handleSaveSponsor = () => {
    if (!editingSponsor) return;
    let updated: Sponsor[];
    if (isNewSponsor) {
      updated = [...sponsors, editingSponsor];
    } else {
      updated = sponsors.map(s => s.id === editingSponsor.id ? editingSponsor : s);
    }
    onUpdateSponsors(updated);
    setEditingSponsor(null);
  };

  const handleDeleteSponsor = (id: string) => {
    if (confirm("Sever contract alignment? Erases partnership logo.")) {
      onUpdateSponsors(sponsors.filter(s => s.id !== id));
    }
  };

  /* ==========================================
     RECRUITMENT APPLICATION APPROVALS
     ========================================== */
  const handleReviewApplication = (id: string, newStatus: 'Approved' | 'Declined') => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    onUpdateApplications(updated);
  };

  const handleDeleteApplication = (id: string) => {
    if (confirm("Erase application dossier entry?")) {
      onUpdateApplications(applications.filter(app => app.id !== id));
    }
  };


  /* ==========================================
     1. SECURITY LOG SCREEN (NOT LOGGED IN)
     ========================================== */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-20 px-4 cyber-grid">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full bg-brand-charcoal border border-brand-red p-8 rounded-xl relative overflow-hidden"
        >
          {/* Neon laser scanlines */}
          <div className="absolute inset-0 cyber-scanner opacity-5 pointer-events-none" />

          <div className="text-center space-y-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-brand-red/10 border-2 border-brand-red flex items-center justify-center mx-auto text-brand-red-light shadow-[0_0_15px_rgba(255,0,0,0.4)]">
              <Lock className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest text-brand-red-light uppercase block">
                [ COMMAND SECURITY BARRIER ]
              </span>
              <h2 className="text-2xl font-black font-display text-white uppercase tracking-wider">
                ADMIN ACCESS CONSOLE
              </h2>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest text-center">
                DECRYPT ENTRY PASSKEY
              </label>
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode..."
                className="w-full bg-black border border-white/10 rounded p-4 font-mono text-center text-sm text-brand-red-light focus:outline-none focus:border-brand-red tracking-widest uppercase"
              />
              <p className="font-mono text-[8px] text-center text-gray-500 uppercase">
                hint: R A Z E 2 0 2 6
              </p>
            </div>

            {loginError && (
              <p className="text-[10px] font-mono text-brand-red font-bold uppercase text-center bg-red-950/20 border border-brand-red/20 py-2 rounded">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)] border-b-4 border-brand-red-dark"
            >
              INITIATE COMMAND SYSTEMS
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  /* ==========================================
     2. SECURE COMMAND DASHBOARD UI
     ========================================== */
  return (
    <div className="min-h-screen bg-black py-24 px-6 md:px-12 cyber-grid">
      
      {/* CMS Header details */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-brand-charcoal border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-5" />
          
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="h-14 w-14 rounded-lg bg-brand-red/10 border border-brand-red flex items-center justify-center text-brand-red-light shadow-[0_0_15px_rgba(255,0,0,0.3)] shrink-0">
              <Settings className="h-6 w-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest text-brand-red-light uppercase block">
                [ INTEGRITY SYSTEM CENTRAL ]
              </span>
              <h1 className="text-3xl font-black font-display text-white uppercase tracking-wider">
                RAZE ELITE CMS VAULT
              </h1>
              <p className="text-[10px] font-mono text-gray-500 mt-0.5 uppercase">
                ADMIN SESSION CORES: SIGNED & SECURE
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-zinc-900 border border-white/10 hover:border-brand-red text-xs font-mono uppercase rounded text-gray-400 hover:text-white transition-colors"
          >
            DISENGAGE TERMINAL
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column navigation blocks (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-brand-charcoal/40 border border-white/5 rounded-lg p-2 flex flex-col">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest px-4 py-3 border-b border-white/5 mb-2">
              COMMAND SECTORS:
            </span>

            {[
              { id: 'dashboard', label: 'Command Hub', icon: LayoutDashboard },
              { id: 'players', label: 'Combat Force (Players)', icon: Users },
              { id: 'merch', label: 'Warehouse (Jersey Drops)', icon: Tag },
              { id: 'achievements', label: 'Trophy Cabinet (Cups)', icon: Award },
              { id: 'tournaments', label: 'Combat Logs (Matches)', icon: Calendar },
              { id: 'media', label: 'Visual Feeds (Media)', icon: Film },
              { id: 'sponsors', label: 'Pact Partners (Sponsors)', icon: Globe },
              { id: 'applications', label: 'Inductions (Applications)', icon: FileText, badge: applications.filter(a => a.status === 'Pending').length },
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setEditingPlayer(null);
                    setEditingMerch(null);
                    setEditingAch(null);
                    setEditingMatch(null);
                    setEditingMediaItem(null);
                    setEditingSponsor(null);
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 font-display font-bold text-xs uppercase tracking-wider rounded transition-all ${
                    isSelected 
                      ? 'bg-brand-red text-white shadow-md font-black' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-white text-black font-mono font-black text-[9px] h-4.5 px-1.5 rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column detailed dashboard (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: INTEGRATION COMMAND HUB */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dash-hub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Visual stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Metric 1 */}
                  <div className="glass-card p-6 rounded-lg border border-white/5">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">ACTIVE ROSTER SIZE</span>
                    <span className="text-3xl font-black font-display text-white mt-1 block">{players.length} PILOTS</span>
                    <span className="text-[10px] font-mono text-green-400 block mt-1">Combat Ready</span>
                  </div>
                  {/* Metric 2 */}
                  <div className="glass-card p-6 rounded-lg border border-white/5">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">WAREHOUSE PRODUCTS</span>
                    <span className="text-3xl font-black font-display text-brand-red-light mt-1 block">{merchandise.length} ITEMS</span>
                    <span className="text-[10px] font-mono text-gray-400 block mt-1">Live Drop Catalog</span>
                  </div>
                  {/* Metric 3 */}
                  <div className="glass-card p-6 rounded-lg border border-white/5">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">TROPHY DECORATIONS</span>
                    <span className="text-3xl font-black font-display text-white mt-1 block">{achievements.length} CUPS</span>
                    <span className="text-[10px] font-mono text-yellow-500 block mt-1">Milestones Authenticated</span>
                  </div>
                  {/* Metric 4 */}
                  <div className="glass-card p-6 rounded-lg border border-white/5">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">INDUCTION DOSSIERS</span>
                    <span className="text-3xl font-black font-display text-white mt-1 block">{applications.length} FILE(S)</span>
                    <span className={`text-[10px] font-mono block mt-1 ${applications.filter(a => a.status === 'Pending').length > 0 ? 'text-amber-400 animate-pulse' : 'text-gray-400'}`}>
                      {applications.filter(a => a.status === 'Pending').length} Pending Review
                    </span>
                  </div>
                </div>

                {/* Main hub summary box */}
                <div className="glass-card rounded-lg p-6 md:p-8 space-y-4">
                  <Database className="h-8 w-8 text-brand-red-light" />
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wider">
                    SYSTEM SECURE DATABASE ALIGNMENT
                  </h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">
                    Welcome to the RAZE ELITE secure content management deck. Changes made inside this cockpit write immediately to local persistence channels (`localStorage`), allowing the live developer site frame to synchronize dynamically. Maintain accuracy across pricing schedules and role badges to protect competitive brand values.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-6 font-mono text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-brand-red" />
                      <span>SECTOR DATA INTEGRITY: 100% ONLINE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4 text-brand-red" />
                      <span>CRYPTOGRAPHIC TOKEN SEED: OK</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: PLAYERS (SQUAD FORCE CMS) */}
            {activeTab === 'players' && (
              <motion.div
                key="players-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingPlayer ? (
                  // PLAYERS LIST TABLE WITH ACTIONS
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        SQUAD ROSTER DATA
                      </h3>
                      <button
                        onClick={handleAddNewPlayer}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        ADD COMBAT UNIT
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Pilot</th>
                            <th className="pb-3 font-bold tracking-wider">Real Name</th>
                            <th className="pb-3 font-bold tracking-wider">Role</th>
                            <th className="pb-3 font-bold tracking-wider">Jersey</th>
                            <th className="pb-3 font-bold tracking-wider">Status</th>
                            <th className="pb-3 font-bold tracking-wider">K/D</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {players.map(p => (
                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3 font-semibold text-white flex items-center gap-2">
                                <span>{p.flag}</span>
                                <span>{p.ign}</span>
                              </td>
                              <td className="py-3">{p.realName}</td>
                              <td className="py-3">
                                <span className="px-1.5 py-0.5 bg-black rounded border border-white/10 text-brand-red-light font-bold">
                                  {p.role}
                                </span>
                              </td>
                              <td className="py-3">#{p.jerseyNumber}</td>
                              <td className="py-3">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                                  p.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="py-3 font-bold text-white">{p.stats.kdRatio.toFixed(2)}</td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditPlayer(p)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeletePlayer(p.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  // PLAYER EDITING FORM PANEL
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewPlayer ? 'CREATE PLAYER PROFILE' : `EDIT PLAYER CORES: ${editingPlayer.ign}`}
                    </h3>

                    {/* Standard bio inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">IGN NAME</label>
                        <input 
                          type="text"
                          value={editingPlayer.ign}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, ign: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">REAL NAME</label>
                        <input 
                          type="text"
                          value={editingPlayer.realName}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, realName: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">JERSEY #</label>
                        <input 
                          type="number"
                          value={editingPlayer.jerseyNumber}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, jerseyNumber: Number(e.target.value) })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">COUNTRY NAME</label>
                        <input 
                          type="text"
                          value={editingPlayer.country}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, country: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">FLAG EMOTE</label>
                        <input 
                          type="text"
                          value={editingPlayer.flag}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, flag: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">COMBAT ROLE</label>
                        <select 
                          value={editingPlayer.role}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, role: e.target.value as PlayerRole })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="IGL">IGL</option>
                          <option value="Rusher">Rusher</option>
                          <option value="Sniper">Sniper</option>
                          <option value="Support">Support</option>
                          <option value="Entry Fragger">Entry Fragger</option>
                          <option value="Flex Player">Flex Player</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">STATUS INDICATOR</label>
                        <select 
                          value={editingPlayer.status}
                          onChange={(e) => setEditingPlayer({ ...editingPlayer, status: e.target.value as PlayerStatus })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="Active">Active</option>
                          <option value="Substitute">Substitute</option>
                          <option value="Former Player">Former Player</option>
                        </select>
                      </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">IMAGE AVATAR LINK</label>
                      <input 
                        type="text"
                        value={editingPlayer.image}
                        onChange={(e) => setEditingPlayer({ ...editingPlayer, image: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                      />
                    </div>

                    {/* Stats editing */}
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
                        PERFORMANCE STATISTICS CORES
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-500 uppercase">MATCHES</label>
                          <input 
                            type="number"
                            value={editingPlayer.stats.matches}
                            onChange={(e) => setEditingPlayer({
                              ...editingPlayer,
                              stats: { ...editingPlayer.stats, matches: Number(e.target.value) }
                            })}
                            className="w-full bg-black border border-white/10 rounded p-2 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-500 uppercase">KILLS</label>
                          <input 
                            type="number"
                            value={editingPlayer.stats.kills}
                            onChange={(e) => setEditingPlayer({
                              ...editingPlayer,
                              stats: { ...editingPlayer.stats, kills: Number(e.target.value) }
                            })}
                            className="w-full bg-black border border-white/10 rounded p-2 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-500 uppercase">K/D RATIO</label>
                          <input 
                            type="number"
                            step="0.01"
                            value={editingPlayer.stats.kdRatio}
                            onChange={(e) => setEditingPlayer({
                              ...editingPlayer,
                              stats: { ...editingPlayer.stats, kdRatio: Number(e.target.value) }
                            })}
                            className="w-full bg-black border border-white/10 rounded p-2 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-500 uppercase">HEADSHOT %</label>
                          <input 
                            type="number"
                            value={editingPlayer.stats.headshotPercent}
                            onChange={(e) => setEditingPlayer({
                              ...editingPlayer,
                              stats: { ...editingPlayer.stats, headshotPercent: Number(e.target.value) }
                            })}
                            className="w-full bg-black border border-white/10 rounded p-2 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-500 uppercase">WIN RATE %</label>
                          <input 
                            type="number"
                            value={editingPlayer.stats.winRate}
                            onChange={(e) => setEditingPlayer({
                              ...editingPlayer,
                              stats: { ...editingPlayer.stats, winRate: Number(e.target.value) }
                            })}
                            className="w-full bg-black border border-white/10 rounded p-2 font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action triggers */}
                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingPlayer(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSavePlayer}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT ASSET
                      </button>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: JERSEYS (WAREHOUSE MERCH CMS) */}
            {activeTab === 'merch' && (
              <motion.div
                key="merch-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingMerch ? (
                  // PRODUCTS LIST TABLE
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        APPAREL CATALOGUE & drops
                      </h3>
                      <button
                        onClick={handleAddNewMerch}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        ADD PRODUCT
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Product Name</th>
                            <th className="pb-3 font-bold tracking-wider">Category</th>
                            <th className="pb-3 font-bold tracking-wider">Price</th>
                            <th className="pb-3 font-bold tracking-wider">Stock</th>
                            <th className="pb-3 font-bold tracking-wider">Limited Drop</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {merchandise.map(m => (
                            <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3 font-semibold text-white">{m.name}</td>
                              <td className="py-3 uppercase text-brand-red-light">{m.category}</td>
                              <td className="py-3 font-bold text-white">${m.price.toFixed(2)}</td>
                              <td className="py-3">
                                <span className={`font-bold ${m.stock < 15 ? 'text-brand-red-light' : 'text-white'}`}>
                                  {m.stock} Units
                                </span>
                              </td>
                              <td className="py-3">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${m.isLimitedDrop ? 'bg-brand-red/15 text-brand-red-light border border-brand-red/30' : 'bg-zinc-800 text-zinc-500'}`}>
                                  {m.isLimitedDrop ? 'YES' : 'NO'}
                                </span>
                              </td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditMerch(m)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMerch(m.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  // EDITING PRODUCT FORM
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewMerch ? 'ADD NEW PRODUCT ASSET' : `EDIT PRODUCT: ${editingMerch.name}`}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">PRODUCT NAME</label>
                        <input 
                          type="text"
                          value={editingMerch.name}
                          onChange={(e) => setEditingMerch({ ...editingMerch, name: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">PRICE ($)</label>
                          <input 
                            type="number"
                            step="0.01"
                            value={editingMerch.price}
                            onChange={(e) => setEditingMerch({ ...editingMerch, price: Number(e.target.value) })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">STOCK COUNT</label>
                          <input 
                            type="number"
                            value={editingMerch.stock}
                            onChange={(e) => setEditingMerch({ ...editingMerch, stock: Number(e.target.value) })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">CATEGORY</label>
                        <select 
                          value={editingMerch.category}
                          onChange={(e) => setEditingMerch({ ...editingMerch, category: e.target.value as any })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="Jersey">Jersey</option>
                          <option value="Hoodie">Hoodie</option>
                          <option value="Accessory">Accessory</option>
                          <option value="Limited Drop">Limited Drop</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">IS LIMITED DROP?</label>
                        <select 
                          value={editingMerch.isLimitedDrop ? 'true' : 'false'}
                          onChange={(e) => setEditingMerch({ ...editingMerch, isLimitedDrop: e.target.value === 'true' })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="false">Standard Catalog</option>
                          <option value="true">Limited Launch Drop</option>
                        </select>
                      </div>

                      {editingMerch.isLimitedDrop && (
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">DROP RELEASE DATE</label>
                          <input 
                            type="text"
                            value={editingMerch.dropDate || ''}
                            onChange={(e) => setEditingMerch({ ...editingMerch, dropDate: e.target.value })}
                            placeholder="e.g. 2026-07-15"
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">IMAGE LINK URL</label>
                      <input 
                        type="text"
                        value={editingMerch.image}
                        onChange={(e) => setEditingMerch({ ...editingMerch, image: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">DESCRIPTION</label>
                      <textarea 
                        rows={3}
                        value={editingMerch.description}
                        onChange={(e) => setEditingMerch({ ...editingMerch, description: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white resize-none"
                      />
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingMerch(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSaveMerch}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT PRODUCT
                      </button>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 4: TROPHY CABINET CMS */}
            {activeTab === 'achievements' && (
              <motion.div
                key="achievements-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingAch ? (
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        CHAMPIONSHIP LEDGER (ACHIEVEMENTS)
                      </h3>
                      <button
                        onClick={handleAddNewAch}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        RECORD TROPHY
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Title/Tournament</th>
                            <th className="pb-3 font-bold tracking-wider">Placement</th>
                            <th className="pb-3 font-bold tracking-wider">Date</th>
                            <th className="pb-3 font-bold tracking-wider">Prize Pool</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {achievements.map(a => (
                            <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3">
                                <span className="font-semibold text-white block">{a.title}</span>
                                <span className="text-gray-500 text-[10px]">{a.tournament}</span>
                              </td>
                              <td className="py-3">
                                <span className="px-1.5 py-0.5 bg-brand-red/15 text-brand-red-light border border-brand-red/20 rounded font-bold">
                                  {a.placement}
                                </span>
                              </td>
                              <td className="py-3">{a.date}</td>
                              <td className="py-3 font-bold text-green-400">{a.prize}</td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditAch(a)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteAch(a.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewAch ? 'LOG NEW CHAMPIONSHIP CUP' : 'EDIT TROPHY PARAMETERS'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">CHAMPIONSHIP / CUP TITLE</label>
                        <input 
                          type="text"
                          value={editingAch.title}
                          onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">TOURNAMENT / STAGE VENUE</label>
                        <input 
                          type="text"
                          value={editingAch.tournament}
                          onChange={(e) => setEditingAch({ ...editingAch, tournament: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">PLACEMENT RANK</label>
                        <select 
                          value={editingAch.placement}
                          onChange={(e) => setEditingAch({ ...editingAch, placement: e.target.value as any })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="1st">1st Place (Winner)</option>
                          <option value="2nd">2nd Place</option>
                          <option value="3rd">3rd Place</option>
                          <option value="MVP">MVP Award</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">PRIZE POOL AWARDED</label>
                        <input 
                          type="text"
                          value={editingAch.prize}
                          onChange={(e) => setEditingAch({ ...editingAch, prize: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">CONFERENCE DATE</label>
                        <input 
                          type="text"
                          value={editingAch.date}
                          onChange={(e) => setEditingAch({ ...editingAch, date: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingAch(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSaveAch}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT LEDGER
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 5: TOURNAMENTS CMS */}
            {activeTab === 'tournaments' && (
              <motion.div
                key="tournaments-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingMatch ? (
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        COMBAT LOGS & SCHEDULES
                      </h3>
                      <button
                        onClick={handleAddNewMatch}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        SCHEDULE CONFLICT
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Match Arena</th>
                            <th className="pb-3 font-bold tracking-wider">Opponent</th>
                            <th className="pb-3 font-bold tracking-wider">Stage/Level</th>
                            <th className="pb-3 font-bold tracking-wider">Status</th>
                            <th className="pb-3 font-bold tracking-wider">Score Board</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {matches.map(m => (
                            <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3">
                                <span className="font-semibold text-white block">{m.name}</span>
                                <span className="text-gray-500 text-[10px]">{m.date} @ {m.time}</span>
                              </td>
                              <td className="py-3 font-bold uppercase text-brand-red-light">{m.opponent}</td>
                              <td className="py-3 text-gray-400">{m.stage}</td>
                              <td className="py-3">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  m.status === 'Live' ? 'bg-red-600 text-white animate-pulse' :
                                  m.status === 'Completed' ? 'bg-zinc-800 text-gray-400' :
                                  'bg-brand-red/10 text-brand-red-light border border-brand-red/20'
                                }`}>
                                  {m.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-3 font-bold text-white">
                                {m.status === 'Upcoming' ? 'N/A' : `${m.ourScore} : ${m.opponentScore}`}
                              </td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditMatch(m)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMatch(m.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewMatch ? 'SCHEDULE NEW CHAMPIONSHIP OPERATION' : 'EDIT MATCH CONFIG CORES'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">CHAMPIONSHIP / ARENA LEAGUE NAME</label>
                        <input 
                          type="text"
                          value={editingMatch.name}
                          onChange={(e) => setEditingMatch({ ...editingMatch, name: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">OPPONENT SQUAD IDENT</label>
                        <input 
                          type="text"
                          value={editingMatch.opponent}
                          onChange={(e) => setEditingMatch({ ...editingMatch, opponent: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">MATCH STATUS</label>
                        <select 
                          value={editingMatch.status}
                          onChange={(e) => setEditingMatch({ ...editingMatch, status: e.target.value as any })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="Upcoming">Upcoming (Standby)</option>
                          <option value="Live">Live (Broadcast Active)</option>
                          <option value="Completed">Completed (Final Log)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">TOURNAMENT STAGE (E.G. SEMIS)</label>
                        <input 
                          type="text"
                          value={editingMatch.stage}
                          onChange={(e) => setEditingMatch({ ...editingMatch, stage: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">DATE</label>
                          <input 
                            type="text"
                            value={editingMatch.date}
                            onChange={(e) => setEditingMatch({ ...editingMatch, date: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">TIME (UTC)</label>
                          <input 
                            type="text"
                            value={editingMatch.time}
                            onChange={(e) => setEditingMatch({ ...editingMatch, time: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {editingMatch.status !== 'Upcoming' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-4">
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">RAZE ELITE MAP SCORE</label>
                          <input 
                            type="number"
                            value={editingMatch.ourScore || 0}
                            onChange={(e) => setEditingMatch({ ...editingMatch, ourScore: Number(e.target.value) })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">OPPONENT MAP SCORE</label>
                          <input 
                            type="number"
                            value={editingMatch.opponentScore || 0}
                            onChange={(e) => setEditingMatch({ ...editingMatch, opponentScore: Number(e.target.value) })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingMatch(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSaveMatch}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT OPERATIONS
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 6: VISUAL FEEDS CMS */}
            {activeTab === 'media' && (
              <motion.div
                key="media-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingMediaItem ? (
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        MEDIA VAULT & VISUAL FEEDS
                      </h3>
                      <button
                        onClick={handleAddNewMediaItem}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        ADD MEDIA ITEM
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Title</th>
                            <th className="pb-3 font-bold tracking-wider">Type</th>
                            <th className="pb-3 font-bold tracking-wider">Category</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {media.map(m => (
                            <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3 font-semibold text-white">{m.title}</td>
                              <td className="py-3 uppercase text-brand-red-light">{m.type}</td>
                              <td className="py-3 text-gray-400">{m.category}</td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditMediaItem(m)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMediaItem(m.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewMediaItem ? 'DEPOSIT VISUAL MEDIA' : 'EDIT VISUAL CHANNEL PARAMETERS'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">MEDIA SEGMENT TITLE</label>
                        <input 
                          type="text"
                          value={editingMediaItem.title}
                          onChange={(e) => setEditingMediaItem({ ...editingMediaItem, title: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">MEDIA TYPE</label>
                          <select 
                            value={editingMediaItem.type}
                            onChange={(e) => setEditingMediaItem({ ...editingMediaItem, type: e.target.value as any })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          >
                            <option value="video">YouTube Video Link</option>
                            <option value="image">High-Definition Image</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[9px] text-gray-400 uppercase">CATEGORY</label>
                          <select 
                            value={editingMediaItem.category}
                            onChange={(e) => setEditingMediaItem({ ...editingMediaItem, category: e.target.value as any })}
                            className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                          >
                            <option value="Highlight">Highlight Clips</option>
                            <option value="Vlog">Team Vlogs</option>
                            <option value="Wallpaper">Desktop Wallpapers</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">MEDIA SOURCE URL / EMBED LINK</label>
                        <input 
                          type="text"
                          value={editingMediaItem.url}
                          onChange={(e) => setEditingMediaItem({ ...editingMediaItem, url: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">THUMBNAIL IMAGE URL</label>
                        <input 
                          type="text"
                          value={editingMediaItem.thumbnail}
                          onChange={(e) => setEditingMediaItem({ ...editingMediaItem, thumbnail: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingMediaItem(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSaveMediaItem}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT MEDIA
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 7: PACT PARTNERS (SPONSOR CMS) */}
            {activeTab === 'sponsors' && (
              <motion.div
                key="sponsors-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!editingSponsor ? (
                  <div className="glass-card rounded-lg p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        PACT PARTNERS & SPONSOR LOGS
                      </h3>
                      <button
                        onClick={handleAddNewSponsor}
                        className="px-4 py-2 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2 transition-all shadow-md border-b-2 border-brand-red-dark"
                      >
                        <Plus className="h-4 w-4" />
                        LOG PACT PARTNER
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-gray-400 uppercase">
                            <th className="pb-3 font-bold tracking-wider">Partner Name</th>
                            <th className="pb-3 font-bold tracking-wider">Partner Tier</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          {sponsors.map(s => (
                            <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3 font-semibold text-white">{s.name}</td>
                              <td className="py-3">
                                <span className="px-1.5 py-0.5 bg-black border border-white/10 rounded font-bold text-brand-red-light uppercase">
                                  {s.tier} PARTNER
                                </span>
                              </td>
                              <td className="py-3 text-right flex gap-2 justify-end">
                                <button 
                                  onClick={() => handleEditSponsor(s)}
                                  className="p-1 text-gray-400 hover:text-white bg-zinc-950 rounded border border-white/5"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteSponsor(s.id)}
                                  className="p-1 text-gray-500 hover:text-brand-red bg-zinc-950 rounded border border-white/5"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-6 md:p-8 border border-white/5 space-y-6">
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      {isNewSponsor ? 'ALIGN PARTNER SHIELD' : 'EDIT PARTNERSHIP TIERS'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">PARTNER BRAND NAME</label>
                        <input 
                          type="text"
                          value={editingSponsor.name}
                          onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-gray-400 uppercase">PARTNERSHIP TIER LEVEL</label>
                        <select 
                          value={editingSponsor.tier}
                          onChange={(e) => setEditingSponsor({ ...editingSponsor, tier: e.target.value as any })}
                          className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                        >
                          <option value="Title">Title Partner (Primary)</option>
                          <option value="Global">Global Partner</option>
                          <option value="Hardware">Hardware Partner</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-[9px] text-gray-400 uppercase">LOGO KEY / BRAND STYLES</label>
                      <input 
                        type="text"
                        value={editingSponsor.logo}
                        onChange={(e) => setEditingSponsor({ ...editingSponsor, logo: e.target.value })}
                        placeholder="e.g. MONSTER"
                        className="w-full bg-black border border-white/10 rounded p-3 font-mono text-xs text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-6">
                      <button
                        onClick={() => setEditingSponsor(null)}
                        className="px-4 py-2.5 bg-zinc-900 border border-white/10 rounded font-display font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-white"
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={handleSaveSponsor}
                        className="px-5 py-2.5 bg-brand-red hover:bg-brand-red-light text-white font-display font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 border-b-2 border-brand-red-dark shadow-md"
                      >
                        <Save className="h-4 w-4" />
                        COMMIT PARTNER
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 8: INDUCTIONS (RECRUITMENT APPLICATIONS CMS) */}
            {activeTab === 'applications' && (
              <motion.div
                key="apps-cms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="glass-card rounded-lg p-6 border border-white/5">
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-wider mb-6">
                    ROSTER CANDIDATE INDUCTIONS
                  </h3>

                  {applications.length > 0 ? (
                    <div className="space-y-6">
                      {applications.map(app => (
                        <div 
                          key={app.id}
                          className="p-5 bg-black/60 rounded-lg border border-white/10 relative overflow-hidden space-y-4"
                        >
                          {/* Top row */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-3">
                            <div>
                              <span className="font-display font-black text-lg text-white block">
                                {app.ign}
                              </span>
                              <span className="font-mono text-[9px] text-gray-500 uppercase">
                                Real: {app.name} | Age: {app.age} | Email: {app.email}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                                app.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                                app.status === 'Declined' ? 'bg-red-500/10 text-red-400' :
                                'bg-amber-500/10 text-amber-400 animate-pulse'
                              }`}>
                                STATUS: {app.status}
                              </span>
                            </div>
                          </div>

                          {/* Stats parameters */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                            <div className="bg-zinc-950 p-2.5 rounded border border-white/5">
                              <span className="text-[9px] text-gray-500 uppercase block">DESIRED ROLE</span>
                              <span className="font-bold text-white uppercase mt-0.5 block">{app.role}</span>
                            </div>
                            <div className="bg-zinc-950 p-2.5 rounded border border-white/5">
                              <span className="text-[9px] text-gray-500 uppercase block">LIFETIME K/D</span>
                              <span className="font-bold text-brand-red mt-0.5 block">{app.kdRatio.toFixed(2)}</span>
                            </div>
                            <div className="bg-zinc-950 p-2.5 rounded border border-white/5">
                              <span className="text-[9px] text-gray-500 uppercase block">HARDWARE CORES</span>
                              <span className="font-bold text-white mt-0.5 block leading-none line-clamp-1">{app.device}</span>
                            </div>
                            <div className="bg-zinc-950 p-2.5 rounded border border-white/5">
                              <span className="text-[9px] text-gray-500 uppercase block">DISCORD TAG</span>
                              <span className="font-bold text-white mt-0.5 block">{app.discordId}</span>
                            </div>
                          </div>

                          {/* Biography motivation letter */}
                          <div className="bg-black p-4 rounded text-xs text-gray-400 font-sans leading-relaxed">
                            <strong className="text-white block font-mono text-[9px] mb-1.5 uppercase">DOSSIER MOTIVATION:</strong>
                            {app.motivation}
                          </div>

                          {/* Action review row */}
                          <div className="flex justify-between items-center border-t border-white/5 pt-4">
                            <button
                              onClick={() => handleDeleteApplication(app.id)}
                              className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-brand-red text-[10px] font-mono text-gray-400 hover:text-brand-red uppercase rounded"
                            >
                              PURGE FILE
                            </button>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleReviewApplication(app.id, 'Declined')}
                                className="px-3 py-1.5 bg-red-950/40 hover:bg-brand-red text-red-400 hover:text-white rounded font-mono text-[10px] uppercase font-bold border border-brand-red/30 transition-all"
                              >
                                DECLINE
                              </button>
                              <button
                                onClick={() => handleReviewApplication(app.id, 'Approved')}
                                className="px-4 py-1.5 bg-green-950/40 hover:bg-green-600 text-green-400 hover:text-white rounded font-mono text-[10px] uppercase font-bold border border-green-500/30 transition-all"
                              >
                                APPROVE
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/5 rounded-lg text-gray-500 font-mono text-xs uppercase tracking-widest">
                      NO ACTIVE ROSTER INDUCTION CORRESPONDENCE RECORDED
                    </div>
                  )}

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
