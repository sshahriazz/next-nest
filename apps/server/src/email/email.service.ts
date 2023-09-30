import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAms } from './entity/iam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailIAmsDto } from './dto/create-email-iams.dto';
import { UpdateEmailIAmsDto } from './dto/update-email-iams.dto';
import { SendEmailDto } from './dto/send-email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(IAms) private readonly emailRepository: Repository<IAms>,
  ) {}

  async findMyEmailIAms(id: string) {
    return await this.emailRepository.find({
      where: {
        user: { id: id },
      },
    });
  }
  async updateMyEmailIAms(id: string, updateIAmsIAmsDto: UpdateEmailIAmsDto) {
    return await this.emailRepository.update(id, updateIAmsIAmsDto);
  }
  async createMyEmailIAms(createEmailIAmsDto: CreateEmailIAmsDto) {
    return await this.emailRepository.save(createEmailIAmsDto);
  }
  async deleteMyEmailIAms(id: string) {
    return await this.emailRepository.delete(id);
  }
  async sendEmail(iamId: string, sendEmailDto: SendEmailDto) {
    const iam = await this.emailRepository.findOne({
      where: {
        id: iamId,
        isActive: true,
      },
    });

    if (!iam) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }

    const mailerClient: nodemailer.Transporter = nodemailer.createTransport({
      host: iam.config.host,
      port: iam.config.port,
      auth: {
        user: iam.credentials.access_key,
        pass: iam.credentials.secret_key,
      },
    });
    const sendResponse = await mailerClient.sendMail({
      from: sendEmailDto.from,
      to: sendEmailDto.to,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
      html: sendEmailDto.html,
    });
    return sendResponse;
  }
}
