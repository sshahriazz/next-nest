import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDto {
  @ApiProperty({ required: true, type: String })
  authorId: string;
}
