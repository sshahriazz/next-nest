import { ApiProperty } from '@nestjs/swagger';
import { ResumeDto } from './resume.dto';

export class CourseDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
