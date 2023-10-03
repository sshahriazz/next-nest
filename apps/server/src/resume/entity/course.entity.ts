import CommonEntity from '@server/common/configs/common-entity';
import { Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity('course')
export class Course extends CommonEntity {
  @ManyToOne(() => Resume, (resume) => resume.courses)
  resume: Resume;
}
