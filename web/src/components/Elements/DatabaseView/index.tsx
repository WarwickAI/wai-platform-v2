import { Box, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useCreateElementMutation,
  useEditDatabaseAttributeNameMutation,
  useEditElementDataMutation,
  useGetElementQuery,
  useMeQuery,
  User,
  useRemoveElementMutation,
} from "../../../generated/graphql";
import {
  DatabaseElementData,
  DatabaseViewElementData,
} from "../../../utils/base_element_types";
import {
  createDefaultData,
  createDefaultElementData,
  DataTypeKeysT,
  Element,
  ElementTypeKeys,
  ElementTypesDef,
} from "../../../utils/config";
import { checkPermissions } from "../../../utils/isAuth";
import CardView from "./CardView";
import TableView from "./TableView";

interface DatabaseViewProps {
  element: Element<DatabaseViewElementData>;
  isEdit: boolean;
}

const DatabaseView: React.FC<DatabaseViewProps> = ({ element, isEdit }) => {
  const elementData = element.data as DatabaseViewElementData;

  const [, editElement] = useEditElementDataMutation();
  const [, editAttributeName] = useEditDatabaseAttributeNameMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseQuery }, fetchDatabase] = useGetElementQuery({
    variables: { elementId: elementData.database.value },
  });
  const [, removeElement] = useRemoveElementMutation();
  const [{ data: meData }] = useMeQuery();

  const database: Element<DatabaseElementData> | undefined = useMemo(() => {
    if (
      databaseQuery?.getElement &&
      databaseQuery?.getElement.type === "Database"
    ) {
      return databaseQuery.getElement as Element<DatabaseElementData>;
    }
    return undefined;
  }, [databaseQuery?.getElement]);

  const rows: Element<any>[] = useMemo(() => {
    if (database) {
      return (database.children as Element<any>[])
        .sort((a, b) => a.index - b.index)
        .filter((item) =>
          checkPermissions(item.canViewGroups, meData?.me as User | undefined)
        );
    }
    return [];
  }, [database, meData]);

  const addAttribute = async (name: string, attributeType: DataTypeKeysT) => {
    if (!database) {
      return;
    }

    // If the name exists as an attribute already (or is small), generate name
    if (
      Object.keys(database.data.attributes).includes(name) ||
      name.length < 3
    ) {
      name = makeid(5);
    }

    const newAttribute: any = {};
    newAttribute[name] = createDefaultData(attributeType);

    await editElement({
      elementId: elementData.database.value,
      data: {
        attributes: {
          type: "DatabaseAttributeTypes",
          value: {
            ...database.data.attributes.value,
            ...newAttribute,
          },
        },
      },
    });
  };

  const removeAttribute = async (name: string) => {
    if (!database) {
      return;
    }

    // If the name is a mandotary attribute, don't remove it
    if (
      ElementTypesDef[database.data.childrenBaseType.value as ElementTypeKeys]
        .data[name]
    ) {
      return;
    }

    const newAttributes: any = database.data.attributes.value;
    delete newAttributes[name];

    await editElement({
      elementId: elementData.database.value,
      data: {
        attributes: {
          type: "DatabaseAttributeTypes",
          value: newAttributes,
        },
      },
    });
  };

  const modifyAttributeName = async (oldName: string, newName: string) => {
    if (!database || oldName === newName) {
      return;
    }

    if (
      ElementTypesDef[database.data.childrenBaseType.value as ElementTypeKeys]
        .data[oldName]
    ) {
      return;
    }

    // If the name exists as an attribute already (or is small), generate name
    if (
      Object.keys(database.data.attributes).includes(newName) ||
      newName.length < 3
    ) {
      newName = makeid(5);
    }

    editAttributeName({
      elementId: elementData.database.value,
      attributeName: oldName,
      newAttributeName: newName,
    });
  };

  const addRow = async (atIndex: number) => {
    await createElement({
      index: atIndex,
      type: databaseQuery?.getElement.data.childrenBaseType
        .value as ElementTypeKeys,
      data: createDefaultElementData(
        databaseQuery?.getElement.data.childrenBaseType.value
      ),
      parent: elementData.database.value,
    });
  };

  const editDbName = async (newName: string) => {
    if (!database) {
      return;
    }
    const newData: any = {};
    newData.title = {
      ...database.data.title,
      value: newName,
    };

    await editElement({
      elementId: database.id,
      data: newData,
    });
  };

  return (
    <Box>
      {database ? (
        <>
          {elementData.view.value === "List" && (
            <TableView
              database={database}
              rows={rows}
              isEdit={isEdit}
              addAttribute={addAttribute}
              removeAttribute={removeAttribute}
              modifyAttributeName={modifyAttributeName}
              addRow={addRow}
              editDatabaseName={editDbName}
              removeRow={(id: number) => removeElement({ elementId: id })}
            />
          )}
          {elementData.view.value === "Card" && (
            <CardView
              database={database}
              rows={rows}
              isEdit={isEdit}
              addRow={addRow}
              removeRow={(id: number) => removeElement({ elementId: id })}
            />
          )}
        </>
      ) : (
        <Text>No Database Selected (select in settings)</Text>
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
