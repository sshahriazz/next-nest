"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Formik } from "formik";
import React from "react";
import PasswordInput from "./PasswordInput";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Checkbox } from "@nextui-org/checkbox";
import { string, ref, object } from "yup";
import { toast } from "react-hot-toast";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import api from "@client/config/axios";

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
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of passwrod.
    .oneOf([ref("password")], "Passwords does not match"),
});

function SignupForm() {
  const { mutateAsync, error, data } = useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await api.post("/auth/signup", data);
      return response;
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await mutateAsync({
          firstname: "string",
          lastname: "string",
          ...values,
        });

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
        /* and other goodies */
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
          <PasswordInput
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
            <Checkbox defaultSelected>Remember Me</Checkbox>
            <Link href="/auth/password/reset" as={NextLink}>
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" variant="flat" color="primary">
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignupForm;
