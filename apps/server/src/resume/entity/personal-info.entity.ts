import CommonEntity from '@server/common/configs/common-entity';
import { Column, Entity } from 'typeorm';

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
  @Column({ type: 'json', array: true, nullable: true })
  otherSocialLink: OtherSocialLink[];
  @Column({ type: 'json', array: true, nullable: true })
  additionalFields: AdditionalField[];
}
