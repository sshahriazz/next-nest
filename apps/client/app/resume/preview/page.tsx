import { ISummary, type IPersonalInfo } from "@client/components/resume/types";
import PersonalInfo from "@client/components/resume/view/PersonalInfo";
import Summary from "@client/components/resume/view/Summary";
import React from "react";

const personalInfo: IPersonalInfo = {
  firstname: "John",
  lastname: "Doe",
  designation: "Software Engineer",
  company: "ABC Inc.",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  address: "123 Main St",
  city: "Anytown",
  stateOrDistrict: "CA",
  zip: "12345",
  country: "USA",
  linkedin: "https://www.linkedin.com/in/johndoe/",
  otherSocialLink: [
    {
      name: "GitHub",
      link: "https://github.com/johndoe",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/johndoe",
    },
  ],
  additionalFields: [
    {
      name: "Hobbies",
      value: "Reading, hiking",
    },
    {
      name: "Skills",
      value: "JavaScript, React, Node.js",
    },
  ],
};
const summary: ISummary = {
  id: "9203-werw-3-233-sf",
  type: "paragraph",
  summary: "",
};
const resumeDummy = {
  personalInfo: personalInfo,
  summary: summary,
};

function ResumePreview() {
  return (
    <>
      <PersonalInfo personalInfo={resumeDummy.personalInfo} />
      <Summary summary={resumeDummy.summary} />
    </>
  );
}

export default ResumePreview;
