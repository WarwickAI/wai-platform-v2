import { AddIcon } from "@chakra-ui/icons";
import { Tr, Td, Flex, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEditElementDataMutation } from "../../../../generated/graphql";
import { DatabaseElementData } from "../../../../utils/base_element_types";
import { Element, ElementDataPiece } from "../../../../utils/config";
import GenericProperty from "../../../Properties/GenericProperty";
import ElementSettingsPopover from "../../../Utils/ElementSettingsPopover";

interface RowProps {
  element: Element<any>;
  database: Element<DatabaseElementData>;
  addElement: (atIndex: number) => void;
  removeElement: (elementId: number) => void;
  isEdit: boolean;
}

const Row: React.FC<RowProps> = (props) => {
  const router = useRouter();

  const [showControls, setShowControls] = useState<boolean>(false);
  const [addElementPopoverOpen, setAddElementPopoverOpen] =
    useState<boolean>(false);

  return (
    <>
      {props.isEdit && (
        <Flex
          justifyContent={"center"}
          height={10}
          position="absolute"
          left={-12}
          alignItems={"center"}
          opacity={showControls || addElementPopoverOpen ? 1 : 0.2}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <Box
            h={6}
            w={6}
            p={1}
            borderRadius={"md"}
            textAlign={"center"}
            justifyContent={"center"}
            display={"flex"}
            alignItems={"center"}
            _hover={{ cursor: "pointer", backgroundColor: "gray.200" }}
            onClick={() => props.addElement(props.element.index + 1)}
          >
            <AddIcon />
          </Box>
          <ElementSettingsPopover
            onOpen={() => setAddElementPopoverOpen(true)}
            onClose={() => setAddElementPopoverOpen(false)}
            element={props.element}
            removeElement={props.removeElement}
            hideAttributes={true}
            disabled={!props.isEdit}
          />
        </Flex>
      )}
      <Tr
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Td>
          <Box
            onClick={() => router.push(`/generic/${props.element.id}`)}
            _hover={{ cursor: "pointer" }}
          >
            ↗️
          </Box>
        </Td>
        {Object.keys(props.database.data.attributes.value).map(
          (attributeName: string) => {
            const attribute = props.element.data[attributeName];
            const attributeDefault =
              props.database.data.attributes.value[attributeName];
            return (
              <Td py={1} px={1} key={attributeName} width={60}>
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
    </>
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
