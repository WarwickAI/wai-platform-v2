import { addDecorator } from "@storybook/react";

import ThemeConfig from "../src/theme";
import "../src/pages/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((storyFn) => <ThemeConfig>{storyFn()}</ThemeConfig>);
