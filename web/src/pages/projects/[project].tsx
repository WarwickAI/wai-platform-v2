import { Heading, Button, HStack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinProjectMutation,
  useMeQuery,
  useProjectByShortNameQuery,
  useProjectRequestedUsersQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface ProjectProps {}

const Project: React.FC<ProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data, fetching: fetchingProject }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }] = useMeQuery({
    pause: isServer(),
  });
  const [, joinProject] = useJoinProjectMutation();

  useEffect(() => {
    if (
      !fetchingUser &&
      data?.projectByShortName &&
      data?.projectByShortName.redirect.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(data.projectByShortName.redirect);
      }
    }
  }, [data, fetchingUser, router, userInfo?.me?.role]);

  return (
    <Dashboard
      title={data?.projectByShortName ? data?.projectByShortName.title : ""}
      narrow={true}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" &&
            data?.projectByShortName &&
            data?.projectByShortName.redirect.length > 0 && (
              <Button
                variant="primary"
                onClick={() =>
                  data?.projectByShortName?.redirect
                    ? router.push(data.projectByShortName.redirect)
                    : {}
                }
              >
                Follow Redirect
              </Button>
            )}
          {data?.projectByShortName && data.projectByShortName.joinButton && (
            <Button
              variant="primary"
              onClick={async () => {
                if (data.projectByShortName) {
                  console.log(data.projectByShortName.id);
                  const response = await joinProject({
                    projectId: data.projectByShortName.id,
                  });
                  if (response.data?.joinProject) {
                    console.log("JOINED PROJECT");
                  } else {
                    console.log("FAILED JOINING PROJECT");
                  }
                }
              }}
              disabled={
                userInfo?.me?.projects.findIndex(
                  ({ shortName }) => shortName == project
                ) !== 1
              }
            >
              {userInfo?.me?.projects.findIndex(
                ({ shortName }) => shortName == project
              ) !== 1
                ? "Joined"
                : "Join"}
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/projects/edit/${data?.projectByShortName?.shortName}`
                )
              }
            >
              Edit
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/projects/manage/${data?.projectByShortName?.shortName}`
                )
              }
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {data?.projectByShortName?.description && (
        <ReactMarkdown>{data?.projectByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Project);
