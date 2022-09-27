import { FC } from "react";
import Text from "../components/Elements/Text";
import NumberProperty from "../components/Properties/Number";
import { DatabaseBaseTypes, ElementData, ElementTypeKeys } from "./config";

type ActionTypeDef = {
  label: string;
};

export const ActionTypesDef = {
  AddUser: {
    label: "Add User",
  } as ActionTypeDef,
  StartSurvey: {
    label: "Start Survey",
  } as ActionTypeDef,
};

export type DatabaseViewAsTypeDef = {
  label: string;
  limitToBaseTypes?: typeof DatabaseBaseTypes;
};

export const DatabaseViewsAs = {
  List: {
    label: "List",
  } as DatabaseViewAsTypeDef,
  Card: {
    label: "Card",
    limitToChildTypes: ["Page"],
  } as DatabaseViewAsTypeDef,
};

const getKeys = <A extends object>(obj: A) => Object.keys(obj) as (keyof A)[];

export const actionTypeKeys = getKeys(ActionTypesDef);
const databaseViewAsKeys = getKeys(DatabaseViewsAs);

export type ActionTypeKeys = typeof actionTypeKeys[number];
export type DatabaseViewAsKeys = typeof databaseViewAsKeys[number];

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
    defaultValue: `*enter some Markdown here*`,
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
  } as DateTypesDef,
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
  } as DateTypesDef,
  DatabaseAttributes: {
    label: "Database Attributes",
    hint: "Database Attributes",
    constraints: {},
    defaultValue: {},
  } as DateTypesDef,
  User: {
    label: "User",
    hint: "User",
    constraints: {},
    defaultValue: -1,
  } as DateTypesDef,
  Template: {
    label: "Template",
    hint: "Template",
    constraints: {},
    defaultValue: -1,
  } as DateTypesDef,
  DatabaseViewAs: {
    label: "Database View As",
    hint: "Database View As",
    constraints: {},
    defaultValue: "List",
  } as DateTypesDef,
  File: {
    label: "File",
    hint: "File",
    constraints: {},
    defaultValue: "",
  } as DateTypesDef,
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
export type UserValue = number;
export type TemplateValue = number;
export type DatabaseViewAsValue = DatabaseViewAsKeys;
export type FileValue = string;
