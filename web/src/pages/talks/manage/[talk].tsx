import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useTalkByShortNameQuery,
  useTalkUsersQuery,
  useRemoveUserFromTalkMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import ManageEvent from "../../../components/ManageEvent";
import Dashboard from "../../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ManageTalkProps {}

const ManageTalk: React.FC<ManageTalkProps> = ({}) => {
  const router = useRouter();
  const { talk } = router.query;
  const [{ data: eventData }] = useTalkByShortNameQuery({
    variables: { shortName: talk as string },
  });
  const [
    { data: eventUsers, stale, fetching },
    fetchEventusers,
  ] = useTalkUsersQuery({
    variables: { shortName: talk as string },
    pause: isServer(),
  });
  const [, removeUserFromEvent] = useRemoveUserFromTalkMutation();

  useEffect(() => {
    if (stale) {
      fetchEventusers();
    }
  }, [fetchEventusers, stale]);

  if (eventData?.talkByShortName && eventUsers?.talkUsers) {
    return (
      <ManageEvent
        eventType="talk"
        eventDetails={eventData.talkByShortName}
        eventUsers={eventUsers.talkUsers}
        handleRemoveUserFromEvent={async (userId, eventId) => {
          await removeUserFromEvent({ userId, talkId: eventId });
          router.reload();
        }}
      />
    );
  } else {
    return <Dashboard title="Loading talk" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ManageTalk);
