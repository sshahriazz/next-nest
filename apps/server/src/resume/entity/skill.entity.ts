import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SkillCategory } from './skill-category.entity';

@Entity('skill')
export class Skill extends CommonEntity {
  @Column({ type: 'varchar', array: true })
  skills: string[];

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.skills)
  skillCategory: SkillCategory;
}
