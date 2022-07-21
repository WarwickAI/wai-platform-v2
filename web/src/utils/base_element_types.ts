import {
  ActionTypeKeys,
  ActionTypeValue,
  DatabaseAttributesValue,
  DatabaseBaseTypeValue,
  DatabaseIDValue,
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
      },
    },
  } as ElementTypeDef,
  Page: {
    label: "Page",
    data: {
      title: {
        type: "Text",
      },
      coverImg: {
        type: "Image",
      },
      iconImg: {
        type: "Image",
      },
    },
  } as ElementTypeDef,
  Button: {
    label: "Button",
    data: {
      text: {
        type: "Text",
      },
      database: {
        type: "DatabaseID",
      },
      action: {
        type: "ActionType",
      },
      data: {
        type: "DataList",
      },
    },
  } as ElementTypeDef,
  Database: {
    label: "Database",
    data: {
      title: {
        type: "Text",
      },
      attributes: {
        type: "DatabaseAttributes",
      },
      childrenBaseType: {
        type: "DatabaseBaseType",
      },
    },
  } as ElementTypeDef,
  DatabaseView: {
    label: "Database View",
    data: {
      database: {
        type: "DatabaseID",
      },
    },
  } as ElementTypeDef,
  Image: {
    label: "Image",
    data: {
      image: {
        type: "Image",
      },
    },
  } as ElementTypeDef,
  PropertyLink: {
    label: "Property Link",
    data: {
      property: {
        type: "PropertyLink",
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
  database: ElementDataPiece<DatabaseIDValue>;
  action: ElementDataPiece<ActionTypeValue>;
  data: ElementDataPiece<DataListValue>;
};

export type DatabaseElementData = {
  title: ElementDataPiece<TextValue>;
  attributes: ElementDataPiece<DatabaseAttributesValue>;
  childrenBaseType: ElementDataPiece<DatabaseBaseTypeValue>;
};

export type DatabaseViewElementData = {
  database: ElementDataPiece<DatabaseIDValue>;
};

export type ImageElementData = {
  image: ElementDataPiece<ImageValue>;
};

export type PropertyLinkElementData = {
  property: ElementDataPiece<PropertyLinkValue>;
};
