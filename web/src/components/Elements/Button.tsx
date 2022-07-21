import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  useCreateElementMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import "draft-js/dist/Draft.css";
import { ActionTypeKeys } from "../../utils/base_data_types";
import { createDefaultElementData, Element } from "../../utils/config";
import { ButtonElementData } from "../../utils/base_element_types";

interface ButtonProps {
  element: Element<ButtonElementData>;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = ({ element, isEdit }) => {
  const elementData = element.data as ButtonElementData;
  const [action, setAction] = useState<ActionTypeKeys>(
    elementData.action.value
  );
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseElement }] = useGetElementQuery({
    variables: { elementId: elementData.database.value },
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
            type: database.data.contentBaseType.value,
            data: {
              ...createDefaultElementData(database.data.contentBaseType.value),
            },
            parent: database.id,
          });
        }}
      >
        Add To Database
      </Button>
    </Box>
  );
};

export default ButtonLink;
