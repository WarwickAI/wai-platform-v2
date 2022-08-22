import {
  Box,
  Button,
  Flex,
  HStack,
  useDisclosure,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useGetTemplatesWithoutChildrenQuery } from "../../../generated/graphql";
import RadioItem from "../../Utils/RadioItem";
import CreateTemplateWindow from "./CreateTemplateWindow";
import editOutline from "@iconify/icons-eva/edit-outline";
import { getIcon } from "../../SidebarConfig";

interface TemplatePropertyProps {
  value: number;
  onChange: (v: number) => void;
  isEdit: boolean;
}

const TemplateProperty: React.FC<TemplatePropertyProps> = (props) => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const router = useRouter();

  const [{ data: templatesQuery }] = useGetTemplatesWithoutChildrenQuery();

  const templates = useMemo(() => {
    return templatesQuery?.getTemplates || [];
  }, [templatesQuery]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "template",
    value: props.value,
    onChange: (v) => props.onChange(parseInt(v)),
  });

  const group = getRootProps();

  return (
    <VStack {...group} spacing={1}>
      {templates.map((template) => {
        const radio = getRadioProps({ value: template.id });

        return (
          <RadioItem key={template.id} {...radio} inSettings={true}>
            <Flex
              w={"full"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box flexGrow={1}>{template.data.title.value}</Box>
              <Button
                size={"sm"}
                onClick={() => {
                  router.push(`/generic/${template.id}`);
                }}
                color="blue.500"
              >
                {getIcon(editOutline)}
              </Button>
            </Flex>
          </RadioItem>
        );
      })}
      <Button size={"sm"} variant={"setting"} onClick={onAddOpen}>
        Add
      </Button>

      <CreateTemplateWindow
        isOpen={isAddOpen}
        onOpen={onAddOpen}
        onClose={onAddClose}
        onChange={props.onChange}
      />
    </VStack>
  );
};

export default TemplateProperty;
