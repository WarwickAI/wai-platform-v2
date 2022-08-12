import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Th,
  Tooltip,
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

interface AttributeHeaderProps {
  database: Element<DatabaseElementData>;
  isEdit: boolean;
  name: string;
}

const AttributeHeader: React.FC<AttributeHeaderProps> = (props) => {
  const attributeType = props.database.data.attributes.value[props.name].type;

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
      </Flex>
    </Th>
  );
};

interface AddAttributeHeaderProps {
  addAttribute: (attributeType: DataTypeKeysT) => void;
}

export const AddAttributeHeader: React.FC<AddAttributeHeaderProps> = (props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size={"sm"} variant="outline">
          +
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {DataTypeKeys.map((dataTypeKey: DataTypeKeysT) => {
            return (
              <Button
                size={"sm"}
                key={dataTypeKey}
                variant="outline"
                onClick={() => props.addAttribute(dataTypeKey)}
              >
                {DataTypesDef[dataTypeKey].label}
              </Button>
            );
          })}
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
