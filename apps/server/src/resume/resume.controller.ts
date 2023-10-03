import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
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
import { IsPublic } from '@server/auth/public.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('resume')
@ApiBearerAuth()
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async createResume(@Body() resume: ResumeDto) {
    return await this.resumeService.createResume(resume);
  }

  @Get(':id')
  async getResume(@Param('id') id: string) {
    return await this.resumeService.getResume(id);
  }

  @Get()
  @IsPublic()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  async allResume(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.resumeService.allResume({
      page,
      limit,
      route: 'http://loclahost:4000/resume',
    });
  }

  @Put(':id')
  async updateResume(@Param('id') id: string, @Body() resume: ResumeDto) {
    return await this.resumeService.updateResume(id, resume);
  }

  @Put('personal-info/:id')
  async updatePersonalInfo(
    @Param('id') id: string,
    @Body() personalInfo: PersonalInfoDto,
  ) {
    return await this.resumeService.updatePersonalInfo(id, personalInfo);
  }

  @Get('personal-info/:id')
  async getPersonalInfo(@Param('id') id: string) {
    return await this.resumeService.getPersonalInfo(id);
  }

  @Get('personal-info')
  async allPersonalInfo() {
    return await this.resumeService.allPersonalInfo();
  }

  @Put('summary/:id')
  async updateSummary(
    @Param('id') id: string,
    @Body() summary: ProfessionalSummaryDto,
  ) {
    return await this.resumeService.updateSummary(id, summary);
  }

  @Get('summary/:id')
  async getSummary(@Param('id') id: string) {
    return await this.resumeService.getSummary(id);
  }

  @Get('summary')
  async allSummary() {
    return await this.resumeService.allSummary();
  }

  @Post('experience-category/:id')
  async createExperienceCategory(
    @Param('id') id: string,
    @Body() experienceCategory: ExperienceCategoryDto,
  ) {
    return await this.resumeService.createExperienceCategory(
      id,
      experienceCategory,
    );
  }

  @Put('experience-category/:id')
  async updateExperienceCategory(
    @Param('id') id: string,
    @Body() experienceCategory: ExperienceCategoryDto,
  ) {
    return await this.resumeService.updateExperienceCategory(
      id,
      experienceCategory,
    );
  }

  @Get('experience-category/:id')
  async getExperienceCategory(@Param('id') id: string) {
    return await this.resumeService.getExperienceCategory(id);
  }

  @Get('experience-category')
  async allExperienceCategory() {
    return await this.resumeService.allExperienceCategory();
  }

  @Post('experience/:id')
  async createExperience(
    @Param('id') id: string,
    @Body() experience: ExperienceDto,
  ) {
    return await this.resumeService.createExperience(id, experience);
  }

  @Put('experience/:id')
  async updateExperience(
    @Param('id') id: string,
    @Body() experience: ExperienceDto,
  ) {
    return await this.resumeService.updateExperience(id, experience);
  }

  @Get('experience/:id')
  async getExperience(@Param('id') id: string) {
    return await this.resumeService.getExperience(id);
  }

  @Get('experience')
  async allExperience() {
    return await this.resumeService.allExperience();
  }

  @Post('skill-category/:id')
  async createSkillCategory(
    @Param('id') id: string,
    @Body() skillCategory: SkillCategoryDto,
  ) {
    return await this.resumeService.createSkillCategory(id, skillCategory);
  }

  @Put('skill-category/:id')
  async updateSkillCategory(
    @Param('id') id: string,
    @Body() skillCategory: SkillCategoryDto,
  ) {
    return await this.resumeService.updateSkillCategory(id, skillCategory);
  }

  @Get('skill-category/:id')
  async getSkillCategory(@Param('id') id: string) {
    return await this.resumeService.getSkillCategory(id);
  }

  @Get('skill-category')
  async allSkillCategory() {
    return await this.resumeService.allSkillCategory();
  }

  @Post('skill/:id')
  async createSkill(@Param('id') id: string, @Body() skill: SkillDto) {
    return await this.resumeService.createSkill(id, skill);
  }

  @Put('skill/:id')
  async updateSkill(@Param('id') id: string, @Body() skill: SkillDto) {
    return await this.resumeService.updateSkill(id, skill);
  }

  @Get('skill/:id')
  async getSkill(@Param('id') id: string) {
    return await this.resumeService.getSkill(id);
  }

  @Get('skill')
  async allSkill() {
    return await this.resumeService.allSkill();
  }

  @Post('certificate/:id')
  async createCertificate(
    @Param('id') id: string,
    @Body() certificate: CertificateDto,
  ) {
    return await this.resumeService.createCertificate(id, certificate);
  }

  @Put('certificate/:id')
  async updateCertificate(
    @Param('id') id: string,
    @Body() certificate: CertificateDto,
  ) {
    return await this.resumeService.updateCertificate(id, certificate);
  }

  @Get('certificate/:id')
  async getCertificate(@Param('id') id: string) {
    return await this.resumeService.getCertificate(id);
  }

  @Get('certificate')
  async allCertificate() {
    return await this.resumeService.allCertificate();
  }

  @Post('course/:id')
  async createCourse(@Param('id') id: string, @Body() course: CourseDto) {
    return await this.resumeService.createCourse(id, course);
  }

  @Put('course/:id')
  async updateCourse(@Param('id') id: string, @Body() course: CourseDto) {
    return await this.resumeService.updateCourse(id, course);
  }

  @Get('course/:id')
  async getCourse(@Param('id') id: string) {
    return await this.resumeService.getCourse(id);
  }

  @Get('course')
  async allCourse() {
    return await this.resumeService.allCourse();
  }

  @Post('interest/:id')
  async createInterest(@Param('id') id: string, @Body() interest: InterestDto) {
    return await this.resumeService.createInterest(id, interest);
  }

  @Put('interest/:id')
  async updateInterest(@Param('id') id: string, @Body() interest: InterestDto) {
    return await this.resumeService.updateInterest(id, interest);
  }

  @Get('interest/:id')
  async getInterest(@Param('id') id: string) {
    return await this.resumeService.getInterest(id);
  }

  @Get('interest')
  async allInterest() {
    return await this.resumeService.allInterest();
  }

  @Post('additional/:id')
  async createAdditional(
    @Param('id') id: string,
    @Body() additional: AdditionalDto,
  ) {
    return await this.resumeService.createAdditional(id, additional);
  }

  @Put('additional/:id')
  async updateAdditional(
    @Param('id') id: string,
    @Body() additional: AdditionalDto,
  ) {
    return await this.resumeService.updateAdditional(id, additional);
  }

  @Get('additional/:id')
  async getAdditional(@Param('id') id: string) {
    return await this.resumeService.getAdditional(id);
  }

  @Get('additional')
  async allAdditional() {
    return await this.resumeService.allAdditional();
  }

  @Post('education/:id')
  async createEducation(
    @Param('id') id: string,
    @Body() education: EducationDto,
  ) {
    return await this.resumeService.createEducation(id, education);
  }

  @Put('education/:id')
  async updateEducation(
    @Param('id') id: string,
    @Body() education: EducationDto,
  ) {
    return await this.resumeService.updateEducation(id, education);
  }

  @Get('education/:id')
  async getEducation(@Param('id') id: string) {
    return await this.resumeService.getEducation(id);
  }

  @Get('education')
  async allEducation() {
    return await this.resumeService.allEducation();
  }
}
