import { IAms } from '@server/email/entity/iam.entity';
import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.USER],
  })
  role: UserRole[];

  @Column({ type: 'varchar', nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', nullable: true })
  lastname?: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => IAms, (emailIAms) => emailIAms.user, {
    cascade: true,
  })
  emailIAms: IAms[];
}
