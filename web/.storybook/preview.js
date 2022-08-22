import { addDecorator } from "@storybook/react";
import { urqlDecorator } from "@urql/storybook-addon";

import { theme } from "../src/theme";
import "../src/pages/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme: theme,
  },
};

addDecorator(urqlDecorator);
