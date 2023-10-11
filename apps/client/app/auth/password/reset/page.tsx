import { title } from "@client/components/primitives";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

function ResetPassword() {
  return (
    <>
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
    </>
  );
}

export default ResetPassword;
