import React from "react";
import Dashboard from "../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useCreateTutorialMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";

interface CreateTutorialProps {}

const CreateTutorial: React.FC<CreateTutorialProps> = ({}) => {
  const router = useRouter();
  const [, createTutorial] = useCreateTutorialMutation();
  return (
    <Dashboard title="Create Tutorial">
      <Formik
        initialValues={{
          title: "",
          shortName: "",
          description: "",
          cover: "",
          display: false,
          difficulty: "",
          redirect: "",
          joinButton: false,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createTutorial({ tutorialInfo: values });
          if (response.data?.createTutorial.errors) {
            setErrors(toErrorMap(response.data.createTutorial.errors));
          } else if (response.data?.createTutorial.tutorial) {
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

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateTutorial);
