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
    <div className="w-[210mm] p-6 border">
      <PersonalInfo
        socialLinkPosition="right"
        avatarEnabled
        classNames={{
          base: "flex border p-4 rounded shadow-lg flex-col gap-5 transition-all duration-300 ease-in-out",
          profileWrapper: "flex gap-3",
          nameText: "text-5xl font-bold",
          // socialLinkWrapper: "flex justify-between gap-3",
          // renderLinkWrapper: "flex gap-3",
        }}
        summaryEnabled
        renderSocial
        avatarMode="avatar"
        imageProps={{ isZoomed: true }}
        avatarProps={{
          size: "lg",
          isBordered: true,
          className: "w-20 h-20",
          radius: "sm",
        }}
      />
    </div>
  );
}

export default ResumePreview;
