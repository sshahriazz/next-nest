import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
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
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
import { CreateCertificateDto } from './dto/certificate.dto';
import { CreateCourseDto } from './dto/course.dto';
import { CreateInterestDto } from './dto/interest.dto';
import { CreateAdditionalDto } from './dto/additional.dto';
import { CreateEducationDto } from './dto/education.dto';
import {
  PaginateQuery,
  Paginated,
  paginate as Paginate,
} from 'nestjs-paginate';
import { startOfMonth, startOfWeek } from 'date-fns';

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

  queryConfig = {};

  async getStats(repository: Repository<any>, since: Date, until: Date) {
    const stats = {
      total: 0,
      created: 0,
      deleted: 0,
      updated: 0,
      currentMonth: {
        total: 0,
        created: 0,
        deleted: 0,
        updated: 0,
      },
      currentWeek: {
        total: 0,
        created: 0,
        deleted: 0,
        updated: 0,
      },
    };

    const entities = await repository.find({
      where: {
        createdAt: Between(since, until),
      },
    });

    for (const entity of entities) {
      const { createdAt, deletedAt, updatedAt } = entity;

      // Increment total count
      stats.total++;

      // Increment current month count
      if (createdAt >= startOfMonth(new Date())) {
        stats.currentMonth.total++;
        if (deletedAt) {
          stats.currentMonth.deleted++;
        } else if (updatedAt > createdAt) {
          stats.currentMonth.updated++;
        } else {
          stats.currentMonth.created++;
        }
      }

      // Increment current week count
      if (createdAt >= startOfWeek(new Date())) {
        stats.currentWeek.total++;
        if (deletedAt) {
          stats.currentWeek.deleted++;
        } else if (updatedAt > createdAt) {
          stats.currentWeek.updated++;
        } else {
          stats.currentWeek.created++;
        }
      }

      // Increment created, updated, or deleted count
      if (deletedAt) {
        stats.deleted++;
      } else if (updatedAt > createdAt) {
        stats.updated++;
      } else {
        stats.created++;
      }
    }

    return stats;
  }

  async createResume(resume: CreateResumeDto) {
    return await this.resumeRepository.save({
      author: { id: resume.authorId },
    });
  }

  async singleResume(id: string) {
    return await this.resumeRepository.findOne({
      where: { id },
    });
  }

  async listUserResume(
    userId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Resume>> {
    return await Paginate(query, this.resumeRepository, {
      ...this.queryConfig,
      where: { author: { id: userId } },
      loadEagerRelations: true,
      relations: ['author', 'personalInfo', 'professionalSummary'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async listResume(query: PaginateQuery): Promise<Paginated<Resume>> {
    return await Paginate(query, this.resumeRepository, {
      loadEagerRelations: true,
      relations: ['author', 'personalInfo', 'professionalSummary'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async resumeStats(since: Date, until: Date) {
    return await this.getStats(this.resumeRepository, since, until);
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

  async listPersonalInfo(
    query: PaginateQuery,
  ): Promise<Paginated<PersonalInfo>> {
    const queryBuilder =
      this.personalInfoRepository.createQueryBuilder('personal_info');
    queryBuilder.orderBy('personal_info.createdAt', 'DESC');
    return await Paginate(query, this.personalInfoRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async personalStats(since: Date, until: Date) {
    return await this.getStats(this.personalInfoRepository, since, until);
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

  async listSummary(
    query: PaginateQuery,
  ): Promise<Paginated<ProfessionalSummary>> {
    return await Paginate(query, this.summaryRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async summaryStats(since: Date, until: Date) {
    return await this.getStats(this.summaryRepository, since, until);
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

  async listExperienceCategory(
    query: PaginateQuery,
  ): Promise<Paginated<ExperienceCategory>> {
    return await Paginate(query, this.experienceCategoryRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async experienceCategoryStats(since: Date, until: Date) {
    return await this.getStats(this.experienceCategoryRepository, since, until);
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

  async singleExperience(id: string) {
    return await this.experienceRepository.findOne({
      where: { id },
    });
  }

  async listExperience(query: PaginateQuery): Promise<Paginated<Experience>> {
    return await Paginate(query, this.experienceRepository, {
      loadEagerRelations: true,
      relations: ['category'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async experienceStats(since: Date, until: Date) {
    return await this.getStats(this.experienceRepository, since, until);
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

  async singleSkillCategory(id: string) {
    return await this.skillCategoryRepository.findOne({
      where: { id },
    });
  }

  async listSkillCategories(
    query: PaginateQuery,
  ): Promise<Paginated<SkillCategory>> {
    return await Paginate(query, this.skillCategoryRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async skillCategoryStats(since: Date, until: Date) {
    return await this.getStats(this.skillCategoryRepository, since, until);
  }

  async createSkill(id: string, skill: CreateSkillDto) {
    return await this.skillRepository.save({
      category: { id },
      ...skill,
    });
  }

  async updateSkill(id: string, skill: UpdateSkillDto) {
    return await this.skillRepository.update(id, skill);
  }

  async singleSkill(id: string) {
    return await this.skillRepository.findOne({
      where: { id },
    });
  }

  async listSkill(query: PaginateQuery): Promise<Paginated<Skill>> {
    return await Paginate(query, this.skillRepository, {
      loadEagerRelations: true,
      relations: ['skillCategory'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async skillStats(since: Date, until: Date) {
    return await this.getStats(this.skillRepository, since, until);
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

  async singleCertificate(id: string) {
    return await this.certificateRepository.findOne({
      where: { id },
    });
  }

  async listCertificate(query: PaginateQuery): Promise<Paginated<Certificate>> {
    const queryBuilder =
      this.certificateRepository.createQueryBuilder('certificate');
    queryBuilder.orderBy('certificate.createdAt', 'DESC');
    return await Paginate(query, this.certificateRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async certificateStats(since: Date, until: Date) {
    return await this.getStats(this.certificateRepository, since, until);
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

  async singleCourse(id: string) {
    return await this.courseRepository.findOne({
      where: { id },
    });
  }

  async listCourse(query: PaginateQuery): Promise<Paginated<Course>> {
    return await Paginate(query, this.courseRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async courseStats(since: Date, until: Date) {
    return await this.getStats(this.courseRepository, since, until);
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

  async singleInterest(id: string) {
    return await this.interestRepository.findOne({
      where: { id },
    });
  }

  async listInterest(query: PaginateQuery): Promise<Paginated<Interest>> {
    return await Paginate(query, this.interestRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async interestStats(since: Date, until: Date) {
    return await this.getStats(this.interestRepository, since, until);
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

  async singleAdditional(id: string) {
    return await this.additionalRepository.findOne({
      where: { id },
    });
  }

  async listAdditional(query: PaginateQuery): Promise<Paginated<Additional>> {
    return await Paginate(query, this.additionalRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async additionalStats(since: Date, until: Date) {
    return await this.getStats(this.additionalRepository, since, until);
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

  async singleEducation(id: string) {
    return await this.educationRepository.findOne({
      where: { id },
    });
  }
  async listEducation(query: PaginateQuery): Promise<Paginated<Education>> {
    return await Paginate(query, this.educationRepository, {
      loadEagerRelations: true,
      relations: ['resume'],
      sortableColumns: ['id', 'createdAt', 'updatedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async educationStats(since: Date, until: Date) {
    return await this.getStats(this.educationRepository, since, until);
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
