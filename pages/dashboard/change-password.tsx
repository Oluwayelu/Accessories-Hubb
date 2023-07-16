import * as Yup from "yup";
import { Formik } from "formik";
import { getSession } from "next-auth/react";

import { LOGIN, PROFILE } from "routes";
import { Input, Button, Dashboard } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";
import { updatePassword } from "_redux/_actions/authAction";

import type { GetServerSideProps } from "next";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <Dashboard title="Change password">
      <h1 className="text-2xl font-medium">Change your password</h1>

      <Formik
        initialValues={{
          password: "",
          currPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object().shape({
          currPassword: Yup.string().required("Password is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Passoword is smaller than 6 characters")
            .max(17, "Password is larger than 17 characters"),
          confirmPassword: Yup.string().required(
            "Confirm your password"
          ),
        })}
        onSubmit={({ currPassword }, { setStatus, setSubmitting }) => {
          setStatus();
          dispatch(updatePassword(currPassword));
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full p-5 bg-white shadow rounded-xl space-y-3"
          >
            <Input
              formik
              name="currPassword"
              type="password"
              value={values.currPassword}
              onChange={handleChange}
              label="Current Password"
              placeholder="Current Password"
              caption="password most be at least 6 characters"
            />

            <Input
              formik
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              label="New Password"
              placeholder="New Password"
              caption="password most be at least 6 characters"
            />

            <Input
              formik
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              label="Confirm New Password"
              placeholder="Confirm New Password"
            />

            <Button type="submit" loading={loading}>
              Update
            </Button>
          </form>
        )}
      </Formik>
    </Dashboard>
  );
};

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: LOGIN + "?redirect=" + PROFILE,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
