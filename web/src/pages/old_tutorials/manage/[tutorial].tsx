import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useTutorialByShortNameQuery,
  useTutorialUsersQuery,
  useRemoveUserFromTutorialMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import ManageEvent from "../../../components/ManageEvent";
import Dashboard from "../../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ManageTutorialProps {}

const ManageTutorial: React.FC<ManageTutorialProps> = ({}) => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data: eventData }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [
    { data: eventUsers, stale, fetching },
    fetchEventusers,
  ] = useTutorialUsersQuery({
    variables: { shortName: tutorial as string },
    pause: isServer(),
  });
  const [, removeUserFromEvent] = useRemoveUserFromTutorialMutation();

  useEffect(() => {
    if (stale) {
      fetchEventusers();
    }
  }, [fetchEventusers, stale]);

  if (eventData?.tutorialByShortName && eventUsers?.tutorialUsers) {
    return (
      <ManageEvent
        eventType="tutorial"
        eventDetails={eventData.tutorialByShortName}
        eventUsers={eventUsers.tutorialUsers}
        handleRemoveUserFromEvent={async (userId, eventId) => {
          await removeUserFromEvent({ userId, tutorialId: eventId });
          router.reload();
        }}
      />
    );
  } else {
    return <Dashboard title="Loading tutorial" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ManageTutorial);
