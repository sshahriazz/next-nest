import { PersonalInfoDto } from './personal-info.dto';
import { ProfessionalSummaryDto } from './pro-summary.dto';
import { ExperienceCategoryDto } from './experience-category.dto';
import { EducationDto } from './education.dto';
import { InterestDto } from './interest.dto';
import { SkillCategoryDto } from './skill-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CertificateDto } from './certificate.dto';
import { CourseDto } from './course.dto';
import { AdditionalDto } from './additional.dto';

export class ResumeDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: () => PersonalInfoDto })
  @Type(() => PersonalInfoDto)
  @ValidateNested()
  personalInfo: PersonalInfoDto;

  @ApiProperty({ type: () => ProfessionalSummaryDto })
  @Type(() => ProfessionalSummaryDto)
  @ValidateNested()
  professionalSummary: ProfessionalSummaryDto;

  @ApiProperty({ type: () => ExperienceCategoryDto, isArray: true })
  @Type(() => ExperienceCategoryDto)
  @ValidateNested({ each: true })
  experienceCategories: ExperienceCategoryDto[];

  @ApiProperty({ type: () => EducationDto, isArray: true })
  @Type(() => EducationDto)
  @ValidateNested({ each: true })
  educations: EducationDto[];

  @ApiProperty({ type: () => SkillCategoryDto, isArray: true })
  @Type(() => SkillCategoryDto)
  @ValidateNested({ each: true })
  skillCategories: SkillCategoryDto[];

  @ApiProperty({ type: () => CourseDto, isArray: true })
  @Type(() => CourseDto)
  @ValidateNested({ each: true })
  courses: CourseDto[];

  @ApiProperty({ type: () => CertificateDto, isArray: true })
  @Type(() => CertificateDto)
  @ValidateNested({ each: true })
  certificates: CertificateDto[];

  @ApiProperty({ type: () => InterestDto, isArray: true })
  @Type(() => InterestDto)
  @ValidateNested({ each: true })
  interests: InterestDto[];

  @ApiProperty({ type: () => AdditionalDto, isArray: true })
  @Type(() => AdditionalDto)
  @ValidateNested({ each: true })
  additionalInfos: AdditionalDto[];
}
