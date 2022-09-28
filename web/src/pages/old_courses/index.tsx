import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setAccessToken } from "../../utils/accesToken";
import {
  useMeQuery,
  useCoursesQuery,
  useAllCoursesQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import EventsPage from "../../components/EventsPage";
import Dashboard from "../../components/Dashboard";

const Courses = () => {
  const router = useRouter();
  const [{ data: events }] = useCoursesQuery();
  const [{ data: allEvents }] = useAllCoursesQuery({ pause: isServer() });
  const [{ data: userDetails }] = useMeQuery({ pause: isServer() });

  useEffect(() => {
    if (router.query.accessToken && router.query.accessToken.length > 0) {
      setAccessToken(router.query.accessToken as string);
      router.push("/courses");
    }
  }, [router, router.query]);
  if (events?.courses) {
    return (
      <EventsPage
        eventType={"course"}
        events={events.courses}
        allEvents={allEvents?.allCourses ? allEvents.allCourses : []}
        userDetails={userDetails?.me ? userDetails.me : undefined}
        handleCreate={() => router.push("/courses/create")}
      />
    );
  } else {
    return <Dashboard title="Loading courses" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Courses);
