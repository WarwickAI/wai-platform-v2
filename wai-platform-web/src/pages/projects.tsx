import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Text } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import { useRouter } from "next/router";

const Projects = () => {
  return (
    <Dashboard>
      <Text>Hello There!</Text>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient)(Projects);
