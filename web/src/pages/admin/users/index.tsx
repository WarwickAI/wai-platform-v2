import React from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useMeQuery,
  useUpdateMembershipMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
} from "../../../generated/graphql";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
  HStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { isServer } from "../../../utils/isServer";
import { useRouter } from "next/router";

const JoinedField: React.FC<{ dateString?: string | null }> = (props) => {
  if (props.dateString) {
    const date = new Date(parseInt(props.dateString));
    return <>{date.toLocaleString()}</>;
  } else {
    return <></>;
  }
};

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  const router = useRouter();
  const [{ data }] = useUsersQuery({ pause: isServer() });
  const [{ data: me }] = useMeQuery({ pause: isServer() });
  const [, updateUserRole] = useUpdateUserRoleMutation();
  const [, updateMembership] = useUpdateMembershipMutation();

  return (
    <Dashboard
      title="Users"
      options={
        <>
          {me?.me?.role == "exec" && (
            <HStack>
              <Button
                variant="admin"
                onClick={async () => {
                  const result = await updateMembership();
                  if (result.data?.updateMembership) {
                    router.reload();
                  }
                }}
              >
                Update Membership
              </Button>
              <Button
                variant="admin"
                onClick={async () => {
                  router.push("/admin/users/add-member-info");
                }}
              >
                Add Membership Joined Info
              </Button>
            </HStack>
          )}
        </>
      }
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Uni ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Member</Th>
            <Th>Joined</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.users.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.uniId ? user.uniId : "NA"}</Td>
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
                <Td>{user.isMember ? "Yes" : "No"}</Td>
                <Td>
                  <JoinedField dateString={user.memberFromDate} />
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
