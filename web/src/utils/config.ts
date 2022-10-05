import {
  DataTypeKeysT as BaseDataTypeKeysT,
  DataTypesDef as BaseDataTypesDef,
} from "./base_data_types";
import {
  ElementTypeKeys as BaseElementTypeKets,
  ElementTypesDef as BaseElementTypesDef,
} from "./base_element_types";
import { Element as DBElement } from "../generated/graphql";

export type DataTypeKeysT = BaseDataTypeKeysT;
export const DataTypesDef = BaseDataTypesDef;

export type ElementTypeKeys = BaseElementTypeKets;
export const ElementTypesDef = BaseElementTypesDef;

export const getKeys = <A extends object>(obj: A) =>
  Object.keys(obj) as (keyof A)[];

export type ElementDataPiece<T> = {
  type: DataTypeKeysT;
  value: T;
};

export type ElementData = {
  [key: string]: ElementDataPiece<{} | null>;
};

export type Element<T> = DBElement & {
  type: ElementTypeKeys;
  data: T;
};

export const ElementTypesToNotShowInAdd: ElementTypeKeys[] = [
  "Database",
  "Template",
  "User",
  "Event",
];

export const DatabaseBaseTypes: ElementTypeKeys[] = [
  "Page",
  "User",
  "Survey",
  "Event",
];

export const TagTypes = {
  General: {
    name: "General",
    description: "General tags",
  },
  Length: {
    name: "Length",
    description: "Duration of the entity",
  },
  Difficulty: {
    name: "Difficulty",
    description: "Difficulty of the entity",
  },
  Term: {
    name: "Term",
    description: "Uni term that the entity appears in",
  },
};

const tagTypesKeys = getKeys(TagTypes);

export type TagTypesKeys = typeof tagTypesKeys[number];

export const createDefaultElementData = (elementType: ElementTypeKeys) => {
  const data: ElementData = {};

  Object.keys(ElementTypesDef[elementType].data).forEach((dataKey) => {
    data[dataKey] = {
      type: ElementTypesDef[elementType].data[dataKey].type,
      value: getElementDataDefaultValue(elementType, dataKey),
    };
  });

  return data;
};

export const createDefaultData = (dataType: DataTypeKeysT) => {
  return {
    type: dataType,
    value: DataTypesDef[dataType].defaultValue,
  };
};

// Gets default value for piece of data for a given element.
// If not overwritten in config, will use default value for that data type.
const getElementDataDefaultValue = (
  elementType: ElementTypeKeys,
  dataKey: string
) => {
  return (
    ElementTypesDef[elementType].data[dataKey].defaultValue ??
    DataTypesDef[ElementTypesDef[elementType].data[dataKey].type].defaultValue
  );
};
