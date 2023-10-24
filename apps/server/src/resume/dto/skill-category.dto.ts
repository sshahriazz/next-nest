import { ApiProperty } from '@nestjs/swagger';
import { SkillCategory } from '../entity/skill-category.entity';

export class CreateSkillCategoryDto extends SkillCategory {
  @ApiProperty({ type: String })
  name: string;
}

export class UpdateSkillCategoryDto extends CreateSkillCategoryDto {
  @ApiProperty({ type: String })
  name: string;
}
