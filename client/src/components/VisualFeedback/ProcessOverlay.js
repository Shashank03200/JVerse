import React from "react";
import { Spinner } from "@chakra-ui/react";
import CheckCorrectGif from "../../assets/check-correct.gif";
import CrossWrongGif from "../../assets/cross-wrong.gif";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

import "./ProcessOverlay.css";

function ProcessOverlay(props) {
  const loadingState = props.data.loading.status;
  const loadingMessage = props.data.loading.msg;
  const resultState = props.data.result.status;
  const resultMessage = props.data.result.msg;
  const active = props.data.active;

  return (
    <div className="processOverlayBackdrop">
      <Modal isOpen={active} isCentered>
        <ModalOverlay />
        {loadingState === true ? (
          <ModalContent>
            <ModalHeader textAlign={{ base: "center", md: "left" }}>
              Processing
            </ModalHeader>

            <ModalBody textAlign="center">
              {loadingMessage}
              <br />
              <Spinner
                marginTop="30px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </ModalBody>
          </ModalContent>
        ) : null}
        {resultState !== undefined ? (
          <ModalContent>
            <ModalHeader textAlign={{ base: "center", md: "left" }}>
              {resultMessage}
            </ModalHeader>

            <ModalBody display="flex" justifyContent="center">
              <img
                src={resultState === true ? CheckCorrectGif : CrossWrongGif}
                className="processResultGif"
              />

              <br />
            </ModalBody>
          </ModalContent>
        ) : null}
      </Modal>
    </div>
  );
}

export default ProcessOverlay;
