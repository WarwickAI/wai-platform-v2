import React from "react";
import Text from "./Text";
import { ElementType, useGetElementQuery } from "../../generated/graphql";
import {
  ButtonElementProps,
  DatabaseViewElementProps,
  ElementTyper,
  PageElementProps,
  PropertyLinkElementProps,
  TextElementProps,
} from "../../utils/elements";
import DatabaseView from "./DatabaseView";
import PropertyLink from "./PropertyLink";
import Button from "./Button";
import Page from "./Page";

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
  if (element.getElement.type === ElementType.Text) {
    return (
      <Text
        element={element.getElement as ElementTyper<TextElementProps>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === ElementType.Page) {
    return (
      <Page
        element={element.getElement as ElementTyper<PageElementProps>}
        isEdit={props.isEdit}
        isFullPage={false}
      />
    );
  }
  if (element.getElement.type === ElementType.DatabaseView) {
    return (
      <DatabaseView
        element={element.getElement as ElementTyper<DatabaseViewElementProps>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === ElementType.PropertyLink) {
    return (
      <PropertyLink
        element={element.getElement as ElementTyper<PropertyLinkElementProps>}
        isEdit={props.isEdit}
      />
    );
  }
  if (element.getElement.type === ElementType.Button) {
    return (
      <Button
        element={element.getElement as ElementTyper<ButtonElementProps>}
        isEdit={props.isEdit}
      />
    );
  }
  return <>No Element</>;
};

export default Main;
