import { ResumeDto } from './resume.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InterestDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
