import {
  Button,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  Text,
  Th,
  Tooltip,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import {
  DatabaseElementData,
  ElementTypeKeys,
} from "../../../utils/base_element_types";
import { DataTypeKeysT, Element, ElementTypesDef } from "../../../utils/config";
import textOutline from "@iconify/icons-eva/text-outline";
import hashOutline from "@iconify/icons-eva/hash-outline";
import imageOutline from "@iconify/icons-eva/image-outline";
import lockOutline from "@iconify/icons-eva/lock-outline";
import { getIcon } from "../../SidebarConfig";
import { DataTypeKeys } from "../../../utils/base_data_types";
import { useMemo, useState } from "react";
import RadioItem from "../../Utils/RadioItem";

interface AttributeHeaderProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  name: string;
  removeAttribute: (name: string) => void;
  modifyAttributeName: (oldName: string, newName: string) => void;
}

const AttributeHeader: React.FC<AttributeHeaderProps> = (props) => {
  const attributeType = props.database.data.attributes.value[props.name].type;
  const [newName, setNewName] = useState<string>(props.name);

  const canEdit = useMemo(() => {
    return !ElementTypesDef[
      props.database.data.childrenBaseType.value as ElementTypeKeys
    ].data[props.name];
  }, [props.database, props.name]);

  return (
    <Th>
      <Popover placement="top" returnFocusOnClose={false}>
        <PopoverTrigger>
          <Button size={"sm"} variant="setting">
            <Flex flexDirection={"row"} alignItems={"center"}>
              {typeToIcon[attributeType]}
              <Text textTransform={"none"}>{props.name}</Text>
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent w={60}>
          <PopoverBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={1}
            >
              {props.isEdit && (
                <VStack w={"full"} spacing={1}>
                  <Tooltip
                    label={
                      canEdit
                        ? "Edit attribute name"
                        : "Cannot edit attribute name, is a mandatory field"
                    }
                    placement={"top"}
                  >
                    <HStack w={"full"}>
                      <Input
                        size={"sm"}
                        onChange={(e) => {
                          setNewName(e.target.value);
                          props.modifyAttributeName(props.name, e.target.value);
                        }}
                        value={newName}
                        placeholder="Name..."
                        disabled={!canEdit}
                      />
                      {!canEdit && getIcon(lockOutline)}
                    </HStack>
                  </Tooltip>
                  <Tooltip
                    label={
                      canEdit
                        ? "Remove the attribute"
                        : "Cannot remove the attribute, is a mandatory field"
                    }
                    placement={"top"}
                  >
                    <HStack w={"full"}>
                      <Button
                        size={"sm"}
                        variant="setting"
                        onClick={() => props.removeAttribute(props.name)}
                        disabled={!canEdit}
                      >
                        Remove
                      </Button>
                      {!canEdit && getIcon(lockOutline)}
                    </HStack>
                  </Tooltip>
                </VStack>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
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
                <RadioItem key={dataTypeKey} {...radio}>
                  {dataTypeKey}
                </RadioItem>
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

export default AttributeHeader;

const typeToIcon: { [key: string]: JSX.Element } = {
  Text: getIcon(textOutline),
  Number: getIcon(hashOutline),
  Image: getIcon(imageOutline),
};
