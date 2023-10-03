import { ApiProperty } from '@nestjs/swagger';
import { SkillCategoryDto } from './skill-category.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SkillDto {
  @ApiProperty({ type: String, isArray: true })
  @ValidateNested({ each: true })
  skills: string[];

  @ApiProperty({ type: () => SkillCategoryDto, isArray: true })
  @Type(() => SkillCategoryDto)
  @ValidateNested({ each: true })
  skillCatagories: SkillCategoryDto[];
}
