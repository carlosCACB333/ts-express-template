import { User } from '@/interfaces/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
