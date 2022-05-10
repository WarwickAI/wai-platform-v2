import { Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import NavBarDesktop from "../NavBarDesktop";
import NavBarMobile from "../NavBarMobile";

interface ElementPageWrapperProps {}

const ElementPageWrapper: React.FC<ElementPageWrapperProps> = (props) => {
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });
  return (
    <>
      {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
      <Box flex={1} ml={isMobile ? 0 : 16}>
        {props.children}
      </Box>
    </>
  );
};
export default ElementPageWrapper;
