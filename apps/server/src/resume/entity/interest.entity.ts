import CommonEntity from '@server/common/configs/common-entity';
import { Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity('interest')
export class Interest extends CommonEntity {
  @ManyToOne(() => Resume, (resume) => resume.interests)
  resume: Resume;
}
