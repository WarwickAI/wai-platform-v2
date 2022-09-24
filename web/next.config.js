const that = require("next-global-css");

const withConfig = that.withGlobalCss();

module.exports = withConfig({
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_DO_SPACES_BUCKET}.${process.env.NEXT_PUBLIC_DO_SPACES_REGION}.digitaloceanspaces.com`,
    ],
  },
});
