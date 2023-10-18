import { text } from "@client/components/primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";
import { IPersonalInfo } from "../types";

function PersonalInfo({ personalInfo }: { personalInfo: IPersonalInfo }) {
  return (
    <Card>
      <CardHeader>
        <h2 className={text()}>Personal Info</h2>
      </CardHeader>
      <CardBody>
        <div>
          <h2>Personal Information</h2>
          <p>
            <strong>Name:</strong> {personalInfo.firstname}{" "}
            {personalInfo.lastname}
          </p>
          <p>
            <strong>Designation:</strong> {personalInfo.designation}
          </p>
          <p>
            <strong>Company:</strong> {personalInfo.company}
          </p>
          <p>
            <strong>Email:</strong> {personalInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {personalInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {personalInfo.address}
          </p>
          <p>
            <strong>City:</strong> {personalInfo.city}
          </p>
          <p>
            <strong>State/District:</strong> {personalInfo.stateOrDistrict}
          </p>
          <p>
            <strong>Zip:</strong> {personalInfo.zip}
          </p>
          <p>
            <strong>Country:</strong> {personalInfo.country}
          </p>
          <p>
            <strong>LinkedIn:</strong> {personalInfo.linkedin}
          </p>
          <div>
            <strong>Other Social Links:</strong>
            {personalInfo.otherSocialLink.map((link) => (
              <div key={link.name}>
                <a href={link.link}>{link.name}</a>
              </div>
            ))}
          </div>
          <div>
            <strong>Additional Fields:</strong>
            {personalInfo.additionalFields.map((field) => (
              <div key={field.name}>
                <strong>{field.name}:</strong> {field.value}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PersonalInfo;
