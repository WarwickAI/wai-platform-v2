import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";
import {
  useEditTutorialMutation,
  useTutorialByShortNameQuery,
} from "../../../generated/graphql";

interface EditTutorialProps {}

const EditTutorial: React.FC<EditTutorialProps> = ({}) => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [, editTutorial] = useEditTutorialMutation();
  return (
    <Dashboard title="Edit Tutorial" narrow={true}>
      <Formik
        initialValues={{
          title: data?.tutorialByShortName?.title || "",
          shortName: data?.tutorialByShortName?.shortName || "",
          description: data?.tutorialByShortName?.description || "",
          cover: data?.tutorialByShortName?.cover || "",
          display: data?.tutorialByShortName?.display || false,
          difficulty: data?.tutorialByShortName?.difficulty || "",
          redirect: data?.tutorialByShortName?.redirect || "",
          joinButton: data?.tutorialByShortName?.joinButton || false,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editTutorial({
            tutorialInfo: values,
            id: data?.tutorialByShortName ? data.tutorialByShortName.id : 0,
          });
          if (response.data?.editTutorial.errors) {
            setErrors(toErrorMap(response.data.editTutorial.errors));
          } else if (response.data?.editTutorial.tutorial) {
            // Tutorial submitted
            router.push("/tutorials");
          }
        }}
      >
        {() => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
            ></InputField>
            <Box mt={4}>
              <InputField
                name="shortName"
                placeholder="short name"
                label="Short Name"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="description"
                placeholder="description"
                label="Description"
                type="textarea"
                renderMarkdown
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="difficulty"
                placeholder="difficulty"
                label="Difficulty"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="cover"
                placeholder="cover"
                label="Cover"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="display"
                label="Display"
                type="switch"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="redirect"
                label="Redirect"
                placeholder="redirect"
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="joinButton"
                label="Join Button"
                type="switch"
              ></InputField>
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variant="primary"
                // disabled={!isSubmitting}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTutorial);
