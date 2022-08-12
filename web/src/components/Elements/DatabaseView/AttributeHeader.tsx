import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  RadioProps,
  Stack,
  Text,
  Th,
  Tooltip,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import {
  DatabaseElementData,
  ElementTypeKeys,
} from "../../../utils/base_element_types";
import {
  DataTypeKeysT,
  DataTypesDef,
  Element,
  ElementTypesDef,
} from "../../../utils/config";
import textOutline from "@iconify/icons-eva/text-outline";
import hashOutline from "@iconify/icons-eva/hash-outline";
import imageOutline from "@iconify/icons-eva/image-outline";
import lockOutline from "@iconify/icons-eva/lock-outline";
import { getIcon } from "../../SidebarConfig";
import { DataTypeKeys } from "../../../utils/base_data_types";
import { useState } from "react";

interface AttributeHeaderProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  name: string;
  modifyAttributeName: (oldName: string, newName: string) => void;
}

const AttributeHeader: React.FC<AttributeHeaderProps> = (props) => {
  const attributeType = props.database.data.attributes.value[props.name].type;
  const [newName, setNewName] = useState<string>(props.name);

  return (
    <Th>
      <Flex flexDirection={"row"} alignItems={"center"}>
        {typeToIcon[attributeType]}
        <Text textTransform={"none"}>{props.name}</Text>
        {ElementTypesDef[
          props.database.data.childrenBaseType.value as ElementTypeKeys
        ].data[props.name] && (
          <Tooltip label="Cannot edit mandatory field">
            {getIcon(lockOutline)}
          </Tooltip>
        )}
        {props.isEdit && (
          <Popover>
            <PopoverTrigger>
              <Button size={"sm"} variant="outline">
                $
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Flex direction={"row"} alignItems="center" mb={2}>
                  <Text mr={2} whiteSpace="nowrap">
                    Name:
                  </Text>
                  <Input
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    value={newName}
                    placeholder="Name..."
                  />
                  <Button
                    onClick={() =>
                      props.modifyAttributeName(props.name, newName)
                    }
                  >
                    {"->"}
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </Th>
  );
};

interface AddAttributeHeaderProps {
  addAttribute: (name: string, attributeType: DataTypeKeysT) => void;
}

export const AddAttributeHeader: React.FC<AddAttributeHeaderProps> = (
  props
) => {
  const [newName, setNewName] = useState<string>("");
  const [newType, setNewType] = useState<DataTypeKeysT>("Text");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "attributeType",
    defaultValue: "Text" as DataTypeKeysT,
    onChange: (v) => setNewType(v as DataTypeKeysT),
  });

  const group = getRootProps();

  return (
    <Popover>
      <PopoverTrigger>
        <Button size={"sm"} variant="outline">
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Flex direction={"row"} alignItems="center" mb={2}>
            <Text mr={2} whiteSpace="nowrap">
              Name:
            </Text>
            <Input
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
              placeholder="Name..."
            />
          </Flex>
          <Flex {...group} flexWrap={"wrap"}>
            {DataTypeKeys.map((dataTypeKey: DataTypeKeysT) => {
              const radio = getRadioProps({ value: dataTypeKey });

              return (
                <AttributeTypeRadio key={dataTypeKey} {...radio}>
                  {dataTypeKey}
                </AttributeTypeRadio>
              );
            })}
          </Flex>
          <Button
            variant={"primary"}
            onClick={() => props.addAttribute(newName, newType)}
          >
            Add Attribute
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const AttributeTypeRadio: React.FC<RadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={1}
        m={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default AttributeHeader;

const typeToIcon: { [key: string]: JSX.Element } = {
  Text: getIcon(textOutline),
  Number: getIcon(hashOutline),
  Image: getIcon(imageOutline),
};
