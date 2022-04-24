import { Box, Container, Heading } from "@chakra-ui/react";
import React from "react";
import SuggestedUserList from "../components/Feed/RightBar/SuggestedUserList";

import "./SuggestionsPage.css";

const SuggestionsPage = () => {
  return (
    <Container maxWidth="lg" className="suggestionsPage">
      <Box
        marginY={{
          base: "2.4rem",
          lg: "3rem",
        }}
      >
        <Heading size="xl" textAlign="center">
          People you may know
        </Heading>
        <Box
          marginY={{
            base: "3rem",
            md: "3.2rem",
            lg: "4.4rem",
          }}
        >
          <Container maxWidth="sm">
            <SuggestedUserList count={10} />
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default SuggestionsPage;
