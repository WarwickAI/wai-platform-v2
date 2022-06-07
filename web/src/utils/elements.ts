import { Element, ElementType } from "../generated/graphql";

export enum PropertyTypes {
  Text,
  FormattedText,
  Number,
  Bool,
  ElementType,
  PropertyList,
  Url,
  PropertyLink,
  ActionType,
  DataList,
}

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

export interface Property {
  type: PropertyTypes;
  value: any;
}

export interface PropertyBase {
  [key: string]: Property;
}

export type TextElementProps = PropertyBase & {
  text: {
    type: PropertyTypes.FormattedText;
    value: any;
  };
};

export type PageElementProps = PropertyBase & {
  title: {
    type: PropertyTypes.Text;
    value: any;
  };
  coverImg: {
    type: PropertyTypes.Text;
    value: any;
  };
  iconImg: {
    type: PropertyTypes.Url;
    value: any;
  };
};

export type DatabaseElementProps = PropertyBase & {
  title: {
    type: PropertyTypes.Text;
    value: any;
  };
  attributes: {
    type: PropertyTypes.PropertyList;
    value: any;
  };
  contentBaseType: {
    type: PropertyTypes.ElementType;
    value: any;
  };
};

export type DatabaseViewElementProps = PropertyBase & {
  databaseId: {
    type: PropertyTypes.Number;
    value: any;
  };
};

export type PropertyLinkElementProps = PropertyBase & {
  propertyName: {
    type: PropertyTypes.PropertyLink;
    value: any;
  };
};

export type ButtonElementProps = PropertyBase & {
  databseId: {
    type: PropertyTypes.Number;
    value: any;
  };
  action: {
    type: PropertyTypes.ActionType;
    value: any;
  };
  data: {
    type: PropertyTypes.DataList;
    value: any;
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
    } as Property,
  } as TextElementProps,
  Page: {
    title: {
      type: PropertyTypes.Text,
      value: "Enter title...",
    } as Property,
    coverImg: {
      type: PropertyTypes.Url,
      value: "",
    } as Property,
    iconImg: {
      type: PropertyTypes.Url,
      value: "",
    } as Property,
  } as PageElementProps,
  Database: {
    title: {
      type: PropertyTypes.Text,
      value: "Enter title...",
    } as Property,
    attributes: {
      type: PropertyTypes.PropertyList,
      value: {
        title: {
          type: PropertyTypes.Text,
          value: "Enter title...",
        } as Property,
        coverImg: {
          type: PropertyTypes.Url,
          value: "",
        } as Property,
        iconImg: {
          type: PropertyTypes.Url,
          value: "",
        } as Property,
      },
    },
    contentBaseType: {
      type: PropertyTypes.ElementType,
      value: ElementType.Page,
    } as Property,
  } as DatabaseElementProps,
  DatabaseView: {
    databaseId: {
      type: PropertyTypes.Number,
      value: 0,
    },
  },
  PropertyLink: {
    propertyName: {
      type: PropertyTypes.PropertyLink,
      value: "",
    } as Property,
  } as PropertyLinkElementProps,
  Button: {
    databseId: {
      type: PropertyTypes.Number,
      value: 0,
    },
    action: {
      type: PropertyTypes.ActionType,
      value: ActionTypes.Add,
    },
    data: {
      type: PropertyTypes.DataList,
      value: {},
    },
  },
};
