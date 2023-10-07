import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { IsPublic } from '@server/auth/public.decorator';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
}
