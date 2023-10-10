"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import PasswordInput from "./PasswordInput";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Checkbox } from "@nextui-org/checkbox";
import { string, object } from "yup";
import { useRouter } from "next/navigation";
import React from "react";
import { setCookie } from "cookies-next";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

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
import { authPath as cacheKey, signin } from "@client/services/auth-api";
import toast from "react-hot-toast";
import storage from "react-secure-storage";
function SigninForm() {
  const router = useRouter();
  const { cache, mutate } = useSWRConfig();
  const { trigger, error } = useSWRMutation("/auth/signin", signin);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const result = await trigger({ ...values });
        if (result.data) {
          storage.setItem("accessToken", result.data.tokens.accessToken);
          setCookie("refreshToken", result.data.tokens.refreshToken, {
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          });
          setCookie("accessToken", result.data.tokens.accessToken, {
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          });
          window.dispatchEvent(new Event("storage"));
          mutate(cacheKey);
          router.replace("/");
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
            autoComplete="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errorMessage={errors.email && touched.email && errors.email}
          />
          <PasswordInput
            name="password"
            label="Password"
            autoComplete="current-password"
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
            isLoading={isSubmitting}
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
