import { ApiProperty } from '@nestjs/swagger';
import { ExperienceDto } from './experience.dto';
import { ResumeDto } from './resume.dto';

export class ExperienceCategoryDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: ExperienceDto, isArray: true })
  experiences: ExperienceDto[];

  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
