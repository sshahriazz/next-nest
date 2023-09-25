import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', nullable: true })
  lastname?: string;

  @Column({ type: 'varchar' })
  password: string;
}
