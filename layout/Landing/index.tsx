import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Header, Footer } from "components";

import type { NextPage } from "next";

type Props = {
  title: string;
  screen?: Boolean;
  children: ReactNode;
};

const LandingLayout: NextPage<Props> = ({ title, screen, children }) => {
  const { pathname } = useRouter();
  const home = pathname === "/";
  return (
    <div className={` w-full min-h-screen flex flex-col justify-between`}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div
        className={`${screen && "pt-5 pb-10"} ${
          home ? "mt-32" : "mt-16 md:mt-32"
        } bg-gray-100`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
