import { User } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
