import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class CreateCreateSkillDto {
  @ApiProperty({ type: String, isArray: true })
  @ValidateNested({ each: true })
  skills: string[];
}
