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
import { CreateResumeDto } from './dto/resume.dto';
import { CreatePersonalInfoDto } from './dto/personal-info.dto';
import { CreateProfessionalSummaryDto } from './dto/pro-summary.dto';
import { CreateExperienceCategoryDto } from './dto/experience-category.dto';
import { CreateExperienceDto } from './dto/experience.dto';
import { CreateSkillCategoryDto } from './dto/skill-category.dto';
import { CreateCreateSkillDto } from './dto/skill.dto';
import { CreateCertificateDto } from './dto/certificate.dto';
import { CreateCourseDto } from './dto/course.dto';
import { CreateInterestDto } from './dto/interest.dto';
import { CreateAdditionalDto } from './dto/additional.dto';
import { CreateEducationDto } from './dto/education.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  PaginateQuery,
  Paginated,
  paginate as Paginate,
} from 'nestjs-paginate';

/**
 * TODO: fix naming convention
 * TODO: fix and reduce dto
 * TODO: fix and reduce api endpoints
 * TODO: Check if all service methods are functional
 * TODO: write tests
 * @ResumeService
 */

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

  async createResume(resume: CreateResumeDto) {
    return await this.resumeRepository.save({
      author: { id: resume.authorId },
    });
  }

  async getResume(id: string) {
    return await this.resumeRepository.findOne({
      where: { id },
    });
  }

  async listUserResume(userId: string) {
    return await this.resumeRepository.find({
      where: { author: { id: userId } },
    });
  }

  async findAllResumes(query: PaginateQuery): Promise<Paginated<Resume>> {
    return await Paginate(query, this.resumeRepository, {
      loadEagerRelations: true,
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async createPersonalInfo(
    resumeId: string,
    personalInfo: CreatePersonalInfoDto,
  ) {
    const existing = await this.resumeRepository.findOne({
      where: { id: resumeId },
      relations: ['personalInfo'],
    });

    const newPersonalInfoData = await this.personalInfoRepository.save({
      resume: { id: resumeId },
      ...personalInfo,
    });
    const updatedResume = await this.resumeRepository.update(resumeId, {
      personalInfo: { id: newPersonalInfoData.id },
    });

    if (updatedResume.affected > 0) {
      if (existing?.personalInfo?.id) {
        await this.personalInfoRepository.delete(existing.personalInfo.id);
      }
      console.log(newPersonalInfoData);

      return newPersonalInfoData;
    } else {
      await this.personalInfoRepository.delete(newPersonalInfoData.id);
      return {
        error: 'Resume dose not exist',
      };
    }
  }

  async updatePersonalInfo(id: string, personalInfo: CreatePersonalInfoDto) {
    return await this.personalInfoRepository.update(id, personalInfo);
  }

  async singlePersonalInfo(id: string) {
    return await this.personalInfoRepository.findOne({
      where: { id },
    });
  }

  async listPersonalInfo(options: IPaginationOptions) {
    const queryBuilder =
      this.personalInfoRepository.createQueryBuilder('personal_info');
    queryBuilder.orderBy('personal_info.createdAt', 'DESC');
    return await paginate<PersonalInfo>(queryBuilder, options);
  }

  async createSummary(
    resumeId: string,
    summaryDto: CreateProfessionalSummaryDto,
  ) {
    const existing = await this.resumeRepository.findOne({
      where: { id: resumeId },
      relations: ['professionalSummary'],
    });
    const newSummaryData = await this.summaryRepository.save({
      resume: { id: resumeId },
      ...summaryDto,
    });
    const updatedResume = await this.resumeRepository.update(resumeId, {
      professionalSummary: { id: newSummaryData.id },
    });
    if (updatedResume.affected > 0) {
      if (existing?.professionalSummary?.id) {
        await this.summaryRepository.delete(existing.professionalSummary.id);
      }
      console.log(newSummaryData);

      return newSummaryData;
    } else {
      await this.summaryRepository.delete(newSummaryData.id);
      return {
        error: 'Resume dose not exist',
      };
    }
  }

  async updateSummary(id: string, summary: CreateProfessionalSummaryDto) {
    return await this.summaryRepository.update(id, summary);
  }

  async singleSummary(id: string) {
    return await this.summaryRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
  }

  async listSummary(options: IPaginationOptions) {
    const queryBuilder = this.summaryRepository.createQueryBuilder('summary');
    queryBuilder.orderBy('summary.createdAt', 'DESC');
    return await paginate<ProfessionalSummary>(queryBuilder, options);
  }

  async createExperienceCategory(
    id: string,
    experienceCategory: CreateExperienceCategoryDto,
  ) {
    return await this.experienceCategoryRepository.save({
      resume: { id },
      ...experienceCategory,
    });
  }

  async updateExperienceCategory(
    id: string,
    experienceCategory: CreateExperienceCategoryDto,
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

  async createExperience(id: string, experience: CreateExperienceDto) {
    return await this.experienceRepository.save({
      category: { id },
      ...experience,
    });
  }

  async updateExperience(id: string, experience: CreateExperienceDto) {
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

  async createSkillCategory(id: string, skillCategory: CreateSkillCategoryDto) {
    return await this.skillCategoryRepository.save({
      resume: { id },
      ...skillCategory,
    });
  }

  async updateSkillCategory(id: string, skillCategory: CreateSkillCategoryDto) {
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

  async createSkill(id: string, skill: CreateCreateSkillDto) {
    return await this.skillRepository.save({
      category: { id },
      ...skill,
    });
  }

  async updateSkill(id: string, skill: CreateCreateSkillDto) {
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

  async createCertificate(id: string, certificate: CreateCertificateDto) {
    return await this.certificateRepository.save({
      resume: { id },
      ...certificate,
    });
  }

  async updateCertificate(id: string, certificate: CreateCertificateDto) {
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

  async createCourse(id: string, course: CreateCourseDto) {
    return await this.courseRepository.save({
      resume: { id },
      ...course,
    });
  }

  async updateCourse(id: string, course: CreateCourseDto) {
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

  async createInterest(id: string, interest: CreateInterestDto) {
    return await this.interestRepository.save({
      resume: { id },
      ...interest,
    });
  }

  async updateInterest(id: string, interest: CreateInterestDto) {
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

  async createAdditional(id: string, additional: CreateAdditionalDto) {
    return await this.additionalRepository.save({
      resume: { id },
      ...additional,
    });
  }

  async updateAdditional(id: string, additional: CreateAdditionalDto) {
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

  async createEducation(id: string, education: CreateEducationDto) {
    return await this.educationRepository.save({
      resume: { id },
      ...education,
    });
  }
  async updateEducation(id: string, education: CreateEducationDto) {
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
  async deleteResume(id: string) {
    return await this.resumeRepository.delete(id);
  }
  async deletePersonalInfo(id: string) {
    return await this.personalInfoRepository.delete(id);
  }
  async deleteSummary(id: string) {
    return await this.summaryRepository.delete(id);
  }
  async deleteExperienceCategory(id: string) {
    return await this.experienceCategoryRepository.delete(id);
  }
  async deleteExperience(id: string) {
    return await this.experienceRepository.delete(id);
  }
  async deleteSkillCategory(id: string) {
    return await this.skillCategoryRepository.delete(id);
  }
  async deleteSkill(id: string) {
    return await this.skillRepository.delete(id);
  }
  async deleteCertificate(id: string) {
    return await this.certificateRepository.delete(id);
  }
  async deleteCourse(id: string) {
    return await this.courseRepository.delete(id);
  }
  async deleteInterest(id: string) {
    return await this.interestRepository.delete(id);
  }
  async deleteAdditional(id: string) {
    return await this.additionalRepository.delete(id);
  }
  async deleteEducation(id: string) {
    return await this.educationRepository.delete(id);
  }
}
