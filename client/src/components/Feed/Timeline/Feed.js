import Post from "../../Post/Post";
import { loadTimelinePosts } from "../../../store/feed-actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { Spinner } from "@chakra-ui/spinner";

import PostSkeleton from "../../Post/PostSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { feedSliceActions } from "../../../store/feedSlice";
import NoPostsFound from "../../Profile/NoPostsFound";

const Feed = () => {
  const dispatch = useDispatch();
  const { timelinePosts, morePosts, page } = useSelector((state) => state.feed);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      await setLoading(true);
      console.log("loadingPosts");
      await dispatch(loadTimelinePosts(page));
      setLoading(false);
    }

    if (morePosts === true) {
      loadPosts();
    }
    return () => {
      dispatch(feedSliceActions.setMorePostsBoolean(false));
    };
  }, [page, dispatch, morePosts]);

  const pageIncreaseHandler = useCallback(() => {
    dispatch(feedSliceActions.incrementPage());
  }, [dispatch]);

  return (
    <Box
      flex="5"
      marginX={{ base: "0px" }}
      bgColor="feedBackground.200"
      minHeight="90vh"
    >
      <InfiniteScroll
        dataLength={timelinePosts.length}
        next={pageIncreaseHandler}
        hasMore={morePosts}
        loader={<PostSkeleton />}
        endMessage={
          timelinePosts.length > 0 ? (
            <Box
              padding="12px"
              style={{ textAlign: "center" }}
              backgroundColor="navBackground.200"
            >
              <Text fontSize="lg">You are all caught up</Text>
            </Box>
          ) : (
            <NoPostsFound />
          )
        }
      >
        {timelinePosts.map((post, index) => (
          <Post key={index + post._id} postData={post} />
        ))}
      </InfiniteScroll>

      {loading && (
        <Box display="flex" justifyContent="center">
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
