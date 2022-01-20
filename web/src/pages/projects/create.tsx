import React from "react";
import Dashboard from "../../components/Dashboard";
import { EventResponse, useCreateProjectMutation } from "../../generated/graphql";
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
        handleCreate={async (eventInfo) => {
          const response = await createProject({ eventInfo });
          return response.data?.createProject as EventResponse;
        }}
        handleSuccess={() => router.push("/projects")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateProject);
