import { Box, Image, HStack, Avatar } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import JVerseLogo from "../../assets/jverse logo.png";

import NewPostIcon from "../CustomIcons/NewPostIcon";
import HomeIcon from "../NavIcons/HomeIcon";
import HeartIcon from "../NavIcons/HeartIcon";
import Nav from "./Nav";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();

  const isModalOpen = useSelector((state) => state.UISlice.isModalOpen);
  const { userFullname, userProfileImage, userName } = useSelector(
    (state) => state.user
  );

  const [activeIcon, setActiveIcon] = useState({
    home: location.pathname === "/" && !isModalOpen,
    update: location.pathname === "/update" && !isModalOpen,
    newPost: isModalOpen,
    profile: location.pathname === `/profile/${userName}` && !isModalOpen,
  });

  useEffect(() => {
    setActiveIcon({
      home: location.pathname === "/" && !isModalOpen,
      update: location.pathname === "/update" && !isModalOpen,
      newPost: isModalOpen,
      profile: location.pathname === "/profile" && !isModalOpen,
    });
  }, [location.pathname, setActiveIcon, isModalOpen]);

  return (
    <Nav>
      <Box display="flex" width={{ base: "100%", lg: "66%" }}>
        <Box>
          <Link to="/">
            <Image
              src={JVerseLogo}
              objectFit="contain"
              height={{ base: "40px", xl: "60px" }}
            />
          </Link>
        </Box>

        <Box
          flex="4"
          p="10px"
          paddingRight={{ base: "10px", xl: "48px" }}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <HStack
            spacing="24px"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <HomeIcon activeIcon={activeIcon} />

            <NewPostIcon activeIcon={activeIcon} isModalOpen={isModalOpen} />

            <HeartIcon activeIcon={activeIcon} />

            <Box
              width="min-content"
              display="flex"
              alignItems="center"
              border={activeIcon.profile ? "3px solid #3C91E6" : "none"}
              borderRadius="50%"
            >
              <Avatar
                height={activeIcon.profile ? "20px" : "24px"}
                width={activeIcon.profile ? "20px" : "24px"}
                size="xs"
                name={userFullname}
                src={userProfileImage}
                className="action-icon"
                onClick={() => {
                  history.push(`/profile/${userName}`);
                }}
              />
            </Box>
          </HStack>
        </Box>
      </Box>
    </Nav>
  );
};

export default Navbar;
