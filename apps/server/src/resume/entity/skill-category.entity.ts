import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Skill } from './skill.entity';
import CommonEntity from '@server/common/configs/common-entity';
import { Resume } from './resume.entity';

@Entity('skill_category')
export class SkillCategory extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, default: '' })
  name: string;

  @OneToMany(() => Skill, (skill) => skill.skillCategory, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  skills: Skill[];

  @ManyToOne(() => Resume, (resume) => resume.skillCategories)
  resume: Resume;
}
