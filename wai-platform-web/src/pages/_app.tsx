import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/public-sans/700.css";
import "@fontsource/public-sans/400.css";

import { extendTheme } from "@chakra-ui/react";

const PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff'
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
};

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    heading: "Public Sans",
    body: "Public Sans",
  },
  colors: {
    primary: {
      'main': '#00AB55',
      'dark': '#007B55',
      'darker': '#005249'
    }
  },
  components: {
    Button: {
      baseStyle: {
        color: 'white',
        boxShadow: "md",
        "&:hover": {
          boxShadow: "none",
        },
      },
      variants: {
        primary: {
          bg: "primary.main",
          "&:hover": {
            bg: "primary.dark",
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
