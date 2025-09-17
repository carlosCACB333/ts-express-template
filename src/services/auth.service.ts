import { AuthLoginDto, CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { TokenData } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { logger } from '@/utils/logger';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser = await this.users.findUnique({
      where: { email: userData.email },
    });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      data: { ...userData, password: hashedPassword },
    });

    return createUserData;
  }

  public async login(userData: AuthLoginDto): Promise<{ token: TokenData; user: User }> {
    const user = await this.users.findUnique({
      where: { email: userData.email },
    });
    if (!user) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const token = this.createToken(user);

    return {
      token,
      user,
    };
  }

  public createToken(user: User): TokenData {
    // const dataStoredInToken: DataStoredInToken = { id: user.id };
    // const secretKey: string = SECRET_KEY;

    logger.info('Creating token...', user);
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      accessToken: '',
      refreshToken: '',
      //   token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }
}
