import { useRouter } from "next/router";

import * as Yup from "yup";
import { Formik } from "formik";
import { getSession } from "next-auth/react";

import { Input, Button, Auth } from "components";
import { useAppSelector, useAppDispatch } from "hooks";
import { resetPassword } from "_redux/_actions/authAction";

import type { NextPage, GetServerSideProps } from "next";

const Reset: NextPage = () => {
  const dispatch = useAppDispatch();

  const { query } = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <Auth title="Reset Password">
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required("Password is required")
            .min(6, "Passoword is smaller than 6 characters")
            .max(17, "Password is larger than 17 characters"),
          confirmPassword: Yup.string().required("Confirm your password"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setStatus();
          dispatch(
            resetPassword(
              values.password,
              values.confirmPassword,
              query.token as string
            )
          );

          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-3"
          >
            <Input
              formik
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              label="Password"
              placeholder="Password"
              caption="password most be at least 6 characters"
            />

            <Input
              formik
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              placeholder="Confirm Password"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={values.confirmPassword === "" || values.password === ""}
              className="w-full"
            >
              Reset Password
            </Button>

            <p className="text-sm">
              By continuing you agree to Accessories Hubb{" "}
              <span className="text-primary">Terms & Condition</span> and{" "}
              <span className="text-primary">Privacy Notice</span>
            </p>
          </form>
        )}
      </Formik>
    </Auth>
  );
};

export default Reset;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: context.query?.redirect
          ? (context.query.redirect as string)
          : "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
