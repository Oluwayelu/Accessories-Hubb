import "../styles/globals.css";

import "swiper/css";
// import "swiper/css/effects"
import "swiper/css/navigation";
import "swiper/css/pagination";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

import { store, wrapper } from "redux/store";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);

