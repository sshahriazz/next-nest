import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserInput {
  @ApiProperty()
  @IsString()
  @Length(3, 35)
  firstname: string;
  @ApiProperty()
  @IsString()
  @Length(3, 35)
  lastname: string;

  @ApiProperty({ enum: [UserRole], default: [UserRole.USER] })
  @IsNotEmpty()
  role: [UserRole];
}
