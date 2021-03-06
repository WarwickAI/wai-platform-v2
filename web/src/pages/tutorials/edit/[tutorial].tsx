import React from "react";
import Dashboard from "../../../components/Dashboard";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  TutorialResponse,
  useEditTutorialMutation,
  useTutorialByShortNameQuery,
} from "../../../generated/graphql";
import EditEventFields from "../../../components/EditEventFields";

interface EditTutorialProps {}

const EditTutorial: React.FC<EditTutorialProps> = ({}) => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [, editTutorial] = useEditTutorialMutation();
  return (
    <Dashboard title="Edit Tutorial">
      {data?.tutorialByShortName && data.tutorialByShortName.id && (
        <EditEventFields
          eventType="tutorial"
          eventDetails={data.tutorialByShortName}
          handleEdit={async (tutorialInfo) => {
            const response = await editTutorial({
              id: data.tutorialByShortName!.id,
              tutorialInfo,
            });
            return response.data?.editTutorial as TutorialResponse;
          }}
          handleSuccess={() => router.push("/tutorials")}
        />
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTutorial);
