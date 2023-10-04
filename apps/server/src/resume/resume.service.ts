import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entity/resume.entity';
import { PersonalInfo } from './entity/personal-info.entity';
import { ProfessionalSummary } from './entity/pro-summary.entity';
import { ExperienceCategory } from './entity/experience-category.entity';
import { Experience } from './entity/experience.entity';
import { SkillCategory } from './entity/skill-category.entity';
import { Skill } from './entity/skill.entity';
import { Certificate } from './entity/certificate.entity';
import { Course } from './entity/course.entity';
import { Interest } from './entity/interest.entity';
import { Additional } from './entity/additional.entity';
import { Education } from './entity/education.entity';
import { ResumeDto } from './dto/resume.dto';
import { PersonalInfoDto } from './dto/personal-info.dto';
import { ProfessionalSummaryDto } from './dto/pro-summary.dto';
import { ExperienceCategoryDto } from './dto/experience-category.dto';
import { ExperienceDto } from './dto/experience.dto';
import { SkillCategoryDto } from './dto/skill-category.dto';
import { SkillDto } from './dto/skill.dto';
import { CertificateDto } from './dto/certificate.dto';
import { CourseDto } from './dto/course.dto';
import { InterestDto } from './dto/interest.dto';
import { AdditionalDto } from './dto/additional.dto';
import { EducationDto } from './dto/education.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(PersonalInfo)
    private readonly personalInfoRepository: Repository<PersonalInfo>,
    @InjectRepository(ProfessionalSummary)
    private readonly summaryRepository: Repository<ProfessionalSummary>,
    @InjectRepository(ExperienceCategory)
    private readonly experienceCategoryRepository: Repository<ExperienceCategory>,
    @InjectRepository(Resume)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Resume)
    private readonly skillCategoryRepository: Repository<SkillCategory>,
    @InjectRepository(Resume)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
    @InjectRepository(Resume)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    @InjectRepository(Additional)
    private readonly additionalRepository: Repository<Additional>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async createResume(resume: ResumeDto) {
    return await this.resumeRepository.save(resume);
  }

  async getResume(id: string) {
    return await this.resumeRepository.findOne({
      where: { id },
    });
  }

  async findAllResumes(options: IPaginationOptions) {
    const queryBuilder = this.resumeRepository.createQueryBuilder('resume');
    queryBuilder.orderBy('resume.createdAt', 'DESC');
    return await paginate<Resume>(queryBuilder, options);
  }

  async updateResume(id: string, resume: ResumeDto) {
    return await this.resumeRepository.update(id, resume);
  }

  async updatePersonalInfo(id: string, personalInfo: PersonalInfoDto) {
    return await this.personalInfoRepository.update(id, personalInfo);
  }

  async getPersonalInfo(id: string) {
    return await this.personalInfoRepository.findOne({
      where: { id },
    });
  }

  async findAllPersonalInfo(options: IPaginationOptions) {
    const queryBuilder =
      this.personalInfoRepository.createQueryBuilder('personal_info');
    queryBuilder.orderBy('personal_info.createdAt', 'DESC');
    return await paginate<PersonalInfo>(queryBuilder, options);
  }

  async updateSummary(id: string, summary: ProfessionalSummaryDto) {
    return await this.summaryRepository.update(id, summary);
  }

  async getSummary(id: string) {
    return await this.summaryRepository.findOne({
      where: { id },
    });
  }

  async findAllSummaries(options: IPaginationOptions) {
    const queryBuilder = this.summaryRepository.createQueryBuilder('summary');
    queryBuilder.orderBy('summary.createdAt', 'DESC');
    return await paginate<ProfessionalSummary>(queryBuilder, options);
  }

  async createExperienceCategory(
    id: string,
    experienceCategory: ExperienceCategoryDto,
  ) {
    return await this.experienceCategoryRepository.save({
      resume: { id },
      ...experienceCategory,
    });
  }

  async updateExperienceCategory(
    id: string,
    experienceCategory: ExperienceCategoryDto,
  ) {
    return await this.experienceCategoryRepository.update(
      id,
      experienceCategory,
    );
  }

  async getExperienceCategory(id: string) {
    return await this.experienceCategoryRepository.findOne({
      where: { id },
    });
  }

  async findAllExperienceCategories(options: IPaginationOptions) {
    const queryBuilder =
      this.experienceCategoryRepository.createQueryBuilder('category');
    queryBuilder.orderBy('category.createdAt', 'DESC');
    return await paginate<ExperienceCategory>(queryBuilder, options);
  }

  async createExperience(id: string, experience: ExperienceDto) {
    return await this.experienceRepository.save({
      category: { id },
      ...experience,
    });
  }

  async updateExperience(id: string, experience: ExperienceDto) {
    return await this.experienceRepository.update(id, experience);
  }

  async getExperience(id: string) {
    return await this.experienceRepository.findOne({
      where: { id },
    });
  }

  async findAllExperiences(options: IPaginationOptions) {
    const queryBuilder = this.experienceRepository.createQueryBuilder('exp');
    queryBuilder.orderBy('exp.createdAt', 'DESC');
    return await paginate<Experience>(queryBuilder, options);
  }

  async createSkillCategory(id: string, skillCategory: SkillCategoryDto) {
    return await this.skillCategoryRepository.save({
      resume: { id },
      ...skillCategory,
    });
  }

  async updateSkillCategory(id: string, skillCategory: SkillCategoryDto) {
    return await this.skillCategoryRepository.update(id, skillCategory);
  }

  async getSkillCategory(id: string) {
    return await this.skillCategoryRepository.findOne({
      where: { id },
    });
  }

  async findAllSkillCategories(options: IPaginationOptions) {
    const queryBuilder =
      this.skillCategoryRepository.createQueryBuilder('category');
    queryBuilder.orderBy('category.createdAt', 'DESC');
    return await paginate<SkillCategory>(queryBuilder, options);
  }

  async createSkill(id: string, skill: SkillDto) {
    return await this.skillRepository.save({
      category: { id },
      ...skill,
    });
  }

  async updateSkill(id: string, skill: SkillDto) {
    return await this.skillRepository.update(id, skill);
  }

  async getSkill(id: string) {
    return await this.skillRepository.findOne({
      where: { id },
    });
  }

  async findAllSkills(options: IPaginationOptions) {
    const queryBuilder = this.skillRepository.createQueryBuilder('skill');
    queryBuilder.orderBy('skill.createdAt', 'DESC');
    return await paginate<Skill>(queryBuilder, options);
  }

  async createCertificate(id: string, certificate: CertificateDto) {
    return await this.certificateRepository.save({
      resume: { id },
      ...certificate,
    });
  }

  async updateCertificate(id: string, certificate: CertificateDto) {
    return await this.certificateRepository.update(id, certificate);
  }

  async getCertificate(id: string) {
    return await this.certificateRepository.findOne({
      where: { id },
    });
  }

  async findAllCertificates(options: IPaginationOptions) {
    const queryBuilder =
      this.certificateRepository.createQueryBuilder('certificate');
    queryBuilder.orderBy('certificate.createdAt', 'DESC');
    return await paginate<Certificate>(queryBuilder, options);
  }

  async createCourse(id: string, course: CourseDto) {
    return await this.courseRepository.save({
      resume: { id },
      ...course,
    });
  }

  async updateCourse(id: string, course: CourseDto) {
    return await this.courseRepository.update(id, course);
  }

  async getCourse(id: string) {
    return await this.courseRepository.findOne({
      where: { id },
    });
  }

  async findAllCourses(options: IPaginationOptions) {
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    queryBuilder.orderBy('course.createdAt', 'DESC');
    return await paginate<Course>(queryBuilder, options);
  }

  async createInterest(id: string, interest: InterestDto) {
    return await this.interestRepository.save({
      resume: { id },
      ...interest,
    });
  }

  async updateInterest(id: string, interest: InterestDto) {
    return await this.interestRepository.update(id, interest);
  }

  async getInterest(id: string) {
    return await this.interestRepository.findOne({
      where: { id },
    });
  }

  async findAllInterests(options: IPaginationOptions) {
    const queryBuilder = this.interestRepository.createQueryBuilder('interest');
    queryBuilder.orderBy('interest.createdAt', 'DESC');
    return await paginate<Interest>(queryBuilder, options);
  }

  async createAdditional(id: string, additional: AdditionalDto) {
    return await this.additionalRepository.save({
      resume: { id },
      ...additional,
    });
  }

  async updateAdditional(id: string, additional: AdditionalDto) {
    return await this.additionalRepository.update(id, additional);
  }

  async getAdditional(id: string) {
    return await this.additionalRepository.findOne({
      where: { id },
    });
  }

  async findAllAdditional(options: IPaginationOptions) {
    const queryBuilder =
      this.additionalRepository.createQueryBuilder('additional');
    queryBuilder.orderBy('additional.createdAt', 'DESC');
    return await paginate<Additional>(queryBuilder, options);
  }

  async createEducation(id: string, education: EducationDto) {
    return await this.educationRepository.save({
      resume: { id },
      ...education,
    });
  }
  async updateEducation(id: string, education: EducationDto) {
    return await this.educationRepository.update(id, education);
  }

  async getEducation(id: string) {
    return await this.educationRepository.findOne({
      where: { id },
    });
  }
  async findAllEducations(options: IPaginationOptions) {
    const queryBuilder = this.educationRepository.createQueryBuilder('edu');
    queryBuilder.orderBy('edu.createdAt', 'DESC');
    return await paginate<Education>(queryBuilder, options);
  }
}
