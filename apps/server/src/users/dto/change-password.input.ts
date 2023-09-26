import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordInput {
  id: string;
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
