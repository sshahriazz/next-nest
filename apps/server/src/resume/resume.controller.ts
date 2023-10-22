import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/resume.dto';
import { CreatePersonalInfoDto } from './dto/personal-info.dto';
import { CreateProfessionalSummaryDto } from './dto/pro-summary.dto';
import { CreateExperienceCategoryDto } from './dto/experience-category.dto';
import { CreateExperienceDto } from './dto/experience.dto';
import { CreateSkillCategoryDto } from './dto/skill-category.dto';
import { CreateSkillDto } from './dto/skill.dto';
import { CreateCertificateDto } from './dto/certificate.dto';
import { CreateCourseDto } from './dto/course.dto';
import { CreateInterestDto } from './dto/interest.dto';
import { CreateAdditionalDto } from './dto/additional.dto';
import { CreateEducationDto } from './dto/education.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { Resume } from './entity/resume.entity';
import { SkillCategory } from './entity/skill-category.entity';
import { ExperienceCategory } from './entity/experience-category.entity';
import { Experience } from './entity/experience.entity';
import { Skill } from './entity/skill.entity';
import { Certificate } from './entity/certificate.entity';
import { Course } from './entity/course.entity';
import { Interest } from './entity/interest.entity';
import { Additional } from './entity/additional.entity';
import { PersonalInfo } from './entity/personal-info.entity';
import { ProfessionalSummary } from './entity/pro-summary.entity';
import { Education } from './entity/education.entity';

@ApiTags('resume')
@ApiBearerAuth()
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('/create')
  async createResume(@Body() resume: CreateResumeDto) {
    return await this.resumeService.createResume({
      authorId: resume.authorId,
    });
  }

  @Get('/single/:id')
  async singleResume(@Param('id') id: string) {
    return await this.resumeService.singleResume(id);
  }

  @Get('/list/user/:userId')
  @PaginatedSwaggerDocs(Resume, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listUserResume(
    @Param('userId') userId: string,
    @Paginate() query: PaginateQuery,
  ) {
    return await this.resumeService.listUserResume(userId, query);
  }

  @Get('list')
  @PaginatedSwaggerDocs(Resume, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listResume(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listResume(query);
  }

  @Post('create/personal-info/:resumeId')
  async createPersonalInfo(
    @Param('resumeId') resumeId: string,
    @Body() personalInfo: CreatePersonalInfoDto,
  ) {
    return await this.resumeService.createPersonalInfo(resumeId, personalInfo);
  }

  @Put('update/personal-info/:id')
  async updatePersonalInfo(
    @Param('id') id: string,
    @Body() personalInfo: CreatePersonalInfoDto,
  ) {
    return await this.resumeService.updatePersonalInfo(id, personalInfo);
  }

  @Get('single/personal-info/:id')
  async singlePersonalInfo(@Param('id') id: string) {
    return await this.resumeService.singlePersonalInfo(id);
  }

  @Get('list/personal-info')
  @PaginatedSwaggerDocs(PersonalInfo, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listPersonalInfo(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listPersonalInfo(query);
  }

  @Post('create/summary/:resumeId')
  async createSummary(
    @Param('resumeId') resumeId: string,
    @Body() summary: CreateProfessionalSummaryDto,
  ) {
    return await this.resumeService.createSummary(resumeId, summary);
  }

  @Put('update/summary/:id')
  async updateSummary(
    @Param('id') id: string,
    @Body() summary: CreateProfessionalSummaryDto,
  ) {
    return await this.resumeService.updateSummary(id, summary);
  }

  @Get('single/summary/:id')
  async getSummary(@Param('id') id: string) {
    return await this.resumeService.singleSummary(id);
  }

  @Get('list/summary')
  @PaginatedSwaggerDocs(ProfessionalSummary, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listSummary(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listSummary(query);
  }

  @Post('create/experience-category/:id')
  async createExperienceCategory(
    @Param('id') id: string,
    @Body() experienceCategory: CreateExperienceCategoryDto,
  ) {
    return await this.resumeService.createExperienceCategory(
      id,
      experienceCategory,
    );
  }

  @Put('update/experience-category/:id')
  async updateExperienceCategory(
    @Param('id') id: string,
    @Body() experienceCategory: CreateExperienceCategoryDto,
  ) {
    return await this.resumeService.updateExperienceCategory(
      id,
      experienceCategory,
    );
  }

  @Get('single/experience-category/:id')
  async getExperienceCategory(@Param('id') id: string) {
    return await this.resumeService.getExperienceCategory(id);
  }

  @Get('list/experience-category')
  @PaginatedSwaggerDocs(ExperienceCategory, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listExperienceCategory(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listExperienceCategory(query);
  }

  @Post('create/experience/:id')
  async createExperience(
    @Param('id') id: string,
    @Body() experience: CreateExperienceDto,
  ) {
    return await this.resumeService.createExperience(id, experience);
  }

  @Put('update/experience/:id')
  async updateExperience(
    @Param('id') id: string,
    @Body() experience: CreateExperienceDto,
  ) {
    return await this.resumeService.updateExperience(id, experience);
  }

  @Get('single/experience/:id')
  async singleExperience(@Param('id') id: string) {
    return await this.resumeService.singleExperience(id);
  }

  @Get('list/experience')
  @PaginatedSwaggerDocs(Experience, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listExperience(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listExperience(query);
  }

  @Post('create/skill-category/:id')
  async createSkillCategory(
    @Param('id') id: string,
    @Body() skillCategory: CreateSkillCategoryDto,
  ) {
    return await this.resumeService.createSkillCategory(id, skillCategory);
  }

  @Put('update/skill-category/:id')
  async updateSkillCategory(
    @Param('id') id: string,
    @Body() skillCategory: CreateSkillCategoryDto,
  ) {
    return await this.resumeService.updateSkillCategory(id, skillCategory);
  }

  @Get('single/skill-category/:id')
  async getSkillCategory(@Param('id') id: string) {
    return await this.resumeService.singleSkillCategory(id);
  }

  @Get('list/skill-category')
  @PaginatedSwaggerDocs(SkillCategory, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listSkillCategory(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listSkillCategories(query);
  }

  @Post('create/skill/:id')
  async createSkill(@Param('id') id: string, @Body() skill: CreateSkillDto) {
    return await this.resumeService.createSkill(id, skill);
  }

  @Put('update/skill/:id')
  async updateSkill(@Param('id') id: string, @Body() skill: CreateSkillDto) {
    return await this.resumeService.updateSkill(id, skill);
  }

  @Get('single/skill/:id')
  async getSkill(@Param('id') id: string) {
    return await this.resumeService.singleSkill(id);
  }

  @Get('list/skill')
  @PaginatedSwaggerDocs(Skill, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listSkill(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listSkill(query);
  }

  @Post('create/certificate/:id')
  async createCertificate(
    @Param('id') id: string,
    @Body() certificate: CreateCertificateDto,
  ) {
    return await this.resumeService.createCertificate(id, certificate);
  }

  @Put('update/certificate/:id')
  async updateCertificate(
    @Param('id') id: string,
    @Body() certificate: CreateCertificateDto,
  ) {
    return await this.resumeService.updateCertificate(id, certificate);
  }

  @Get('single/certificate/:id')
  async getCertificate(@Param('id') id: string) {
    return await this.resumeService.singleCertificate(id);
  }

  @Get('list/certificate')
  @PaginatedSwaggerDocs(Certificate, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listCertificate(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listCertificate(query);
  }

  @Post('create/course/:id')
  async createCourse(@Param('id') id: string, @Body() course: CreateCourseDto) {
    return await this.resumeService.createCourse(id, course);
  }

  @Put('update/course/:id')
  async updateCourse(@Param('id') id: string, @Body() course: CreateCourseDto) {
    return await this.resumeService.updateCourse(id, course);
  }

  @Get('single/course/:id')
  async getCourse(@Param('id') id: string) {
    return await this.resumeService.singleCourse(id);
  }

  @Get('list/course')
  @PaginatedSwaggerDocs(Course, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listCourse(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listCourse(query);
  }

  @Post('create/interest/:id')
  async createInterest(
    @Param('id') id: string,
    @Body() interest: CreateInterestDto,
  ) {
    return await this.resumeService.createInterest(id, interest);
  }

  @Put('update/interest/:id')
  async updateInterest(
    @Param('id') id: string,
    @Body() interest: CreateInterestDto,
  ) {
    return await this.resumeService.updateInterest(id, interest);
  }

  @Get('single/interest/:id')
  async getInterest(@Param('id') id: string) {
    return await this.resumeService.singleInterest(id);
  }

  @Get('list/interest')
  @PaginatedSwaggerDocs(Interest, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listInterest(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listInterest(query);
  }

  @Post('create/additional/:id')
  async createAdditional(
    @Param('id') id: string,
    @Body() additional: CreateAdditionalDto,
  ) {
    return await this.resumeService.createAdditional(id, additional);
  }

  @Put('update/additional/:id')
  async updateAdditional(
    @Param('id') id: string,
    @Body() additional: CreateAdditionalDto,
  ) {
    return await this.resumeService.updateAdditional(id, additional);
  }

  @Get('single/additional/:id')
  async getAdditional(@Param('id') id: string) {
    return await this.resumeService.singleAdditional(id);
  }

  @Get('list/additional')
  @PaginatedSwaggerDocs(Additional, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listAdditional(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listAdditional(query);
  }

  @Post('create/education/:id')
  async createEducation(
    @Param('id') id: string,
    @Body() education: CreateEducationDto,
  ) {
    return await this.resumeService.createEducation(id, education);
  }

  @Put('update/education/:id')
  async updateEducation(
    @Param('id') id: string,
    @Body() education: CreateEducationDto,
  ) {
    return await this.resumeService.updateEducation(id, education);
  }

  @Get('single/education/:id')
  async getEducation(@Param('id') id: string) {
    return await this.resumeService.singleEducation(id);
  }

  @Get('list/education')
  @PaginatedSwaggerDocs(Education, {
    loadEagerRelations: true,
    sortableColumns: ['createdAt', 'updatedAt'],
    defaultSortBy: [['createdAt', 'DESC']],
  })
  async listEducation(@Paginate() query: PaginateQuery) {
    return await this.resumeService.listEducation(query);
  }

  @Get('stats/:since/:until')
  @ApiParam({ type: Date, name: 'since', example: '2021-01-01' })
  @ApiParam({ type: Date, name: 'until', example: '2021-12-31' })
  async resumeStats(@Param('since') since: Date, @Param('until') until: Date) {
    const resumeStats = await this.resumeService.resumeStats(since, until);
    const experienceCategoryStats =
      await this.resumeService.experienceCategoryStats(since, until);
    const experienceStats = await this.resumeService.experienceStats(
      since,
      until,
    );
    const skillCategoryStats = await this.resumeService.skillCategoryStats(
      since,
      until,
    );
    const skillStats = await this.resumeService.skillStats(since, until);
    const certificateStats = await this.resumeService.certificateStats(
      since,
      until,
    );
    const courseStats = await this.resumeService.courseStats(since, until);
    const interestStats = await this.resumeService.interestStats(since, until);
    const additionalStats = await this.resumeService.additionalStats(
      since,
      until,
    );
    const educationStats = await this.resumeService.educationStats(
      since,
      until,
    );

    const combinedStats = {
      resumeStats,
      experienceCategoryStats,
      experienceStats,
      skillCategoryStats,
      skillStats,
      certificateStats,
      courseStats,
      interestStats,
      additionalStats,
      educationStats,
    };
    return combinedStats;
  }

  @Delete('del/resume/:id')
  async deleteResume(@Param('id') id: string) {
    return await this.resumeService.deleteResume(id);
  }
  @Delete('del/personal-info/:id')
  async deletePersonalInfo(@Param('id') id: string) {
    return await this.resumeService.deletePersonalInfo(id);
  }
  @Delete('del/summary/:id')
  async deleteSummary(@Param('id') id: string) {
    return await this.resumeService.deleteSummary(id);
  }
  @Delete('del/experience-category/:id')
  async deleteExperienceCategory(@Param('id') id: string) {
    return await this.resumeService.deleteExperienceCategory(id);
  }
  @Delete('del/experience/:id')
  async deleteExperience(@Param('id') id: string) {
    return await this.resumeService.deleteExperience(id);
  }
  @Delete('del/skill-category/:id')
  async deleteSkillCategory(@Param('id') id: string) {
    return await this.resumeService.deleteSkillCategory(id);
  }
  @Delete('del/skill/:id')
  async deleteSkill(@Param('id') id: string) {
    return await this.resumeService.deleteSkill(id);
  }
  @Delete('del/certificate/:id')
  async deleteCertificate(@Param('id') id: string) {
    return await this.resumeService.deleteCertificate(id);
  }
  @Delete('del/course/:id')
  async deleteCourse(@Param('id') id: string) {
    return await this.resumeService.deleteCourse(id);
  }
  @Delete('del/interest/:id')
  async deleteInterest(@Param('id') id: string) {
    return await this.resumeService.deleteInterest(id);
  }
  @Delete('del/additional/:id')
  async deleteAdditional(@Param('id') id: string) {
    return await this.resumeService.deleteAdditional(id);
  }
  @Delete('del/education/:id')
  async deleteEducation(@Param('id') id: string) {
    return await this.resumeService.deleteEducation(id);
  }
}
