import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinTalkMutation,
  useMeQuery,
  useTalkByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import EventPage from "../../components/EventPage";

interface TalkProps {}

const Talk: React.FC<TalkProps> = () => {
  const router = useRouter();
  const { talk } = router.query;
  const [{ data: eventDetails }] = useTalkByShortNameQuery({
    variables: { shortName: talk as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  const [, joinTalk] = useJoinTalkMutation();

  useEffect(() => {
    // Redirect if talk has a redirect and not exec
    if (
      !fetchingUser &&
      eventDetails?.talkByShortName?.redirectUrl &&
      eventDetails?.talkByShortName.redirectUrl.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(eventDetails.talkByShortName.redirectUrl);
      }
    }
  }, [eventDetails, fetchingUser, router, userInfo?.me?.role]);

  if (eventDetails?.talkByShortName) {
    return (
      <EventPage
        eventType="course"
        eventDetails={eventDetails.talkByShortName}
        userDetails={userInfo?.me ? userInfo.me : undefined}
        userInEvent={
          userInfo?.me?.talks.findIndex(
            ({ shortName }) => shortName === talk
          ) !== -1
        }
        handleJoin={async (eventId: number) => {
          const response = await joinTalk({ talkId: eventId });
          fetchMe();
          return response.data?.joinTalk ? true : false;
        }}
        handleEdit={() => {
          router.push(`/talks/edit/${talk}`);
        }}
        handleManage={() => {
          router.push(`/talks/manage/${talk}`);
        }}
      />
    );
  } else {
    return <Dashboard title={"Loading Talk"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Talk);
