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
  DatabaseAttributeTypes,
  DatabaseElementType,
  DatabaseViewElementType,
  ElementDefaultProps,
} from "../../utils/elements";

interface DatabaseViewProps {
  element: DatabaseViewElementType;
}

const DatabaseView: React.FC<DatabaseViewProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props;

  const editorRef = useRef(null);

  const [databaseId, setDatabaseId] = useState<number>(elementProps.databaseId);
  const [updatedDatabase, setUpdatedDatabase] = useState<
    DatabaseElementType | undefined
  >();

  const [, editElement] = useEditElementPropsMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseQuery }] = useGetDatabaseQuery({
    variables: {
      databaseId: elementProps.databaseId,
    },
  });

  const database = updatedDatabase
    ? updatedDatabase
    : (databaseQuery?.getDatabase as DatabaseElementType);

  const addAttribute = async (attributeType: string) => {
    const newAttribute: { [key: string]: string } = {};
    newAttribute[makeid(5)] = attributeType;
    const editedDatabase = await editElement({
      elementId: databaseId,
      props: {
        attributes: {
          ...database?.props.attributes,
          ...newAttribute,
        },
      },
    });
    if (editedDatabase.data?.editElementProps) {
      setUpdatedDatabase(
        editedDatabase.data.editElementProps as DatabaseElementType
      );
    }
  };

  const addRow = async () => {
    const editedDatabase = await createElement({
      index: 0,
      type: database?.props.contentBaseType,
      props:
        ElementDefaultProps[database?.props.contentBaseType as ElementType],
      parent: databaseId,
    });

    if (editedDatabase.data?.createElement) {
      setUpdatedDatabase({
        ...database,
        content: [
          ...database.content,
          editedDatabase.data.createElement as Element,
        ],
      });
    }
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
            props: { databaseId: parseInt(e.target.value) },
          });
        }}
      />
      {database && (
        <Box>
          <Heading>{database.props.title}</Heading>
          <Box>
            <Table variant={"simple"}>
              <Thead>
                <Tr>
                  <Th>🔗</Th>
                  {Object.keys(database.props.attributes).map(
                    (attributeName: string) => {
                      const attributeType =
                        database.props.attributes[attributeName];
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
                          {DatabaseAttributeTypes.map((type) => {
                            return (
                              <Button
                                size={"sm"}
                                key={type}
                                variant="outline"
                                onClick={() => addAttribute(type)}
                              >
                                {type}
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
                {database.content.map((row) => {
                  return (
                    <Tr key={row.id}>
                      <Td
                        onClick={() => router.push(`/generic/${row.id}`)}
                        _hover={{ cursor: "pointer" }}
                      >
                        ↗️
                      </Td>
                      {Object.keys(database.props.attributes).map(
                        (attributeName: string) => {
                          const attributeType =
                            database.props.attributes[attributeName];
                          const rowAttribute = row.props[attributeName];
                          if (attributeType === "string") {
                            return (
                              <Td key={attributeName}>
                                <Input
                                  value={rowAttribute}
                                  w={150}
                                  onChange={(e) => {
                                    const newProps: any = {};
                                    newProps[attributeName] = e.target.value;
                                    editElement({
                                      elementId: row.id,
                                      props: newProps,
                                    });
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
