import React from "react";
import Dashboard from "../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useCreateTalkMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";

interface CreateTalkProps {}

const CreateTalk: React.FC<CreateTalkProps> = ({}) => {
  const router = useRouter();
  const [, createTalk] = useCreateTalkMutation();
  return (
    <Dashboard title="Create Talk">
      <Formik
        initialValues={{
          title: "",
          shortName: "",
          description: "",
          cover: "",
          display: false,
          redirect: "",
          joinButton: false,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createTalk({ talkInfo: values });
          if (response.data?.createTalk.errors) {
            setErrors(toErrorMap(response.data.createTalk.errors));
          } else if (response.data?.createTalk.talk) {
            // Talk submitted
            router.push("/talks");
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

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateTalk);
