import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  exports: [MailerService],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
