import { React, useEffect, useState } from "react";

import { Box, Center, Spinner } from "@chakra-ui/react";
import routeInstance from "../../api/routes.instance";
import Comment from "./Comment";

function Comments(props) {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    try {
      const loadComments = async () => {
        setIsLoading(true);
        const response = await routeInstance({
          url: `/api/comments/${props.postId}/all`,
          method: "get",
        });

        const data = response.data;
        setComments(data);
        setIsLoading(false);
      };

      loadComments();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const commentRemoveHandler = (commentId) => {
    const commentsTemp = [...comments];
    const index = commentsTemp.findIndex(
      (comment) => comment._id === commentId
    );
    commentsTemp.splice(index, 1);
    setComments(commentsTemp);
    props.onLatestCommentDelete(commentId);
  };

  let commentList = [];
  if (comments && comments !== []) {
    commentList = comments.map((comment) => (
      <Comment
        commentData={comment}
        key={comment._id}
        postId={props.postId}
        onCommentDelete={commentRemoveHandler}
      />
    ));
  }
  return (
    <Box
      borderBottom="1px solid #ccc"
      borderTop="1px solid #ccc"
      mx={{ base: "2px", md: "8px" }}
      py="0px"
      rounded="lg"
    >
      {isLoading ? (
        <Center>
          <Spinner size="md" />
        </Center>
      ) : (
        commentList
      )}
    </Box>
  );
}

export default Comments;
