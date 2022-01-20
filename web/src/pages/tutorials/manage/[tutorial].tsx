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
  useEditTutorialMutation,
  useTutorialByShortNameQuery,
  useTutorialUsersQuery,
  useRemoveUserFromTutorialMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface EditTutorialProps {}

const EditTutorial: React.FC<EditTutorialProps> = ({}) => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [{ data: tutorialUsers, stale, fetching }, fetchTutorialUsers] = useTutorialUsersQuery({
    variables: { shortName: tutorial as string },
    pause: isServer(),
  });
  const [, removeUserFromTutorial] = useRemoveUserFromTutorialMutation();

  useEffect(() => {
    if (stale) {
      fetchTutorialUsers();
    }
  }, [fetchTutorialUsers, stale])

  const copyEmails = () => {
    if (!fetching && tutorialUsers) {
      const emails: string[] = [];
      tutorialUsers.tutorialUsers.forEach((user) => {
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
    <Dashboard title="Manage Tutorial" narrow={true}
    options={
      <Button variant="primary" onClick={copyEmails}>
        Copy Emails (CSV)
      </Button>
    }>
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
          {tutorialUsers?.tutorialUsers.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      await removeUserFromTutorial({
                        userId: user.id,
                        shortName: tutorial as string,
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTutorial);
