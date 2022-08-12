import { FC } from "react";
import Text from "../components/Elements/Text";
import NumberProperty from "../components/Properties/Number";
import { ElementData, ElementTypeKeys } from "./config";

type ActionTypeDef = {
  label: string;
};

export const ActionTypesDef = {
  Add: {
    label: "Add",
  } as ActionTypeDef,
  Update: {
    label: "Update",
  } as ActionTypeDef,
  Delete: {
    label: "Delete",
  } as ActionTypeDef,
};

const getKeys = <A extends object>(obj: A) => Object.keys(obj) as (keyof A)[];

const actionTypeKeys = getKeys(ActionTypesDef);

export type ActionTypeKeys = typeof actionTypeKeys[number];

/**
 * Type used for the data type definitions.
 */
type DateTypesDef = {
  label: string;
  hint: string;
  constraints: any;
  defaultValue: {};
  component?: FC<any>;
};

/**
 * Definitions of data types.
 */
export const DataTypesDef = {
  Text: {
    label: "Text",
    hint: "Text",
    constraints: {},
    defaultValue: "",
    component: Text,
  } as DateTypesDef,
  FormattedText: {
    label: "Formatted Text",
    hint: "Formatted Text",
    constraints: {},
    defaultValue: `{"blocks":[{"key":"e0n4m","text":"Enter text...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  } as DateTypesDef,
  Number: {
    label: "Number",
    hint: "Number",
    constraints: {},
    defaultValue: 0,
    component: NumberProperty,
  } as DateTypesDef,
  Bool: {
    label: "Bool",
    hint: "Bool",
    constraints: {},
    defaultValue: false,
  } as DateTypesDef,
  Url: {
    label: "URL",
    hint: "URL",
    constraints: {},
    defaultValue: "",
  } as DateTypesDef,
  Database: {
    label: "Database",
    hint: "Database",
    constraints: {},
    defaultValue: -1,
  } as DateTypesDef,
  UserID: {
    label: "User ID",
    hint: "User ID",
    constraints: {},
    defaultValue: -1,
  } as DateTypesDef,
  DataLink: {
    label: "Property Link",
    hint: "Property Link",
    constraints: {},
    defaultValue: "",
  },
  DatabaseBaseType: {
    label: "Database Base Type",
    hint: "Database Base Type",
    constraints: {},
    defaultValue: "Page",
  } as DateTypesDef,
  Image: {
    label: "Image",
    hint: "Image",
    constraints: {},
    defaultValue: "",
  } as DateTypesDef,
  ActionType: {
    label: "Action Type",
    hint: "Action Type",
    constraints: {},
    defaultValue: "Add",
  } as DateTypesDef,
  DataList: {
    label: "Data List",
    hint: "Data List",
    constraints: {},
    defaultValue: [],
  },
  DatabaseAttributes: {
    label: "Database Attributes",
    hint: "Database Attributes",
    constraints: {},
    defaultValue: {},
  },
};

export const DataTypeKeys = getKeys(DataTypesDef);

/**
 * Keys (i.e. names) of the different data types
 */
export type DataTypeKeysT = typeof DataTypeKeys[number];

export type TextValue = string;
export type FormattedTextValue = string;
export type NumberValue = number;
export type BoolValue = boolean;
export type UrlValue = string;
export type DatabaseValue = number;
export type UserIDValue = number;
export type DataLinkValue = string;
export type DatabaseBaseTypeValue = ElementTypeKeys;
export type ImageValue = string;
export type ActionTypeValue = ActionTypeKeys;
export type DataListValue = any[];
export type DatabaseAttributesValue = ElementData;
