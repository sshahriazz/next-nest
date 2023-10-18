import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, OneToOne } from 'typeorm';
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

  @OneToOne(() => Resume, (resume) => resume.professionalSummary)
  resume: Resume;
}
