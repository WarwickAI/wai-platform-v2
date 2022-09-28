import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useTalksQuery,
  useAllTalksQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import EventsPage from "../../components/EventsPage";
import Dashboard from "../../components/Dashboard";

const Talks = () => {
  const router = useRouter();
  const [{ data: events }] = useTalksQuery();
  const [{ data: allEvents }] = useAllTalksQuery({ pause: isServer() });
  const [{ data: userDetails }] = useMeQuery({ pause: isServer() });

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/talks");
    }
  }, [router, router.query]);
  if (events?.talks) {
    return (
      <EventsPage
        eventType={"talk"}
        events={events.talks}
        allEvents={allEvents?.allTalks ? allEvents.allTalks : []}
        userDetails={userDetails?.me ? userDetails.me : undefined}
        handleCreate={() => router.push("/talks/create")}
      />
    );
  } else {
    return <Dashboard title="Loading talks" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Talks);
