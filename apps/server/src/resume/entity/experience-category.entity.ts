import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from './resume.entity';
import CommonEntity from '@server/common/configs/common-entity';
import { Experience } from './experience.entity';

@Entity('experience_category')
export class ExperienceCategory extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  name: string;
  @Column({ type: 'varchar', nullable: true, default: '' })
  description: string;

  @OneToMany(() => Experience, (experience) => experience.category, {
    cascade: true,
  })
  experiences: Experience[];

  @ManyToOne(() => Resume, (resume) => resume.experienceCategories)
  resume: Resume;
}
