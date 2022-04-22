import { Box, useStyleConfig } from "@chakra-ui/react";

function PostBox(props) {
  const styles = useStyleConfig("PostBox");

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles}>{props.children}</Box>;
}

export default PostBox;
