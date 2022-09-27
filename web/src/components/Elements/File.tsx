import React from "react";
import { Element } from "../../utils/config";
import { FileElementData } from "../../utils/base_element_types";
import { useEditElementDataMutation } from "../../generated/graphql";
import FileProperty from "../Properties/File";

interface FileProps {
  element: Element<FileElementData>;
  isEdit: boolean;
}

const File: React.FC<FileProps> = (props) => {
  const elementProps = props.element.data as FileElementData;

  const [, editElement] = useEditElementDataMutation();

  return (
    <FileProperty
      value={elementProps.file.value}
      onChange={(file) => {
        editElement({
          elementId: props.element.id,
          data: {
            file: {
              type: "File",
              value: file,
            },
          },
        });
      }}
      isEdit={props.isEdit}
    />
  );
};

export default File;
