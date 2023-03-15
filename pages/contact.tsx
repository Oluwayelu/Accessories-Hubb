import Link from "next/link";
import Image from "next/image";

import * as Yup from "yup";
import { Formik } from "formik";

import { Input, Landing } from "components";
import { stagger } from "variants";

const Contact = () => {
  return (
    <Landing
      title="Contact Us"
      description="Contact Accessoriess Hubb"
      className="p-5 space-y-10 md:space-y-20"
    >
      <div className="relative max-w-6xl mt-5 p-5 mx-auto h-[30vh] bg-primary-100 flex flex-col items-center justify-center rounded-3xl shadow-xl space-y-5">
        <div className="relative w-60 h-20 cursor-pointer">
          <Image
            priority
            src="/images/logo/logo.png"
            layout="fill"
            alt="logo"
            className="rounded-3xl"
          />
        </div>
        <h1 className="text-4xl font-medium">Contact Us</h1>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="w-full lg:w-1/2 space-y-5">
          <h2 className="text-2xl font-medium">Send us a message</h2>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              email: Yup.string()
                .email("Email is not valid")
                .required("Email is required"),
              message: Yup.string().required("Message is required"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              setStatus();
              console.log(values);
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
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  label="Enter your name"
                />
                <Input
                  formik
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  label="Email"
                  placeholder="example@gmail.com"
                />

                <Input
                  formik
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Message"
                  label="Enter your message"
                />

                <button
                  type="submit"
                  disabled={
                    values.email === "" ||
                    values.name === "" ||
                    values.message === ""
                  }
                  className="py-2 w-full font-medium bg-primary rounded disabled:bg-primary-100"
                >
                  {values.email && values.name && values.message
                    ? "Send"
                    : "Continue"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Landing>
  );
};

export default Contact;
