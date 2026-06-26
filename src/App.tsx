import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Roster from './components/Roster';
import Matches from './components/Matches';
import Store from './components/Store';
import Media from './components/Media';
import FanZone from './components/FanZone';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

import { 
  Player, Merchandise, Achievement, TournamentMatch, 
  MediaItem, Sponsor, FanLeaderboardEntry, RecruitmentApplication 
} from './types';

import { 
  INITIAL_PLAYERS, INITIAL_MERCHANDISE, INITIAL_ACHIEVEMENTS, 
  INITIAL_MATCHES, INITIAL_MEDIA, INITIAL_SPONSORS, 
  INITIAL_LEADERBOARD, INITIAL_APPLICATIONS 
} from './utils/seedData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('hero');

  // Unified State with local storage persistence
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('raze_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  const [merchandise, setMerchandise] = useState<Merchandise[]>(() => {
    const saved = localStorage.getItem('raze_merchandise');
    return saved ? JSON.parse(saved) : INITIAL_MERCHANDISE;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('raze_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [matches, setMatches] = useState<TournamentMatch[]>(() => {
    const saved = localStorage.getItem('raze_matches');
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('raze_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [sponsors, setSponsors] = useState<Sponsor[]>(() => {
    const saved = localStorage.getItem('raze_sponsors');
    return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
  });

  const [applications, setApplications] = useState<RecruitmentApplication[]>(() => {
    const saved = localStorage.getItem('raze_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [leaderboard, setLeaderboard] = useState<FanLeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('raze_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('raze_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('raze_merchandise', JSON.stringify(merchandise));
  }, [merchandise]);

  useEffect(() => {
    localStorage.setItem('raze_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('raze_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('raze_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('raze_sponsors', JSON.stringify(sponsors));
  }, [sponsors]);

  useEffect(() => {
    localStorage.setItem('raze_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('raze_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  // Handle new recruitment application submission
  const handleRecruitmentSubmit = (newApp: Omit<RecruitmentApplication, 'id' | 'status' | 'appliedAt'>) => {
    const app: RecruitmentApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    setApplications(prev => [app, ...prev]);
  };

  // Section Observer to highlight active Nav Header links on scroll
  useEffect(() => {
    if (currentView === 'admin') return;

    const sections = ['hero', 'about', 'roster', 'matches', 'store', 'media', 'fanzone'];
    const observers = sections.map(secId => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setCurrentView(secId);
        }
      }, { threshold: 0.35 });

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [currentView]);

  return (
    <div className="bg-brand-black text-white min-h-screen font-sans selection:bg-brand-red selection:text-white">
      
      {/* Header navigation bar */}
      <Header currentView={currentView} onNavigate={setCurrentView} />

      {/* Main stage screen rendering */}
      {currentView === 'admin' ? (
        <AdminPanel
          players={players}
          onUpdatePlayers={setPlayers}
          merchandise={merchandise}
          onUpdateMerchandise={setMerchandise}
          achievements={achievements}
          onUpdateAchievements={setAchievements}
          matches={matches}
          onUpdateMatches={setMatches}
          media={media}
          onUpdateMedia={setMedia}
          sponsors={sponsors}
          onUpdateSponsors={setSponsors}
          applications={applications}
          onUpdateApplications={setApplications}
        />
      ) : (
        <main className="w-full">
          <Hero 
            onJoinSquadClick={() => {
              setCurrentView('fanzone');
              document.getElementById('fanzone')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreLegacyClick={() => {
              setCurrentView('about');
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <About />
          <Roster players={players} />
          <Matches matches={matches} />
          <Store products={merchandise} onUpdateProducts={setMerchandise} />
          <Media media={media} />
          <FanZone 
            leaderboard={leaderboard} 
            applications={applications} 
            onSubmitApplication={handleRecruitmentSubmit} 
          />
        </main>
      )}

      {/* Shared footer section */}
      <Footer onNavigate={setCurrentView} sponsors={sponsors} />

    </div>
  );
}
