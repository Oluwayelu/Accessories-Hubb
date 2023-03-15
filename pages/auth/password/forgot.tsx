import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";

import { Input, Auth } from "components";
import { forgotPassword } from "redux/_actions/userAction";

import type { NextPage, GetServerSideProps } from "next";

const ForgotPassword: NextPage = () => {
  const dispatch = useDispatch();
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

            <button
              type="submit"
              disabled={values.email === ""}
              className="py-2 w-full font-medium bg-primary rounded disabled:bg-primary-100"
            >
              Submit
            </button>

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
