import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class ChangePasswordInput {
  id: string;
  @IsStrongPassword()
  @ApiProperty()
  oldPassword: string;
  @IsStrongPassword()
  @ApiProperty()
  newPassword: string;
}
