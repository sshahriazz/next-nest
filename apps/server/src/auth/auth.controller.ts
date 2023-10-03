import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Req,
  BadRequestException,
  HttpException,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignupInput } from './dto/signup.input';
import { UserEntity } from './entities/user.entity';
import { IsPublic } from './public.decorator';
import { UserRole } from '@server/users/entities/user.entity';
import { ResponseObject } from '@server/common/configs/config.interface';
import { LoginResponse, SignupResponse, Token } from './entities/token.entity';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    @Res({ passthrough: true }) res: Response,
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
  @Post('refresh-token')
  @IsPublic()
  async refreshToken(@Body() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }

  @Get('user/:access_token')
  @IsPublic()
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
