import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinProjectMutation,
  useMeQuery,
  useProjectByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import EventPage from "../../components/EventPage";

interface ProjectProps {}

const Project: React.FC<ProjectProps> = () => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data: eventDetails }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  const [, joinProject] = useJoinProjectMutation();

  useEffect(() => {
    // Redirect if project has a redirect and not exec
    if (
      !fetchingUser &&
      eventDetails?.projectByShortName?.redirectUrl &&
      eventDetails?.projectByShortName.redirectUrl.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(eventDetails.projectByShortName.redirectUrl);
      }
    }
  }, [eventDetails, fetchingUser, router, userInfo?.me?.role]);

  if (eventDetails?.projectByShortName) {
    return (
      <EventPage
        eventType="course"
        eventDetails={eventDetails.projectByShortName}
        userDetails={userInfo?.me ? userInfo.me : undefined}
        userInEvent={
          userInfo?.me?.projects.findIndex(
            ({ shortName }) => shortName === project
          ) !== -1
        }
        handleJoin={async (eventId: number) => {
          const response = await joinProject({ projectId: eventId });
          fetchMe();
          return response.data?.joinProject ? true : false;
        }}
        handleEdit={() => {
          router.push(`/projects/edit/${project}`);
        }}
        handleManage={() => {
          router.push(`/projects/manage/${project}`);
        }}
      />
    );
  } else {
    return <Dashboard title={"Loading Project"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Project);
