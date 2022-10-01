import React from "react";
import Text from "./Text";
import { useGetElementQuery } from "../../generated/graphql";
import DatabaseView from "./DatabaseView";
import DataLink from "./DataLink";
import Button from "./Button";
import Page from "./Page";
import { Element } from "../../utils/config";
import {
  DatabaseViewElementData,
  PageElementData,
  TextElementData,
  DataLinkElementData,
  ButtonElementData,
  ImageElementData,
  FileElementData,
} from "../../utils/base_element_types";
import Image from "./Image";
import File from "./File";

interface GenericElementProps {
  element: Element<any>;
  isEdit: boolean;
}

const GenericElement: React.FC<GenericElementProps> = (props) => {
  const element = props.element;
  if (!element) {
    return <>Loading...</>;
  }
  if (element.type === "Text") {
    return (
      <Text
        element={element as Element<TextElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.type === "Page") {
    return (
      <Page
        element={element as Element<PageElementData>}
        isEdit={props.isEdit}
        isFullPage={false}
      />
    );
  }
  if (element.type === "DatabaseView") {
    return (
      <DatabaseView
        element={element as Element<DatabaseViewElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.type === "Button") {
    return (
      <Button
        element={element as Element<ButtonElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.type === "DataLink") {
    return (
      <DataLink
        element={element as Element<DataLinkElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.type === "Image") {
    return (
      <Image
        element={element as Element<ImageElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.type === "File") {
    return (
      <File
        element={element as Element<FileElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  return <>No Element - {element.type}</>;
};

export default GenericElement;
