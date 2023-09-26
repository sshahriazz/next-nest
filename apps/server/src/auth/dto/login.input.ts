import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

export class LoginInput {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
