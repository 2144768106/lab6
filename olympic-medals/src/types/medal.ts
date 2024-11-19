export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  gold: number;
  silver: number;
  bronze: number;
}

export interface MedalDetail {
  id: number;
  countryId: number;
  sport: string;
  athlete: string;
  medalType: 'gold' | 'silver' | 'bronze';
  date: string;
}

export interface Comment {
  id: number;
  countryId: number;
  content: string;
  userName: string;
  createTime: string;
} 