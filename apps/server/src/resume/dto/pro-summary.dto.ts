import { ApiProperty } from '@nestjs/swagger';

export enum SummaryType {
  PARAGRAPH = 'PARAGRAPH',
  BULLET = 'BULLET',
}

export class ProfessionalSummaryDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ enum: SummaryType, default: SummaryType.PARAGRAPH })
  type: SummaryType;

  @ApiProperty({ type: String })
  summary: string;
}
