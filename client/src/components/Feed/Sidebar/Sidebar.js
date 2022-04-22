import { Box } from "@chakra-ui/layout";

const Sidebar = () => {
  return (
    <Box
      pos="sticky"
      display={{ base: "none", lg: "block" }}
      top="0"
      left="0"
      height="100vh"
      width={{ sm: "10px", lg: "250px" }}
      bgColor="feedBackground.200"
    ></Box>
  );
};

export default Sidebar;
