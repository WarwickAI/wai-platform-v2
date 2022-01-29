import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  CourseResponse,
  useCreateCourseMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import CreateEventFields from "../../components/CreateEventFields";

interface CreateCourseProps {}

const CreateCourse: React.FC<CreateCourseProps> = ({}) => {
  const router = useRouter();
  const [, createCourse] = useCreateCourseMutation();
  return (
    <Dashboard title="Create Course">
      <CreateEventFields
        eventType="course"
        handleCreate={async (courseInfo) => {
          const response = await createCourse({ courseInfo });
          return response.data?.createCourse as CourseResponse;
        }}
        handleSuccess={() => router.push("/courses")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateCourse);
