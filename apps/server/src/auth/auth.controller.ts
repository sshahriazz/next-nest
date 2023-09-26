import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignupInput } from './dto/signup.input';
import { UserEntity } from './entities/user.entity';
import { IsPublic } from './public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @IsPublic()
  async signup(@Body() signupInput: SignupInput) {
    const { accessToken, refreshToken } = await this.authService.createUser(
      signupInput,
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  @Post('login')
  @IsPublic()
  async login(@Body() { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login(
      email.toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
  @Post('refresh-token')
  @IsPublic()
  async refreshToken(@Body() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }

  @Get('user/:access_token')
  @IsPublic()
  @ApiOkResponse({ type: UserEntity })
  async user(@Param('access_token') accessToken: string): Promise<UserEntity> {
    return await this.authService.getUserFromToken(accessToken);
  }
}
