import { ApiProperty } from '@nestjs/swagger';
import { ProfessionalSummary } from '../entity/pro-summary.entity';

export enum SummaryType {
  PARAGRAPH = 'PARAGRAPH',
  BULLET = 'BULLET',
}

export class CreateProfessionalSummaryDto extends ProfessionalSummary {
  @ApiProperty({ enum: SummaryType, default: SummaryType.PARAGRAPH })
  summaryType: string;

  @ApiProperty({ type: String })
  summary: string;
}

export class UpdateProfessionalSummaryDto extends CreateProfessionalSummaryDto {}
