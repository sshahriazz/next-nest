import { ApiProperty } from '@nestjs/swagger';
import { ResumeDto } from './resume.dto';

export class EducationDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  institute: string;

  @ApiProperty({ type: String })
  degree: string;

  @ApiProperty({ type: String })
  subject: string;

  @ApiProperty({ type: String })
  grade: string;

  @ApiProperty({ type: String })
  major: string;

  @ApiProperty({ type: String })
  startYear: string;

  @ApiProperty({ type: String })
  endYear: string;

  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
