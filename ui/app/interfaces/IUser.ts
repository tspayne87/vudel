import { IAddress } from './IAddress';
import { IRole } from './IRole';

export interface IUser {
  email: string;
  password: string;

  role?: IRole;
  addresses: IAddress[];
}