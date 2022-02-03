import {
  Box,
  Flex,
  Heading,
  HStack,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

interface PageProps {
  title: string;
  coverImg?: string;
  iconImg?: string;
  options?: JSX.Element;
  tags?: JSX.Element;
}

const Page: React.FC<PageProps> = (props) => {
  const coverImg =
    props.coverImg && props.coverImg.length > 0 ? props.coverImg : undefined;

  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });
  return (
    <Box>
      <Head>
        <title>{props.title}</title>
      </Head>
      {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
      <Box flex={1} ml={isMobile ? 0 : 16}>
        {coverImg && (
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
            pt={coverImg ? 10 : isMobile ? 6 : 8}
            pb={coverImg ? 5 : 4}
          >
            {props.iconImg && (
              <Image
                src={props.iconImg}
                alt="Page Icon"
                width={24}
                mb={4}
                mt={props.coverImg ? -20 : 0}
              />
            )}
            {props.tags}
            <Flex
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="space-between"
            >
              <Heading size="lg" mr={4}>
                {props.title}
              </Heading>
              <HStack mt={isMobile ? 4 : 0}>{props.options}</HStack>
            </Flex>
          </Box>
          <Box
            px={[20, 20, 20, 28, 36, 48]}
            pt={coverImg ? (isMobile ? 4 : 14) : isMobile ? 4 : 8}
            pb={coverImg ? 20 : 12}
            backgroundColor="white"
          >
            {props.children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
