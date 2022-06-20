import React, { useEffect, useState } from "react";
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
  SettingOptions,
} from "../../utils/elements";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";

interface ButtonProps {
  element: ElementTyper<ButtonElementProps>;
  refetchParent: () => void;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as ButtonElementProps;
  const [databaseId, setDatabaseId] = useState<number>(-1);
  const [action, setAction] = useState<ActionTypes>(elementProps.action.value);
  const [data, setData] = useState<any>(elementProps.data.value);
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseElement }, getDatabase] = useGetDatabaseQuery({
    variables: { databaseId: elementProps.databseId.value },
  });

  return (
    <Box>
      <Button
        onClick={async () => {
          const database = databaseElement?.getDatabase;
          if (!database) {
            return;
          }
          await createElement({
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
          props.refetchParent();
        }}
      >
        Do
      </Button>
    </Box>
  );
};

export default ButtonLink;
