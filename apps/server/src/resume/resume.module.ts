import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entity/resume.entity';
import { PersonalInfo } from './entity/personal-info.entity';
import { ProfessionalSummary } from './entity/pro-summary.entity';
import { ExperienceCategory } from './entity/experience-category.entity';
import { Experience } from './entity/experience.entity';
import { Education } from './entity/education.entity';
import { Skill } from './entity/skill.entity';
import { SkillCategory } from './entity/skill-category.entity';
import { Course } from './entity/course.entity';
import { Certificate } from './entity/certificate.entity';
import { Interest } from './entity/interest.entity';
import { Additional } from './entity/additional.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resume,
      PersonalInfo,
      ProfessionalSummary,
      ExperienceCategory,
      Experience,
      Education,
      Skill,
      SkillCategory,
      Course,
      Certificate,
      Interest,
      Additional,
    ]),
  ],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
