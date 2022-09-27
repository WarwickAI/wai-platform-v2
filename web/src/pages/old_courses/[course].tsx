import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinCourseMutation,
  useMeQuery,
  useCourseByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import EventPage from "../../components/EventPage";

interface CourseProps {}

const Course: React.FC<CourseProps> = () => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data: eventDetails }] = useCourseByShortNameQuery({
    variables: { shortName: course as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  const [, joinCourse] = useJoinCourseMutation();

  useEffect(() => {
    // Redirect if course has a redirect and not exec
    if (
      !fetchingUser &&
      eventDetails?.courseByShortName?.redirectUrl &&
      eventDetails?.courseByShortName.redirectUrl.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(eventDetails.courseByShortName.redirectUrl);
      }
    }
  }, [eventDetails, fetchingUser, router, userInfo?.me?.role]);

  if (eventDetails?.courseByShortName) {
    return (
      <EventPage
        eventType="course"
        eventDetails={eventDetails.courseByShortName}
        userDetails={userInfo?.me ? userInfo.me : undefined}
        userInEvent={
          userInfo?.me?.courses.findIndex(
            ({ shortName }) => shortName === course
          ) !== -1
        }
        handleJoin={async (eventId: number) => {
          const response = await joinCourse({ courseId: eventId });
          fetchMe();
          return response.data?.joinCourse ? true : false;
        }}
        handleEdit={() => {
          router.push(`/courses/edit/${course}`);
        }}
        handleManage={() => {
          router.push(`/courses/manage/${course}`);
        }}
      />
    );
  } else {
    return <Dashboard title={"Loading Course"} />;
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Course);
