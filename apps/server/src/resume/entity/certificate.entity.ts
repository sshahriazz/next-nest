import CommonEntity from '@server/common/configs/common-entity';
import { Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity('certificate')
export class Certificate extends CommonEntity {
  @ManyToOne(() => Resume, (resume) => resume.certificates)
  resume: Resume;
}
