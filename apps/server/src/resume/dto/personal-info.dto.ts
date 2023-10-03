import { ApiProperty } from '@nestjs/swagger';

export class OtherSocialLinkDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  link: string;
}

export class AdditionalFieldDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  value: string;
}

export class PersonalInfoDto {
  @ApiProperty({ type: String })
  firstname: string;
  @ApiProperty({ type: String })
  lastname: string;
  @ApiProperty({ type: String })
  designation: string;
  @ApiProperty({ type: String })
  company: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  phone: string;
  @ApiProperty({ type: String })
  address: string;
  @ApiProperty({ type: String })
  city: string;
  @ApiProperty({ type: String })
  stateOrDistrict: string;
  @ApiProperty({ type: String })
  zip: string;
  @ApiProperty({ type: String })
  country: string;
  @ApiProperty({ type: String })
  linkedin: string;
  @ApiProperty({ type: OtherSocialLinkDto, isArray: true })
  otherSocialLink: OtherSocialLinkDto[];
  @ApiProperty({ type: AdditionalFieldDto, isArray: true })
  additionalFields: AdditionalFieldDto[];
}
