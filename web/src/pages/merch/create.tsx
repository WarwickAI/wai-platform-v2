import React from "react";
import Dashboard from "../../components/Dashboard";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { useCreateMerchMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import infoOutline from "@iconify/icons-eva/info-outline";
import { getIcon } from "../../components/SidebarConfig";

interface CreateMerchProps {}

const CreateMerch: React.FC<CreateMerchProps> = ({}) => {
  const router = useRouter();
  const [, createMerch] = useCreateMerchMutation();
  return (
    <Dashboard title="Create Merch">
      <Formik
        initialValues={{
          title: "",
          shortName: "",
          description: "",
          display: false,
          image: "",
          variants: [{ name: "regular", link: "https://google.com" }],
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log("HERE");
          const response = await createMerch({ itemInfo: values });
          if (response.data?.createMerch.errors) {
            setErrors(toErrorMap(response.data.createMerch.errors));
            console.log(response.data);
          } else if (response.data?.createMerch.item) {
            // Course submitted
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
              hint="Main title for the merch. Must be at least 3 characters."
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
                hint="Markdown description rendered on the merch page. Type into Google 'Markdown Cheat Sheet' for help with how to style the text."
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="image"
                placeholder="image"
                label="Image"
                hint="URL for the image used for the card (on the page showing all merch items) and the merch item page itself. Should be roughly portrait."
              ></InputField>
            </Box>
            <Box mt={4}>
              <InputField
                name="display"
                label="Display"
                type="switch"
                hint="Whether to display to normal users or hide."
              ></InputField>
            </Box>
            <Box mt={4}>
              <Flex>
                <Heading size="md">Variants</Heading>
                <Tooltip
                  label={
                    "Add a variant (usally a size) of the merch item with its own payment link. Click on a variant to remove it."
                  }
                >
                  {getIcon(infoOutline)}
                </Tooltip>
              </Flex>
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
                          hint="Name of the variant (usually the size)."
                        />
                      </Box>
                      <Box w={60}>
                        <InputField
                          name="link"
                          placeholder="link"
                          label="Link"
                          hint="Payment URL link for the variant. Should be to the shopify payment page for this variant of this product."
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

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateMerch);
