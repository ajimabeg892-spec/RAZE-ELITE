import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Image as ImageIcon, Play, Eye, Maximize2, Compass, Download, ArrowRight } from 'lucide-react';
import { MediaItem } from '../types';

interface MediaProps {
  media: MediaItem[];
}

export default function Media({ media }: MediaProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);

  const categories = ['All', 'Highlight', 'Vlog', 'Wallpaper'];

  const filteredMedia = media.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="media" className="relative w-full py-24 bg-brand-charcoal/30 overflow-hidden cyber-grid">
      
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-red-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/30 rounded font-mono text-[10px] tracking-[0.3em] text-brand-red-light uppercase mb-3">
              <Film className="h-3.5 w-3.5" />
              CYBER TRANSMISSION VAULT
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase leading-none">
              MEDIA & <span className="text-brand-red">WALLPAPERS</span>
            </h2>
            <div className="h-1 w-20 bg-brand-red mt-4" />
          </div>

          {/* Categories select */}
          <div className="flex gap-2 bg-black/60 border border-white/5 p-1 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-widest uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-brand-red text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map(item => {
              const isVideo = item.type === 'video';

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setActiveMediaItem(item)}
                  className="glass-card rounded-lg overflow-hidden border border-white/5 hover:border-brand-red/40 hover:bg-brand-charcoal/50 group transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient blur covering */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Overlay Action Triggers */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isVideo ? (
                        <div className="h-12 w-12 rounded-full bg-brand-red border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-red-light transition-all">
                          <Play className="h-5 w-5 fill-white text-white ml-1" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <Maximize2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Category overlay tags */}
                    <span className="absolute bottom-3 left-3 bg-black/80 border border-white/5 px-2 py-0.5 rounded font-mono text-[8px] text-gray-400 tracking-wider uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Body Content Description */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider line-clamp-2 leading-snug group-hover:text-brand-red-light transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 font-mono text-[9px] text-gray-500">
                      <span>TYPE: {item.type.toUpperCase()}</span>
                      <span className="text-brand-red-light font-bold flex items-center gap-1">
                        VIEW TRANSCEIVER
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/5 rounded-lg text-gray-500 font-mono text-xs uppercase tracking-widest">
            NO DIGITAL VAULT CHANNELS FOUND MATCHING CATEGORY
          </div>
        )}

      </div>

      {/* FULL LIGHTBOX MEDIA VIEW POPUP */}
      <AnimatePresence>
        {activeMediaItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-brand-charcoal border border-white/10 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            >
              
              {/* Header */}
              <div className="bg-black/95 px-6 py-4 border-b border-white/15 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-brand-red uppercase">
                    {activeMediaItem.category.toUpperCase()} CHANNELS
                  </span>
                  <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
                    {activeMediaItem.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveMediaItem(null)}
                  className="px-3 py-1 bg-brand-red text-white text-xs font-bold font-mono rounded hover:bg-brand-red-light uppercase"
                >
                  DISCONNECT
                </button>
              </div>

              {/* Main Media viewer stage */}
              <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
                {activeMediaItem.type === 'video' ? (
                  <iframe 
                    className="w-full h-full"
                    src={`${activeMediaItem.url}?autoplay=1`} 
                    title={activeMediaItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                ) : (
                  <img 
                    src={activeMediaItem.url} 
                    alt={activeMediaItem.title} 
                    className="max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* Bottom control bar info */}
              <div className="p-4 bg-black/80 flex items-center justify-between font-mono text-[10px] text-gray-500">
                <span>RE_MEDIA_CHANNEL: {activeMediaItem.id}</span>
                {activeMediaItem.type === 'image' ? (
                  <a 
                    href={activeMediaItem.url}
                    download
                    className="px-3 py-1 bg-white/5 hover:bg-brand-red hover:text-white rounded text-white flex items-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    DOWNLOAD 4K WALLPAPER
                  </a>
                ) : (
                  <span className="text-brand-red-light animate-pulse font-bold">DECRYPTING BROADCAST STREAM</span>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
