import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import {
  NestConfig,
  SecurityConfig,
} from '@server/common/configs/config.interface';
import { LoginResponse, SignupResponse, Token } from './entities/token.entity';
import { PasswordService } from './password.service';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '@server/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@server/mailer/mailer.service';

type JWTPayload = {
  userId: string;
  email: string;
  role: UserRole[];
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
    private readonly mailerService: MailerService,
  ) {}

  async createUser(payload: SignupInput): Promise<SignupResponse> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.userRepository.save({
      ...payload,
      password: hashedPassword,
    });

    const constructUser = {
      id: user.id,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };

    const tokens = this.generateTokens({ ...constructUser, userId: user.id });

    return {
      tokens,
      user: constructUser,
    } satisfies SignupResponse;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
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
    const constructUser = {
      id: user.id,
      firstname: user.firstname,
      role: user.role,
      lastname: user.lastname,
      email: user.email,
    };
    const tokens = this.generateTokens({ ...constructUser, userId: user.id });
    return {
      tokens,
      user: constructUser,
    };
  }

  async validateUser(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async getUserFromToken(token: string): Promise<UserEntity> {
    const id = await this.jwtService.decode(token)['sub'];
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
    return this.jwtService.sign(payload, {
      expiresIn: '5s',
    });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: 'refresh-secret',
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId, email, firstname, lastname, role } =
        this.jwtService.decode(token) as JWTPayload;

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
  updateUserRole(userId: string, role: UserRole[]) {
    return this.userRepository.update(userId, { role });
  }

  async resetPassword(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPassword = bcrypt.hashSync(password, 10);
    this.userRepository.update(user.id, { password: newPassword });
  }

  async verifyEmailAndUpdateUser(token: string) {
    const valid = await this.jwtService.verify(token, {
      secret: 'VERIFY_EMAIL_SECRET',
    });
    if (!valid) {
      return false;
    }
    const decode = this.jwtService.decode(token);
    const user = await this.userRepository.findOne({
      where: { id: decode.sub },
    });
    if (!user) {
      return false;
    }
    const update = await this.userRepository.update(user.id, {
      emailVerified: true,
    });
    if (update.affected === 1) {
      return true;
    }
    return false;
  }

  async verifyUserEmail(email: string, callback: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user.emailVerified) {
      throw new ConflictException('User already verified');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      emailVerified: true,
    };

    const generateSecretToken = this.jwtService.sign(payload, {
      secret: 'VERIFY_EMAIL_SECRET',
      expiresIn: '30m',
    });
    return `${
      this.configService.get<NestConfig>('nest').url
    }/auth/verify-email?verify=${generateSecretToken}&callback=${callback}`;
  }
}
