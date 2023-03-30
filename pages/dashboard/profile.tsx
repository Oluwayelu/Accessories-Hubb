import Image from "next/image";

import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { getSession } from "next-auth/react";
import { FaMale, FaFemale, FaEdit } from "react-icons/fa";

import { LOGIN, PROFILE } from "routes";
import { Input, Button, Landing } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";
import { updatePassword, updateProfile } from "redux/_actions/authAction";

import type { Session } from "next-auth";
import type { GetServerSideProps } from "next";

const Profile = ({ session }: { session: Session }) => {
  const dispatch = useAppDispatch();
  const { userInfo, loading } = useAppSelector((state) => state.auth);

  return (
    <Landing
      title={`${userInfo.firstname} Profile`}
      description="About Accessoriess Hubb"
      className="p-3"
    >
      <div className="max-w-7xl mx-auto px-2 py-5 space-y-3">
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          <div className="w-full lg:w-1/3 py-5 bg-primary-100 flex flex-col items-center justify-center rounded-3xl shadow-xl space-y-5">
            <div className="w-full inline-flex flex-col items-center justify-center py-5 border-b-2 border-b-white space-y-5">
              <div className="relative w-28 h-28 bg-gray-100 rounded-full cursor-pointer">
                <Image
                  priority
                  src="/images/avatar/guy_4.png"
                  layout="fill"
                  alt="logo"
                  className="rounded-full object-center object-cover"
                />
                <div className="absolute right-0 bottom-0 w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <FaEdit className="w-4 h-4" />
                </div>
              </div>
              <h1 className="text-3xl font-medium">{session.user.name}</h1>
            </div>

            <div></div>
          </div>

          <div className="w-full lg:w-2/3 p-5 rounded-3xl shadow bg-white space-y-3">
            <div className="w-full py-5 border-b-2 space-y-5">
              <h2 className="text-2xl font-medium">User Informations</h2>

              <Formik
                initialValues={{
                  firstname: userInfo.firstname,
                  lastname: userInfo.lastname,
                  email: userInfo.email,
                  phoneNumber: userInfo.phoneNumber,
                  gender: userInfo.gender,
                }}
                validationSchema={Yup.object().shape({
                  firstname: Yup.string().required("Firstname is required"),
                  lastname: Yup.string().required("Lastname is required"),
                  gender: Yup.string()
                    .required("Gender is required")
                    .oneOf(["male", "female"], "Not a valid gender"),
                  phoneNumber: Yup.string().required(
                    "Phone Number is required"
                  ),
                })}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                  setStatus();
                  setSubmitting(true);
                  dispatch(updateProfile(values));
                }}
              >
                {({ handleSubmit, handleChange, values, isSubmitting }) => (
                  <form onSubmit={handleSubmit} className="w-full space-y-3">
                    <div className="w-full grid md:grid-cols-2 gap-3">
                      <Input
                        formik
                        name="firstname"
                        label="Firstname"
                        value={values.firstname}
                        onChange={handleChange}
                      />
                      <Input
                        formik
                        name="lastname"
                        label="Lastname"
                        value={values.lastname}
                        onChange={handleChange}
                      />
                      <Input
                        formik
                        disabled
                        name="email"
                        type="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <Input
                        formik
                        type="tel"
                        name="phoneNumber"
                        label="Phone Number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold">Gender</label>
                      <div className="w-full flex items-center justify-around">
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                          <div className="w-full flex justify-center items-center gap-2">
                            <Input
                              type="radio"
                              value="male"
                              name="gender"
                              className="w-fit"
                              onChange={handleChange}
                              defaultChecked={values.gender === "male"}
                            />
                            <label>Male</label>
                          </div>
                          <FaMale
                            className={`${
                              values.gender === "male"
                                ? "text-primary"
                                : "text-primary-100"
                            } w-16 h-16 text-primary`}
                          />
                        </div>

                        <div className="w-full flex flex-col items-center justify-center gap-3">
                          <div className="w-full flex justify-center items-center gap-2">
                            <Input
                              type="radio"
                              value="female"
                              name="gender"
                              className="w-fit"
                              onChange={handleChange}
                              defaultChecked={values.gender === "female"}
                            />
                            <label>Female</label>
                          </div>
                          <FaFemale
                            className={`${
                              values.gender === "female"
                                ? "text-primary"
                                : "text-primary-100"
                            } w-16 h-16 text-primary`}
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <Button type="submit" loading={loading} className="w-full">
                      Update
                    </Button>
                  </form>
                )}
              </Formik>
            </div>

            <div className="py-5 space-y-5">
              <h2 className="text-2xl font-medium">Change your password</h2>

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
                    className="w-full flex flex-col items-center space-y-3"
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

                    <Button type="submit" loading={loading} className="w-full">
                      Update
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Landing>
  );
};

export default Profile;

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
    props: { session },
  };
};
