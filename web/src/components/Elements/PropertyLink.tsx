import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import {
  useGetElementQuery,
} from "../../generated/graphql";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";
import { PropertyLinkElementData } from "../../utils/base_element_types";
import { Element } from "../../utils/config";

interface PropertyLinkProps {
  element: Element<PropertyLinkElementData>;
  isEdit: boolean;
}

const PropertyLink: React.FC<PropertyLinkProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data as PropertyLinkElementData;
  const [{ data: parentElement }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : 0,
    },
  });

  return (
    <Box>
      {parentElement?.getElement.data[elementProps.property.value]
        ?.value !== undefined ? (
        <Text>
          {
            parentElement?.getElement.data[elementProps.property.value]
              .value
          }
        </Text>
      ) :  (
        <Text>Select Property</Text>
      )}
    </Box>
  );
};

export default PropertyLink;
