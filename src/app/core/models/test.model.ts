import { IUser } from './auth.model';

export enum ETestAttachmentType {
  NONE = 'NONE',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
}

export enum ETestLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
}

export interface ITestAnswer {
  _id: string;
  answerId: String;
  content: String;
}

export interface ITest {
  _id: string;
  level: string;
  question: string;
  attachment: string;
  attachmentType: string;
  correctAnswer: string;
  answers: ITestAnswer[];
  score: number;
  isDeleted: boolean;
  deletedBy: IUser | null;
  creator: IUser;
  createdAt: string;
  updatedAt: Date;
}

export interface INewTestAnswer {
  answerId: string;
  content: string;
}

export interface INewTest {
  level: string;
  question: string;
  attachment: string;
  attachmentType: string;
  correctAnswer: string;
  answers: INewTestAnswer[];
}
