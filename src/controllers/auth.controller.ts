import { AuthLoginDto, CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/interfaces/users.interface';
import { AuthService } from '@/services/auth.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: CreateUserDto = req.body;
      const user: User = await this.auth.signup(body);

      res.status(201).json({ user, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: AuthLoginDto = req.body;
      const { token, user } = await this.auth.login(body);
      res.status(200).json({ user, token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
