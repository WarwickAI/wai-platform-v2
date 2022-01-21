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
  useEditProjectMutation,
  useProjectByShortNameQuery,
  useProjectUsersQuery,
  useRemoveUserFromProjectMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface EditProjectProps {}

const EditProject: React.FC<EditProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [{ data: projectUsers, fetching }, fetchProjectUsers] =
    useProjectUsersQuery({
      variables: { shortName: project as string },
      pause: isServer(),
    });
  const [, removeUserFromProject] = useRemoveUserFromProjectMutation();

  const copyEmails = () => {
    if (!fetching && projectUsers) {
      const emails: string[] = [];
      projectUsers.projectUsers.forEach((user) => {
        emails.push(user.email);
      });

      var csvString: string = "";

      emails.forEach((email) => {
        csvString += `${email},`;
      });

      if (csvString.length > 0) {
        csvString = csvString.slice(0, -1);
      }

      navigator.clipboard.writeText(csvString);
    }
  };

  return (
    <Dashboard
      title="Manage Project"
      narrow={true}
      options={
        <Button variant="primary" onClick={copyEmails}>
          Copy Emails (CSV)
        </Button>
      }
    >
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
          {projectUsers?.projectUsers.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      await removeUserFromProject({
                        userId: user.id,
                        shortName: project as string,
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
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditProject);