import React, { useMemo } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

interface GenericProps {}

const Generic: React.FC<GenericProps> = ({}) => {
  const router = useRouter();
  router.push(
    `https://warwickaiv2.auth.eu-west-2.amazoncognito.com/login?client_id=16mcgshdjkddj4n6e2tl5ug2lo&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/cognito-response/`
  );

  return <></>;
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Generic);
