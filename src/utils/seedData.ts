import { Player, Merchandise, Achievement, TournamentMatch, MediaItem, Sponsor, FanLeaderboardEntry, RecruitmentApplication } from '../types';

export const INITIAL_PLAYERS: Player[] = [
  {
    id: '1',
    ign: 'RAZE_VIPER',
    realName: 'Arhan "Viper" Pratama',
    country: 'Indonesia',
    flag: '🇮🇩',
    jerseyNumber: 7,
    role: 'IGL',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 412,
      kills: 1892,
      kdRatio: 4.59,
      headshotPercent: 62.4,
      avgDamage: 1485,
      booyahCount: 182,
      mvpAwards: 34,
      tournamentWins: 12,
      winRate: 74,
      recentKills: [6, 4, 9, 7, 5, 8, 11, 4, 8, 6]
    },
    career: {
      joiningDate: '2024-01-15',
      previousTeams: ['EVOS Divine', 'RRQ Hades'],
      competitiveHistory: [
        'Free Fire World Series 2024 - 2nd Place',
        'Free Fire World Cup 2025 - 1st Place',
        'Snapdragon Pro Series 2025 - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm1', tournamentName: 'FF World Cup 2025 - Grand Finals', opponent: 'LOUD Esports', placement: '1st', kills: 14, damage: 2450, date: '2025-11-23' },
      { id: 'm2', tournamentName: 'Snapdragon Pro Series - Semis', opponent: 'Magic Squad', placement: '1st', kills: 9, damage: 1980, date: '2025-08-14' },
      { id: 'm3', tournamentName: 'FF Master League Season 9', opponent: 'EVOS Divine', placement: '2nd', kills: 8, damage: 1650, date: '2025-05-10' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025)',
      '🎖️ Tournament MVP (FFWC 2025)',
      '🔥 Pro Series Gold Medalist (2025)'
    ],
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      discord: 'https://discord.gg'
    }
  },
  {
    id: '2',
    ign: 'RAZE_MAESTRO',
    realName: 'Liam "Maestro" Vance',
    country: 'United States',
    flag: '🇺🇸',
    jerseyNumber: 99,
    role: 'Sniper',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 398,
      kills: 1745,
      kdRatio: 5.12,
      headshotPercent: 78.5,
      avgDamage: 1620,
      booyahCount: 164,
      mvpAwards: 28,
      tournamentWins: 10,
      winRate: 68,
      recentKills: [3, 5, 8, 4, 12, 6, 7, 5, 9, 10]
    },
    career: {
      joiningDate: '2024-03-22',
      previousTeams: ['Luminosity Gaming', 'Tribe Gaming'],
      competitiveHistory: [
        'Free Fire World Series 2024 - 3rd Place',
        'Free Fire World Cup 2025 - 1st Place',
        'Copa America 2025 - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm4', tournamentName: 'FF World Cup 2025 - Grand Finals', opponent: 'LOUD Esports', placement: '1st', kills: 11, damage: 2950, date: '2025-11-23' },
      { id: 'm5', tournamentName: 'Copa America 2025', opponent: 'Fluxo', placement: '1st', kills: 14, damage: 3200, date: '2025-09-02' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025)',
      '🎖️ Best Sniper Award (FFWS 2024)',
      '🎯 Highest Headshot % (FFML 2025)'
    ],
    socialLinks: {
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com'
    }
  },
  {
    id: '3',
    ign: 'RAZE_ZEUS',
    realName: 'Kaelen "Zeus" Thorne',
    country: 'Brazil',
    flag: '🇧🇷',
    jerseyNumber: 10,
    role: 'Support',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 450,
      kills: 1240,
      kdRatio: 3.10,
      headshotPercent: 44.2,
      avgDamage: 1150,
      booyahCount: 210,
      mvpAwards: 12,
      tournamentWins: 14,
      winRate: 82,
      recentKills: [2, 3, 5, 2, 4, 3, 6, 1, 5, 4]
    },
    career: {
      joiningDate: '2023-11-01',
      previousTeams: ['LOUD', 'Fluxo'],
      competitiveHistory: [
        'LBFF Series A - 1st Place',
        'Free Fire World Cup 2025 - 1st Place',
        'SPS Season 3 LATAM - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm6', tournamentName: 'FF World Cup 2025 - Grand Finals', opponent: 'LOUD Esports', placement: '1st', kills: 4, damage: 1540, date: '2025-11-23' },
      { id: 'm7', tournamentName: 'LBFF Series A', opponent: 'Magic Squad', placement: '1st', kills: 6, damage: 1200, date: '2025-04-18' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025)',
      '🛡️ Support of the Year (LBFF 2025)',
      '❤️ Most Revives Award (FFWC 2025)'
    ],
    socialLinks: {
      instagram: 'https://instagram.com',
      discord: 'https://discord.gg'
    }
  },
  {
    id: '4',
    ign: 'RAZE_REAPER',
    realName: 'Kenji "Reaper" Sato',
    country: 'Japan',
    flag: '🇯🇵',
    jerseyNumber: 13,
    role: 'Rusher',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 380,
      kills: 1950,
      kdRatio: 5.13,
      headshotPercent: 59.8,
      avgDamage: 1710,
      booyahCount: 148,
      mvpAwards: 41,
      tournamentWins: 11,
      winRate: 69,
      recentKills: [8, 12, 10, 6, 7, 14, 5, 9, 11, 8]
    },
    career: {
      joiningDate: '2024-06-01',
      previousTeams: ['Sengoku Gaming', 'REJECT'],
      competitiveHistory: [
        'Free Fire Asia Cup 2024 - 1st Place',
        'Free Fire World Cup 2025 - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm8', tournamentName: 'FF World Cup 2025 - Grand Finals', opponent: 'LOUD Esports', placement: '1st', kills: 16, damage: 3100, date: '2025-11-23' },
      { id: 'm9', tournamentName: 'FF Asia Cup 2024', opponent: 'Buriram United', placement: '1st', kills: 18, damage: 3500, date: '2024-10-12' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025)',
      '💀 MVP of Asia Finals (2024)',
      '⚡ Record Holder: Most Kills in a Single FFWC Map (11 Kills)'
    ],
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '5',
    ign: 'RAZE_PHANTOM',
    realName: 'Sofia "Phantom" Silva',
    country: 'Portugal',
    flag: '🇵🇹',
    jerseyNumber: 8,
    role: 'Flex Player',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 280,
      kills: 1120,
      kdRatio: 4.00,
      headshotPercent: 55.4,
      avgDamage: 1350,
      booyahCount: 110,
      mvpAwards: 16,
      tournamentWins: 8,
      winRate: 72,
      recentKills: [4, 6, 5, 8, 3, 7, 9, 4, 6, 7]
    },
    career: {
      joiningDate: '2025-01-10',
      previousTeams: ['Grow uP eSports'],
      competitiveHistory: [
        'Free Fire Europe Pro League - 1st Place',
        'Free Fire World Cup 2025 - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm10', tournamentName: 'FF World Cup 2025 - Grand Finals', opponent: 'LOUD Esports', placement: '1st', kills: 8, damage: 1850, date: '2025-11-23' },
      { id: 'm11', tournamentName: 'FF Europe Pro League', opponent: 'Vasto Mundo', placement: '1st', kills: 12, damage: 2400, date: '2024-11-05' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025)',
      '🌟 Europe League MVP (2024)'
    ],
    socialLinks: {
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    }
  },
  {
    id: '6',
    ign: 'RAZE_SHADOW',
    realName: 'Devin "Shadow" Vance',
    country: 'United States',
    flag: '🇺🇸',
    jerseyNumber: 21,
    role: 'Support',
    status: 'Substitute',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500',
    stats: {
      matches: 120,
      kills: 340,
      kdRatio: 2.83,
      headshotPercent: 41.5,
      avgDamage: 920,
      booyahCount: 42,
      mvpAwards: 3,
      tournamentWins: 4,
      winRate: 60,
      recentKills: [1, 3, 2, 4, 1, 2, 5, 2, 3, 1]
    },
    career: {
      joiningDate: '2025-04-01',
      previousTeams: ['Tribe Gaming'],
      competitiveHistory: [
        'Free Fire World Cup 2025 - 1st Place (Substitute)',
        'SPS NA Open 2025 - 1st Place'
      ]
    },
    matchRecords: [
      { id: 'm12', tournamentName: 'SPS NA Open 2025', opponent: 'Furious Gaming', placement: '1st', kills: 5, damage: 1100, date: '2025-07-20' }
    ],
    achievements: [
      '🏆 World Champion (FFWC 2025) (Substitute)',
      '🔥 SPS Open Champion (2025)'
    ],
    socialLinks: {
      instagram: 'https://instagram.com'
    }
  }
];

export const INITIAL_MERCHANDISE: Merchandise[] = [
  {
    id: 'merch-1',
    name: 'RAZE ELITE CHAMPIONSHIP JERSEY 2026',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=600',
    description: 'The official 2026 pro-team jersey, identical to those worn by Viper and Maestro on the FFWC stage. Engineered with aero-weave thermal cooling tech, sharp athletic lines, and official sponsor patches.',
    stock: 240,
    category: 'Jersey',
    isLimitedDrop: false
  },
  {
    id: 'merch-2',
    name: 'RAZE CYBER MATRIX ZIP-HOODIE',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    description: 'Techwear-inspired heavy French Terry hoodie. Features cyberpunk angular red glow typography, double-layered futuristic storm hood, custom utility zippers, and secure magnetic chest pockets.',
    stock: 120,
    category: 'Hoodie',
    isLimitedDrop: false
  },
  {
    id: 'merch-3',
    name: 'STEALTH ARM COMPRESSION SLEEVES',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600',
    description: 'Gaming sleeves engineered for hyper-low friction on mousepads. Features a matte black carbon texture with integrated neon red heat transfer RAZE elite emblem.',
    stock: 350,
    category: 'Accessory',
    isLimitedDrop: false
  },
  {
    id: 'merch-4',
    name: 'LIMITED "APEX REAP" COUTURE JERSEY',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600',
    description: 'Ultra-exclusive premium esports streetwear drop. Only 15 pieces in existence. Hand-numbered embroidery, dynamic heavy reflective red metallic piping, and signed digital COA.',
    stock: 8,
    category: 'Limited Drop',
    isLimitedDrop: true,
    dropDate: '2026-07-15'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Free Fire World Cup 2025 Champions',
    tournament: 'Free Fire World Cup (FFWC) - Bangkok, Thailand',
    placement: '1st',
    date: '2025-11-23',
    prize: '$500,000 USD',
    certificateUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ach-2',
    title: 'Snapdragon Pro Series Challenge Finals',
    tournament: 'Snapdragon Pro Series Season 3 - Riyadh, Saudi Arabia',
    placement: '1st',
    date: '2025-08-17',
    prize: '$150,000 USD',
    certificateUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ach-3',
    title: 'Free Fire Asia Cup 2024 Champion',
    tournament: 'FF Asia Cup - Tokyo, Japan',
    placement: '1st',
    date: '2024-10-12',
    prize: '$100,000 USD'
  },
  {
    id: 'ach-4',
    title: 'LBFF LATAM Masters Championship',
    tournament: 'Liga Brasileira de Free Fire (LBFF) - São Paulo',
    placement: '1st',
    date: '2024-04-18',
    prize: '$75,000 USD'
  }
];

export const INITIAL_MATCHES: TournamentMatch[] = [
  {
    id: 'match-live',
    name: 'Free Fire Champions League - Stage 2',
    date: '2026-06-26',
    time: '19:30',
    opponent: 'LOUD Esports',
    opponentLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=loud',
    stage: 'Upper Bracket Semifinals',
    status: 'Live',
    ourScore: 2,
    opponentScore: 1,
    streamUrl: 'https://youtube.com'
  },
  {
    id: 'match-upcoming',
    name: 'Free Fire Continental Series 2026',
    date: '2026-07-02',
    time: '18:00',
    opponent: 'EVOS Divine',
    opponentLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=evos',
    stage: 'Grand Opening Match',
    status: 'Upcoming',
    streamUrl: 'https://youtube.com'
  },
  {
    id: 'match-completed',
    name: 'Free Fire World Cup 2025',
    date: '2025-11-23',
    time: '21:00',
    opponent: 'Fluxo Gaming',
    opponentLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fluxo',
    stage: 'Grand Finals (BO7)',
    status: 'Completed',
    ourScore: 4,
    opponentScore: 2
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    title: 'VIPER INSANE 1v4 CLUTCH vs EVOS - GRAND FINALS MAP 7',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder embed
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    category: 'Highlight'
  },
  {
    id: 'media-2',
    title: 'RAZE ELITE - WE DON\'T PLAY. WE DOMINATE. (OFFICIAL TEAM ANTHEM)',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    category: 'Vlog'
  },
  {
    id: 'media-3',
    title: 'CHAMPIONS VLOG: HOW WE WON THE $500,000 WORLD CHAMPIONSHIP IN BANGKOK',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&q=80&w=600',
    category: 'Vlog'
  },
  {
    id: 'media-4',
    title: 'RAZE ELITE NEON MATRIX 4K ULTRA WALLPAPER',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    category: 'Wallpaper'
  }
];

export const INITIAL_SPONSORS: Sponsor[] = [
  { id: 'sp-1', name: 'ROG (ASUS Republic of Gamers)', logo: 'ROG', tier: 'Title' },
  { id: 'sp-2', name: 'INTEL Core Ultra', logo: 'INTEL', tier: 'Global' },
  { id: 'sp-3', name: 'MONSTER ENERGY', logo: 'MONSTER', tier: 'Global' },
  { id: 'sp-4', name: 'SECRETLAB Chairs', logo: 'SECRETLAB', tier: 'Hardware' }
];

export const INITIAL_LEADERBOARD: FanLeaderboardEntry[] = [
  { id: 'f-1', username: 'RazeViperFanBoy', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=viperfan', xp: 4850, rank: 1, tier: 'Legend', activities: 42 },
  { id: 'f-2', username: 'FreeFireGladiator', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ffglad', xp: 4200, rank: 2, tier: 'Legend', activities: 38 },
  { id: 'f-3', username: 'RazeMaestroAim', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=maestroaim', xp: 3950, rank: 3, tier: 'Champion', activities: 35 },
  { id: 'f-4', username: 'CyberSlayer99', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=cyber', xp: 3100, rank: 4, tier: 'Champion', activities: 29 },
  { id: 'f-5', username: 'BooyahHunter', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=booyah', xp: 2450, rank: 5, tier: 'Gladiator', activities: 21 },
  { id: 'f-6', username: 'RazeEliteShield', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=shield', xp: 1800, rank: 6, tier: 'Gladiator', activities: 15 }
];

export const INITIAL_APPLICATIONS: RecruitmentApplication[] = [
  {
    id: 'app-1',
    name: 'Siddharth Roy',
    ign: 'RAZE_CYPHER',
    discordId: 'cypher_ff#4242',
    email: 'siddharth@example.com',
    age: 19,
    role: 'Rusher',
    kdRatio: 4.82,
    device: 'iPhone 15 Pro Max',
    motivation: 'I have been dominating the South Asian server for 3 years, holding Grandmaster rank every season. My playstyle is highly aggressive and matches RAZE ELITE\'s dominate-first DNA.',
    status: 'Pending',
    appliedAt: '2026-06-25T14:30:00Z'
  }
];
