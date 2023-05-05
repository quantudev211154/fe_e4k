export enum EWordLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface INewWord {
  engVer: string;
  vieVers: string[];
  images: string[];
  audios: string[];
}

export interface IWord {
  _id: string;
  engVer: string;
  vieVers: string[];
  level: EWordLevel;
  images: string[];
  audios: string[];
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}
