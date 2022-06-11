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
import React, { useRef, useState } from "react";
import {
  Element,
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetDatabaseQuery,
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
}

const DatabaseView: React.FC<DatabaseViewProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as DatabaseViewElementProps;

  const editorRef = useRef(null);

  const [databaseId, setDatabaseId] = useState<number>(
    elementProps.databaseId ? elementProps.databaseId.value : 0
  );
  const [updatedDatabase, setUpdatedDatabase] = useState<
    ElementTyper<DatabaseElementProps> | undefined
  >();

  const [, editElement] = useEditElementPropsMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseQuery }, getDatabase] = useGetDatabaseQuery({
    variables: {
      databaseId: elementProps.databaseId.value,
    },
  });

  const database = updatedDatabase
    ? updatedDatabase
    : (databaseQuery?.getDatabase as ElementTyper<DatabaseElementProps>);

  const addAttribute = async (attributeType: PropertyTypes) => {
    const newAttribute: any = {};
    newAttribute[makeid(5)] = {
      type: attributeType,
      value: attributeType === PropertyTypes.Text ? "" : 0,
    };
    const editedDatabase = await editElement({
      elementId: databaseId,
      props: {
        attributes: {
          type: PropertyTypes.PropertyList,
          value: {
            ...database?.props.attributes.value,
            ...newAttribute,
          },
        },
      },
    });
    getDatabase();
  };

  const addRow = async () => {
    const editedDatabase = await createElement({
      index: 0,
      type: database?.props.contentBaseType.value,
      props:
        ElementDefaultProps[
          database?.props.contentBaseType.value as ElementType
        ],
      parent: databaseId,
    });
    getDatabase();
  };

  return (
    <Box>
      <Input
        value={databaseId}
        w={150}
        onChange={(e) => {
          setDatabaseId(parseInt(e.target.value));
          editElement({
            elementId: props.element.id,
            props: {
              databaseId: {
                type: PropertyTypes.Number,
                value: parseInt(e.target.value),
              },
            },
          });
        }}
      />
      {database && (
        <Box>
          <Heading>{database.props.title.value}</Heading>
          <Box>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th>🔗</Th>
                  {Object.keys(database.props.attributes.value).map(
                    (attributeName: string) => {
                      const attributeType =
                        database.props.attributes.value[attributeName].type;
                      return (
                        <Th key={attributeName}>
                          {attributeName}-{attributeType}
                        </Th>
                      );
                    }
                  )}
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
                {database.content.map((row, rowIndex) => {
                  return (
                    <Tr key={row.id}>
                      <Td
                        onClick={() => router.push(`/generic/${row.id}`)}
                        _hover={{ cursor: "pointer" }}
                      >
                        ↗️
                      </Td>
                      {Object.keys(database.props.attributes.value).map(
                        (attributeName: string) => {
                          const attributeType =
                            database.props.attributes.value[attributeName].type;
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
                                    if (res.data?.editElementProps) {
                                      const newContent = database.content;
                                      newContent[rowIndex] = res.data
                                        ?.editElementProps as Element;
                                      setUpdatedDatabase({
                                        ...database,
                                        content: newContent,
                                      });
                                    }
                                  }}
                                />
                              </Td>
                            );
                          } else {
                            return <Td key={attributeName}>OH-NO!!!</Td>;
                          }
                        }
                      )}
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
