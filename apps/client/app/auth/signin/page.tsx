import { Logo } from "@client/components/icons";
import { subtitle, title } from "@client/components/primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { Link as NextLink } from "@nextui-org/link";
import React from "react";
import SigninForm from "@client/components/forms/SigninForm";
import { redirect } from "next/navigation";
import { useAppSelector } from "@client/store/hooks";

function SignIn() {
  return (
    <div className="flex flex-col justify-center">
      <Logo className="self-center" size={150} />
      <Card classNames={{ base: "p-3" }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className={title({ size: "sm", color: "blue" })}>Sign In</h1>
          <h2 className={subtitle({})}>Sing In with your email</h2>
        </CardHeader>
        <CardBody className="overflow-hidden py-2">
          <SigninForm />
          <div className="flex gap-3 mt-3">
            <span>Don&apos;t have an account?</span>
            <NextLink
              as={Link}
              className="flex items-center gap-1 text-primary-500"
              href="/auth/signup"
              title="Signin"
            >
              Signup
            </NextLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignIn;
