import React, { useRef } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Element } from "../../utils/config";
import { TextElementData } from "../../utils/base_element_types";
import { useEditElementDataMutation } from "../../generated/graphql";
import FormattedText from "../Properties/FormattedText";

interface StyleButtonsProps {
  onToggle: (style: string) => void;
  isEditorFocused: boolean;
}

const StyleButtons: React.FC<StyleButtonsProps> = (props) => {
  return (
    <Box
      position={"absolute"}
      bottom={8}
      display={props.isEditorFocused ? "flex" : "none"}
      p={1}
      borderColor={"gray.200"}
      borderWidth={1}
      borderRadius={8}
      backgroundColor="white"
      boxShadow="md"
      zIndex={100}
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Button
          as="button"
          variant="outline"
          size="sm"
          mr={2}
          onMouseDown={(e) => {
            e.preventDefault();
            props.onToggle("BOLD");
          }}
        >
          <Box as="span" fontWeight="bold">
            B
          </Box>
        </Button>
        <Button
          as="button"
          variant="outline"
          size="sm"
          mr={2}
          onMouseDown={(e) => {
            e.preventDefault();
            props.onToggle("ITALIC");
          }}
        >
          <Box as="span" fontStyle="italic">
            I
          </Box>
        </Button>
        <Button
          as="button"
          variant="outline"
          size="sm"
          mr={2}
          onMouseDown={(e) => {
            e.preventDefault();
            props.onToggle("UNDERLINE");
          }}
        >
          <Box as="span" textDecoration="underline">
            U
          </Box>
        </Button>
        <Button
          as="button"
          variant="outline"
          size="sm"
          onMouseDown={(e) => {
            e.preventDefault();
            props.onToggle("STRIKETHROUGH");
          }}
        >
          <Box as="span" textDecoration="line-through">
            S
          </Box>
        </Button>
      </Flex>
    </Box>
  );
};

interface TextProps {
  element: Element<TextElementData>;
  isEdit: boolean;
}

const Text: React.FC<TextProps> = (props) => {
  const elementProps = props.element.data as TextElementData;

  const [, editElement] = useEditElementDataMutation();

  return (
    <FormattedText
      value={elementProps.text.value}
      onChange={(text) => {
        editElement({
          elementId: props.element.id,
          data: {
            text: {
              type: "FormattedText",
              value: text,
            },
          },
        });
      }}
      isEdit={props.isEdit}
    />
  );
};

export default Text;
