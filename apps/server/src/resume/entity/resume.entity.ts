import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { PersonalInfo } from './personal-info.entity';
import { ProfessionalSummary } from './pro-summary.entity';
import { ExperienceCategory } from './experience-category.entity';
import CommonEntity from '@server/common/configs/common-entity';
import { Education } from './education.entity';
import { Course } from './course.entity';
import { Certificate } from './certificate.entity';
import { Interest } from './interest.entity';
import { Additional } from './additional.entity';
import { SkillCategory } from './skill-category.entity';
import { User } from '@server/users/entities/user.entity';

@Entity('resume')
export class Resume extends CommonEntity {
  @OneToMany(() => PersonalInfo, (personalInfo) => personalInfo.resume, {
    cascade: true,
    eager: true,
  })
  personalInfos: PersonalInfo[];

  @OneToMany(
    () => ProfessionalSummary,
    (professionalSummary) => professionalSummary.resume,
    {
      cascade: true,
      eager: true,
    },
  )
  professionalSummaries: ProfessionalSummary[];

  @OneToMany(
    () => ExperienceCategory,
    (experienceCategory) => experienceCategory.resume,
    { cascade: true, eager: true },
  )
  experienceCategories: ExperienceCategory[];

  @OneToMany(() => Education, (education) => education.resume, {
    cascade: true,
    eager: true,
  })
  educations: Education[];

  @OneToMany(() => SkillCategory, (skillCategory) => skillCategory.resume, {
    cascade: true,
    eager: true,
  })
  skillCategories: SkillCategory[];

  @OneToMany(() => Course, (course) => course.resume, {
    cascade: true,
    eager: true,
  })
  courses: Course[];
  @OneToMany(() => Certificate, (certificate) => certificate.resume, {
    cascade: true,
    eager: true,
  })
  certificates: Certificate[];
  @OneToMany(() => Interest, (interest) => interest.resume, {
    cascade: true,
    eager: true,
  })
  interests: Interest[];
  @OneToMany(() => Additional, (additional) => additional.resume, {
    cascade: true,
    eager: true,
  })
  additionalInfos: Additional[];

  @ManyToOne(() => User, (user) => user.resumes)
  author: User;
}
