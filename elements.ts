import { Element, ElementType } from "../generated/graphql";

// DO NOT CHANGE ORDER, ADD TO END ONLY!!!
export enum PropertyTypes {
  Text = "Text",
  FormattedText = "FormattedText",
  Number = "Number",
  Bool = "Bool",
  Url = "Url",
  DatabaseID = "DatabaseID",
  UserID = "UserID",
  PropertyLink = "PropertyLink",
  DatabaseBaseType = "DatabaseBaseType",
  DatabaseProperties = "DatabaseProperties",
  ActionType = "ActionType",
  DataList = "DataList",
  Image = "Image",
}

export enum ActionTypes {
  Add,
  Remove,
}

export enum DataTypes {
  User,
  Email,
  Name,
}

export type PropertyInfo = {
  type: PropertyTypes;
  defaultValue: any;
  label: string;
  hint: string;
  showInSettings: boolean;
};

export const DatabaseBaseTypes: ElementType[] = [
  ElementType.Page,
  ElementType.User,
  ElementType.Data,
];

export type DatabasePropertiesType = {
  [key: string]: {
    type: PropertyTypes;
    value: any;
  };
};

export type ElementPropsType = {
  [key: string]: any;
};

export const ElementPropertyInfo: {
  [key in ElementType]: { [key: string]: PropertyInfo };
} = {
  [ElementType.Text]: {
    text: {
      type: PropertyTypes.FormattedText,
      defaultValue: `{"blocks":[{"key":"coa1e","text":"...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      label: "Text",
      hint: "",
      showInSettings: false,
    },
  },
  [ElementType.Page]: {
    title: {
      type: PropertyTypes.Text,
      defaultValue: "New Page",
      label: "Page Title",
      hint: "The title of the page",
      showInSettings: true,
    },
    coverImg: {
      type: PropertyTypes.Image,
      defaultValue: "",
      label: "Cover Image",
      hint: "The image to use as the cover image",
      showInSettings: true,
    },
    iconImg: {
      type: PropertyTypes.Image,
      defaultValue: "",
      label: "Icon Image",
      hint: "The image to use as the icon image",
      showInSettings: true,
    },
  },
  [ElementType.Button]: {
    databaseId: {
      type: PropertyTypes.DatabaseID,
      defaultValue: -1,
      label: "Database ID",
      hint: "The database ID of the button",
      showInSettings: true,
    },
    action: {
      type: PropertyTypes.ActionType,
      defaultValue: ActionTypes.Add,
      label: "Action",
      hint: "The action to perform when the button is clicked",
      showInSettings: true,
    },
    data: {
      type: PropertyTypes.DataList,
      defaultValue: [],
      label: "Data",
      hint: "The data to pass to the action",
      showInSettings: true,
    },
  },
  [ElementType.PropertyLink]: {
    propertyName: {
      type: PropertyTypes.PropertyLink,
      defaultValue: "",
      label: "Property Name",
      hint: "The name of the property to link to",
      showInSettings: true,
    },
  },
  [ElementType.Database]: {
    title: {
      type: PropertyTypes.Text,
      defaultValue: "New Database",
      label: "Title",
      hint: "The title of the database",
      showInSettings: true,
    },
    attributes: {
      type: PropertyTypes.DatabaseProperties,
      defaultValue: {},
      label: "Database Properties",
      hint: "The database properties of the database",
      showInSettings: false,
    },
    contentBaseType: {
      type: PropertyTypes.DatabaseBaseType,
      defaultValue: ElementType.Page,
      label: "Content Base Type",
      hint: "The base type of the content in the database",
      showInSettings: true,
    },
  },
  [ElementType.DatabaseView]: {
    databaseId: {
      type: PropertyTypes.DatabaseID,
      defaultValue: -1,
      label: "Database ID",
      hint: "The database ID of the database view",
      showInSettings: true,
    },
  },
  [ElementType.User]: {
    userId: {
      type: PropertyTypes.UserID,
      defaultValue: -1,
      label: "User ID",
      hint: "The user ID of the user",
      showInSettings: true,
    },
  },
  [ElementType.Data]: {
    name: {
      type: PropertyTypes.Text,
      defaultValue: "",
      label: "Name",
      hint: "The name of the data",
      showInSettings: true,
    },
  },
};

export interface Property {
  type: PropertyTypes;
  value: any;
}

export interface PropertyBase {
  [key: string]: Property;
}

export type TextElementProps = PropertyBase & {
  text: Property;
};

export type PageElementProps = PropertyBase & {
  title: Property;
  coverImg: Property;
  iconImg: Property;
};

export type DatabaseElementProps = PropertyBase & {
  title: Property;
  attributes: Property;
  contentBaseType: Property;
};

export type DatabaseViewElementProps = PropertyBase & {
  databaseId: Property;
};

export type PropertyLinkElementProps = PropertyBase & {
  propertyName: Property;
};

export type ButtonElementProps = PropertyBase & {
  databaseId: Property;
  action: Property;
  data: Property;
};

export type UserElementProps = PropertyBase & {
  userId: Property;
};

export type DataElementProps = PropertyBase & {
  name: Property;
};

export type ElementTyper<T> = Element & {
  props: T;
};

export const GeneralPropertyInfo: { [key in PropertyTypes]: PropertyInfo } = {
  [PropertyTypes.Text]: {
    type: PropertyTypes.Text,
    defaultValue: "",
    label: "Text",
    hint: "Text",
    showInSettings: true,
  },
  [PropertyTypes.FormattedText]: {
    type: PropertyTypes.FormattedText,
    defaultValue: "",
    label: "Text",
    hint: "Text",
    showInSettings: true,
  },
  [PropertyTypes.Number]: {
    type: PropertyTypes.Number,
    defaultValue: -1,
    label: "Number",
    hint: "Number",
    showInSettings: true,
  },
  [PropertyTypes.Bool]: {
    type: PropertyTypes.Bool,
    defaultValue: false,
    label: "Bool",
    hint: "Bool",
    showInSettings: true,
  },
  [PropertyTypes.Url]: {
    type: PropertyTypes.Url,
    defaultValue: "",
    label: "URL",
    hint: "URL",
    showInSettings: true,
  },
  [PropertyTypes.DatabaseID]: {
    type: PropertyTypes.DatabaseID,
    defaultValue: -1,
    label: "Database ID",
    hint: "Database ID",
    showInSettings: true,
  },
  [PropertyTypes.UserID]: {
    type: PropertyTypes.UserID,
    defaultValue: -1,
    label: "User ID",
    hint: "User ID",
    showInSettings: true,
  },
  [PropertyTypes.PropertyLink]: {
    type: PropertyTypes.PropertyLink,
    defaultValue: "",
    label: "Property Link",
    hint: "Property Link",
    showInSettings: true,
  },
  [PropertyTypes.DatabaseBaseType]: {
    type: PropertyTypes.DatabaseBaseType,
    defaultValue: ElementType.Page,
    label: "Database Base Type",
    hint: "Database Base Type",
    showInSettings: true,
  },
  [PropertyTypes.DatabaseProperties]: {
    type: PropertyTypes.DatabaseProperties,
    defaultValue: {},
    label: "Database Properties",
    hint: "Database Properties",
    showInSettings: true,
  },
  [PropertyTypes.ActionType]: {
    type: PropertyTypes.ActionType,
    defaultValue: ActionTypes.Add,
    label: "Action Type",
    hint: "Action Type",
    showInSettings: true,
  },
  [PropertyTypes.DataList]: {
    type: PropertyTypes.DataList,
    defaultValue: [],
    label: "Data List",
    hint: "Data List",
    showInSettings: true,
  },
  [PropertyTypes.Image]: {
    type: PropertyTypes.Image,
    defaultValue: "",
    label: "Image",
    hint: "Image",
    showInSettings: true,
  },
};

export const ElementTypesToNotShowInAdd: [ElementType] = [ElementType.Database];

export const createDefaultElementProps = (elementType: ElementType) => {
  const props: { [key: string]: Property } = {};

  Object.keys(ElementPropertyInfo[elementType]).forEach((propName) => {
    props[propName] = {
      type: ElementPropertyInfo[elementType][propName].type,
      value: ElementPropertyInfo[elementType][propName].defaultValue,
    };
  });

  return props;
};

export const createDefaultProperty = (propertyType: PropertyTypes) => {
  return {
    type: GeneralPropertyInfo[propertyType].type,
    value: GeneralPropertyInfo[propertyType].defaultValue,
  };
};
