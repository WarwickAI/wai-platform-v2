import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUpdateUserRoleMutation, useUsersQuery } from "../generated/graphql";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Input,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const [{ data }] = useUsersQuery({ pause: isServer() });
  const [, updateUserRole] = useUpdateUserRoleMutation();

  return (
    <Dashboard title="Users">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.users.map((user) => {
            return (
              <Tr key={user._id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Editable
                    defaultValue={user.role}
                    onChange={(e) => {
                      updateUserRole({ email: user.email, role: e });
                    }}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Users);
