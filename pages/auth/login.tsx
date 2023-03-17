import Link from "next/link";

import * as Yup from "yup";
import { Formik } from "formik";
import { getCsrfToken, getSession } from "next-auth/react";

import { FORGOTPASSWORD } from "routes";
import { Input, Auth, Button } from "components";
import { loginUser } from "redux/_actions/userAction";
import { useAppSelector, useAppDispatch } from "hooks";

import type { NextPage, GetServerSideProps } from "next";

type Props = {
  csrfToken: string;
};

const Login: NextPage<Props> = ({ csrfToken }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  return (
    <Auth title="Login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setStatus();
          setSubmitting(true);
          dispatch(loginUser(values));

          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start space-y-3"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input
              formik
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              label="Email or mobile phone number"
              placeholder="example@gmail.com"
            />

            <Input
              formik
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              label="Password"
              placeholder="Password"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={values.email === "" || values.password === ""}
              className="w-full"
            >
              Login
            </Button>

            <Link href={FORGOTPASSWORD}>
              <a className="self-end text-sm">Forgot Password?</a>
            </Link>

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

export default Login;

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
