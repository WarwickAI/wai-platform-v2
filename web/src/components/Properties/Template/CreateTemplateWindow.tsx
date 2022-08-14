import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Flex,
  Input,
  AlertDialogFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCreateElementMutation } from "../../../generated/graphql";
import { DatabaseElementData } from "../../../utils/base_element_types";
import { createDefaultElementData } from "../../../utils/config";

interface CreateTemplateWindowProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (v: number) => void;
}

const CreateTemplateWindow: React.FC<CreateTemplateWindowProps> = (
  props: any
) => {
  const cancelAddRef = useRef<HTMLButtonElement | undefined>();
  const [newTemplateName, setNewTemplateName] = useState<string>("");

  const [, createElement] = useCreateElementMutation();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      // @ts-ignore
      leastDestructiveRef={cancelAddRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create New Template
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex direction={"row"} alignItems="center" mb={2}>
              <Text mr={2} whiteSpace="nowrap">
                Name:
              </Text>
              <Input
                onChange={(e) => {
                  setNewTemplateName(e.target.value);
                }}
                value={newTemplateName}
              />
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelAddRef}
              colorScheme="red"
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              ml={3}
              onClick={async () => {
                // Create new template
                const newTemplateData = createDefaultElementData(
                  "Template"
                ) as DatabaseElementData;
                newTemplateData.title.value = newTemplateName;

                const newTemplate = await createElement({
                  index: 0,
                  type: "Template",
                  data: newTemplateData,
                });
                if (newTemplate.data?.createElement) {
                  props.onChange(newTemplate.data.createElement.id);
                }
                props.onClose();
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CreateTemplateWindow;
