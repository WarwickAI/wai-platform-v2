import { useEffect, useState } from "react";
import ThemeConfig from "../theme";

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <ThemeConfig>
      <Component {...pageProps} />
    </ThemeConfig>
  );
}

export default MyApp;