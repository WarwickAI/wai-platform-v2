import { Heading, Button, HStack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinCourseMutation,
  useMeQuery,
  useCourseByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface CourseProps {}

const Course: React.FC<CourseProps> = ({}) => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data }] = useCourseByShortNameQuery({
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
      data?.courseByShortName &&
      data?.courseByShortName.redirect.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(data.courseByShortName.redirect);
      }
    }
  }, [data, fetchingUser, router, userInfo?.me?.role]);

  return (
    <Dashboard
      title={data?.courseByShortName ? data?.courseByShortName.title : ""}
      narrow={true}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" &&
            data?.courseByShortName &&
            data?.courseByShortName.redirect.length > 0 && (
              <Button
                variant="primary"
                onClick={() =>
                  data?.courseByShortName?.redirect
                    ? router.push(data.courseByShortName.redirect)
                    : {}
                }
              >
                Follow Redirect
              </Button>
            )}
          {data?.courseByShortName && data.courseByShortName.joinButton && (
            <Button
              variant="primary"
              onClick={async () => {
                if (data.courseByShortName) {
                  console.log(data.courseByShortName.id);
                  const response = await joinCourse({
                    courseId: data.courseByShortName.id,
                    shortName: data.courseByShortName.shortName,
                  });
                  if (response.data?.joinCourse) {
                    console.log("JOINED COURSE");
                    fetchMe();
                  } else {
                    console.log("FAILED JOINING COURSE");
                  }
                }
              }}
              disabled={
                userInfo?.me?.courses.findIndex(
                  ({ shortName }) => shortName == course
                ) !== -1
              }
            >
              {userInfo?.me?.courses.findIndex(
                ({ shortName }) => shortName == course
              ) !== -1
                ? "Joined"
                : "Join"}
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/courses/edit/${data?.courseByShortName?.shortName}`
                )
              }
            >
              Edit
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/courses/manage/${data?.courseByShortName?.shortName}`
                )
              }
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {data?.courseByShortName?.description && (
        <ReactMarkdown>{data?.courseByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Course);
