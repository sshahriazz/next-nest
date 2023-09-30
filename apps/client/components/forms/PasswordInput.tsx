import React from "react";

import { Input, InputProps } from "@nextui-org/Input";
import { EyeSlashFilledIcon } from "./svgs/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./svgs/EyeFilledIcon";
import { Button } from "@nextui-org/button";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      endContent={
        <Button
          isIconOnly
          size="sm"
          variant="faded"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </Button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}
