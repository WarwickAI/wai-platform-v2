import React from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import TextProperty from "../Properties/Text";
import NextImage from "next/image";
import { Tag } from "../../generated/graphql";
import { TagCard } from "../Properties/Tags";

interface ElementPageProps {
  title: string;
  coverImg?: string;
  iconImg?: string;
  isEdit: boolean;
  settingsPopover?: JSX.Element;
  editTitle?: (newTitle: string) => void;
  children: React.ReactNode;
  tags?: Tag[];
}

const ElementPage: React.FC<ElementPageProps> = (props) => {
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  return (
    <>
      {props.coverImg && (
        <Box
          backgroundImage={`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url('${props.coverImg}')`}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          h={60}
          w={"100%"}
          position="sticky"
          top={0}
          zIndex={-2}
        />
      )}
      <Box>
        <Box
          px={[20, 20, 20, 28, 36, 48]}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          pt={props.coverImg ? 10 : isMobile ? 4 : 8}
          pb={props.coverImg ? 5 : 4}
        >
          {props.iconImg && (
            <Box mb={4} mt={props.coverImg ? -20 : 0}>
              <NextImage
                src={props.iconImg}
                alt="Page Icon"
                width={96}
                height={96}
                objectFit="cover"
              />
            </Box>
          )}
          <Flex flexWrap="wrap">
            {props.tags?.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </Flex>
          <Flex
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            position={"relative"}
          >
            <Box position="relative" px={2} my={2}>
              {/* Element Controls */}
              <Flex
                height={"full"}
                position="absolute"
                left="-5"
                alignItems={"center"}
                opacity={0.2}
                _hover={{
                  opacity: 1,
                }}
              >
                {props.isEdit && props.settingsPopover}
              </Flex>

              <TextProperty
                value={props.title}
                onChange={(v) => props.editTitle && props.editTitle(v)}
                isEdit={props.isEdit}
                isTitle={true}
              />
            </Box>
          </Flex>
        </Box>
        <Box
          px={[10, 10, 20, 28, 36, 48]}
          pt={props.coverImg ? (isMobile ? 4 : 14) : isMobile ? 4 : 8}
          pb={props.coverImg ? 20 : 12}
          backgroundColor="white"
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};
export default ElementPage;
