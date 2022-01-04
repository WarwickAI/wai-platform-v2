const that = require("next-global-css");

const withConfig = that.withGlobalCss()

module.exports = withConfig({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/login',
        destination: `https://warwickaiv2.auth.eu-west-2.amazoncognito.com/login?client_id=16mcgshdjkddj4n6e2tl5ug2lo&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/cognito-response/`,
        permanent: false,
        basePath: false
      },
    ]
  },
})