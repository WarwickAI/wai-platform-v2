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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  Element,
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetDatabaseQuery,
  useGetElementQuery,
  useGetElementsQuery,
} from "../../generated/graphql";
import {
  DatabaseElementProps,
  DatabaseViewElementProps,
  ElementDefaultProps,
  ElementTyper,
  PropertyTypes,
} from "../../utils/elements";

interface DatabaseViewProps {
  element: ElementTyper<DatabaseViewElementProps>;
  isEdit: boolean;
  refreshDatabaseId: number | undefined;
  refreshDatabase: (id: number | undefined) => void;
}

const DatabaseView: React.FC<DatabaseViewProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as DatabaseViewElementProps;

  const [, editElement] = useEditElementPropsMutation();
  const [, createElement] = useCreateElementMutation();
  // const [{ data: databaseQuery }, getDatabase] = useGetDatabaseQuery({
  //   variables: {
  //     databaseId: elementProps.databaseId.value,
  //   },
  // });
  const [{ data: databaseQuery }] = useGetElementQuery({
    variables: { elementId: elementProps.databaseId.value },
  });

  const addAttribute = async (attributeType: PropertyTypes) => {
    const newAttribute: any = {};
    newAttribute[makeid(5)] = {
      type: attributeType,
      value: attributeType === PropertyTypes.Text ? "" : 0,
    };
    const editedDatabase = await editElement({
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

  const addRow = async () => {
    const editedDatabase = await createElement({
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
        databaseQuery?.getElement.type === ElementType.Database && (
          <Box>
            <Heading>{databaseQuery?.getElement.props.title.value}</Heading>
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
                          const attributeType =
                            databaseQuery?.getElement.props.attributes.value[
                              attributeName
                            ].type;
                          const rowAttribute = row.props[attributeName]
                            ? row.props[attributeName].value
                            : "";
                          if (
                            attributeType === PropertyTypes.Text ||
                            attributeType === PropertyTypes.Url
                          ) {
                            return (
                              <Td key={attributeName}>
                                <Input
                                  value={rowAttribute}
                                  w={150}
                                  onChange={async (e) => {
                                    const newProps: any = {};
                                    newProps[attributeName] = {
                                      type: attributeType,
                                      value: e.target.value,
                                    };
                                    const res = await editElement({
                                      elementId: row.id,
                                      props: newProps,
                                    });
                                    // if (res.data?.editElementProps) {
                                    //   const newContent = database.content;
                                    //   newContent[rowIndex] = res.data
                                    //     ?.editElementProps as Element;
                                    //   setUpdatedDatabase({
                                    //     ...database,
                                    //     content: newContent,
                                    //   });
                                    // }
                                  }}
                                />
                              </Td>
                            );
                          } else {
                            return <Td key={attributeName}>OH-NO!!!</Td>;
                          }
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
        )}
    </Box>
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
