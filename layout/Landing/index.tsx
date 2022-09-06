import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Header, Footer } from "components";

import type { ReactNode } from "react";
import type { NextPage } from "next";

type Props = {
  title: string;
  description?: string;
  screen?: Boolean;
  children: ReactNode;
};

const LandingLayout: NextPage<Props> = ({
  title,
  description,
  screen,
  children,
}) => {
  const { pathname } = useRouter();
  const home = pathname === "/";
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={`w-full min-h-screen flex flex-col justify-between`}
    >
      <NextSeo title={title} description={description} />
      <Header />
      <div>{children}</div>
      <Footer />

      <ToastContainer />
    </motion.div>
  );
};

export default LandingLayout;
