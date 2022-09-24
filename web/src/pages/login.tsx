import React, { useEffect, useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      `https://warwickaiv2.auth.eu-west-2.amazoncognito.com/login?client_id=16mcgshdjkddj4n6e2tl5ug2lo&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/cognito-response/`
    );
  });

  return <>Redirecting to login</>;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
