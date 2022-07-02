import React, { useEffect, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import {
  ElementType,
  useCreateElementMutation,
  useEditElementPropsMutation,
  useGetDatabaseQuery,
  useGetElementQuery,
} from "../../generated/graphql";
import {
  ActionTypes,
  ButtonElementProps,
  createDefaultElementProps,
  ElementTyper,
  PropertyTypes,
} from "../../utils/elements";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/router";

interface ButtonProps {
  element: ElementTyper<ButtonElementProps>;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = (props) => {
  const router = useRouter();
  const elementProps = props.element.props as ButtonElementProps;
  const [databaseId, setDatabaseId] = useState<number>(-1);
  const [action, setAction] = useState<ActionTypes>(elementProps.action.value);
  const [data, setData] = useState<any>(elementProps.data.value);
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseElement }] = useGetElementQuery({
    variables: { elementId: elementProps.databaseId.value },
  });

  return (
    <Box>
      <Button
        variant={"primary"}
        onClick={async () => {
          const database = databaseElement?.getElement;
          if (!database) {
            return;
          }
          await createElement({
            index: 0,
            type: database.props.contentBaseType.value,
            props: {
              ...createDefaultElementProps(
                database.props.contentBaseType.value
              ),
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
