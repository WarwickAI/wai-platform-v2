import {
  Box,
  Heading,
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
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetElementQuery,
  Element,
} from "../../generated/graphql";
import {
  DatabaseElementProps,
  DatabaseViewElementProps,
  ElementDefaultProps,
  ElementTyper,
  Property,
  PropertyTypes,
} from "../../utils/elements";
import GenericInput from "./GenericInput";

interface DatabaseViewProps {
  element: ElementTyper<DatabaseViewElementProps>;
  isEdit: boolean;
  refreshDatabaseId: number | undefined;
  refreshDatabase: (id: number | undefined) => void;
}

const DatabaseView: React.FC<DatabaseViewProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as DatabaseViewElementProps;

  const [databaseName, setDatabaseName] = useState<string>("");

  const [, editElement] = useEditElementPropsMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseQuery }] = useGetElementQuery({
    variables: { elementId: elementProps.databaseId.value },
  });

  const addAttribute = async (attributeType: PropertyTypes) => {
    const newAttribute: any = {};
    newAttribute[makeid(5)] = {
      type: attributeType,
      value: attributeType === PropertyTypes.Text ? "" : 0,
    };
    await editElement({
      elementId: elementProps.databaseId.value,
      props: {
        attributes: {
          type: PropertyTypes.PropertyList,
          value: {
            ...databaseQuery?.getElement.props.attributes.value,
            ...newAttribute,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (databaseQuery?.getElement) {
      setDatabaseName(databaseQuery.getElement.props.title.value);
    }
  }, [databaseQuery]);

  const addRow = async () => {
    await createElement({
      index: 0,
      type: databaseQuery?.getElement.props.contentBaseType.value,
      props:
        ElementDefaultProps[
          databaseQuery?.getElement.props.contentBaseType.value as ElementType
        ],
      parent: elementProps.databaseId.value,
    });
  };

  return (
    <Box>
      {databaseQuery?.getElement &&
      databaseQuery?.getElement.type === ElementType.Database ? (
        <Box>
          <Input
            w={300}
            size="md"
            fontSize={18}
            fontWeight={600}
            value={databaseName}
            onChange={async (e) => {
              setDatabaseName(e.target.value);
              const newProps: any = {};
              newProps.title = {
                ...databaseQuery.getElement.props.title,
                value: e.target.value,
              };

              await editElement({
                elementId: databaseQuery.getElement.id,
                props: newProps,
              });
            }}
          />
          <Box>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th>🔗</Th>
                  {Object.keys(
                    databaseQuery?.getElement.props.attributes.value
                  ).map((attributeName: string) => {
                    const attributeType =
                      databaseQuery?.getElement.props.attributes.value[
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
                          {Object.keys(PropertyTypes).map((type) => {
                            if (isNaN(type as any)) {
                              return (
                                <Button
                                  size={"sm"}
                                  key={type}
                                  variant="outline"
                                  onClick={() =>
                                    // @ts-ignore
                                    addAttribute(PropertyTypes[type])
                                  }
                                >
                                  {type}
                                </Button>
                              );
                            } else {
                              return <div key={type}></div>;
                            }
                          })}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {databaseQuery?.getElement.content.map((row, rowIndex) => {
                  return (
                    <Tr key={row.id}>
                      <Td
                        onClick={() => router.push(`/generic/${row.id}`)}
                        _hover={{ cursor: "pointer" }}
                      >
                        ↗️
                      </Td>
                      {Object.keys(
                        databaseQuery?.getElement.props.attributes.value
                      ).map((attributeName: string) => {
                        const attribute = row.props[attributeName];
                        return (
                          <Td key={attributeName}>
                            <RowAttribute
                              element={row as Element}
                              prop={attribute}
                              propName={attributeName}
                              refreshDatabase={() =>
                                props.refreshDatabase(
                                  databaseQuery.getElement.id
                                )
                              }
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
  prop: Property;
  propName: string;
  element: Element;
  refreshDatabase: () => void;
}

const RowAttribute: React.FC<RowAttributeProps> = (props) => {
  const [value, setValue] = useState<any>(props.prop.value);

  const [, editElement] = useEditElementPropsMutation();

  return (
    <GenericInput
      element={props.element}
      value={value}
      type={props.prop.type}
      onChange={async (v) => {
        setValue(v);
        const newProps: any = {};
        newProps[props.propName] = {
          ...props.prop,
          value: v,
        };

        await editElement({
          elementId: props.element.id,
          props: newProps,
        });
        props.refreshDatabase();
      }}
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
