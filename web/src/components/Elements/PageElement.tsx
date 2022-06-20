import React, { useRef } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useEditElementPropsMutation } from "../../generated/graphql";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";
import { ElementTyper } from "../../utils/elements";

interface PageElementProps {
  element: ElementTyper<PageElementProps>;
  isEdit: boolean;
}

const PageElement: React.FC<PageElementProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props;

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
