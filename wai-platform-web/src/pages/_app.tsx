import ThemeConfig from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeConfig>
      <Component {...pageProps} />
    </ThemeConfig>
  );
}

export default MyApp;
