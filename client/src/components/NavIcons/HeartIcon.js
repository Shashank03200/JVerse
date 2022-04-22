import React from "react";
import { Icon } from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useHistory } from "react-router-dom";

function HeartIcon(props) {
  const history = useHistory();

  return (
    <Icon
      as={props.activeIcon.update === true ? IoMdHeart : IoMdHeartEmpty}
      w="24px"
      h="24px"
      className="action-icon"
      onClick={() => {
        history.replace("/update");
      }}
    />
  );
}

export default HeartIcon;
