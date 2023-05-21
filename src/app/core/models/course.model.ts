import { IUser } from './auth.model';
import { IWord } from './word.model';

export enum ECLRStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export enum ERoundPlayType {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export enum ECourseLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface IRoundAudio {
  _id: string;
  url: string;
}

export interface IRoundImage {
  _id: string;
  url: string;
}

export interface IRoundWord {
  _id: string;
  content: string;
  word: IWord;
}

export interface IRound {
  _id: string;
  title: string;
  type: ECLRStatus;
  level: number;
  playType: ERoundPlayType;
  score: number;
  audio: IRoundAudio[];
  images: IRoundImage[];
  words: IRoundWord[];
}

/**
 * Ech object children in Array will be allocated a _id
 */
export interface ILession {
  _id: string;
  title: string;
  type: ECLRStatus;
  level: number;
  description: string;
  creator: IUser;
  rounds: IRound[];
}

export interface ICourse {
  _id: string;
  title: string;
  description?: string;
  creator: IUser;
  type: ECLRStatus;
  position: number;
  level: ECourseLevel;
  lessions: ILession[];
  isDeleted?: boolean;
  deletedBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewRound {
  playType: number;
}
