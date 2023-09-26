import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class SignupInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @IsString()
  @Length(3, 35)
  @ApiProperty()
  firstname?: string;

  @IsString()
  @Length(3, 35)
  @ApiProperty()
  lastname?: string;
}
