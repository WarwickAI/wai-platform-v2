import React, { useMemo } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  useGetElementQuery,
  useHandleActionMutation,
  useMeQuery,
} from "../../generated/graphql";
import "draft-js/dist/Draft.css";
import { Element } from "../../utils/config";
import {
  ButtonElementData,
  DatabaseElementData,
  SurveyElementData,
} from "../../utils/base_element_types";
import { useRouter } from "next/router";

interface ButtonProps {
  element: Element<ButtonElementData>;
  isEdit: boolean;
}

const ButtonLink: React.FC<ButtonProps> = ({ element, isEdit }) => {
  const router = useRouter();

  const elementData = element.data as ButtonElementData;
  const [, handleAction] = useHandleActionMutation();

  const [{ data: userData }] = useMeQuery();

  const [{ data: databaseData }] = useGetElementQuery({
    variables: {
      elementId: elementData.database.value,
    },
  });

  const buttonState = useMemo(() => {
    const database = databaseData?.getElement as
      | Element<DatabaseElementData>
      | undefined;
    if (!database) {
      return {
        text: "Loading...",
        disabled: true,
      };
    }

    const user = userData?.me;
    if (!user) {
      return {
        text: "Need to login",
        disabled: true,
      };
    }

    if (elementData.action.value === "Add") {
      return {
        text: elementData.text.value,
        disabled: false,
      };
    }

    if (elementData.action.value === "StartSurvey") {
      // See if the user already has a response
      const response = database.children.find(
        (child) =>
          (child as Element<SurveyElementData>).data.user.value === user.id
      );

      if (response) {
        return {
          text: "Continue Survey",
          disabled: false,
          link: `/generic/${response.id}`,
        };
      } else {
        return {
          text: elementData.text.value,
          disabled: false,
        };
      }
    }

    return {
      text: "Unknown Action",
      disabled: true,
    };
  }, [databaseData, elementData, userData]);

  return (
    <Box>
      <Button
        variant={"primary"}
        onClick={async () => {
          if (
            elementData.action.value === "Add" ||
            elementData.action.value === "StartSurvey"
          ) {
            if (buttonState.link) {
              router.push(buttonState.link);
              return;
            }

            const newElement = await handleAction({
              buttonId: element.id,
            });
            if (newElement.data?.handleAction) {
              router.push(`/generic/${newElement.data?.handleAction.id}`);
            }
            return;
          }
        }}
        disabled={buttonState.disabled}
      >
        {buttonState.text}
      </Button>
    </Box>
  );
};

export default ButtonLink;
