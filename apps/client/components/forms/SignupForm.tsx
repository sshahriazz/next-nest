"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import PasswordInput from "./PasswordInput";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Checkbox } from "@nextui-org/checkbox";
import { string, ref, object } from "yup";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useSignupMutation } from "@client/services/auth";
import { useAppSelector } from "@client/store/hooks";
import { setCookie } from "cookies-next";

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const SignupSchema = object().shape({
  email: string().email("Invalid email").required("Email Required"),
  password: string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),
  firstname: string()
    .min(3, "Name must be at least 3 character")
    .required("First Name Required"),
  lastname: string()
    .min(3, "Name must be at least 3 character")
    .required("Last Name Required"),
});

function SignupForm() {
  const router = useRouter();

  const [signup, { isLoading }] = useSignupMutation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.email) {
      router.replace("/");
    }
  }, [user]);

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const result: any = await signup(values);
        if (result.data) {
          toast.success(result.data.message);

          // router.push("/");
        } else {
          toast.error(result.error.data.message);
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
            id="firstname"
            type="text"
            name="firstname"
            label="First Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstname}
            errorMessage={
              errors.firstname && touched.firstname && errors.firstname
            }
          />

          <Input
            id="lastname"
            type="text"
            name="lastname"
            label="Last Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastname}
            errorMessage={
              errors.lastname && touched.lastname && errors.lastname
            }
          />

          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errorMessage={errors.email && touched.email && errors.email}
          />
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errorMessage={
              errors.password && touched.password && errors.password
            }
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            errorMessage={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
          />
          <div className="py-2 flex justify-between">
            <Checkbox>I Accept Terms & Conditions</Checkbox>
          </div>
          <Button
            isLoading={isSubmitting || isLoading}
            type="submit"
            variant="flat"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default memo(SignupForm);
