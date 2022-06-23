import { Element, ElementType } from "../generated/graphql";

export enum PropertyTypes {
  Text,
  FormattedText,
  Number,
  Bool,
  DatabaseBaseType,
  PropertyList,
  Url,
  PropertyLink,
  ActionType,
  DataList,
  DatabaseID,
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

export enum DatabaseBaseTypes {
  Page,
  User,
  Data,
}

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
    value: DatabaseBaseTypes;
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
  databseId: {
    type: PropertyTypes.Number;
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
      value: DatabaseBaseTypes.Page,
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
    databseId: {
      type: PropertyTypes.Number,
      value: 0,
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
};
