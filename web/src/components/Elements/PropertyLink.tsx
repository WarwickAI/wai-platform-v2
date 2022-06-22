import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import {
  useEditElementPropsMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import {
  ElementTyper,
  PropertyLinkElementProps,
  PropertyTypes,
} from "../../utils/elements";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";

interface PropertyLinkProps {
  element: ElementTyper<PropertyLinkElementProps>;
  isEdit: boolean;
}

const PropertyLink: React.FC<PropertyLinkProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as PropertyLinkElementProps;
  const [{ data: parentElement }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : 0,
    },
  });

  useEffect(() => {
  }, [elementProps, props])

  return (
    <Box>
      {parentElement?.getElement.props[elementProps.propertyName.value]
        ?.value && (
        <Text>
          {elementProps.propertyName.value} -{" "}
          {
            parentElement?.getElement.props[elementProps.propertyName.value]
              .value
          }
        </Text>
      )}
    </Box>
  );
};

export default PropertyLink;
