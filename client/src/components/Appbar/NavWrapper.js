import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Appbar/Navbar";

function NavWrapper(props) {
  return (
    <Box mx="auto">
      <Navbar />
      {props.children}
    </Box>
  );
}

export default NavWrapper;
