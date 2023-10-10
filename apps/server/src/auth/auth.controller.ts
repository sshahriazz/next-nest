import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { UserEntity } from './entities/user.entity';
import { IsPublic } from './public.decorator';
import { UserRole } from '@server/users/entities/user.entity';
import { ResponseObject } from '@server/common/configs/config.interface';
import { LoginResponse, SignupResponse } from './entities/token.entity';
import { Request, Response } from 'express';
import { MailerService } from '@server/mailer/mailer.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('signup')
  @IsPublic()
  async signup(
    @Body() signupInput: SignupInput,
  ): Promise<ResponseObject<SignupResponse>> {
    const userData = await this.authService.createUser(signupInput);
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = userData;
    return {
      message: `${user.email} user Signed up successfully`,
      status: HttpStatus.CREATED,
      url: '/auth/signup',
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  }
  @Post('signin')
  @IsPublic()
  async login(
    @Body() { email, password }: LoginInput,
  ): Promise<ResponseObject<LoginResponse>> {
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = await this.authService.login(email.toLowerCase(), password);

    return {
      message: `${email} user logged in successfully`,
      status: HttpStatus.OK,
      url: '/auth/login',
      data: {
        user,
        tokens: { accessToken, refreshToken },
      },
    };
  }

  @Get('send-verification-email')
  @IsPublic()
  async sendVerificationEmail(
    @Query('email') email: string,
    @Query('callback') callback: string,
  ) {
    const link = await this.authService.verifyUserEmail(email, callback);
    await this.mailerService.sendMail(
      {
        name: email,
        verificationLink: link,
        companyName: 'Coding Ninja',
      },
      'action',
      email,
    );
    return {
      status: HttpStatus.OK,
    };
  }

  @IsPublic()
  @Get('verify-email')
  async verifyEmail(
    @Query('verify') token: string,
    @Query('callback') callback: string,
    @Query('failCallback') failCallback: string,
    @Res() res: Response,
  ) {
    const isSuccess = await this.authService.verifyEmailAndUpdateUser(token);
    if (isSuccess) {
      return res.redirect(callback);
    } else {
      return res.redirect(failCallback);
    }
  }

  @Get('refresh-token')
  @IsPublic()
  async refreshToken(@Req() req: Request) {
    const refreshTokenString = req.headers['cookie'];
    const token = refreshTokenString.split('=')[1].split(';')[0];

    return this.authService.refreshToken(token);
  }

  @Get('user/:access_token')
  // @IsPublic()
  async user(@Param('access_token') accessToken: string): Promise<UserEntity> {
    return await this.authService.getUserFromToken(accessToken);
  }
  @Post('update-role/:id')
  @IsPublic()
  @ApiBody({ enum: UserRole, isArray: true })
  async updateRole(@Param('id') id: string, @Body() role: UserRole[]) {
    const data = await this.authService.updateUserRole(id, role);

    return {
      message: 'User role updated',
      data,
    };
  }
}
