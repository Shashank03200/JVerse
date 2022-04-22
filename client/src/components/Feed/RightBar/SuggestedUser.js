import { useState } from "react";

import { Box, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { useDispatch } from "react-redux";
import { followUser } from "../../../store/feed-actions";
import { Link } from "react-router-dom";

const SuggestedUser = (props) => {
  const dispatch = useDispatch();
  const [followProcessLoading, setFollowProcessLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { username } = props;
  const followHandler = () => {
    dispatch(
      followUser(
        props.userId,
        isFollowing,
        setFollowProcessLoading,
        setIsFollowing
      )
    );
  };
  return (
    <Box
      display="flex"
      border="1px solid maroon"
      padding="8px"
      rounded="md"
      minWidth={props.minWidth}
      pos="relative"
      my="10px"
      maxWidth="400px"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
    >
      <Box mr="3">
        <Link to={`/profile/${username}`}>
          <Avatar size="sm" src={props.src} className="action-icon" />
        </Link>
      </Box>
      <Link to={`/profile/${username}`}>
        <Box className="action-icon">{props.username}</Box>
      </Link>
      <Box marginLeft="auto">
        <Button
          size="xs"
          backgroundColor="blue.500"
          color="white"
          _hover={{ color: "black" }}
          onClick={followHandler}
          isLoading={followProcessLoading}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
};

export default SuggestedUser;
