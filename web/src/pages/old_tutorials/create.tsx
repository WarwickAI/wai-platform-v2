import React from "react";
import Dashboard from "../../components/Dashboard";
import {
  TutorialResponse,
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
        handleCreate={async (tutorialInfo) => {
          const response = await createTutorial({ tutorialInfo });
          return response.data?.createTutorial as TutorialResponse;
        }}
        handleSuccess={() => router.push("/tutorials")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateTutorial);
