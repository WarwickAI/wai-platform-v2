import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinTutorialMutation,
  useMeQuery,
  useTutorialByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import EventPage from "../../components/EventPage";

interface TutorialProps {}

const Tutorial: React.FC<TutorialProps> = () => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data: eventDetails }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  const [, joinTutorial] = useJoinTutorialMutation();

  useEffect(() => {
    // Redirect if tutorial has a redirect and not exec
    if (
      !fetchingUser &&
      eventDetails?.tutorialByShortName?.redirectUrl &&
      eventDetails?.tutorialByShortName.redirectUrl.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(eventDetails.tutorialByShortName.redirectUrl);
      }
    }
  }, [eventDetails, fetchingUser, router, userInfo?.me?.role]);

  if (eventDetails?.tutorialByShortName) {
    return (
      <EventPage
        eventType="course"
        eventDetails={eventDetails.tutorialByShortName}
        userDetails={userInfo?.me ? userInfo.me : undefined}
        userInEvent={
          userInfo?.me?.tutorials.findIndex(
            ({ shortName }) => shortName === tutorial
          ) !== -1
        }
        handleJoin={async (eventId: number) => {
          const response = await joinTutorial({ tutorialId: eventId });
          fetchMe();
          return response.data?.joinTutorial ? true : false;
        }}
        handleEdit={() => {
          router.push(`/tutorials/edit/${tutorial}`);
        }}
        handleManage={() => {
          router.push(`/tutorials/manage/${tutorial}`);
        }}
      />
    );
  } else {
    return <Dashboard title={"Loading Tutorial"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Tutorial);
