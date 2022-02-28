import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useElectionRoleApplicationsQuery,
  useElectionRoleAllApplicationsQuery,
  useGetUserRoleApplicationsQuery,
  useVoteMutation,
  RegularRoleApplicationFragment,
  useGetRoleVoteCountQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { isServer } from "../../../utils/isServer";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ItemGrid from "../../../components/ItemGrid";
import ApplicationCard from "../../../components/ApplicationCard";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../../../theme";
import remarkGfm from "remark-gfm";
import data from "@iconify/icons-eva/person-fill";

interface ManageRoleProps {}

const ManageRole: React.FC<ManageRoleProps> = () => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleDetails }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [{ data: roleApplications }] = useElectionRoleApplicationsQuery({
    variables: { shortName: role as string },
  });
  const [{ data: voteCounts }] = useGetRoleVoteCountQuery({
    variables: { shortName: role as string },
  });

  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });

  const [applicationSelected, setApplicationSelected] = useState<
    RegularRoleApplicationFragment | undefined
  >();

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef = React.useRef();

  if (roleDetails?.getElectionRole && roleApplications) {
    return (
      <Dashboard title={roleDetails.getElectionRole.title}>
        {voteCounts && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title/Name</Th>
                <Th>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {voteCounts.getRoleVoteCount.map((voteCount) => {
                return (
                  <Tr key={voteCount.application.id}>
                    <Td>{voteCount.application.title}</Td>
                    <Td>{voteCount.count}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Election Role Voting"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ManageRole);
