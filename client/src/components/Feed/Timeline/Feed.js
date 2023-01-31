import Post from "../../Post/Post";

import { useCallback, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { Spinner } from "@chakra-ui/spinner";

import PostSkeleton from "../../Post/PostSkeleton";

import NoPostsFound from "../../Profile/NoPostsFound";
import { useRef } from "react";
import setToastData from "../../../utils/showToast";
import routeInstance from "../../../api/routes.instance";
import useFetchPosts from "../../../hooks/useFetchPosts";
import { interactivity } from "@chakra-ui/react";

const Feed = () => {
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, isError, results, error, hasNextPage } =
    useFetchPosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post !");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) {
        intObserver.current.observe(post);
      }
    },
    [isLoading, hasNextPage]
  );

  console.log(results[0]);

  return (
    <Box
      flex="5"
      marginX={{ base: "0px" }}
      bgColor="feedBackground.200"
      minHeight="90vh"
    >
      {results.map((post, index) => {
        const isLastPost = index === results.length - 1;
        if (isLastPost) {
          return (
            <Post key={index + post._id} postData={post} ref={lastPostRef} />
          );
        }
        return <Post key={index + post._id} postData={post} />;
      })}
      {hasNextPage && isLoading && (
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

      {!hasNextPage && (
        <Box
          padding="12px"
          style={{ textAlign: "center" }}
          backgroundColor="navBackground.200"
        >
          <Text fontSize="lg">You are all caught up</Text>
        </Box>
      )}
    </Box>
  );
};

export default Feed;
