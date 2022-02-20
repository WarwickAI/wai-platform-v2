import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useAdminGiveBadgeMutation,
  useAdminRemoveBadgeMutation,
  useBadgeByShortNameQuery,
  useBadgeUsersQuery,
} from "../../../generated/graphql";
import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  HStack,
  Input,
  Box,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { toErrorMap } from "../../../utils/toErrorMap";

interface EditBadgeProps {}

const EditBadge: React.FC<EditBadgeProps> = ({}) => {
  const router = useRouter();
  const { badge } = router.query;
  const [{ data: badgeData }] = useBadgeByShortNameQuery({
    variables: { shortName: badge as string },
  });
  const [{ data: badgeUsers }] = useBadgeUsersQuery({
    variables: { shortName: badge as string },
  });
  const [, adminGiveBadge] = useAdminGiveBadgeMutation();
  const [, adminRemoveBadge] = useAdminRemoveBadgeMutation();

  return (
    <Dashboard title="Manage Badge">
      <Heading size="md">Members</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {badgeUsers?.badgeUsers &&
            badgeUsers.badgeUsers.map((user) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      variant="primary"
                      onClick={async () => {
                        await adminRemoveBadge({
                          userId: user.id,
                          shortName: badge as string,
                        });
                        router.reload();
                      }}
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>

      <Heading size="md">Give Badge to Member</Heading>
      <Formik
        initialValues={{
          userEmail: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await adminGiveBadge({
            userEmail: values.userEmail,
            shortName: badge as string,
          });
          if (!response.data?.adminGiveBadge) {
            console.log("Failed to give user badge");
          } else {
            // Course submitted
            router.reload();
          }
        }}
      >
        {(formProps) => (
          <Form>
            <InputField
              name="userEmail"
              placeholder="user email"
              label="User Email"
              hint="Main title for the badge. Must be at least 3 characters."
            ></InputField>
            <Box mt={4}>
              <Button
                type="submit"
                variant="primary"
                // disabled={!isSubmitting}
              >
                Add
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditBadge);
