import { Element, ElementType } from "../generated/graphql";

export interface ElementBase {
  attributes: {
    [key: string]: string;
  };
}

export type TextElementProps = ElementBase & {
  text: string;
};

export type TextElementType = Element & {
  props: TextElementProps;
};

export type PageElementProps = ElementBase & {
  title: string;
};

export type PageElementType = Element & {
  props: PageElementProps;
};

export type DatabaseElementProps = ElementBase & {
  title: string;
  attributes: {
    [key: string]: string;
  };
  contentBaseType: ElementType;
};

export type DatabaseElementType = Element & {
  props: DatabaseElementProps;
};

export type DatabaseViewElementProps = ElementBase & {
  databaseId: number;
};

export type DatabaseViewElementType = Element & {
  props: DatabaseViewElementProps;
};

export const ElementDefaultProps: { [key in ElementType]: any } = {
  Text: {
    text: "",
    attributes: {},
  } as const,
  Page: {
    title: "Page title",
    coverImg: "",
    iconImg: "",
    attributes: {},
  },
  Database: {
    title: "Database title",
    attributes: {
      name: "string",
    },
    contentBaseType: ElementType.Page,
  },
  DatabaseView: {
    attributes: {},
  },
};

export const DatabaseAttributeTypes: string[] = ["string", "number", "boolean"];
