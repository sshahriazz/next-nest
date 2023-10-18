import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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
  @OneToOne(() => PersonalInfo, (personalInfo) => personalInfo.resume, {
    cascade: true,
  })
  @JoinColumn()
  personalInfo: PersonalInfo;

  @OneToOne(
    () => ProfessionalSummary,
    (professionalSummary) => professionalSummary.resume,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  professionalSummary: ProfessionalSummary;

  @OneToMany(
    () => ExperienceCategory,
    (experienceCategory) => experienceCategory.resume,
    { onDelete: 'CASCADE', cascade: true },
  )
  experienceCategories: ExperienceCategory[];

  @OneToMany(() => Education, (education) => education.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  educations: Education[];

  @OneToMany(() => SkillCategory, (skillCategory) => skillCategory.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  skillCategories: SkillCategory[];

  @OneToMany(() => Course, (course) => course.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  courses: Course[];
  @OneToMany(() => Certificate, (certificate) => certificate.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  certificates: Certificate[];
  @OneToMany(() => Interest, (interest) => interest.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  interests: Interest[];
  @OneToMany(() => Additional, (additional) => additional.resume, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  additionalInfos: Additional[];

  @ManyToOne(() => User, (user) => user.resume, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  author: User;
}
