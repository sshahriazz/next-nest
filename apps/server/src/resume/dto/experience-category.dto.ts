import { ApiProperty } from '@nestjs/swagger';
import { ExperienceCategory } from '../entity/experience-category.entity';

export class CreateExperienceCategoryDto extends ExperienceCategory {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  description: string;
}

export class UpdateExperienceCategoryDto extends CreateExperienceCategoryDto {}
