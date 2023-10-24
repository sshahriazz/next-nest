import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

export enum SummaryType {
  PARAGRAPH = 'PARAGRAPH',
  BULLET = 'BULLET',
}

@Entity('pro_summary')
export class ProfessionalSummary extends CommonEntity {
  @Column({ type: 'varchar', default: SummaryType.PARAGRAPH })
  summaryType: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  summary: string;

  @ManyToOne(() => Resume, (resume) => resume.professionalSummaries)
  resume: Resume;
}
