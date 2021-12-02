import React from "react";
import ThemeConfig from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeConfig>
      <Component {...pageProps} />
    </ThemeConfig>
  );
}

export default MyApp;
