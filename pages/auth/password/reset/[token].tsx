import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import { Input, Auth } from "components";
import { resetPassword } from "redux/_actions/userAction";

import type { NextPage } from "next";
import { useRouter } from "next/router";

const Reset: NextPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();

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

            <button
              type="submit"
              disabled={values.confirmPassword === "" || values.password === ""}
              className="py-2 w-full font-medium bg-primary rounded disabled:bg-primary-100"
            >
              Reset Password
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

export default Reset;
