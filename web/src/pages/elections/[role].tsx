import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useMeQuery,
  useGetElectionRoleQuery,
  useGetRoleApplicationQuery,
  useElectionRoleApplicationsQuery,
  useElectionRoleAllApplicationsQuery,
  useGetUserRoleApplicationsQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ItemGrid from "../../components/ItemGrid";
import ApplicationCard from "../../components/ApplicationCard";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { markdownTheme } from "../../theme";
import remarkGfm from "remark-gfm";

interface ElectionRoleProps {}

const ElectionRole: React.FC<ElectionRoleProps> = () => {
  const router = useRouter();
  const { role } = router.query;
  const [{ data: roleDetails }] = useGetElectionRoleQuery({
    variables: { shortName: role as string },
  });
  const [{ data: roleApplications }] = useElectionRoleApplicationsQuery({
    variables: { shortName: role as string },
  });
  const [{ data: allRoleApplications }] = useElectionRoleAllApplicationsQuery({
    pause: isServer(),
    variables: { shortName: role as string },
  });
  const [{ data: userInfo }] = useMeQuery({
    pause: isServer(),
  });
  const [{ data: userRoleApplicationsRoles }] = useGetUserRoleApplicationsQuery(
    {
      pause: isServer(),
    }
  );

  const [showHiddenApplications, setShowHiddenApplications] =
    useState<boolean>(false);

  if (roleDetails?.getElectionRole && roleApplications) {
    return (
      <Dashboard
        title={roleDetails.getElectionRole.title}
        options={
          <HStack>
            {roleDetails.getElectionRole.canApply && (
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/elections/${role}/applications/apply`)
                }
                disabled={
                  userRoleApplicationsRoles?.getUserRoleApplications?.findIndex(
                    (val) => val.shortName == role
                  ) !== -1
                }
              >
                {userRoleApplicationsRoles?.getUserRoleApplications?.findIndex(
                  (val) => val.shortName == role
                ) !== -1
                  ? "Applied"
                  : "Apply"}
              </Button>
            )}
            {userInfo?.me?.role === "exec" && (
              <Flex flexDirection="column" alignItems="center">
                <FormLabel htmlFor="showAll" m={0}>
                  Show hidden
                </FormLabel>
                <Switch
                  id="showAll"
                  isChecked={showHiddenApplications}
                  onChange={(e) => setShowHiddenApplications(e.target.checked)}
                />
              </Flex>
            )}
            {userInfo?.me?.role === "exec" && (
              <Button
                variant="admin"
                onClick={() => router.push(`/elections/edit/${role}`)}
              >
                Edit
              </Button>
            )}
            {userInfo?.me?.role === "exec" && (
              <Button variant="admin" onClick={() => {}}>
                Manage
              </Button>
            )}
            {/* {userInfo?.me?.role === "exec" && (
              <Button
                variant="admin"
                onClick={() =>
                  router.push(`/elections/${role}/applications/create`)
                }
              >
                Add Application
              </Button>
            )} */}
          </HStack>
        }
      >
        {
          <ReactMarkdown
            components={ChakraUIRenderer(markdownTheme)}
            linkTarget="_self"
            remarkPlugins={[remarkGfm]}
          >
            {roleDetails.getElectionRole.description}
          </ReactMarkdown>
        }
        <Heading my={4} size="md">
          Applications
        </Heading>
        {(showHiddenApplications && allRoleApplications
          ? allRoleApplications?.electionRoleAllApplications
          : roleApplications.electionRoleApplications
        )?.length > 0 ? (
          <ItemGrid>
            {(showHiddenApplications
              ? allRoleApplications?.electionRoleAllApplications
              : roleApplications?.electionRoleApplications
            )?.map((application) => (
              <ApplicationCard
                key={application.id}
                title={application.title}
                img={application.img}
                redirect={`/elections/${role}/applications/${application.shortName}`}
              />
            ))}
          </ItemGrid>
        ) : (
          <Text>No applications submitted</Text>
        )}
      </Dashboard>
    );
  } else {
    return <Dashboard title={"Loading Election Role"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ElectionRole);
