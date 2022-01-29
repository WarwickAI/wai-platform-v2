import React from "react";
import Dashboard from "../../components/Dashboard";
import { ProjectResponse, useCreateProjectMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import CreateEventFields from "../../components/CreateEventFields";

interface CreateProjectProps {}

const CreateProject: React.FC<CreateProjectProps> = ({}) => {
  const router = useRouter();
  const [, createProject] = useCreateProjectMutation();
  return (
    <Dashboard title="Create Project">
      <CreateEventFields
        eventType="project"
        handleCreate={async (projectInfo) => {
          const response = await createProject({ projectInfo });
          return response.data?.createProject as ProjectResponse;
        }}
        handleSuccess={() => router.push("/projects")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateProject);
