import { useEffect, useState } from "react";
import { Box, Icon, HStack } from "@chakra-ui/react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { MdModeComment } from "react-icons/md";

import React from "react";

function PostFooter(props) {
  const [isChanged, setIsChanged] = useState(false);
  const [size, setSize] = useState("large");
  useEffect(() => {
    if (isChanged) {
      setSize("small");
    }

    return () => {
      setIsChanged(false);
    };
  }, [isChanged]);

  const likeButtonHandler = () => {
    setIsChanged(true);
    props.onLikeButtonClick();
  };

  return (
    <Box marginY="10px">
      <HStack spacing="10px" paddingX="6px">
        <Icon
          as={props.isLiked ? MdFavorite : MdFavoriteBorder}
          h="30px"
          w="30px"
          className={`action-icon ${
            size === "small" ? "action-icon-small" : ""
          }`}
          onMouseDown={likeButtonHandler}
          color="heart.200"
        />
        <Icon
          as={props.commentVisibility ? MdModeComment : MdComment}
          h="30px"
          w="30px"
          className="action-icon"
          onClick={props.onCommentButtonClick}
          color="purple.500"
        />
      </HStack>
    </Box>
  );
}

export default PostFooter;
