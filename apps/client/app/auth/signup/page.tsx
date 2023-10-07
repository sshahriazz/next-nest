import SignupForm from "@client/components/forms/SignupForm";
import { Logo } from "@client/components/icons";
import { subtitle, title } from "@client/components/primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Link as NextLink } from "@nextui-org/link";
import React from "react";

async function SignUp() {
  return (
    <div className="flex flex-col justify-center w-[400px]">
      <Logo className="self-center" size={150} />
      <Card className="p-2">
        <CardHeader className="flex-col items-start ">
          <h1 className={title({ size: "sm", color: "blue" })}>Sign Up</h1>
          <h2 className={subtitle({})}>Sing Up with your email</h2>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <SignupForm />
          <div className="flex gap-3 mt-3">
            <span>Already have an account?</span>
            <NextLink
              as={Link}
              className="flex items-center gap-1 text-primary-500"
              href="/auth/signin"
              title="Signin"
            >
              Signin
            </NextLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignUp;
