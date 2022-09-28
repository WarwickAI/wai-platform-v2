import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useProjectsQuery,
  useAllProjectsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import EventsPage from "../../components/EventsPage";
import Dashboard from "../../components/Dashboard";

const Projects = () => {
  const router = useRouter();
  const [{ data: events }] = useProjectsQuery();
  const [{ data: allEvents }] = useAllProjectsQuery({ pause: isServer() });
  const [{ data: userDetails }] = useMeQuery({ pause: isServer() });

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/projects");
    }
  }, [router, router.query]);
  if (events?.projects) {
    return (
      <EventsPage
        eventType={"project"}
        events={events.projects}
        allEvents={allEvents?.allProjects ? allEvents.allProjects : []}
        userDetails={userDetails?.me ? userDetails.me : undefined}
        handleCreate={() => router.push("/projects/create")}
      />
    );
  } else {
    return <Dashboard title="Loading projects" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Projects);
