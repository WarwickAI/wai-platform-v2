import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useEditBadgeMutation,
  useBadgeByShortNameQuery,
} from "../../../generated/graphql";
import infoOutline from "@iconify/icons-eva/info-outline";
import { getIcon } from "../../../components/SidebarConfig";

interface EditBadgeProps {}

const EditBadge: React.FC<EditBadgeProps> = ({}) => {
  const router = useRouter();
  const { badge } = router.query;
  const [{ data }] = useBadgeByShortNameQuery({
    variables: { shortName: badge as string },
  });
  const [, editBadge] = useEditBadgeMutation();
  return (
    <Dashboard title="Edit Badge">
      <Formik
        initialValues={{
          title: data?.badgeByShortName?.title || "",
          shortName: data?.badgeByShortName?.shortName || "",
          description: data?.badgeByShortName?.description || "",
          color: data?.badgeByShortName?.color || "#FFFFFF",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editBadge({
            badgeInfo: values,
            editBadgeId: data?.badgeByShortName ? data.badgeByShortName.id : 0,
          });
          if (response.data?.editBadge.errors) {
            setErrors(toErrorMap(response.data.editBadge.errors));
          } else if (response.data?.editBadge.badge) {
            // Badge submitted
            router.push("/badges");
          }
        }}
      >
        {(formProps) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              hint="Main title for the badge. Must be at least 3 characters."
            ></InputField>
            <Box mt={4}>
              <InputField
                name="shortName"
                placeholder="short name"
                label="Short Name"
                hint="Name used for the URL and as a unique identifier. Must be unique, not contain '/', 'space' or '?' and be at least 3 characters."
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="description"
                placeholder="description"
                label="Description"
                type="textarea"
                renderMarkdown
                hint="Markdown description rendered on the badge page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="color"
                placeholder="color"
                label="Color"
                hint="Color of the badge. This should be in the format of '#rrggbb' where rr, gg, bb are hexadecimal values for red green and blue. Search for RGB colour picker for help finding out this value."
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditBadge);
