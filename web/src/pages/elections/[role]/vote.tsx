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
  Flex,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ItemGrid from "../../../components/ItemGrid";
import ApplicationCard from "../../../components/ApplicationCard";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../../../theme";
import remarkGfm from "remark-gfm";

interface VoteProps {}

const Vote: React.FC<VoteProps> = () => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleDetails }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [{ data: roleApplications }] = useElectionRoleApplicationsQuery({
    variables: { shortName: role as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });
  const [, vote] = useVoteMutation();

  const [applicationSelected, setApplicationSelected] = useState<
    RegularRoleApplicationFragment | undefined
  >();

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const onClose = () => setIsAlertOpen(false);
  const cancelRef = React.useRef();

  if (roleDetails?.getElectionRole && roleApplications) {
    return (
      <Dashboard title={roleDetails.getElectionRole.title}>
        {!roleDetails.getElectionRole.canVote ? (
          <Text>Role is not open for voting yet...</Text>
        ) : (
          <>
            <Text mb={4}>
              Select the applicant you would like to vote for, then click Vote.
            </Text>
            <Box mb={4}>
              <ItemGrid>
                {roleApplications.electionRoleApplications.map(
                  (application) => (
                    <ApplicationCard
                      key={application.id}
                      title={application.title}
                      img={application.img}
                      selected={applicationSelected?.id === application.id}
                      onClick={() => {
                        setApplicationSelected(application);
                      }}
                    ></ApplicationCard>
                  )
                )}
              </ItemGrid>
            </Box>
            <Button
              variant="primary"
              disabled={applicationSelected === undefined}
              onClick={() => setIsAlertOpen(true)}
            >
              Vote!
            </Button>
            <AlertDialog
              isOpen={isAlertOpen}
              leastDestructiveRef={cancelRef.current}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Vote
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Confirm you want to vote for {applicationSelected?.title}.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef.current}
                      onClick={onClose}
                      variant="admin"
                    >
                      Cancel
                    </Button>
                    {applicationSelected && roleDetails.getElectionRole && (
                      <Button
                        variant="primary"
                        onClick={async () => {
                          const resp = await vote({
                            applicationId: applicationSelected.id,
                            roleId: roleDetails.getElectionRole!.id,
                          });
                          if (resp.data?.vote) {
                            router.push("/elections");
                          }
                        }}
                        ml={3}
                      >
                        Yes
                      </Button>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Election Role Voting"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Vote);
