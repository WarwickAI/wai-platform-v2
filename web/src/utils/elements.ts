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
  PropertyList = "PropertyList",
  ActionType = "ActionType",
  DataList = "DataList",
}

export type SettingOptions = {
  label: string;
  hint: string;
  type: PropertyTypes;
}[];

export type Text = {
  type: PropertyTypes.Text;
  value: string;
};

export type FormattedText = {
  type: PropertyTypes.FormattedText;
  value: string;
};

export type Number = {
  type: PropertyTypes.Number;
  value: number;
};

export type Bool = {
  type: PropertyTypes.Bool;
  value: boolean;
};

export enum ActionTypes {
  Add,
  Remove,
}

export enum DataTypes {
  User,
  Email,
  Name,
}

export const DatabaseBaseTypes: ElementType[] = [
  ElementType.Page,
  ElementType.User,
  ElementType.Data,
];

export interface Property {
  type: PropertyTypes;
  value: any;
  friendly: string;
  hint: string;
  showInSettings: boolean;
}

export interface PropertyBase {
  [key: string]: Property;
}

export type TextElementProps = PropertyBase & {
  text: {
    type: PropertyTypes.FormattedText;
    value: any;
    friendly: "Text";
    hint: "Text content for element";
    showInSettings: false;
  };
};

export type PageElementProps = PropertyBase & {
  title: {
    type: PropertyTypes.Text;
    value: any;
    friendly: "Title";
    hint: "Title for page";
    showInSettings: true;
  };
  coverImg: {
    type: PropertyTypes.Text;
    value: any;
    friendly: "Cover Image";
    hint: "Cover Image for page";
    showInSettings: true;
  };
  iconImg: {
    type: PropertyTypes.Url;
    value: any;
    friendly: "Icon Image";
    hint: "Icon Image for page";
    showInSettings: true;
  };
};

export type DatabaseElementProps = PropertyBase & {
  title: {
    type: PropertyTypes.Text;
    value: any;
    friendly: "Title";
    hint: "Title of database";
    showInSettings: true;
  };
  attributes: {
    type: PropertyTypes.PropertyList;
    value: any;
    friendly: "Attributes";
    hint: "Table columns";
    showInSettings: false;
  };
  contentBaseType: {
    type: PropertyTypes.DatabaseBaseType;
    value: ElementType;
    friendly: "Base Element Type";
    hint: "Base element type for rows";
    showInSettings: true;
  };
};

export type DatabaseViewElementProps = PropertyBase & {
  databaseId: {
    type: PropertyTypes.DatabaseID;
    value: any;
    friendly: "Database ID";
    hint: "Database ID of table we want to view";
    showInSettings: true;
  };
};

export type PropertyLinkElementProps = PropertyBase & {
  propertyName: {
    type: PropertyTypes.PropertyLink;
    value: any;
    friendly: "Property";
    hint: "Property name";
    showInSettings: true;
  };
};

export type ButtonElementProps = PropertyBase & {
  databaseId: {
    type: PropertyTypes.DatabaseID;
    value: any;
    friendly: "Database ID";
    hint: "Database ID to update";
    showInSettings: true;
  };
  action: {
    type: PropertyTypes.ActionType;
    value: any;
    friendly: "Action";
    hint: "Action applied to database";
    showInSettings: true;
  };
  data: {
    type: PropertyTypes.DataList;
    value: any;
    friendly: "Data";
    hint: "Data applied to database";
    showInSettings: true;
  };
};

export type UserElementProps = PropertyBase & {
  id: {
    type: PropertyTypes.Number;
    value: -1;
    friendly: "User ID";
    hint: "User ID";
    showInSettings: true;
  };
};

export type DataElementProps = PropertyBase & {
  name: {
    type: PropertyTypes.Text;
    value: "";
    friendly: "Name";
    hint: "Name";
    showInSettings: true;
  };
};

export type ElementTyper<T> = Element & {
  props: T;
};

export const ElementDefaultProps: { [key in ElementType]: PropertyBase } = {
  Text: {
    text: {
      type: PropertyTypes.Text,
      value: `{"blocks":[{"key":"coa1e","text":"...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
      friendly: "Text",
      hint: "Text content for element",
      showInSettings: false,
    } as Property,
  } as TextElementProps,
  Page: {
    title: {
      type: PropertyTypes.Text,
      value: "Enter title...",
      friendly: "Title",
      hint: "Title for page",
      showInSettings: true,
    } as Property,
    coverImg: {
      type: PropertyTypes.Url,
      value: "",
      friendly: "Cover Image",
      hint: "Cover Image for page",
      showInSettings: true,
    } as Property,
    iconImg: {
      type: PropertyTypes.Url,
      value: "",
      friendly: "Icon Image",
      hint: "Icon Image for page",
      showInSettings: true,
    } as Property,
  } as PageElementProps,
  Database: {
    title: {
      type: PropertyTypes.Text,
      value: "Enter title...",
      friendly: "Title",
      hint: "Property name",
      showInSettings: true,
    } as Property,
    attributes: {
      type: PropertyTypes.PropertyList,
      value: {
        title: {
          type: PropertyTypes.Text,
          value: "Enter title...",
          friendly: "Title",
          hint: "Title for page",
          showInSettings: true,
        } as Property,
        coverImg: {
          type: PropertyTypes.Url,
          value: "",
          friendly: "Cover Image",
          hint: "Cover Image for page",
          showInSettings: true,
        } as Property,
        iconImg: {
          type: PropertyTypes.Url,
          value: "",
          friendly: "Icon Image",
          hint: "Icon Image for page",
          showInSettings: true,
        } as Property,
      },
      friendly: "Attributes",
      hint: "Table columns",
      showInSettings: false,
    },
    contentBaseType: {
      type: PropertyTypes.DatabaseBaseType,
      value: ElementType.Page,
      friendly: "Base Element Type",
      hint: "Base element type for rows",
      showInSettings: true,
    } as Property,
  } as DatabaseElementProps,
  DatabaseView: {
    databaseId: {
      type: PropertyTypes.DatabaseID,
      value: 0,
      friendly: "Database ID",
      hint: "Database ID of table we want to view",
      showInSettings: true,
    },
  },
  PropertyLink: {
    propertyName: {
      type: PropertyTypes.PropertyLink,
      value: "title",
      friendly: "Property",
      hint: "Property name",
      showInSettings: true,
    } as Property,
  } as PropertyLinkElementProps,
  Button: {
    databaseId: {
      type: PropertyTypes.DatabaseID,
      value: -1,
      friendly: "Database ID",
      hint: "Database ID to update",
      showInSettings: true,
    },
    action: {
      type: PropertyTypes.ActionType,
      value: ActionTypes.Add,
      friendly: "Action",
      hint: "Action applied to database",
      showInSettings: true,
    },
    data: {
      type: PropertyTypes.DataList,
      value: {},
      friendly: "Data",
      hint: "Data applied to database",
      showInSettings: true,
    },
  },
  User: {
    id: {
      type: PropertyTypes.Number,
      value: -1,
      friendly: "User ID",
      hint: "User ID",
      showInSettings: true,
    },
  },
  Data: {
    name: {
      type: PropertyTypes.Text,
      value: "",
      friendly: "Name",
      hint: "Name",
      showInSettings: true,
    },
  },
};

export const DefaultPropertyTypes: { [key in PropertyTypes]: Property } = {
  Text: {
    type: PropertyTypes.Text,
    value: "",
    friendly: "Text",
    hint: "Text",
    showInSettings: true,
  },
  FormattedText: {
    type: PropertyTypes.FormattedText,
    value: "",
    friendly: "Text",
    hint: "Text",
    showInSettings: true,
  },
  Number: {
    type: PropertyTypes.Number,
    value: -1,
    friendly: "Number",
    hint: "Number",
    showInSettings: true,
  },
  Bool: {
    type: PropertyTypes.Bool,
    value: false,
    friendly: "Bool",
    hint: "Bool",
    showInSettings: true,
  },
  Url: {
    type: PropertyTypes.Url,
    value: false,
    friendly: "URL",
    hint: "URL",
    showInSettings: true,
  },
  DatabaseID: {
    type: PropertyTypes.DatabaseID,
    value: false,
    friendly: "Database ID",
    hint: "Database ID",
    showInSettings: true,
  },
  UserID: {
    type: PropertyTypes.UserID,
    value: false,
    friendly: "User ID",
    hint: "User ID",
    showInSettings: true,
  },
  PropertyLink: {
    type: PropertyTypes.PropertyLink,
    value: false,
    friendly: "Property Link",
    hint: "Property Link",
    showInSettings: true,
  },
  DatabaseBaseType: {
    type: PropertyTypes.DatabaseBaseType,
    value: false,
    friendly: "Database Base Type",
    hint: "Database Base Type",
    showInSettings: true,
  },
  PropertyList: {
    type: PropertyTypes.PropertyList,
    value: false,
    friendly: "Property List",
    hint: "Property List",
    showInSettings: true,
  },
  ActionType: {
    type: PropertyTypes.ActionType,
    value: false,
    friendly: "Action Type",
    hint: "Action Type",
    showInSettings: true,
  },
  DataList: {
    type: PropertyTypes.DataList,
    value: false,
    friendly: "Data List",
    hint: "Data List",
    showInSettings: true,
  },
};

export const ElementTypesToNotShowInAdd: [ElementType] = [ElementType.Database];
