import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillCategoryDto {
  @ApiProperty({ type: String })
  name: string;
}
