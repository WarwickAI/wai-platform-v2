import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useCourseByShortNameQuery,
  useCourseUsersQuery,
  useRemoveUserFromCourseMutation,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import ManageEvent from "../../../components/ManageEvent";
import Dashboard from "../../../components/Dashboard";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ManageCourseProps {}

const ManageCourse: React.FC<ManageCourseProps> = ({}) => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data: eventData }] = useCourseByShortNameQuery({
    variables: { shortName: course as string },
  });
  const [
    { data: eventUsers, stale, fetching },
    fetchEventusers,
  ] = useCourseUsersQuery({
    variables: { shortName: course as string },
    pause: isServer(),
  });
  const [, removeUserFromEvent] = useRemoveUserFromCourseMutation();

  useEffect(() => {
    if (stale) {
      fetchEventusers();
    }
  }, [fetchEventusers, stale]);

  if (eventData?.courseByShortName && eventUsers?.courseUsers) {
    return (
      <ManageEvent
        eventType="course"
        eventDetails={eventData.courseByShortName}
        eventUsers={eventUsers.courseUsers}
        handleRemoveUserFromEvent={async (userId, eventId) => {
          await removeUserFromEvent({ userId, courseId: eventId });
          router.reload();
        }}
      />
    );
  } else {
    return <Dashboard title="Loading course" />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ManageCourse);
