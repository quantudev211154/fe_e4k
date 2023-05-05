export enum EWordLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface INewWord {
  engVer: string;
  vieVers: string[];
  level: string;
  images: string[];
  audios: string[];
}
