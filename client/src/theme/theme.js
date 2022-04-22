import { extendTheme, theme as base } from "@chakra-ui/react";
import NavStyles from "./styles/NavbarStyles";
import PostBoxStyles from "./styles/PostBoxStyles";
import HeadingStyles from "./styles/HeadingStyles";

const theme = extendTheme({
  components: {
    Nav: NavStyles,
    PostBox: PostBoxStyles,
    // Heading: HeadingStyles,
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inconsolata, sans-serif",
  },
  colors: {
    heart: {
      200: "#ED4956",
    },
    feedBackground: {
      200: "#fdf9f5",
    },
    navBackground: {
      300: "#DDF2FF",
    },
    navIconColor: {
      500: "#fff",
    },
  },
});

export default theme;
