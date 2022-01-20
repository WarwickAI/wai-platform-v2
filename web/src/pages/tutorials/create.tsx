import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  EventResponse,
  useCreateTutorialMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import CreateEventFields from "../../components/CreateEventFields";

interface CreateTutorialProps {}

const CreateTutorial: React.FC<CreateTutorialProps> = ({}) => {
  const router = useRouter();
  const [, createTutorial] = useCreateTutorialMutation();
  return (
    <Dashboard title="Create Tutorial">
      <CreateEventFields
        eventType="tutorial"
        handleCreate={async (eventInfo) => {
          const response = await createTutorial({ eventInfo });
          return response.data?.createTutorial as EventResponse;
        }}
        handleSuccess={() => router.push("/courses")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateTutorial);
