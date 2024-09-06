import type { IUser } from './IUserAuth';

export interface AuthResponseI {
  user: IUser;
  token: string;
}
