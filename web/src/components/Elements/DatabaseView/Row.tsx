import { Tr, Td } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEditElementDataMutation } from "../../../generated/graphql";
import { DatabaseElementData } from "../../../utils/base_element_types";
import { Element, ElementDataPiece } from "../../../utils/config";
import GenericProperty from "../../Properties/GenericProperty";

interface RowProps {
  element: Element<any>;
  database: Element<DatabaseElementData>;
  isEdit: boolean;
}

const Row: React.FC<RowProps> = (props) => {
  const router = useRouter();

  return (
    <Tr>
      <Td
        onClick={() => router.push(`/generic/${props.element.id}`)}
        _hover={{ cursor: "pointer" }}
      >
        ↗️
      </Td>
      {Object.keys(props.database.data.attributes.value).map(
        (attributeName: string) => {
          const attribute = props.element.data[attributeName];
          const attributeDefault =
            props.database.data.attributes.value[attributeName];
          return (
            <Td key={attributeName} width={60}>
              <RowAttribute
                element={props.element}
                attribute={attribute ? attribute : attributeDefault}
                attributeName={attributeName}
                isEdit={props.isEdit}
              />
            </Td>
          );
        }
      )}
    </Tr>
  );
};

interface RowAttributeProps {
  attribute: ElementDataPiece<any>;
  attributeName: string;
  element: Element<any>;
  isEdit: boolean;
}

const RowAttribute: React.FC<RowAttributeProps> = (props) => {
  const [value, setValue] = useState<any>(
    props.attribute ? props.attribute.value : ""
  );

  const [, editElement] = useEditElementDataMutation();

  return (
    <GenericProperty
      element={props.element}
      value={value}
      type={props.attribute.type}
      onChange={async (v) => {
        setValue(v);
        const newData: any = {};
        newData[props.attributeName] = {
          ...props.attribute,
          value: v,
        };

        await editElement({
          elementId: props.element.id,
          data: newData,
        });
      }}
      isEdit={props.isEdit}
    />
  );
};

export default Row;
