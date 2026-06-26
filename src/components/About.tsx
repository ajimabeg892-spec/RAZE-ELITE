import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Eye, Calendar, Award, Compass } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2023',
    title: 'THE ASHES OF CREATION',
    description: 'Founding of RAZE ELITE as an underground Free Fire squad. After 3 back-to-back local regional tier-1 cups, the foundation was laid.',
    badge: 'Launch Phase'
  },
  {
    year: '2024',
    title: 'CONTINENTAL GLORY',
    description: 'Claimed 1st place in the Free Fire Asia Cup and dominated LATAM Masters, shocking the established global franchises with an ultra-aggressive rusher style.',
    badge: 'Continental Title'
  },
  {
    year: '2025',
    title: 'THE SUPREME SUMMIT',
    description: 'Crowned Undisputed Champions of the Free Fire World Cup (FFWC) in Bangkok, Thailand. Earned the prestigious $500,000 top prize and set global viewer records.',
    badge: 'World Champions'
  },
  {
    year: '2026',
    title: 'THE FUTURISTIC EMPIRE',
    description: 'Expanding into a premium digital brand ecosystem, releasing elite technical couture drops, and cementing our reign as the undisputed kings of the mobile arena.',
    badge: 'Apex Era'
  }
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 bg-brand-black overflow-hidden cyber-grid">
      
      {/* Decorative backdrop graphics */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
            <Compass className="h-3.5 w-3.5" />
            ORGANIZATION PROFILE
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
            OUR LEGACY OF <span className="text-brand-red">DOMINATION</span>
          </h2>
          <div className="h-1 w-20 bg-brand-red mt-4" />
        </div>

        {/* Bento Grid layout for Story, Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Story Panel - Main 7 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 md:p-10 glass-card rounded-lg relative overflow-hidden group border border-white/5 hover:border-brand-red/30 transition-all duration-300"
          >
            {/* Ambient hover light */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <ShieldCheck className="h-8 w-8 text-brand-red-light mb-6" />
              <h3 className="text-2xl font-bold font-display text-white uppercase tracking-wider mb-4">
                THE SQUAD BORN FROM ASHES
              </h3>
              <p className="text-gray-400 font-sans leading-relaxed mb-6">
                In esports, many play, but only the ruthless endure. Founded in late 2023, <strong className="text-white">RAZE ELITE</strong> emerged not as a commercial project, but as a hyper-trained vanguard of apex competitors who refused to settle for second place. 
              </p>
              <p className="text-gray-400 font-sans leading-relaxed mb-8">
                Operating with tactical discipline, deep mutual synergy, and a razor-focused offensive mindset, our roster transformed the Free Fire landscape forever. We dismantled multi-million dollar organizations through sheer strategic mastery, mechanical excellence, and unmatched courage under fire.
              </p>

              {/* Aggressive Slogan Box */}
              <div className="border-l-4 border-brand-red bg-gradient-to-r from-brand-red/10 to-transparent p-5 rounded-r clip-corner-br">
                <span className="block font-mono text-[10px] tracking-[0.2em] text-brand-red-light uppercase mb-1">
                  CORE DIRECTIVE
                </span>
                <span className="text-2xl font-black font-display text-white uppercase tracking-tight italic red-glow-text">
                  “BUILT TO DOMINATE THE BATTLEFIELD.”
                </span>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision Panels - Right 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 glass-card rounded-lg relative overflow-hidden group border border-white/5 hover:border-brand-red/30 transition-all duration-300 flex-1"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-red/10 border border-brand-red/30 rounded">
                    <Target className="h-5 w-5 text-brand-red-light" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider">
                    OUR MISSION
                  </h3>
                </div>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  To provide an elite developmental crucible for premier tactical competitors, delivering championship titles while building a global digital empire that connects fans, fashion, and competitive dominance.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 glass-card rounded-lg relative overflow-hidden group border border-white/5 hover:border-brand-red/30 transition-all duration-300 flex-1"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-red/10 border border-brand-red/30 rounded">
                    <Eye className="h-5 w-5 text-brand-red-light" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider">
                    OUR VISION
                  </h3>
                </div>
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  To serve as the undisputed titan of mobile gaming culture, setting the global gold standard for performance rosters, premium techwear apparel drops, and revolutionary virtual environments.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Timeline Title */}
        <div className="flex flex-col items-center text-center mb-16 mt-28">
          <h3 className="text-2xl font-black font-display text-white tracking-widest uppercase">
            CHAMPIONSHIP CHRONICLES
          </h3>
          <p className="text-gray-400 text-sm font-mono mt-2 tracking-widest uppercase">
            THE CHRONOLOGICAL PATHWAY OF VICTORIES
          </p>
          <div className="w-12 h-1 bg-brand-red mt-3" />
        </div>

        {/* Timeline Visualization */}
        <div className="relative border-l-2 border-brand-red/20 max-w-4xl mx-auto pl-8 space-y-12 py-4">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div 
              key={event.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[41px] top-1.5 h-6 w-6 rounded-full bg-black border-2 border-brand-red flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:bg-brand-red group-hover:shadow-[0_0_15px_rgba(255,0,0,0.8)]">
                <div className="h-2 w-2 rounded-full bg-white group-hover:bg-black" />
              </div>

              {/* Event Card */}
              <div className="glass-card rounded-lg p-6 hover:bg-brand-charcoal/80 hover:border-brand-red/20 border border-white/5 transition-all duration-300 relative overflow-hidden clip-corner-br">
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-wider bg-brand-red/15 border border-brand-red/30 px-2 py-0.5 rounded text-brand-red-light uppercase">
                    {event.badge}
                  </span>
                  <span className="font-display font-black text-xl text-white tracking-wider">
                    {event.year}
                  </span>
                </div>

                <div className="pr-24">
                  <h4 className="text-lg font-bold font-display text-brand-red-light tracking-wide uppercase mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-400 text-sm font-sans leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
