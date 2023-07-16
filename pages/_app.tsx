import "../styles/globals.css";

import "swiper/css";
// import "swiper/css/effects"
import "swiper/css/navigation";
import "swiper/css/pagination";

import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { DefaultSeo } from "next-seo";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence } from "framer-motion";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import SEO from "config/next-seo.config";
import { Loader } from "components";
import { persistor, wrapper } from "_redux/store";

import type { AppProps } from "next/app";

// global.__basedir = __dirname;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />

      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider session={pageProps.session}>
          <NextNProgress
            color="#F5BD10"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </SessionProvider>
        <ToastContainer />
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);

