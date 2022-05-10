import React from "react";
import Text from "./Text";
import { ElementType, useGetElementQuery } from "../../generated/graphql";
import {
  DatabaseElementType,
  DatabaseViewElementType,
  PageElementType,
  TextElementType,
} from "../../utils/elements";
import PageElement from "./PageElement";
import DatabaseView from "./DatabaseView";

interface MainProps {
  elementId: number;
}

const Main: React.FC<MainProps> = (props) => {
  const [{ data: element }] = useGetElementQuery({
    variables: { elementId: props.elementId },
  });
  if (!element) {
    return <>Loading...</>;
  }
  if (element.getElement.type === ElementType.Text) {
    return <Text element={element.getElement as TextElementType} />;
  }
  if (element.getElement.type === ElementType.Page) {
    return <PageElement element={element.getElement as PageElementType} />;
  }
  if (element.getElement.type === ElementType.DatabaseView) {
    return (
      <DatabaseView element={element.getElement as DatabaseViewElementType} />
    );
  }
  return <>No Element</>;
};

export default Main;
