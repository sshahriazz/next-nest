import { ApiProperty } from '@nestjs/swagger';
import { ResumeDto } from './resume.dto';

export class AdditionalDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
