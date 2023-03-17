import { useRouter } from "next/router";

import * as Yup from "yup";
import { Formik } from "formik";
import { getCsrfToken, getSession } from "next-auth/react";

import { Input, Auth, Button } from "components";
import { useAppSelector, useAppDispatch } from "hooks";
import { registerUser } from "redux/_actions/userAction";

import type { NextPage, GetServerSideProps } from "next";

type Props = {
  csrfToken: string;
};

const Register: NextPage<Props> = ({ csrfToken }) => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  return (
    <Auth title="Create an account">
      <Formik
        initialValues={{
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: "",
          refId: query.refId ? query.refId : "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
          firstname: Yup.string().required("Firstname is required"),
          lastname: Yup.string().required("Lastname is required"),
          password: Yup.string()
            .required("Password is required")
            .min(6, "Passoword is smaller than 6 characters")
            .max(17, "Password is larger than 17 characters"),
          confirmPassword: Yup.string().required("Confirm your password"),
        })}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          setStatus();
          setSubmitting(true);
          dispatch(registerUser(values));
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-3"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="w-full flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2">
              <Input
                formik
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                placeholder="Firstname"
                label="Firstname"
              />

              <Input
                formik
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                placeholder="Lastname"
                label="Lastname"
              />
            </div>

            <Input
              formik
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              label="Email or mobile phone number"
              placeholder="example@gmail.com"
            />

            <div className="w-full flex items-start flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-2">
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
            </div>

            <Input
              formik
              name="refId"
              value={values.refId}
              onChange={handleChange}
              placeholder="Referal Id"
              label="Ref Id (Optional)"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={values.email === "" || values.password === ""}
              className="w-full"
            >
              Register
            </Button>

            <p className="text-sm">
              By creating account, you agree to Accessories Hubb{" "}
              <span className="text-primary">Terms & Condition</span> and{" "}
              <span className="text-primary">Privacy Notice</span>
            </p>
          </form>
        )}
      </Formik>
    </Auth>
  );
};

export default Register;

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
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
