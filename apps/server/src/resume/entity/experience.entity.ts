import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ExperienceCategory } from './experience-category.entity';

@Entity('experience')
export class Experience extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, default: '' })
  jobTitle: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  companyName: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  location: string;
  @Column({ type: 'date', nullable: false })
  startDate: Date;
  @Column({ type: 'date', nullable: false })
  endDate: Date;
  @Column({ type: 'varchar', array: true })
  responsibilities: string[];

  @ManyToOne(
    () => ExperienceCategory,
    (experienceCategory) => experienceCategory.experiences,
  )
  category: ExperienceCategory;
}
