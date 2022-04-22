import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import NoPostsImage from "../../assets/Search-amico.svg";

function NoPostsFound() {
  return (
    <Box
      textAlign="center"
      paddingX="20px"
      paddingY="28px"
      maxWidth="400px"
      marginX="auto"
    >
      <Image src={NoPostsImage} />
      <Text fontSize="xl" textAlign="center">
        No posts found
      </Text>
    </Box>
  );
}

export default NoPostsFound;
