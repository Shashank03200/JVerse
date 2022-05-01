import React, { useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { likeDislikePostHandler } from "../../store/post-actions";
import PostFooter from "./PostFooter";
import Comments from "../Comment/Comments";
import CommentInput from "../Comment/CommentInput";
import LatestComments from "../Comment/LatestComments";
import PostHeader from "./PostHeader";
import PostSkeleton from "./PostSkeleton";

import PostImage from "./PostImage";
import { getLatestComments } from "../../store/comment-actions";
import PostBox from "./PostBox";

const Post = ({ postData }) => {
  const dispatch = useDispatch();

  const [isPostDataLoading, setIsPostDataLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(undefined);

  const [likesCount, setLikesCount] = useState(postData.likes.length);
  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const [latestComments, setLatestComments] = useState(undefined);
  const userId = useSelector((state) => state.user.userId);

  const { _id: postId, postDeletePossible } = postData;
  const { username, profileImage: userProfileSrc } = postData.userId;
  console.log(userProfileSrc);
  useEffect(() => {
    if (isLiked === undefined) {
      let likedConst = postData.likes.includes(userId);
      if (postData) {
        setIsLiked(likedConst);
      }
      setIsPostDataLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchLatestComments = async () => {
      await setIsPostDataLoading(true);
      await getLatestComments(dispatch, postId, setLatestComments);
      await setIsPostDataLoading(false);
    };

    fetchLatestComments();
  }, []);

  const postLikeActivityHandler = () => {
    async function likeDislikePost() {
      dispatch(likeDislikePostHandler(postId));
      setIsLiked((prevState) => !prevState);

      if (isLiked) {
        setLikesCount((prevCount) => (prevCount -= 1));
      } else {
        setLikesCount((prevCount) => (prevCount += 1));
      }
    }

    likeDislikePost();
  };

  const commentsVisibilityHandler = () => {
    setCommentsVisibility((prevState) => !prevState);
  };

  const newCommentAppendHandler = useCallback((newCommentData) => {
    const latestCommentsTemp = [...latestComments];
    latestCommentsTemp.unshift(newCommentData);
    setLatestComments(latestCommentsTemp);
  });

  const latestCommentRemoveHandler = (commentId) => {
    const latestCommentsTemp = [...latestComments];
    const index = latestCommentsTemp.findIndex(
      (comment) => comment._id === commentId
    );
    if (index === -1) {
      return;
    }

    latestCommentsTemp.splice(index, 1);
    setLatestComments(latestCommentsTemp);
  };

  const PostContent = () => {
    return (
      <>
        <Box>
          <PostHeader
            username={username}
            userProfileSrc={userProfileSrc}
            postId={postId}
            postDeletePossible={postDeletePossible}
          />

          <Box fontSize="14px" px="6px" py="4px">
            {postData.desc}
          </Box>

          <Box overflow="hidden">
            <Box d="flex" justifyContent="center" alignItems="center">
              <PostImage imageSrc={postData.postImage} />
            </Box>
          </Box>

          <PostFooter
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            onLikeButtonClick={postLikeActivityHandler}
            commentsVisibility={commentsVisibility}
            onCommentButtonClick={commentsVisibilityHandler}
            // isTouched={isTouched}
          />

          {commentsVisibility && postId && (
            <Comments
              postId={postId}
              latestComments={latestComments}
              onLatestCommentDelete={latestCommentRemoveHandler}
            />
          )}
          {!commentsVisibility && postId && (
            <LatestComments
              postId={postId}
              latestComments={latestComments}
              onLatestCommentDelete={latestCommentRemoveHandler}
            />
          )}
        </Box>
        <Box>
          <CommentInput
            postId={postId}
            appendComment={newCommentAppendHandler}
          />
        </Box>
        <Box marginY="8px" fontSize="13px" mx="10px">
          {likesCount > 0 ? `${likesCount} likes` : "No likes"}
        </Box>
      </>
    );
  };

  return (
    <PostBox className="postDataContainer">
      {isPostDataLoading ? <PostSkeleton /> : <PostContent />}
    </PostBox>
  );
};

export default React.memo(Post);
