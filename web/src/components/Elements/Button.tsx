import React from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  useGetElementQuery,
  useHandleAcitonMutation,
} from "../../generated/graphql";
import "draft-js/dist/Draft.css";
import { Element } from "../../utils/config";
import { ButtonElementData } from "../../utils/base_element_types";
import { useRouter } from "next/router";

interface ButtonProps {
  element: Element<ButtonElementData>;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = ({ element, isEdit }) => {
  const router = useRouter();

  const elementData = element.data as ButtonElementData;
  const [, handleAction] = useHandleAcitonMutation();

  return (
    <Box>
      <Button
        variant={"primary"}
        onClick={async () => {
          if (
            elementData.action.value === "Add" ||
            elementData.action.value === "StartSurvey"
          ) {
            const newElement = await handleAction({
              buttonId: element.id,
            });
            if (newElement.data?.handleAction) {
              router.push(`/generic/${newElement.data?.handleAction.id}`);
            }
            return;
          }
        }}
      >
        {elementData.text.value}
      </Button>
    </Box>
  );
};

export default ButtonLink;
