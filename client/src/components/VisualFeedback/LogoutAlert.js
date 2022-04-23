import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { authSliceActions } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../store/auth-actions";
import { removeTokens } from "../../utils/handleTokens";
import { userSliceActions } from "../../store/userSlice";

function LogoutAlert(props) {
  const { isOpen, onClose } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const userLogoutHandler = () => {
    dispatch(signOutUser()).then(() => {
      removeTokens();
      dispatch(userSliceActions.resetUserData());
      dispatch(authSliceActions.logoutUser());
      props.onClose();
      history.replace("/login");
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure to log out ?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={userLogoutHandler}>
              Logout
            </Button>
            <Button onClick={onClose} colorScheme="yellow">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutAlert;
