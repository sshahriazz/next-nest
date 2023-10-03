import CommonEntity from '@server/common/configs/common-entity';
import { Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

@Entity('additional')
export class Additional extends CommonEntity {
  @ManyToOne(() => Resume, (resume) => resume.additionalInfos)
  resume: Resume;
}
