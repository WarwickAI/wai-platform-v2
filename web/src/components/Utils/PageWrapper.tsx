import { Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import NavBarDesktop from "../NavBarDesktop";
import NavBarMobile from "../NavBarMobile";

interface PageWrapperProps {
  showEditToggle: boolean;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });
  return (
    <>
      {isMobile ? (
        <NavBarMobile />
      ) : (
        <NavBarDesktop showEditToggle={props.showEditToggle} />
      )}
      <Box flex={1} ml={isMobile ? 0 : 16}>
        {props.children}
      </Box>
    </>
  );
};
export default PageWrapper;
