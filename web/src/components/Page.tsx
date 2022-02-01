import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import NavBarDesktop from "./NavBarDesktop";

interface PageProps {
  title: string;
  coverImg?: string;
}

const Page: React.FC<PageProps> = (props) => {
  const coverImg =
    props.coverImg && props.coverImg.length > 0 ? props.coverImg : undefined;

  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });
  return (
    <Box>
      {isMobile ? <NavBarDesktop /> : <NavBarDesktop />}
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
          />
        )}
        <Heading
          px={40}
          pt={coverImg ? 10 : 8}
          pb={coverImg ? 5 : 4}
          backgroundColor="rgba(255, 255, 255, 0.9)"
          size="lg"
        >
          {props.title}
        </Heading>
        <Box
          px={40}
          pt={coverImg ? 14 : 8}
          pb={coverImg ? 20 : 12}
          backgroundColor="white"
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
