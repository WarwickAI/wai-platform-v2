import React from "react";
import Dashboard from "../../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../../utils/toErrorMap";
import { InputField } from "../../../components/InputField";
import { Badge, Box, Button, Heading, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import ReactMarkdown from "react-markdown";
import {
  useEditMerchMutation,
  useMerchByShortNameQuery,
} from "../../../generated/graphql";

interface EditMerchProps {}

const EditMerch: React.FC<EditMerchProps> = ({}) => {
  const router = useRouter();
  const { merch } = router.query;
  const [{ data }] = useMerchByShortNameQuery({
    variables: { shortName: merch as string },
  });
  const [, editMerch] = useEditMerchMutation();
  return (
    <Dashboard title="Edit Merch">
      <Formik
        initialValues={{
          title: data?.merchByShortName?.title || "",
          shortName: data?.merchByShortName?.shortName || "",
          description: data?.merchByShortName?.description || "",
          image: data?.merchByShortName?.image || "",
          display: data?.merchByShortName?.display || false,
          variants: data?.merchByShortName?.variants || [],
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await editMerch({
            itemInfo: values,
            id: data?.merchByShortName ? data.merchByShortName.id : 0,
          });
          if (response.data?.editMerch.errors) {
            setErrors(toErrorMap(response.data.editMerch.errors));
          } else if (response.data?.editMerch.item) {
            // Merch submitted
            router.push("/merch");
          }
        }}
      >
        {(formProps) => (
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
                name="image"
                placeholder="image"
                label="Image"
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
              <Heading size="md">Variants</Heading>
              <Formik
                initialValues={{
                  name: "",
                  link: "",
                }}
                onSubmit={({ name, link }) => {
                  if (
                    name.length > 0 &&
                    link.length > 0 &&
                    formProps.values.variants.findIndex(
                      (val) => val.name === name
                    ) === -1
                  ) {
                    formProps.setFieldValue("variants", [
                      ...formProps.values.variants,
                      { name, link },
                    ]);
                  }
                }}
              >
                {(formProps2) => (
                  <Form>
                    <HStack spacing={4}>
                      <Box w={60}>
                        <InputField
                          name="name"
                          placeholder="name"
                          label="Name"
                        />
                      </Box>
                      <Box w={60}>
                        <InputField
                          name="link"
                          placeholder="link"
                          label="Link"
                        />
                      </Box>
                      <Button
                        mt={4}
                        variant="primary"
                        onClick={formProps2.submitForm}
                      >
                        Add Variant
                      </Button>
                    </HStack>
                  </Form>
                )}
              </Formik>
              <Box mt={4}>
                <HStack>
                  {formProps.values.variants.map((variant) => (
                    <Badge
                      key={variant.name}
                      colorScheme="green"
                      borderRadius="lg"
                      p={2}
                    >
                      {variant.name}
                      <Button
                        ml={2}
                        size="xs"
                        color="blue"
                        onClick={() => {
                          var variantsCopy = formProps.values.variants;
                          variantsCopy.splice(
                            variantsCopy.findIndex(
                              (val) => val.name === variant.name
                            ),
                            1
                          );
                          formProps.setFieldValue("variants", variantsCopy);
                        }}
                      >
                        x
                      </Button>
                    </Badge>
                  ))}
                </HStack>
              </Box>
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

export default withUrqlClient(createUrqlClient, { ssr: false })(EditMerch);
