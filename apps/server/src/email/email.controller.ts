import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { UpdateEmailIAmsDto } from './dto/update-email-iams.dto';
import { CreateEmailIAmsDto } from './dto/create-email-iams.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('my-iams/:id')
  @ApiOkResponse({ type: CreateEmailIAmsDto, isArray: true })
  async findMyEmailIAms(@Param('id') id: string) {
    return await this.emailService.findMyEmailIAms(id);
  }

  @Patch('my-iam-update/:id')
  async updateMyEmailIAms(
    @Param('id') id: string,
    @Body() updateIAmsDto: UpdateEmailIAmsDto,
  ) {
    return await this.emailService.updateMyEmailIAms(id, updateIAmsDto);
  }

  @Post('my-iam-create')
  async createMyEmailIAms(@Body() createEmailIAmsDto: CreateEmailIAmsDto) {
    return await this.emailService.createMyEmailIAms(createEmailIAmsDto);
  }

  @Delete('my-iam-delete/:id')
  async deleteMyEmailIAms(@Param('id') id: string) {
    return await this.emailService.deleteMyEmailIAms(id);
  }

  @Post('send-email/:iamId')
  async sendEmail(
    @Param('iamId') iamId: string,
    @Body() sendEmailDto: SendEmailDto,
  ) {
    return await this.emailService.sendEmail(iamId, sendEmailDto);
  }
}
