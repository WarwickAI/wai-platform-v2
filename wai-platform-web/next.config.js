module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://warwickaiv2.auth.eu-west-2.amazoncognito.com/login?client_id=16mcgshdjkddj4n6e2tl5ug2lo&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:4000/cognito-response/',
        permanent: false,
        basePath: false
      },
    ]
  },
}
