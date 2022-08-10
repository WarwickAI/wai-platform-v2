import {
  ActionTypeKeys,
  ActionTypeValue,
  DatabaseAttributesValue,
  DatabaseBaseTypeValue,
  DatabaseValue,
  DataListValue,
  DataTypeKeysT,
  FormattedTextValue,
  ImageValue,
  NumberValue,
  PropertyLinkValue,
  TextValue,
} from "./base_data_types";
import { Element, ElementData, ElementDataPiece } from "./config";

export type ElementDataDef = {
  [key: string]: {
    type: DataTypeKeysT;
    label?: string;
    hint?: string;
    constraints?: {};
    defaultValue?: {};
    inSettings: boolean;
  };
};

type ElementTypeDef = {
  label: string;
  data: ElementDataDef;
};

export const ElementTypesDef = {
  Text: {
    label: "Formatted Text",
    data: {
      text: {
        type: "FormattedText",
        inSettings: false,
      },
    },
  } as ElementTypeDef,
  Page: {
    label: "Page",
    data: {
      title: {
        type: "Text",
        label: "Title",
        inSettings: true,
      },
      coverImg: {
        type: "Image",
        label: "Cover Image",
        inSettings: true,
      },
      iconImg: {
        type: "Image",
        label: "Icon Image",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  Button: {
    label: "Button",
    data: {
      text: {
        type: "Text",
        label: "Text",
        inSettings: true,
      },
      database: {
        type: "Database",
        label: "Database",
        inSettings: true,
      },
      action: {
        type: "ActionType",
        label: "Action",
        inSettings: true,
      },
      data: {
        type: "DataList",
        label: "Data",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  Database: {
    label: "Database",
    data: {
      title: {
        type: "Text",
        inSettings: false,
      },
      attributes: {
        type: "DatabaseAttributes",
        inSettings: false,
      },
      childrenBaseType: {
        type: "DatabaseBaseType",
        inSettings: false,
      },
    },
  } as ElementTypeDef,
  DatabaseView: {
    label: "Database View",
    data: {
      database: {
        type: "Database",
        label: "Database",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  Image: {
    label: "Image",
    data: {
      image: {
        type: "Image",
        label: "Image",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  PropertyLink: {
    label: "Property Link",
    data: {
      property: {
        type: "PropertyLink",
        label: "Property",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
};
const getKeys = <A extends object>(obj: A) => Object.keys(obj) as (keyof A)[];

const keys = getKeys(ElementTypesDef);

export type ElementTypeKeys = typeof keys[number];

export type TextElementData = {
  text: ElementDataPiece<FormattedTextValue>;
};

export type PageElementData = {
  title: ElementDataPiece<TextValue>;
  coverImg: ElementDataPiece<ImageValue>;
  iconImg: ElementDataPiece<ImageValue>;
};

export type ButtonElementData = {
  text: ElementDataPiece<TextValue>;
  database: ElementDataPiece<DatabaseValue>;
  action: ElementDataPiece<ActionTypeValue>;
  data: ElementDataPiece<DataListValue>;
};

export type DatabaseElementData = {
  title: ElementDataPiece<TextValue>;
  attributes: ElementDataPiece<DatabaseAttributesValue>;
  childrenBaseType: ElementDataPiece<DatabaseBaseTypeValue>;
};

export type DatabaseViewElementData = {
  database: ElementDataPiece<DatabaseValue>;
};

export type ImageElementData = {
  image: ElementDataPiece<ImageValue>;
};

export type PropertyLinkElementData = {
  property: ElementDataPiece<PropertyLinkValue>;
};