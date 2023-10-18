import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceCategoryDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  description: string;
}
