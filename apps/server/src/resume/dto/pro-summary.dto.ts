import { ApiProperty } from '@nestjs/swagger';

export enum SummaryType {
  PARAGRAPH = 'PARAGRAPH',
  BULLET = 'BULLET',
}

export class CreateProfessionalSummaryDto {
  @ApiProperty({ enum: SummaryType, default: SummaryType.PARAGRAPH })
  summaryType: string;

  @ApiProperty({ type: String })
  summary: string;
}
