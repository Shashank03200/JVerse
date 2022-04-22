import { Box, Text } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { commentDeleteActionHandler } from "../../store/post-actions";

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Comment(props) {
  const dispatch = useDispatch();

  const [deleteCommentProccessActive, setDeleteCommentProccessActive] =
    useState(false);

  const {
    profileImage: userProfileImage,
    username,
    _id: userId,
  } = props.commentData.userId;

  const { _id: commentId, commentText, owner } = props.commentData;

  const commentDeleteHandler = () => {
    setDeleteCommentProccessActive(true);
    dispatch(commentDeleteActionHandler(commentId, props.postId))
      .then(() => {
        props.onCommentDelete(commentId);
      })
      .catch(() => {
        setDeleteCommentProccessActive(false);
      });
  };

  return (
    <Box
      padding="2px"
      backgroundColor="white"
      marginBottom="2px"
      d="flex"
      mt="2px"
      opacity={deleteCommentProccessActive ? 0.5 : 1}
    >
      <Box padding="2px" flexBasis="1">
        <Link to={`/profile/${username}`}>
          <Avatar
            height="16px"
            width="16px"
            name={username}
            src={userProfileImage}
            mr="4px"
          />
        </Link>
      </Box>
      <Box flexGrow="10" display="flex">
        <Link to={`/profile/${username}`}>
          <Box
            fontWeight="semibold"
            fontSize={{
              base: "10px",
              sm: "10px",
              md: "12px",
            }}
            padding="2px"
            width="auto"
          >
            {username}
          </Box>
        </Link>

        <Box
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
          }}
          padding="2px"
          maxWidth={{
            base: "200px",
            md: "200px",
            lg: "400px",
          }}
          textOverflow="ellipsis"
        >
          {commentText}
        </Box>
      </Box>

      {owner && (
        <Box onClick={commentDeleteHandler}>
          <Text>
            <AiFillCloseCircle className="crossDeleteIcon" />
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(Comment);
