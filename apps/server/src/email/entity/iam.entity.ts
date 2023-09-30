import { ApiProperty } from '@nestjs/swagger';
import { User } from '@server/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class SmtpCredentials {
  @ApiProperty()
  name: string;
  @ApiProperty()
  access_key: string;
  @ApiProperty()
  secret_key: string;
}
export class SmtpConfig {
  @ApiProperty()
  host: string;
  @ApiProperty()
  port: number;
  @ApiProperty()
  secure: boolean;
  @ApiProperty()
  from: string;
  @ApiProperty()
  to: string;
}

@Entity()
export class IAms {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  type: string;
  @Column()
  subType: string;
  @Column()
  description: string;
  @Column({ type: 'json' })
  credentials: SmtpCredentials;
  @Column({ type: 'json' })
  config: SmtpConfig;
  @Column({ type: 'boolean' })
  isActive: boolean;
  user: User;
}
