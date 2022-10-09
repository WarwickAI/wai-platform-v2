import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { DatabaseElementData } from "../../../../utils/base_element_types";
import { DataTypeKeysT, Element } from "../../../../utils/config";
import TextProperty from "../../../Properties/Text";
import AttributeHeader, { AddAttributeHeader } from "./AttributeHeader";
import Row from "./Row";
import { AddIcon } from "@chakra-ui/icons";
import { useGetUsersQuery } from "../../../../generated/graphql";

interface TableViewProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  rows: Element<any>[];
  editDatabaseName: (name: string) => void;
  removeAttribute: (attribute: string) => void;
  addAttribute: (attribute: string, type: DataTypeKeysT) => void;
  modifyAttributeName: (attribute: string, newName: string) => void;
  modifyAttributeDefaultValue: (attribute: string, defaultValue: any) => void;
  addRow: (index: number) => void;
  removeRow: (elementId: number) => void;
}

const TableView: React.FC<TableViewProps> = (props) => {
  const [databaseName, setDatabaseName] = useState<string>(
    props.database.data.title.value
  );

  const isUserDatabase = props.database.data.childrenBaseType.value === "User";

  const [{ data: usersData }] = useGetUsersQuery({
    pause: !isUserDatabase || !props.isEdit,
  });

  const users = useMemo(() => {
    if (!isUserDatabase) {
      return [];
    }
    if (!usersData?.getUsers) {
      return [];
    }

    return usersData.getUsers.filter(
      (u) => props.rows.findIndex((r) => r.data.user.value === u.id) !== -1
    );
  }, [usersData, isUserDatabase, props.rows]);

  const copyEmails = () => {
    const emails: string[] = [];
    users.forEach((user) => {
      emails.push(user.email);
    });

    var csvString: string = "";

    emails.forEach((email) => {
      csvString += `${email},`;
    });

    if (csvString.length > 0) {
      csvString = csvString.slice(0, -1);
    }

    navigator.clipboard.writeText(csvString);
  };

  useEffect(() => {
    setDatabaseName(props.database.data.title.value);
  }, [props.database.data.title.value]);

  return (
    <Box>
      {/* Database Title */}
      <HStack>
        <TextProperty
          value={databaseName}
          onChange={async (v) => {
            setDatabaseName(v);
            props.editDatabaseName(v);
          }}
          isEdit={props.isEdit}
        />
        {isUserDatabase && props.isEdit && (
          <Button variant={"admin"} size={"sm"} onClick={copyEmails}>
            <Tooltip label="Copy User Emails (CSV)">📋</Tooltip>
          </Button>
        )}
      </HStack>
      <Box>
        <Table variant={"simple"}>
          {/* Database Headers */}
          <Thead>
            <Tr>
              <Th>🔗</Th>
              {Object.keys(props.database.data.attributes.value).map((name) => (
                <AttributeHeader
                  key={name}
                  database={props.database}
                  isEdit={props.isEdit}
                  name={name}
                  attribute={props.database.data.attributes.value[name]}
                  removeAttribute={props.removeAttribute}
                  modifyAttributeName={props.modifyAttributeName}
                  modifyAttributeDefaultValue={
                    props.modifyAttributeDefaultValue
                  }
                />
              ))}
              {props.isEdit && (
                <Th>
                  <AddAttributeHeader addAttribute={props.addAttribute} />
                </Th>
              )}
            </Tr>
          </Thead>
          {/* Database Children */}
          <Tbody>
            {props.rows.map((row) => {
              return (
                <Row
                  key={row.id}
                  database={props.database}
                  element={row as Element<any>}
                  addElement={props.addRow}
                  removeElement={(id) => props.removeRow(id)}
                  isEdit={props.isEdit}
                />
              );
            })}
            {props.isEdit && props.rows.length === 0 && (
              <Tr>
                <Td>
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
                    onClick={() => props.addRow(0)}
                  >
                    <AddIcon />
                  </Box>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TableView;
