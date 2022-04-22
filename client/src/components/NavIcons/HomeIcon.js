import React from "react";
import { Icon } from "@chakra-ui/react";
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function HomeIcon(props) {
  const history = useHistory();

  return (
    <Icon
      as={props.activeIcon.home === true ? IoHomeSharp : IoHomeOutline}
      w="24px"
      h="24px"
      className="action-icon"
      onClick={() => {
        history.replace("/");
      }}
    />
  );
}

export default HomeIcon;
