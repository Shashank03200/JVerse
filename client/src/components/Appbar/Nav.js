import { Box, useStyleConfig } from "@chakra-ui/react";

function Nav(props) {
  const styles = useStyleConfig("Nav");

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles}>{props.children}</Box>;
}

export default Nav;
