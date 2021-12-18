import React from "react";
import Dashboard from "../components/Dashboard";
import { useUsersQuery } from "../generated/graphql";
import { Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [{ data }] = useUsersQuery();
  return (
    <Dashboard title="Users">
      {data?.users.map((user) => {
        return (
          <Text key={user._id}>
            {user.firstName} {user.lastName}
          </Text>
        );
      })}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Users);
