import React, { useRef } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useEditElementPropsMutation } from "../../generated/graphql";
import { PageElementType, TextElementType } from "../../utils/elements";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";

interface PageElementProps {
  element: PageElementType;
}

const PageElement: React.FC<PageElementProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props;
  const editorRef = useRef(null);

  return (
    <Button
      onClick={() => {
        router.push(`/generic/${props.element.id}`);
      }}
    >
      {elementProps.title.value}
    </Button>
  );
};

export default PageElement;
