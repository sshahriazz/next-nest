import { ApiProperty } from '@nestjs/swagger';
import { ResumeDto } from './resume.dto';
import { SkillDto } from './skill.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SkillCategoryDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: () => SkillDto, isArray: true })
  @Type(() => SkillDto)
  @ValidateNested({ each: true })
  skills: SkillDto[];

  @ApiProperty({ type: () => ResumeDto })
  @Type(() => ResumeDto)
  @ValidateNested({ each: true })
  resume: ResumeDto;
}
