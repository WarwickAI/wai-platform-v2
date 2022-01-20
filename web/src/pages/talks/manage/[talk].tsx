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
  useEditTalkMutation,
  useTalkByShortNameQuery,
  useTalkUsersQuery,
  useRemoveUserFromTalkMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface EditTalkProps {}

const EditTalk: React.FC<EditTalkProps> = ({}) => {
  const router = useRouter();
  const { talk } = router.query;
  const [{ data }] = useTalkByShortNameQuery({
    variables: { shortName: talk as string },
  });
  const [{ data: talkUsers, stale, fetching }, fetchTalkUsers] =
    useTalkUsersQuery({
      variables: { shortName: talk as string },
      pause: isServer(),
    });
  const [, removeUserFromTalk] = useRemoveUserFromTalkMutation();

  useEffect(() => {
    if (stale) {
      fetchTalkUsers();
    }
  }, [fetchTalkUsers, stale]);

  const copyEmails = () => {
    if (!fetching && talkUsers) {
      const emails: string[] = [];
      talkUsers.talkUsers.forEach((user) => {
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
      title="Manage Talk"
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
          {talkUsers?.talkUsers.map((user) => {
            return (
              <Tr key={user.id}>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      await removeUserFromTalk({
                        userId: user.id,
                        shortName: talk as string,
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTalk);
