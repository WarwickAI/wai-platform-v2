import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  ProjectResponse,
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
          handleEdit={async (projectInfo) => {
            const response = await editProject({
              id: data.projectByShortName!.id,
              projectInfo,
            });
            return response.data?.editProject as ProjectResponse;
          }}
          handleSuccess={() => router.push("/projects")}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditProject);
