const that = require("next-global-css");

const withConfig = that.withGlobalCss();

module.exports = withConfig({
  reactStrictMode: true,
});
