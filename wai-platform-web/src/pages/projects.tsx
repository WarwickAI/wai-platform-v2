import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Text } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { setAccessToken } from "../utils/accesToken";
import { UserInfoContext } from "../utils/userContext";

const Projects = () => {
  const { query } = useRouter();
  const { setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (query.accessToken && query.accessToken.length > 0) {
      const userInfo = setAccessToken(query.accessToken as string);
      setUserInfo(userInfo);
    }
  }, [query, setUserInfo]);
  return (
    <Dashboard>
      <Text>Hello There!</Text>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient)(Projects);
