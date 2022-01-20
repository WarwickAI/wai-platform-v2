import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  EventResponse,
  useEditProjectMutation,
  useProjectByShortNameQuery,
} from "../../../generated/graphql";
import EditEventFields from "../../../components/EditEventFields";

interface EditProjectProps {}

const EditProject: React.FC<EditProjectProps> = ({}) => {
  const router = useRouter();
  const { project } = router.query;
  const [{ data }] = useProjectByShortNameQuery({
    variables: { shortName: project as string },
  });
  const [, editProject] = useEditProjectMutation();
  return (
    <Dashboard title="Edit Project">
      {data?.projectByShortName && data.projectByShortName.id && (
        <EditEventFields
          eventType="project"
          eventDetails={data.projectByShortName}
          handleEdit={async (eventInfo) => {
            const response = await editProject({
              id: data.projectByShortName!.id,
              eventInfo,
            });
            return response.data?.editProject as EventResponse;
          }}
          handleSuccess={() => router.push("/courses")}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditProject);
