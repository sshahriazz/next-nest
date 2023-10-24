import { ApiProperty } from '@nestjs/swagger';
import { Education } from '../entity/education.entity';

export class CreateEducationDto extends Education {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  institute: string;

  @ApiProperty({ type: String })
  degree: string;

  @ApiProperty({ type: String })
  subject: string;

  @ApiProperty({ type: String })
  grade: string;

  @ApiProperty({ type: String })
  major: string;

  @ApiProperty({ type: String })
  startYear: string;

  @ApiProperty({ type: String })
  endYear: string;
}

export class UpdateEducationDto extends CreateEducationDto {}
