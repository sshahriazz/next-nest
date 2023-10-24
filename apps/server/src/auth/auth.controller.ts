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
import { ApiResponse } from '@server/common/configs/config.interface';
import { LoginResponse, SignupResponse } from './entities/token.entity';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsPublic()
  async signup(
    @Body() signupInput: SignupInput,
  ): Promise<ApiResponse<SignupResponse>> {
    const userData = await this.authService.createUser(signupInput);
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = userData;
    return {
      status: HttpStatus.CREATED,
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
  ): Promise<ApiResponse<LoginResponse>> {
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = await this.authService.login(email.toLowerCase(), password);

    return {
      status: HttpStatus.OK,
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

    return {
      status: HttpStatus.OK,
      link,
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
    const cookies = req.headers['cookie'];
    if (!cookies) {
      throw new Error('No cookies found');
    }
    const refreshTokenString = cookies.split('refreshToken=')[1].split(';')[0];

    return this.authService.refreshToken(refreshTokenString);
  }

  @Get('user/:access_token')
  // @IsPublic()
  async user(@Param('access_token') accessToken: string): Promise<UserEntity> {
    return await this.authService.getUserFromToken(accessToken);
  }
  @Post('update-role/:id')
  @IsPublic()
  @ApiBody({ enum: UserRole, isArray: true })
  async updateRole(
    @Param('id') id: string,
    @Body() role: UserRole[],
  ): Promise<ApiResponse<any>> {
    const data = await this.authService.updateUserRole(id, role);

    return {
      status: HttpStatus.OK,
      data,
    };
  }
}
