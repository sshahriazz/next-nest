import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Skill } from '../entity/skill.entity';

export class CreateSkillDto {
  @ApiProperty({ type: String, isArray: true })
  @ValidateNested({ each: true })
  skills: string[];
}

export class UpdateSkillDto implements Partial<Skill> {
  @ApiProperty({ type: String, isArray: true })
  @ValidateNested({ each: true })
  skills: string[];
}
