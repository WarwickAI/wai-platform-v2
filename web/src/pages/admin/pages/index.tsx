import React, { useMemo, useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useAssignUserPageMutation,
  useCreateElementMutation,
  useGetUsersQuery,
  User,
} from "../../../generated/graphql";
import { Button, Box, Heading, Input, Select, HStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { createDefaultElementData } from "../../../utils/config";

interface PagesAdminProps {}

const PagesAdmin: React.FC<PagesAdminProps> = ({}) => {
  const [{ data: usersQuery }] = useGetUsersQuery();

  const users = useMemo(() => {
    if (usersQuery?.getUsers) {
      return usersQuery.getUsers;
    }
    return [];
  }, [usersQuery]);

  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const [, createElement] = useCreateElementMutation();
  const [, assignUserPage] = useAssignUserPageMutation();

  const createAndAssignUserPage = async () => {
    if (!selectedUser) {
      return;
    }
    const pageTitle =
      selectedUser.firstName +
      " " +
      selectedUser.lastName +
      " (" +
      selectedUser.email +
      ")";
    const res = await createElement({
      index: 0,
      type: "Page",
      data: {
        ...createDefaultElementData("Page"),
        title: { type: "Text", value: pageTitle },
      },
    });
    if (res.data?.createElement) {
      const pageId = res.data.createElement.id;
      await assignUserPage({
        uniId: selectedUser.uniId ? selectedUser.uniId : -1,
        pageId: pageId,
      });
    }
  };
  return (
    <Dashboard title="Pages">
      <Box>
        <Heading size="md">Add User Page</Heading>

        <HStack>
          <Select
            placeholder="Select a user..."
            value={selectedUser?.id}
            onChange={(e) =>
              setSelectedUser(
                users[
                  users.findIndex((u) => u.id === parseInt(e.target.value)) ??
                    -1
                ] as User
              )
            }
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName} ({u.email})
              </option>
            ))}
          </Select>
          <Button
            variant={"admin"}
            onClick={() => createAndAssignUserPage()}
            disabled={!selectedUser}
          >
            Create
          </Button>
        </HStack>
      </Box>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(PagesAdmin);
