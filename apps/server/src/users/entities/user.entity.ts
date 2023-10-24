import CommonEntity from '@server/common/configs/common-entity';
import { Resume } from '@server/resume/entity/resume.entity';
import { Entity, Column, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('user')
export class User extends CommonEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

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

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  is2fa: boolean;

  @Column({ type: 'varchar', default: 'secret' })
  secret2fa: string;

  @Column({ type: 'boolean', default: false })
  disableAccess: boolean;

  @OneToMany(() => Resume, (resume) => resume.author, {
    cascade: true,
    eager: true,
  })
  resumes: Resume[];
}
