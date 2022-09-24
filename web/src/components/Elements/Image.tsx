import React from "react";
import { Element } from "../../utils/config";
import { ImageElementData } from "../../utils/base_element_types";
import { useEditElementDataMutation } from "../../generated/graphql";
import ImageProperty from "../Properties/Image";

interface ImageProps {
  element: Element<ImageElementData>;
  isEdit: boolean;
}

const Image: React.FC<ImageProps> = (props) => {
  const elementProps = props.element.data as ImageElementData;

  const [, editElement] = useEditElementDataMutation();

  return (
    <ImageProperty
      value={elementProps.image.value}
      onChange={(image) => {
        editElement({
          elementId: props.element.id,
          data: {
            image: {
              type: "Image",
              value: image,
            },
          },
        });
      }}
      isEdit={props.isEdit}
    />
  );
};

export default Image;
