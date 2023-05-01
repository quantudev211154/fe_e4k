export enum EUserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  PLAYER = 'PLAYER',
}

export interface IUser {
  _id: string;
  phone: string;
  username: string;
  role: EUserRole;
  registerDate: Date;
}

export interface IAuthState {
  isAuth: boolean;
  user: IUser | null;
}
