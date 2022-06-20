import React, { useRef, useState } from "react";
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
  const [propertyName, setPropertyName] = useState<string>(
    elementProps.propertyName.value
  );
  const [, editElement] = useEditElementPropsMutation();
  const [{ data: parentElement }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : 0,
    },
  });

  const propertyValue = parentElement?.getElement.props[propertyName]
    ? parentElement?.getElement.props[propertyName].value
    : "NONE";

  return (
    <Box>
      <Input
        value={propertyName}
        w={150}
        onChange={(e) => {
          setPropertyName(e.target.value);
          editElement({
            elementId: props.element.id,
            props: {
              propertyName: {
                type: PropertyTypes.Text,
                value: e.target.value,
              },
            },
          });
        }}
      />
      <Text>
        {propertyName} - {propertyValue}
      </Text>
    </Box>
  );
};

export default PropertyLink;
