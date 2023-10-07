"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import PasswordInput from "./PasswordInput";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Checkbox } from "@nextui-org/checkbox";
import { string, object } from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSigninMutation } from "@client/services/auth";
import React from "react";
import { setCookie } from "cookies-next";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least one ${str} character`;
};
const SignupSchema = object().shape({
  email: string().email("Invalid email").required("Email Required"),
  password: string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      getCharacterValidationError("special")
    ),
});

function SigninForm() {
  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const result: any = await signin(values);
        if (result.data) {
          toast.success(result.data.message);
          setCookie("refreshToken", result.data.data.tokens.refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: true,
          });
          setCookie("accessToken", result.data.data.tokens.accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            secure: true,
          });
          router.push("/");
        } else {
          toast.error(
            Array.isArray(result.error.data.message)
              ? result.error.data.message[0].constraints
              : result.error.data.message
          );
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errorMessage={errors.email && touched.email && errors.email}
          />
          <PasswordInput
            name="password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errorMessage={
              errors.password && touched.password && errors.password
            }
          />

          <div className="py-2 flex gap-12 justify-between">
            <Checkbox defaultSelected>Remember Me</Checkbox>
            <Link href="/auth/password/reset" as={NextLink}>
              Forgot Password?
            </Link>
          </div>
          <Button
            isLoading={isSubmitting || isLoading}
            type="submit"
            variant="flat"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default React.memo(SigninForm);
