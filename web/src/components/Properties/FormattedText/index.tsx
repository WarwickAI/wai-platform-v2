import React, { useEffect, useState } from "react";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { useDebouncedCallback } from "use-debounce";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownTheme } from "../../../theme";

interface FormattedTextProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const FormattedText: React.FC<FormattedTextProps> = (props) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>(props.value);
  const debounced = useDebouncedCallback((value) => {
    props.onChange(value);
  }, 1500);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.isEdit && textAreaRef.current) {
      textAreaRef.current.style.height = "1rem";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [props.isEdit]);

  if (!props.isEdit) {
  } else {
    return (
      <Textarea
        ref={textAreaRef}
        minHeight={0}
        value={value}
        type={"text"}
        resize={"none"}
        overflow={"hidden"}
        onChange={async (e) => {
          setValue(e.target.value);
          debounced.cancel();
          debounced(e.target.value);
          e.target.style.height = "1rem";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        borderColor={"gray.200"}
      />
    );
  }

  return (
    <Flex
      minHeight={0}
      paddingInlineStart={4}
      paddingInlineEnd={4}
      paddingY={"0.4rem"}
      alignItems="center"
      borderWidth={1}
      borderRadius="md"
      borderColor={props.isEdit ? "gray.200" : "white"}
      // onClick={() => props.isEdit && focusEditor()}
      _hover={{ cursor: "text" }}
      position={"relative"}
    >
      <Box
      // onMouseDown={() => props.isEdit && focusEditor()}
      // onBlur={() => setIsEditorFocused(false)}
      >
        <ReactMarkdown
          components={ChakraUIRenderer(markdownTheme)}
          linkTarget="_self"
          remarkPlugins={[remarkGfm]}
        >
          {value}
        </ReactMarkdown>
      </Box>
    </Flex>
  );
};

export default FormattedText;
