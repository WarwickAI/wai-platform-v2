import React, { useRef } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";

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

interface FormattedTextProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const FormattedText: React.FC<FormattedTextProps> = (props) => {
  const editorRef = useRef(null);

  const [editorState, setEditorState] = React.useState(() =>
    props.value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
      : EditorState.createEmpty()
  );

  const [isEditorFocused, setIsEditorFocused] = React.useState(false);

  const focusEditor = () => {
    if (editorRef.current) {
      setIsEditorFocused(true);
      (editorRef.current as any).focus();
    }
  };

  const onInlineClick = (type: string) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(nextState);
  };

  const onEdit = (state: EditorState) => {
    setEditorState(state);
    props.onChange(JSON.stringify(convertToRaw(state.getCurrentContent())));
  };

  return (
    <Flex
      minHeight={10}
      paddingInlineStart={4}
      paddingInlineEnd={2}
      paddingY={"0.4rem"}
      alignItems="center"
      borderWidth={1}
      borderRadius="md"
      borderColor={props.isEdit ? "gray.200" : "white"}
      position={"relative"}
    >
      <Box
        onMouseDown={() => {
          props.isEdit && focusEditor();
        }}
        onBlur={() => setIsEditorFocused(false)}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onEdit}
          readOnly={!props.isEdit}
        />
      </Box>
      {/* <StyleButtons
        onToggle={onInlineClick}
        isEditorFocused={isEditorFocused}
      /> */}
    </Flex>
  );
};

export default FormattedText;
