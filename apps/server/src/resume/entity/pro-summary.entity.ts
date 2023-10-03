import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SummaryType {
  PARAGRAPH = 'PARAGRAPH',
  BULLET = 'BULLET',
}

@Entity('pro_summary')
export class ProfessionalSummary extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SummaryType,
    nullable: true,
    default: SummaryType.PARAGRAPH,
  })
  type: SummaryType;

  @Column({ type: 'varchar', nullable: true, default: '' })
  summary: string;
}
