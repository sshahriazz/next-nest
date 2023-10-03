import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';

@Entity('education')
export class Education extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, default: 'yy' })
  institute: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  degree: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  subject: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  grade: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  major: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  startYear: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  endYear: string;

  @ManyToOne(() => Resume, (resume) => resume.educations)
  resume: Resume;
}
