import { Exclude } from 'class-transformer';
import { IAms, SmtpConfig, SmtpCredentials } from '../entity/iam.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsString } from 'class-validator';
import { User } from '@server/users/entities/user.entity';

export class CreateEmailIAmsDto implements IAms {
  @Exclude()
  id: string;
  @ApiProperty()
  @IsEmpty()
  @IsString()
  type: string;
  @ApiProperty()
  @IsEmpty()
  @IsString()
  subType: string;
  @ApiProperty()
  @IsEmpty()
  @IsString()
  description: string;
  @IsEmpty()
  @ApiProperty({
    type: SmtpCredentials,
    example: {
      name: 'aws',
      access_key: '823kshfsk2039',
      secret_key: 'sfjlsfs38947',
    },
  })
  credentials: SmtpCredentials;
  @ApiProperty({
    type: SmtpConfig,
    example: {
      host: 'smtp.gmail.com',
      port: '5545',
      from: 'from@email.com',
      to: 'to@gmail.com',
      secure: true,
    },
  })
  config: SmtpConfig;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
  @Exclude()
  user: User;
}
