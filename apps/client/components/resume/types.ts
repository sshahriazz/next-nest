export interface IPersonalInfo {
  firstname: string;
  lastname: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stateOrDistrict: string;
  zip: string;
  country: string;
  linkedin: string;
  otherSocialLink: IOtherSocialLink[];
  additionalFields: IAdditionalField[];
}

export interface IOtherSocialLink {
  name: string;
  link: string;
}

export interface IAdditionalField {
  name: string;
  value: string;
}

export interface ISummary {
  id: string;
  type: string;
  summary: string;
}
