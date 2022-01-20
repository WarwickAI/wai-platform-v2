import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  EventResponse,
  useEditTalkMutation,
  useTalkByShortNameQuery,
} from "../../../generated/graphql";
import EditEventFields from "../../../components/EditEventFields";

interface EditTalkProps {}

const EditTalk: React.FC<EditTalkProps> = ({}) => {
  const router = useRouter();
  const { talk } = router.query;
  const [{ data }] = useTalkByShortNameQuery({
    variables: { shortName: talk as string },
  });
  console.log(data);
  const [, editTalk] = useEditTalkMutation();
  return (
    <Dashboard title="Edit Talk">
      {data?.talkByShortName && data.talkByShortName.id && (
        <EditEventFields
          eventType="talk"
          eventDetails={data.talkByShortName}
          handleEdit={async (eventInfo) => {
            const response = await editTalk({
              id: data.talkByShortName!.id,
              eventInfo,
            });
            return response.data?.editTalk as EventResponse;
          }}
          handleSuccess={() => router.push("/courses")}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTalk);
