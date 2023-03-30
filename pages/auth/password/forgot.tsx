import * as Yup from "yup";
import { Formik } from "formik";
import { getSession } from "next-auth/react";

import { Input, Auth, Button } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { forgotPassword } from "redux/_actions/authAction";

import type { NextPage, GetServerSideProps } from "next";

const ForgotPassword: NextPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <Auth title="Forgot password" description="Recovery forgotten password">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        })}
        onSubmit={async ({ email }, { setStatus, setSubmitting }) => {
          setStatus();
          dispatch(forgotPassword(email));

          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-3"
          >
            <Input
              formik
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              label="Email"
              placeholder="example@gmail.com"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              disabled={values.email === ""}
            >
              Submit
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

export default ForgotPassword;

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
