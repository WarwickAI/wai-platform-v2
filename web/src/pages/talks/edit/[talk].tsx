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
  useEditTalkMutation,
  useTalkByShortNameQuery,
} from "../../../generated/graphql";

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
    <Dashboard title="Edit Talk" narrow={true}>
      <Formik
        initialValues={{
          title: data?.talkByShortName?.title || "",
          shortName: data?.talkByShortName?.shortName || "",
          description: data?.talkByShortName?.description || "",
          cover: data?.talkByShortName?.cover || "",
          display: data?.talkByShortName?.display || false,
          redirect: data?.talkByShortName?.redirect || "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editTalk({
            talkInfo: values,
            id: data?.talkByShortName ? data.talkByShortName.id : 0,
          });
          if (response.data?.editTalk.errors) {
            setErrors(toErrorMap(response.data.editTalk.errors));
          } else if (response.data?.editTalk.talk) {
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
                textarea
                render
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditTalk);
