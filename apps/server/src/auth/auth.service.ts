import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { SecurityConfig } from '@server/common/configs/config.interface';
import { Token } from './entities/token.entity';
import { PasswordService } from './password.service';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '@server/users/entities/user.entity';
import { Repository } from 'typeorm';

type JWTPayload = {
  userId: string;
  email: string;
  role: UserRole;
  firstname: string;
  lastname: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.userRepository.save({
        ...payload,
        password: hashedPassword,
      });

      return this.generateTokens({
        userId: user.id,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    } catch (e) {
      if (e && e.code === 'P2002') {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
      firstname: user.firstname,
      role: user.role,
      lastname: user.lastname,
      email: user.email,
    });
  }

  async validateUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async getUserFromToken(token: string): Promise<UserEntity> {
    const id = this.jwtService.decode(token)['userId'];
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  generateTokens(payload: JWTPayload): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId, email, firstname, lastname, role } =
        this.jwtService.verify(token, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        });

      return this.generateTokens({
        userId,
        email,
        role,
        firstname,
        lastname,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
