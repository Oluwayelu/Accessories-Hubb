import { useState } from "react"

import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { getSession } from "next-auth/react";
import { FaMale, FaFemale, FaEdit } from "react-icons/fa";

import { LOGIN, PROFILE } from "routes";
import { Input, Button, Avatar, Modal, Dashboard } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";
import { changeAvatar, updateProfile } from "redux/_actions/authAction";

import type { Session } from "next-auth";
import type { GetServerSideProps } from "next";

const avatars = [
  "/images/avatar/man_1.png", 
  "/images/avatar/man_2.png", 
  "/images/avatar/man_3.png", 
  "/images/avatar/man_4.png", 
  "/images/avatar/man_5.png",
  "/images/avatar/woman_1.png", 
  "/images/avatar/woman_2.png", 
  "/images/avatar/woman_3.png", 
  "/images/avatar/woman_4.png", 
  "/images/avatar/woman_5.png", 
  "/images/avatar/woman_6.png", 
  "/images/avatar/woman_7.png", 
]

const Profile = ({ session }: { session: Session }) => {
  const dispatch = useAppDispatch();
  const { userInfo, loading } = useAppSelector((state) => state.auth);
  const [imgUrl, setImgUrl] = useState<string>(userInfo.imgUrl)

  const openModal = () => {
    document
      .getElementById(`avatar-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`avatar-modal`)
      ?.classList.toggle("block");
  };
  return (
    <Dashboard title={`${userInfo.firstname}'s Profile`}>
      <Modal id="avatar" title="Change Avatar" >
        <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-3">
          {avatars.map((avatar, i) => (
            <div key={i} onClick={() => setImgUrl(avatar)} className="w-full flex items-center justify-center cursor-pointer">
              <Avatar size="md" src={avatar} className={avatar === imgUrl ? "border-2 border-primary" : ""} />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end">
          <Button onClick={() => dispatch(changeAvatar(imgUrl))}>
            Change Avatar
          </Button>
        </div>
      </Modal>

      <div>
        <h1 className="text-2xl font-medium">Personal Information</h1>
        <p>Manage your personal information, including phone numbers and email address where you can be contacted</p>
      </div>

      <Formik
        initialValues={{
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          middlename: userInfo.middlename,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
          gender: userInfo.gender,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required("Firstname is required"),
          lastname: Yup.string().required("Lastname is required"),
        })}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          setStatus();
          setSubmitting(true);
          dispatch(updateProfile(values));
        }}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="w-full p-5 bg-white shadow rounded-xl space-y-3">
            <div>
              <label className="text-sm font-semibold">Change Avatar</label>

              <div className="w-fit relative cursor-pointer">
                <Avatar size="lg" src={userInfo.imgUrl} alt={userInfo.name} className="relative bg-white" />
                <div onClick={openModal} className="absolute right-0 bottom-0 w-8 h-8 flex items-center justify-center bg-white rounded-full">
                  <FaEdit className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="w-full grid md:grid-cols-2 gap-3">
              <Input
                formik
                disabled
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                className="md:col-span-2"
              />

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
                name="middlename"
                label="Middlename"
                value={values.middlename}
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
            <div className="w-full flex items-center">
              <label className="text-sm font-semibold">Gender: </label>
              <div className="w-full flex items-center justify-around">
                <div className="">
                  <Input
                    hidden
                    type="radio"
                    id="male"
                    value="male"
                    name="gender"
                    className="w-fit"
                    onChange={handleChange}
                    defaultChecked={values.gender === "male"}
                  />
                  <label htmlFor="male" className="flex items-center space-x-1">
                    <FaMale
                      className={`${ 
                        values.gender === "male"
                          ? "text-primary"
                          : "text-primary-100"
                      } w-10 h-10 text-primary cursor-pointer`}
                    />
                    <p>Male</p>
                  </label>
                </div>

                <div className="">
                  <Input
                    hidden
                    type="radio"
                    id="female"
                    value="female"
                    name="gender"
                    className="w-fit"
                    onChange={handleChange}
                    defaultChecked={values.gender === "female"}
                  />
                  <label htmlFor="female" className="flex items-center space-x-1">
                    <FaFemale
                      className={`${
                        values.gender === "female"
                          ? "text-primary"
                          : "text-primary-100"
                      } w-10 h-10 text-primary cursor-pointer`}
                    />
                    <p>Female</p>
                  </label>
                </div>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-error"
              />
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit" loading={loading} className="px-5">
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Dashboard>
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
