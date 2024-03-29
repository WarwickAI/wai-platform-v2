import {
  ActionTypeValue,
  DatabaseAttributesValue,
  DatabaseBaseTypeValue,
  DatabaseValue,
  DataListValue,
  DataTypeKeysT,
  FormattedTextValue,
  ImageValue,
  DataLinkValue,
  TextValue,
  TemplateValue,
  DatabaseViewAsValue,
  BoolValue,
  UserValue,
  NumberValue,
  FileValue,
  DateValue,
  LocationValue,
} from "./base_data_types";
import { ElementDataPiece } from "./config";

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
      cardImg: {
        type: "Image",
        label: "Card Image",
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
      template: {
        type: "Template",
        label: "Template",
        inSettings: true,
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
      view: {
        type: "DatabaseViewAs",
        label: "View",
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
      scale: {
        type: "Number",
        label: "Scale",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  DataLink: {
    label: "Data Link",
    data: {
      property: {
        type: "DataLink",
        label: "Data Link",
        inSettings: true,
      },
      canEdit: {
        type: "Bool",
        label: "Can Edit",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  User: {
    label: "User",
    data: {
      user: {
        type: "User",
        label: "User",
        inSettings: false,
      },
    },
  } as ElementTypeDef,
  Template: {
    label: "Template",
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
  Survey: {
    label: "Survey",
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
      user: {
        type: "User",
        label: "User",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  File: {
    label: "File",
    data: {
      file: {
        type: "File",
        label: "File",
        inSettings: true,
      },
    },
  } as ElementTypeDef,
  Event: {
    label: "Event",
    data: {
      title: {
        type: "Text",
        label: "Title",
        inSettings: true,
      },
      description: {
        type: "FormattedText",
        label: "Description",
        inSettings: true,
      },
      cardImg: {
        type: "Image",
        label: "Cover Image",
        inSettings: true,
      },
      iconImg: {
        type: "Image",
        label: "Icon Image",
        inSettings: true,
      },
      start: {
        type: "Date",
        label: "Start",
        inSettings: true,
      },
      end: {
        type: "Date",
        label: "End",
        inSettings: true,
      },
      location: {
        type: "Location",
        label: "Location",
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
  cardImg: ElementDataPiece<ImageValue>;
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
  template: ElementDataPiece<TemplateValue>;
};

export type DatabaseViewElementData = {
  database: ElementDataPiece<DatabaseValue>;
  view: ElementDataPiece<DatabaseViewAsValue>;
};

export type ImageElementData = {
  image: ElementDataPiece<ImageValue>;
  scale: ElementDataPiece<NumberValue>;
};

export type DataLinkElementData = {
  property: ElementDataPiece<DataLinkValue>;
  canEdit: ElementDataPiece<BoolValue>;
};

export type TemplateElementData = {
  title: ElementDataPiece<TextValue>;
  coverImg: ElementDataPiece<ImageValue>;
  iconImg: ElementDataPiece<ImageValue>;
};

export type SurveyElementData = {
  title: ElementDataPiece<TextValue>;
  coverImg: ElementDataPiece<ImageValue>;
  iconImg: ElementDataPiece<ImageValue>;
  user: ElementDataPiece<UserValue>;
};

export type UserData = {
  user: ElementDataPiece<UserValue>;
};

export type FileElementData = {
  file: ElementDataPiece<FileValue>;
};

export type EventElementData = {
  title: ElementDataPiece<TextValue>;
  description: ElementDataPiece<FormattedTextValue>;
  cardImg: ElementDataPiece<ImageValue>;
  iconImg: ElementDataPiece<ImageValue>;
  start: ElementDataPiece<DateValue>;
  end: ElementDataPiece<DateValue>;
  location: ElementDataPiece<LocationValue>;
};
