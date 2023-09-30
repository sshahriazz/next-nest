import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@server/users/entities/user.entity';

export class UserEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstname?: string;
  @ApiProperty()
  role: UserRole[];
  @ApiProperty()
  lastname?: string;
}
