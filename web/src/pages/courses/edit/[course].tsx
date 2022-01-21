import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useEditCourseMutation,
  useCourseByShortNameQuery,
  EventResponse,
} from "../../../generated/graphql";
import EditEventFields from "../../../components/EditEventFields";

interface EditCourseProps {}

const EditCourse: React.FC<EditCourseProps> = ({}) => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data }] = useCourseByShortNameQuery({
    variables: { shortName: course as string },
  });
  const [, editCourse] = useEditCourseMutation();
  return (
    <Dashboard title="Edit Course">
      {data?.courseByShortName && data.courseByShortName.id && (
        <EditEventFields
          eventType="course"
          eventDetails={data.courseByShortName}
          handleEdit={async (courseInfo) => {
            const response = await editCourse({
              id: data.courseByShortName!.id,
              courseInfo,
            });
            return response.data?.editCourse as EventResponse;
          }}
          handleSuccess={() => router.push("/courses")}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCourse);
