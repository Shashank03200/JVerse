import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function LoadOverlay() {
  return (
    <Box
      width="100%"
      height="100vh"
      pos="absolute"
      top="0"
      left="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      zIndex="22"
    >
      <Spinner />
    </Box>
  );
}
export default LoadOverlay;
