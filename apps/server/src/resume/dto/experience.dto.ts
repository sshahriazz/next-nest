import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  jobTitle: string;
  @ApiProperty({ type: String })
  companyName: string;
  @ApiProperty({ type: String })
  location: string;
  @ApiProperty({ type: String, isArray: true })
  responsibilities: string[];
}
