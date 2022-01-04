import React, { useEffect } from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useEditCourseMutation,
  useCourseByShortNameQuery,
  useCourseUsersQuery,
  useRemoveUserFromCourseMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface EditCourseProps {}

const EditCourse: React.FC<EditCourseProps> = ({}) => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data }] = useCourseByShortNameQuery({
    variables: { shortName: course as string },
  });
  const [{ data: courseUsers, stale }, fetchCourseUsers] = useCourseUsersQuery({
    variables: { shortName: course as string },
    pause: isServer(),
  });
  const [, removeUserFromCourse] = useRemoveUserFromCourseMutation();

  useEffect(() => {
    if (stale) {
      fetchCourseUsers();
    }
  }, [fetchCourseUsers, stale])

  return (
    <Dashboard title="Manage Course" narrow={true}>
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
          {courseUsers?.courseUsers.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      await removeUserFromCourse({
                        userId: user.id,
                        shortName: course as string,
                      });
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
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCourse);
