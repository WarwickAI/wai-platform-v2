import {
  Box,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useCreateElementMutation,
  useEditElementDataMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import { DataTypeKeys } from "../../utils/base_data_types";
import { DatabaseViewElementData } from "../../utils/base_element_types";
import {
  createDefaultData,
  createDefaultElementData,
  DataTypeKeysT,
  DataTypesDef,
  Element,
  ElementDataPiece,
  ElementTypeKeys,
} from "../../utils/config";
import GenericInput from "../Properties/GenericProperty";
import TextProperty from "../Properties/Text";

interface DatabaseViewProps {
  element: Element<DatabaseViewElementData>;
  isEdit: boolean;
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ element, isEdit }) => {
  const router = useRouter();
  const elementData = element.data as DatabaseViewElementData;

  const [databaseName, setDatabaseName] = useState<string>("");

  const [, editElement] = useEditElementDataMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseQuery }, fetchDatabase] = useGetElementQuery({
    variables: { elementId: elementData.database.value },
  });

  const addAttribute = async (attributeType: DataTypeKeysT) => {
    const newAttribute: any = {};
    newAttribute[makeid(5)] = createDefaultData(attributeType);

    await editElement({
      elementId: elementData.database.value,
      data: {
        attributes: {
          type: "DatabaseAttributeTypes",
          value: {
            ...databaseQuery?.getElement.data.attributes.value,
            ...newAttribute,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (databaseQuery?.getElement) {
      setDatabaseName(databaseQuery.getElement.data.title.value);
    }
  }, [databaseQuery]);

  const addRow = async () => {
    await createElement({
      index: 0,
      type: databaseQuery?.getElement.data.childrenBaseType
        .value as ElementTypeKeys,
      data: createDefaultElementData(
        databaseQuery?.getElement.data.childrenBaseType.value
      ),
      parent: elementData.database.value,
    });
  };
  return (
    <Box>
      {databaseQuery?.getElement &&
      databaseQuery?.getElement.type === "Database" ? (
        <Box>
          <TextProperty
            style={{
              w: 300,
              fontSize: 18,
              fontWeight: 300,
            }}
            size="md"
            value={databaseName}
            onChange={async (v) => {
              setDatabaseName(v);
              const newData: any = {};
              newData.title = {
                ...databaseQuery.getElement.data.title,
                value: v,
              };

              await editElement({
                elementId: databaseQuery.getElement.id,
                data: newData,
              });
            }}
            isEdit={isEdit}
          />
          <Box>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th>🔗</Th>
                  {Object.keys(
                    databaseQuery?.getElement.data.attributes.value
                  ).map((attributeName: string) => {
                    const attributeType =
                      databaseQuery?.getElement.data.attributes.value[
                        attributeName
                      ].type;
                    return (
                      <Th key={attributeName}>
                        {attributeName}-{attributeType}
                      </Th>
                    );
                  })}
                  <Th>
                    <Popover>
                      <PopoverTrigger>
                        <Button size={"sm"} variant="outline">
                          +
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverBody>
                          {DataTypeKeys.map((dataTypeKey: DataTypeKeysT) => {
                            return (
                              <Button
                                size={"sm"}
                                key={dataTypeKey}
                                variant="outline"
                                onClick={() => addAttribute(dataTypeKey)}
                              >
                                {DataTypesDef[dataTypeKey].label}
                              </Button>
                            );
                          })}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {databaseQuery?.getElement.children.map((row, rowIndex) => {
                  return (
                    <Tr key={row.id}>
                      <Td
                        onClick={() => router.push(`/generic/${row.id}`)}
                        _hover={{ cursor: "pointer" }}
                      >
                        ↗️
                      </Td>
                      {Object.keys(
                        databaseQuery?.getElement.data.attributes.value
                      ).map((attributeName: string) => {
                        const attribute = row.data[attributeName];
                        const attributeDefault =
                          databaseQuery?.getElement.data.attributes.value[
                            attributeName
                          ];
                        return (
                          <Td key={attributeName}>
                            <RowAttribute
                              element={row as Element<any>}
                              attribute={attribute ? attribute : attributeDefault}
                              attributeName={attributeName}
                              isEdit={isEdit}
                            />
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
                <Tr>
                  <Td>
                    <Button
                      size={"sm"}
                      variant="outline"
                      onClick={() => addRow()}
                    >
                      +
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      ) : (
        <Text>No Database Selected (select in settings)</Text>
      )}
    </Box>
  );
};

interface RowAttributeProps {
  attribute: ElementDataPiece<any>;
  attributeName: string;
  element: Element<any>;
  isEdit: boolean;
}

const RowAttribute: React.FC<RowAttributeProps> = (props) => {
  const [value, setValue] = useState<any>(props.attribute ? props.attribute.value : "");

  const [, editElement] = useEditElementDataMutation();

  return (
    <GenericInput
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

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default DatabaseView;
