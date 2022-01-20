import React from "react";
import Dashboard from "../../components/Dashboard";
import { EventResponse, useCreateTalkMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import CreateEventFields from "../../components/CreateEventFields";

interface CreateTalkProps {}

const CreateTalk: React.FC<CreateTalkProps> = ({}) => {
  const router = useRouter();
  const [, createTalk] = useCreateTalkMutation();
  return (
    <Dashboard title="Create Talk">
      <CreateEventFields
        eventType="talk"
        handleCreate={async (eventInfo) => {
          const response = await createTalk({ eventInfo });
          return response.data?.createTalk as EventResponse;
        }}
        handleSuccess={() => router.push("/talks")}
      />
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateTalk);
