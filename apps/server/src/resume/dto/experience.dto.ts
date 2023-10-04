import { ApiProperty } from '@nestjs/swagger';
import { ExperienceCategoryDto } from './experience-category.dto';

export class ExperienceDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  jobTitle: string;
  @ApiProperty({ type: String })
  companyName: string;
  @ApiProperty({ type: String })
  location: string;
  @ApiProperty({ type: String, isArray: true })
  responsibilities: string[];

  @ApiProperty({ type: () => ExperienceCategoryDto })
  category: ExperienceCategoryDto;
}