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
import { authApi, useSigninMutation } from "@client/services/auth";
import { dispatch } from "@client/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
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
          router.push("/");
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

          <div className="py-2 flex justify-between">
            <Checkbox defaultSelected>Remember Me</Checkbox>
            <Link href="/auth/password/reset" as={NextLink}>
              Forgot Password?
            </Link>
          </div>
          <Button
            isLoading={isLoading}
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

export default SigninForm;
