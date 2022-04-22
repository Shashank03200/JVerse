import { Box } from "@chakra-ui/react";
import React from "react";

import Feed from "../components/Feed/Timeline/Feed";
import Sidebar from "../components/Feed/Sidebar/Sidebar";
import RightBar from "../components/Feed/RightBar/RightBar";

const FeedPage = () => {
  console.log("feed page rerendered");
  return (
    <Box d="flex">
      <Sidebar />
      <Feed />
      <RightBar />
    </Box>
  );
};

export default React.memo(FeedPage);
