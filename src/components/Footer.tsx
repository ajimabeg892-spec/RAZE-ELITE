import React from 'react';
import { Shield, Mail, Phone, Cpu, MapPin, ExternalLink, Calendar, Heart, Instagram, MessageSquare } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: string) => void;
  sponsors: { id: string; name: string; logo: string; tier: string }[];
}

export default function Footer({ onNavigate, sponsors }: FooterProps) {
  
  const handleLinkClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/5 py-16 overflow-hidden">
      
      {/* Background lasers glowing details */}
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-[350px] h-[350px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* 1. DYNAMIC SPONSOR ALIGNMENT SCROLL */}
        <div className="border-b border-white/5 pb-12">
          <div className="text-center mb-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-brand-red-light uppercase block">
              SECURED TECH ALLIANCES
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
            {sponsors.map(sp => (
              <div 
                key={sp.id}
                className="flex items-center gap-2 font-display font-black text-white text-sm uppercase tracking-widest border border-white/5 px-4 py-2 bg-brand-charcoal/30 rounded"
              >
                <Cpu className="h-4 w-4 text-brand-red-light animate-pulse" />
                <span>{sp.name}</span>
                <span className="font-mono text-[7px] text-gray-500 uppercase tracking-widest ml-1 bg-black px-1 py-0.5 rounded">
                  {sp.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. THREE-COLUMN INFORMATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-auto" glow={true} />
              <div>
                <h3 className="font-display font-black text-sm text-white uppercase tracking-wider">
                  RAZE ELITE
                </h3>
                <span className="font-mono text-[8px] text-brand-red-light uppercase">
                  CHAMPIONS DECK
                </span>
              </div>
            </div>

            <p className="text-gray-400 font-sans text-xs leading-relaxed uppercase">
              WE SHAPE CHAMPIONS.<br />
              WE SHATTER LIMITS.
            </p>

            <div className="font-mono text-[9px] text-gray-500 space-y-1.5 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-red-light" />
                <span>SECTOR 47, JAKARTA CENTRAL, ID</span>
              </div>
              <a href="tel:+918984250035" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 text-brand-red-light" />
                <span>+91 89842 50035</span>
              </a>
              <a href="https://instagram.com/official.razeelite" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Instagram className="h-3.5 w-3.5 text-brand-red-light" />
                <span>@official.razeelite</span>
              </a>
              <a href="https://discord.gg/GTNeDDJc2" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MessageSquare className="h-3.5 w-3.5 text-brand-red-light" />
                <span>DISCORD: RAZE ELITE</span>
              </a>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-brand-red-light" />
                <span>SECURE ENCRYPT: FFWC-2026-OK</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              TACTICAL SECTORS
            </h4>
            <div className="flex flex-col gap-2.5 font-display font-bold text-xs">
              <button onClick={() => handleLinkClick('hero')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Operations</button>
              <button onClick={() => handleLinkClick('about')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Our Story</button>
              <button onClick={() => handleLinkClick('roster')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Pilots / Roster</button>
              <button onClick={() => handleLinkClick('matches')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Championship Schedules</button>
            </div>
          </div>

          {/* Col 3: Secondary Links */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              WAREHOUSE & FEEDS
            </h4>
            <div className="flex flex-col gap-2.5 font-display font-bold text-xs">
              <button onClick={() => handleLinkClick('store')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Merchandise Store</button>
              <button onClick={() => handleLinkClick('media')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Media & Highlights</button>
              <button onClick={() => handleLinkClick('fanzone')} className="text-left text-gray-400 hover:text-brand-red transition-all uppercase">Join Ranks / Induction</button>
              <button onClick={() => handleLinkClick('admin')} className="text-left text-gray-500 hover:text-white transition-all uppercase">CMS Security Vault</button>
            </div>
          </div>

          {/* Col 4: Bio logs / Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              OPERATIONAL BULLETIN
            </h4>
            <p className="text-gray-400 font-sans text-xs leading-relaxed">
              Raze Elite operates as a legitimate, registered esports organization. All tournament assets are compliant with the Free Fire World Cup tournament regulations. Secure key transmissions are protected by community protocol.
            </p>
          </div>

        </div>

        {/* 3. COPYRIGHTS & SECURE LOG FOOTER BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-gray-600">
          <div>
            &copy; {new Date().getFullYear()} RAZE ELITE ESPORTS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1.5 text-brand-red-light/50">
            <span>DEVELOPED WITH PURE INTENT & CHAMPION SPIRIT</span>
            <Heart className="h-3.5 w-3.5 fill-brand-red text-brand-red" />
          </div>
          <div>
            CLIENT_IP_SECURE: LOGGED
          </div>
        </div>

      </div>
    </footer>
  );
}
