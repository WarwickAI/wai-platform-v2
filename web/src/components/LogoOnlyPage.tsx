import { Box, Image } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Wrapper } from "./Wrapper";

interface LogoOnlyPageProps {
  variant?: "small" | "regular";
  children: React.ReactNode;
}

const LogoOnlyPage: React.FC<LogoOnlyPageProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Wrapper>
      <Head>
        <title>Warwick AI</title>
      </Head>
      <Box w={20}>
        <Image src="static/logo2.png" alt="WAI Logo" />
      </Box>
      <Box
        mx="auto"
        maxWidth={variant === "regular" ? "100%" : "400px"}
        width="100%"
      >
        {children}
      </Box>
    </Wrapper>
  );
};

export default LogoOnlyPage;
