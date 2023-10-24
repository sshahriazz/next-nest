import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '../entity/resume.entity';
import { Additional } from '../entity/additional.entity';

export class CreateResumeDto {
  @ApiProperty({ required: true, type: String })
  authorId: string;
}
