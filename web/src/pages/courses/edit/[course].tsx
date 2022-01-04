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
  useEditCourseMutation,
  useCourseByShortNameQuery,
} from "../../../generated/graphql";

interface EditCourseProps {}

const EditCourse: React.FC<EditCourseProps> = ({}) => {
  const router = useRouter();
  const { course } = router.query;
  const [{ data }] = useCourseByShortNameQuery({
    variables: { shortName: course as string },
  });
  const [, editCourse] = useEditCourseMutation();
  return (
    <Dashboard title="Edit Course" narrow={true}>
      <Formik
        initialValues={{
          title: data?.courseByShortName?.title || "",
          shortName: data?.courseByShortName?.shortName || "",
          description: data?.courseByShortName?.description || "",
          cover: data?.courseByShortName?.cover || "",
          display: data?.courseByShortName?.display || false,
          difficulty: data?.courseByShortName?.difficulty || "",
          redirect: data?.courseByShortName?.redirect || "",
          joinButton: data?.courseByShortName?.joinButton || false,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editCourse({
            courseInfo: values,
            id: data?.courseByShortName ? data.courseByShortName.id : 0,
          });
          if (response.data?.editCourse.errors) {
            setErrors(toErrorMap(response.data.editCourse.errors));
          } else if (response.data?.editCourse.course) {
            // Course submitted
            router.push("/courses");
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditCourse);
