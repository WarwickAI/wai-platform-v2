const that = require("next-global-css");

const withConfig = that.withGlobalCss();

module.exports = withConfig({
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_CDN}`,
      "assets-global.website-files.com",
    ],
  },
});
