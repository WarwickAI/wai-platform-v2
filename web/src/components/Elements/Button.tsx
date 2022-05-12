import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import {
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetDatabaseQuery,
} from "../../generated/graphql";
import {
  ActionTypes,
  ButtonElementProps,
  ElementDefaultProps,
  ElementTyper,
  PropertyTypes,
} from "../../utils/elements";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";

interface ButtonProps {
  element: ElementTyper<ButtonElementProps>;
}

const ButtonLink: React.FC<ButtonProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as ButtonElementProps;
  const [databaseId, setDatabaseId] = useState<number>(
    elementProps.databseId.value
  );
  const [action, setAction] = useState<ActionTypes>(elementProps.action.value);
  const [data, setData] = useState<any>(elementProps.data.value);
  const [, editElement] = useEditElementPropsMutation();
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseElement }, getDatabase] = useGetDatabaseQuery({
    variables: { databaseId: databaseId },
  });

  return (
    <Box>
      <Input
        value={databaseId}
        w={150}
        onChange={async (e) => {
          setDatabaseId(parseInt(e.target.value));
          await editElement({
            elementId: props.element.id,
            props: {
              databaseId: {
                type: PropertyTypes.Number,
                value: parseInt(e.target.value),
              },
            },
          });
          getDatabase();
        }}
      />
      <Input
        value={data}
        w={150}
        onChange={(e) => {
          setData(e.target.value);
          editElement({
            elementId: props.element.id,
            props: {
              data: {
                type: PropertyTypes.DataList,
                value: e.target.value,
              },
            },
          });
        }}
      />
      <Button
        onClick={async () => {
          const database = databaseElement?.getDatabase;
          if (!database) {
            return;
          }
          const newElement = await createElement({
            index: 0,
            type: database.props.contentBaseType.value,
            props: {
              ...ElementDefaultProps[
                database.props.contentBaseType.value as ElementType
              ],
              title: {
                type: PropertyTypes.Text,
                value: "ADDED",
              },
            },
            parent: database.id,
          });
        }}
      >
        Do
      </Button>
    </Box>
  );
};

export default ButtonLink;
