import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useProjectByShortNameQuery,
  useProjectUsersQuery,
  useRemoveUserFromProjectMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import ManageEvent from "../../../components/ManageEvent";
import Dashboard from "../../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ManageProjectProps {}

const ManageProject: React.FC<ManageProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data: eventData }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [
    { data: eventUsers, stale, fetching },
    fetchEventusers,
  ] = useProjectUsersQuery({
    variables: { shortName: project as string },
    pause: isServer(),
  });
  const [, removeUserFromEvent] = useRemoveUserFromProjectMutation();

  useEffect(() => {
    if (stale) {
      fetchEventusers();
    }
  }, [fetchEventusers, stale]);

  if (eventData?.projectByShortName && eventUsers?.projectUsers) {
    return (
      <ManageEvent
        eventType="project"
        eventDetails={eventData.projectByShortName}
        eventUsers={eventUsers.projectUsers}
        handleRemoveUserFromEvent={async (userId, eventId) => {
          await removeUserFromEvent({ userId, projectId: eventId });
          router.reload();
        }}
      />
    );
  } else {
    return <Dashboard title="Loading project" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ManageProject);
