import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button } from "@chakra-ui/react";
import { UISliceActions } from "../../../store/UISlice";

const UserDetailsCard = ({ userData }) => {
  const dispatch = useDispatch();

  const userProfileImage = useSelector((state) => state.feed.userProfileImage);

  if (!userData) {
    return <p>Loading</p>;
  } else
    return (
      <Box
        width="40vh"
        background="whiteAlpha.300"
        mt="10px"
        padding="10px"
        rounded="lg"
        border="1px solid #ccc"
        mb="24px"
        d="flex"
        bgColor="white"
      >
        <Box d="flex" flex="8" alignItems="center" p="10px">
          <Avatar size="md" name={userData.username} src={userProfileImage} />

          <Box height="fit-content" ml="14px">
            {userData.userName}
          </Box>
        </Box>

        <Box d="flex" flex="4" justifyContent="center" alignItems="center">
          <Button
            d="flex"
            alignItems="center"
            cursor="pointer"
            height="fit-content"
            padding="8px 10px"
            fontSize="12px"
            onClick={() =>
              dispatch(
                UISliceActions.setLogoutAlertVisibility({
                  isLogoutAlertVisible: true,
                })
              )
            }
            outline="1px solid #ccc"
          >
            Switch
          </Button>
        </Box>
      </Box>
    );
};

export default UserDetailsCard;
