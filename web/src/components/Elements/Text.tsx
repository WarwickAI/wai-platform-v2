import React from "react";
import { Element } from "../../utils/config";
import { TextElementData } from "../../utils/base_element_types";
import { useEditElementDataMutation } from "../../generated/graphql";
import FormattedText from "../Properties/FormattedText";

interface TextProps {
  element: Element<TextElementData>;
  isEdit: boolean;
}

const Text: React.FC<TextProps> = (props) => {
  const elementProps = props.element.data as TextElementData;

  const [, editElement] = useEditElementDataMutation();

  return (
    <FormattedText
      value={elementProps.text.value}
      onChange={(text) => {
        editElement({
          elementId: props.element.id,
          data: {
            text: {
              type: "FormattedText",
              value: text,
            },
          },
        });
      }}
      isEdit={props.isEdit}
    />
  );
};

export default Text;
