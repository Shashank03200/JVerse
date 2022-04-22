import { Box, Center, Grid, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import NoPostsFound from "./NoPostsFound";

function ProfilePosts(props) {
  const fetchedPosts = props.fetchedPosts;

  if (fetchedPosts) {
    if (fetchedPosts.length === 0) {
      return <NoPostsFound />;
    } else {
      const profilePostsContainer = (
        <Box mt="28px">
          <hr style={{ height: "4px" }} />
          <Center>
            <Text fontSize="2xl">POSTS</Text>
          </Center>
          <hr />
          <Box
            className="ProfilePage__PostsWrapper"
            paddingX={{ base: "4px", md: "60px", lg: "180px", xl: "340px" }}
          >
            {fetchedPosts.map((image, index) => {
              return (
                <Grid
                  className="profileImageWrapper"
                  justifyItems="center"
                  key={index}
                >
                  <Box
                    className="postImageContainer"
                    borderRadius="12px"
                    d="flex"
                    key={index}
                    justifyContent="center"
                    alignContent="center"
                  >
                    <Image
                      src={image.postImage}
                      alt="profile-image"
                      objectFit="contain"
                    />
                  </Box>
                </Grid>
              );
            })}
          </Box>
        </Box>
      );

      return profilePostsContainer;
    }
  }

  return (
    <Box>
      <Spinner />
    </Box>
  );
}

export default ProfilePosts;
