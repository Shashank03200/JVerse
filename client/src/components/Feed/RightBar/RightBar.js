import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import UserDetailsCard from "./UserDetailsCard";
import SuggestedUserList from "./SuggestedUserList";
import { UISliceActions } from "../../../store/UISlice";

import "./RightBar.css";

const RightBar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const togglePostCreatorModalVisibility = () => {
    dispatch(UISliceActions.toggleModalVisibility());
  };

  return (
    <Box
      flex="5"
      height="94vh"
      position="sticky"
      top="50px"
      d={{ base: "none", lg: "flex" }}
      flexDirection="column"
      paddingLeft="5vw"
      className="RightBarWrapper"
      bgColor="feedBackground.200"
    >
      <UserDetailsCard userData={userData} />
      <Box
        width="40vh"
        className="rightBarComponents"
        flex="4"
        rounded="lg"
        border="1px solid #ccc"
        p="14px"
        mb="24px"
        display="flex"
        flexDirection="column"
        bgColor="white"
        boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px;"
      >
        <Text textAlign="center" fontSize="20px" mb="16px" p="5px">
          Create a new post
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow="1"
        >
          <Button
            width="100%"
            backgroundColor="blue"
            color="white"
            boxShadow="0px 2px 5px gray"
            onClick={togglePostCreatorModalVisibility}
            _hover={{
              bgGradient: "linear(to-r, #7928CA , #FF0080 )",
            }}
            _active={{
              pos: "relative",
              top: "3px",
              bgGradient: "linear(to-r, #7928CA , #FF0080)",
            }}
          >
            Create A Post
          </Button>
        </Box>
      </Box>

      <Box
        borderWidth="2px"
        padding="14px"
        rounded="lg"
        border="1px solid #ccc"
        mb="24px"
        width="40vh"
        className="rightBarComponents"
        flex="6"
        bgColor="white"
      >
        <Text textAlign="center" fontSize="20px" mb="16px" p="5px">
          People you may know
        </Text>

        <SuggestedUserList count={4} />
      </Box>
    </Box>
  );
};

export default RightBar;
