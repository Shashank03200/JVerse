import { React } from "react";
import { Box, Text } from "@chakra-ui/react";
import Comment from "./Comment";
import _ from "underscore";
function LatestComments(props) {
  let latestComments = props.latestComments;
  let commentList = [];
  if (latestComments !== undefined) {
    latestComments = _.first(latestComments, 4);

    commentList = latestComments.reverse().map((comment) => {
      return (
        <Comment
          postId={props.postId}
          commentData={comment}
          key={comment._id}
          onCommentDelete={props.onLatestCommentDelete}
        />
      );
    });
  }

  return (
    <Box mx="8px" py="0px">
      {latestComments && latestComments.length !== 0 ? (
        <Text fontSize="xs" mb="10px" fontWeight="semibold">
          Recent comments
        </Text>
      ) : null}

      {latestComments && <Box>{commentList}</Box>}
    </Box>
  );
}

export default LatestComments;
