import { Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";
import SuggestedUserList from "../components/Feed/RightBar/SuggestedUserList";

function ProfileSetup() {
  return (
    <Fragment>
      <Box py={{ base: "20px", lg: "28px" }}>
        <Text
          fontSize={{ base: "3xl", lg: "4xl" }}
          fontWeight="600"
          textAlign="center"
        >
          Update your profile
        </Text>
      </Box>

      <Box
        display={{ base: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ lg: "center" }}
        gap={{ md: "30px" }}
        rowGap="30px"
        maxWidth="container.lg"
        margin="20px auto"
      >
        <Box
          border={{ base: "1px solid", lg: "1px solid #ccc" }}
          flexBasis="0"
          flexGrow="1"
          borderRadius="12px"
        >
          <Text
            textAlign="center"
            fontSize="2xl"
            paddingY="20px"
            paddingX={{ base: "4px", lg: "20px" }}
          >
            People you should follow
          </Text>

          <Box p="20px" d="flex" flexDirection="column" alignItems="center">
            <SuggestedUserList minWidth="300px" count={7} />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

export default ProfileSetup;
