import React from "react";
import {
  Box,
  HStack,
  Text,
  Avatar,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UISliceActions } from "../../store/UISlice";

function ProfileUserInfo({ fetchedData }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const editProfileClickHandler = () => {
    history.push("/edit-profile");
  };

  const logoutButtonClickHandler = () => {
    dispatch(
      UISliceActions.setLogoutAlertVisibility({
        isLogoutAlertVisible: true,
      })
    );
  };

  return (
    <Box
      display={{ base: "block", lg: "flex" }}
      justifyContent="space-between"
      height="40%"
      gap="20px"
      p="24px"
      paddingX={{ base: "4px", xl: "340px" }}
    >
      <Box w="100%" h="100%" textAlign="center">
        <Avatar
          src={fetchedData.profileImage}
          boxSize={{ base: "100px", md: "180px" }}
          mx="auto"
        />
      </Box>
      <Box
        width="100%"
        height="100%"
        px="20px"
        py="4px"
        textAlign={{ base: "center", lg: "left" }}
      >
        <Box className="usernameContainer" fontSize="4xl" mx="auto">
          {fetchedData.username}
        </Box>
        <HStack
          mx="auto"
          spacing="40px"
          paddingY={{ base: "6px" }}
          justifyContent={{ base: "center", lg: "left" }}
        >
          <Text> {fetchedData.posts?.length} posts</Text>
          <Text> {fetchedData.followers?.length} followers </Text>
          <Text> {fetchedData.following?.length} following </Text>
        </HStack>

        <Box fontWeight="600" mt="12px" className="">
          {fetchedData.name}
        </Box>
        <Box>{fetchedData.bio}</Box>
        {fetchedData.owner === true ? (
          <ButtonGroup spacing="8" mt="4">
            <Button
              size="xs"
              colorScheme="cyan"
              onClick={editProfileClickHandler}
            >
              Edit Profile
            </Button>
            <Button size="xs" bg="cyan" onClick={logoutButtonClickHandler}>
              Logout
            </Button>
          </ButtonGroup>
        ) : null}
      </Box>
    </Box>
  );
}

export default React.memo(ProfileUserInfo);
