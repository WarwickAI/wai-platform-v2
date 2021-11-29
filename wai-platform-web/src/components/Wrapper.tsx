import { Box } from "@mui/material";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxWidth={variant === "regular" ? "800px" : "400px"}
      width="100%"
    >
      {children}
    </Box>
  );
};
