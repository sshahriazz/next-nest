import { subtitle, text, title } from "@client/components/primitives";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";
import React from "react";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@client/config/site";

function MySettings({ params }: { params: { username: string } }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <Card>
          <CardBody className="flex flex-col items-center gap-4">
            <div>
              <p className={text({ className: "text-center" })}>Name OF User</p>
              <p className={text({ position: "center", size: "sm" })}>
                @handle
              </p>
            </div>
            <Badge content={"X"} color="danger" placement="top-right">
              <Avatar
                isBordered
                radius="md"
                color="default"
                className={"w-28 h-28 self-center object-cover"}
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </Badge>
            <Button radius="sm" color="primary" className="mt-5 w-1/2">
              Upload New Photo
            </Button>
            <div className="border border-warning-400 rounded-md p-4">
              <p className={text({ size: "sm" })}>
                Upload a new avatar, Large Image will be resized to 150x150,
                maximum size is 1MB
              </p>
            </div>
            <p
              className={text({
                className: "inline",
                position: "center",
                fontWeight: "medium",
              })}
            >
              Joined since:{" "}
              <span className={text({ className: "inline" })}>
                29 September 2019
              </span>
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="col-span-8">
        <Card>
          <CardBody>
            <h1
              className={title({
                color: "blue",
                size: "sm",
                className: "mb-3",
              })}
            >
              User Information
            </h1>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6">
                <Input type="text" label="First Name" />
              </div>
              <div className="col-span-6">
                <Input type="text" label="Last Name" />
              </div>
              <div className="col-span-6">
                <Input type="email" label="Email" />
              </div>
              <div className="col-span-6">
                <Input type="text" label="Role" disabled />
              </div>
              <div className="col-start-12 col-end-12 flex justify-end">
                <Button className="ml-auto">Submit</Button>
              </div>
            </div>
            <h1
              className={title({
                color: "blue",
                size: "sm",
                className: "mb-3",
              })}
            >
              Change Password
            </h1>
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-6">
                <Input type="password" label="Old Password" />
              </div>
              <div className="col-span-6">
                <Input type="password" label="New Password" />
              </div>

              <div className="col-start-12 col-end-12 flex justify-end">
                <Button className="ml-auto">Submit</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default MySettings;
