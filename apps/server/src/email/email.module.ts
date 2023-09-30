import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IAms } from './entity/iam.entity';
import { EmailController } from './email.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IAms])],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
