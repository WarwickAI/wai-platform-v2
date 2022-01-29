import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useTutorialsQuery,
  useAllTutorialsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import EventsPage from "../../components/EventsPage";
import Dashboard from "../../components/Dashboard";

const Tutorials = () => {
  const router = useRouter();
  const [{ data: events }] = useTutorialsQuery();
  const [{ data: allEvents }] = useAllTutorialsQuery({ pause: isServer() });
  const [{ data: userDetails }] = useMeQuery({ pause: isServer() });

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/tutorials");
    }
  }, [router, router.query]);
  if (events?.tutorials) {
    return (
      <EventsPage
        eventType={"tutorial"}
        events={events.tutorials}
        allEvents={allEvents?.allTutorials ? allEvents.allTutorials : []}
        userDetails={userDetails?.me ? userDetails.me : undefined}
        handleCreate={() => router.push("/tutorials/create")}
      />
    );
  } else {
    return <Dashboard title="Loading tutorials" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Tutorials);
