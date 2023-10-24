import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Resume } from './resume.entity';

export interface OtherSocialLink {
  name: string;
  link: string;
}

export interface AdditionalField {
  name: string;
  value: string;
}

@Entity('personal_info')
export class PersonalInfo extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, default: '' })
  firstname: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  lastname: string;
  @Column({ type: 'varchar', nullable: true, default: '' })
  designation: string;
  @Column({ type: 'varchar', nullable: true, default: '' })
  company: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  email: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  phone: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  address: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  city: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  stateOrDistrict: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  zip: string;
  @Column({ type: 'varchar', nullable: false, default: '' })
  country: string;
  @Column({ type: 'varchar', nullable: true })
  linkedin: string;
  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(value: OtherSocialLink[]): string {
        return JSON.stringify(value);
      },
      from(value: string): OtherSocialLink[] {
        return JSON.parse(value);
      },
    },
  })
  otherSocialLink?: OtherSocialLink[];
  @Column({
    type: 'json',
    transformer: {
      to(value: AdditionalField[]): string {
        return JSON.stringify(value);
      },
      from(value: string): AdditionalField[] {
        return JSON.parse(value);
      },
    },
    nullable: true,
  })
  additionalFields?: AdditionalField[];
  @ManyToOne(() => Resume, (resume) => resume.personalInfos)
  resume: Resume;
}
