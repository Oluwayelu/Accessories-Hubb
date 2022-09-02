import "../styles/globals.css";

import "swiper/css";
// import "swiper/css/effects"
import "swiper/css/navigation";
import "swiper/css/pagination";

import "react-toastify/dist/ReactToastify.css";

import { DefaultSeo } from "next-seo";
import { AnimatePresence } from "framer-motion";
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { useStore } from "react-redux";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import SEO from "config/next-seo.config";
import { Loader } from "components";
import { wrapper } from "redux/store";

import type { AppProps } from "next/app";
import { Store } from "redux";

interface PersistedStore extends Store {
  __persistor: Persistor;
}
function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();

  return (
    <>
      <DefaultSeo {...SEO} />
      {/* <ThemeProvider attribute="class">
        
      </ThemeProvider> */}
      <PersistGate persistor={store.__persistor} loading={<Loader />}>
        <SessionProvider session={pageProps.session}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </SessionProvider>
      </PersistGate>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default wrapper.withRedux(MyApp);


