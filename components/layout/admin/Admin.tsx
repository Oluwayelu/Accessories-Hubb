import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { NextSeo } from "next-seo";
import { FaArrowLeft } from "react-icons/fa";
import { useCycle, motion, AnimatePresence } from "framer-motion";

import { Loader, PageLoader } from "components";
import { AdminHeader, Sidebar } from "components/modules";

import type { ReactNode } from "react";

interface Props {
  title: string;
  goBack?: string;
  description?: string;
  children: ReactNode;
}
const Admin = ({ title, goBack, description, children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      // setTimeout(() => setLoading(false), 5000);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router.events]);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="w-full h-screen"
    >
      <NextSeo title={title} description={description} />
      {/* Navbar */}
      <AdminHeader isOpen={isOpen} toggleOpen={toggleOpen} />

      {/* Body */}
      <div className="relative w-full flex h-[92vh]">
        {/* Sidebar/Drawer */}
        <AnimatePresence>
          <Sidebar open={isOpen} />
        </AnimatePresence>

        {/* Content */}

        <div className="absolute right-0 w-5/6 md:w-11/12 lg:w-3/4 xl:w-4/5 h-full py-5 lg:py-10 px-3 md:px-5 lg:px-10 overflow-y-auto">
          {loading ? (
            <PageLoader />
          ) : (
            <div className="space-y-3 md:space-y-10">
              <div className="w-full flex items-center gap-2">
                {goBack && (
                  <Link href={goBack}>
                    <a className="flex items-center ">
                      <FaArrowLeft className="w-6 h-6" />
                    </a>
                  </Link>
                )}
                <h1 className="text-xl md:text-2xl font-medium">{title}</h1>
              </div>

              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
