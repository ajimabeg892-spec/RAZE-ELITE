export type PlayerRole = 'IGL' | 'Rusher' | 'Sniper' | 'Support' | 'Entry Fragger' | 'Flex Player';
export type PlayerStatus = 'Active' | 'Substitute' | 'Former Player';

export interface PlayerStats {
  matches: number;
  kills: number;
  kdRatio: number;
  headshotPercent: number;
  avgDamage: number;
  booyahCount: number;
  mvpAwards: number;
  tournamentWins: number;
  winRate: number; // e.g. 78 for 78%
  recentKills: number[]; // e.g. [4, 6, 8, 3, 5]
}

export interface PlayerCareer {
  joiningDate: string;
  previousTeams: string[];
  competitiveHistory: string[];
}

export interface MatchRecord {
  id: string;
  tournamentName: string;
  opponent: string;
  placement: string;
  kills: number;
  damage: number;
  date: string;
}

export interface PlayerSocialLinks {
  instagram?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  twitter?: string;
}

export interface Player {
  id: string;
  ign: string;
  realName: string;
  country: string;
  flag: string;
  jerseyNumber: number;
  role: PlayerRole;
  status: PlayerStatus;
  image: string; // URL or Data URI
  stats: PlayerStats;
  career: PlayerCareer;
  matchRecords: MatchRecord[];
  achievements: string[]; // text summaries or links
  socialLinks: PlayerSocialLinks;
}

export interface Merchandise {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: 'Jersey' | 'Hoodie' | 'Accessory' | 'Limited Drop';
  isLimitedDrop: boolean;
  dropDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  tournament: string;
  placement: '1st' | '2nd' | '3rd' | 'MVP';
  date: string;
  prize: string;
  certificateUrl?: string;
}

export interface TournamentMatch {
  id: string;
  name: string;
  date: string;
  time: string;
  opponent: string;
  opponentLogo: string;
  stage: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  ourScore?: number;
  opponentScore?: number;
  streamUrl?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image';
  url: string; // YouTube embed link or high-quality image URL
  thumbnail: string;
  category: 'Highlight' | 'Vlog' | 'Wallpaper';
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string; // inline custom SVG path or beautiful styled badge
  tier: 'Title' | 'Global' | 'Hardware';
}

export interface RecruitmentApplication {
  id: string;
  name: string;
  ign: string;
  discordId: string;
  email: string;
  age: number;
  role: PlayerRole;
  kdRatio: number;
  device: string;
  motivation: string;
  status: 'Pending' | 'Approved' | 'Declined';
  appliedAt: string;
}

export interface FanLeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  rank: number;
  tier: 'Elite' | 'Champion' | 'Gladiator' | 'Legend';
  activities: number; // number of cheered matches/activities
}
