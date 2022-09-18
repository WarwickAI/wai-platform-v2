import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  useEditElementDataMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";
import { DataLinkElementData } from "../../utils/base_element_types";
import { Element } from "../../utils/config";
import GenericProperty from "../Properties/GenericProperty";

interface DataLinkProps {
  element: Element<DataLinkElementData>;
  isEdit: boolean;
}

const DataLink: React.FC<DataLinkProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.data as DataLinkElementData;
  const [{ data: parentElement }] = useGetElementQuery({
    variables: {
      elementId: props.element.parent ? props.element.parent.id : -1,
    },
    pause: !props.element.parent,
  });
  const [, editElement] = useEditElementDataMutation();

  const property = useMemo(() => {
    return parentElement?.getElement.data[elementProps.property.value];
  }, [parentElement, elementProps.property.value]);

  const handleEditProperty = async (
    parentElement: Element<any>,
    property: any,
    newValue: any
  ) => {
    editElement({
      elementId: parentElement.id,
      data: {
        [elementProps.property.value]: { type: property.type, value: newValue },
      },
    });
  };

  return (
    <Box>
      {property && parentElement?.getElement ? (
        <Text>
          {elementProps.canEdit.value || true ? (
            <GenericProperty
              element={props.element}
              value={property.value}
              type={property.type}
              onChange={(v: any) =>
                handleEditProperty(
                  parentElement.getElement as Element<any>,
                  property,
                  v
                )
              }
              isEdit={true}
            />
          ) : (
            parentElement?.getElement.data[elementProps.property.value].value
          )}
        </Text>
      ) : (
        <Text>Select Property</Text>
      )}
    </Box>
  );
};

export default DataLink;
