import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  useCreateElementMutation,
  useGetElementQuery,
} from "../../generated/graphql";
import "draft-js/dist/Draft.css";
import { ActionTypeKeys } from "../../utils/base_data_types";
import {
  createDefaultElementData,
  Element,
  ElementTypeKeys,
} from "../../utils/config";
import { ButtonElementData } from "../../utils/base_element_types";
import { useRouter } from "next/router";

interface ButtonProps {
  element: Element<ButtonElementData>;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = ({ element, isEdit }) => {
  const router = useRouter();

  const elementData = element.data as ButtonElementData;
  const [, createElement] = useCreateElementMutation();
  const [{ data: databaseElement }] = useGetElementQuery({
    variables: { elementId: elementData.database.value },
  });

  const handleStartSurvey = async () => {
    const { data } = await createElement({
      index: 0,
      type: databaseElement!.getElement.data.childrenBaseType
        .value as ElementTypeKeys,
      data: createDefaultElementData(
        databaseElement!.getElement.data.childrenBaseType.value
      ),
      parent: elementData.database.value,
    });

    return data?.createElement?.id;
  };

  return (
    <Box>
      <Button
        variant={"primary"}
        onClick={async () => {
          if (
            elementData.action.value === "StartSurvey" &&
            databaseElement?.getElement
          ) {
            const surveyElementId = await handleStartSurvey();
            if (surveyElementId) {
              router.push(`/generic/${surveyElementId}`);
            }
            return;
          }
          const database = databaseElement?.getElement;
          if (!database) {
            return;
          }
          await createElement({
            index: 0,
            type: database.data.childrenBaseType.value,
            data: {
              ...createDefaultElementData(database.data.childrenBaseType.value),
            },
            parent: database.id,
          });
        }}
      >
        {elementData.text.value}
      </Button>
    </Box>
  );
};

export default ButtonLink;
