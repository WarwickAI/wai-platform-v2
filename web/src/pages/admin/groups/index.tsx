import React, { useMemo, useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  Group,
  useAddUserToGroupMutation,
  useAssignUserPageMutation,
  useCreateElementMutation,
  useGetGroupsWithUsersQuery,
  useGetUsersQuery,
  useRemoveUserFromGroupMutation,
  useUsersQuery,
} from "../../../generated/graphql";
import {
  Button,
  Box,
  Heading,
  Input,
  Select,
  Text,
  Table,
  Th,
  Tbody,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import deleteFill from "@iconify/icons-eva/person-remove-fill";
import addFill from "@iconify/icons-eva/person-add-fill";
import { getIcon } from "../../../components/SidebarConfig";

interface GroupsAdminProps {}

const GroupsAdmin: React.FC<GroupsAdminProps> = ({}) => {
  const [{ data: groupsQuery }] = useGetGroupsWithUsersQuery();
  const [{ data: usersQuery }] = useGetUsersQuery();
  const [, addUserToGroup] = useAddUserToGroupMutation();
  const [, removeUserFromGroup] = useRemoveUserFromGroupMutation();

  const groups = useMemo(() => {
    if (groupsQuery?.groupsWithUsers) {
      return groupsQuery.groupsWithUsers;
    }
    return [];
  }, [groupsQuery]);

  const users = useMemo(() => {
    if (usersQuery?.getUsers) {
      return usersQuery.getUsers;
    }
    return [];
  }, [usersQuery]);

  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
  const [selectedUser, setSelectedUser] = useState<number | undefined>();

  return (
    <Dashboard title="Groups Admin">
      <Select
        placeholder="Select a group"
        value={selectedGroup?.id}
        onChange={(e) =>
          setSelectedGroup(
            groups[
              groups.findIndex((g) => g.id === parseInt(e.target.value)) ?? -1
            ] as Group
          )
        }
      >
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </Select>
      {selectedGroup && (
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedGroup.users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  {user.firstName} {user.lastName} ({user.email})
                </Td>
                <Td>
                  <Button
                    variant={"admin"}
                    onClick={() =>
                      removeUserFromGroup({
                        groupId: selectedGroup.id,
                        userId: user.id,
                      })
                    }
                  >
                    {getIcon(deleteFill)}
                  </Button>
                </Td>
              </Tr>
            ))}
            <Tr mt={2}>
              <Td>
                <Select
                  placeholder="Select user to add"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(parseInt(e.target.value))}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Button
                  variant={"admin"}
                  onClick={() =>
                    addUserToGroup({
                      groupId: selectedGroup.id,
                      userId: selectedUser ?? -1,
                    })
                  }
                  disabled={!selectedUser}
                >
                  {getIcon(addFill)}
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(GroupsAdmin);
