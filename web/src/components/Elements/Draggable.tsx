import React, { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Draggable: React.FC = (props) => {
  return (
    <motion.div drag dragDirectionLock>
      <Box>{props.children}</Box>
    </motion.div>
  );
};

export default Draggable;
