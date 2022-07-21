import React from "react";
import Text from "./Text";
import { useGetElementQuery } from "../../generated/graphql";
import DatabaseView from "./DatabaseView";
import PropertyLink from "./PropertyLink";
import Button from "./Button";
import Page from "./Page";
import { Element } from "../../utils/config";
import {
  DatabaseViewElementData,
  PageElementData,
  TextElementData,
  PropertyLinkElementData,
  ButtonElementData,
} from "../../utils/base_element_types";

interface MainProps {
  elementId: number;
  isEdit: boolean;
}

const Main: React.FC<MainProps> = (props) => {
  const [{ data: element }] = useGetElementQuery({
    variables: { elementId: props.elementId },
  });
  if (!element) {
    return <>Loading...</>;
  }
  if (element.getElement.type === "Text") {
    return (
      <Text
        element={element.getElement as Element<TextElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === "Page") {
    return (
      <Page
        element={element.getElement as Element<PageElementData>}
        isEdit={props.isEdit}
        isFullPage={false}
      />
    );
  }
  if (element.getElement.type === "DatabaseView") {
    return (
      <DatabaseView
        element={element.getElement as Element<DatabaseViewElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === "Button") {
    return (
      <Button
        element={element.getElement as Element<ButtonElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === "PropertyLink") {
    return (
      <PropertyLink
        element={element.getElement as Element<PropertyLinkElementData>}
        isEdit={props.isEdit}
      />
    );
  }
  return <>No Element</>;
};

export default Main;
