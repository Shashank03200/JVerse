import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";

import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import { postDeleteActionHandler } from "../../store/post-actions";

export default function PostContextMenu({ postId, postDeletePossible }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const postDeleteHandler = () => {
    dispatch(postDeleteActionHandler(postId))
      .then(() => {
        setIsOpen(false);
      })
      .catch(() => {
        setIsOpen(false);
      });
  };

  return (
    <Fragment>
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Post
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={postDeleteHandler} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>

      <Menu>
        <MenuButton>
          <Icon
            as={AiOutlineEllipsis}
            fontSize="20px"
            className="action-icon"
          />
        </MenuButton>
        <MenuList>
          {/* MenuItems are not rendered unless Menu is open */}
          {postDeletePossible && (
            <MenuItem onClick={() => setIsOpen(true)}>Delete Post</MenuItem>
          )}
          {/* <MenuItem>Open Post</MenuItem> */}
          <MenuItem>Report</MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
}
