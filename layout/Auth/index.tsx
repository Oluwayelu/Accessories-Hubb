import Link from "next/link";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";

import { LOGIN, REGISTER } from "routes";
import { Landing } from "layout";
import { fadeInUp } from "variants";

import type { ReactNode } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

type Props = {
  title: string;
  children: ReactNode;
  description?: string;
};
const AuthLayout: NextPage<Props> = ({ title, description, children }) => {
  const { pathname } = useRouter();

  return (
    <Landing screen title={title} description={description}>
      <div className="relative w-full min-h-[70vh] px-5 lg:px-10 flex flex-col justify-start items-center overflow-hidden">
        <motion.div
          variants={fadeInUp}
          className="w-full md:w-1/2 lg:w-1/3 py-5 space-y-5 z-20"
        >
          <div className="w-full md:p-5 md:bg-white rounded-xl md:shadow-lg space-y-5">
            <h1 className="text-3xl font-medium">{title}</h1>

            {children}
          </div>

          <div className="w-full flex justify-center items-center space-x-2">
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
            <div className="w-full whitespace-nowrap">
              {pathname === LOGIN
                ? "New to Accessories Hubb?"
                : "Already have an account?"}
            </div>
            <div className="w-full h-0.5 rounded-full bg-gray-500" />
          </div>

          <Link href={pathname === LOGIN ? REGISTER : LOGIN} passHref>
            <button className="py-2 w-full font-medium bg-gray-300 rounded shadow">
              {pathname === LOGIN ? "Create an account" : "Login to account"}
            </button>
          </Link>
        </motion.div>

        <div className="absolute -top-[250px] -right-[125px]  lg:-top-[500px] lg:-right-[250px] w-[350px] h-[350px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary-100 z-0" />
        <div className="absolute -bottom-[250px] -left-[125px]  lg:-bottom-[500px] lg:-left-[250px] w-[350px] h-[350px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary-100 z-0" />
      </div>
    </Landing>
  );
};

export default AuthLayout;

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
