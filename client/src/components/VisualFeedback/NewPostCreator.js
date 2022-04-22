import { Box, Icon, Button, Text, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { createNewPost } from "../../store/post-actions";

import { UISliceActions } from "../../store/UISlice";
import { useHistory } from "react-router-dom";
import useUploadImage from "../../hooks/useUploadImage";

const NewPostCreator = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isModalOpen = useSelector((state) => state.UISlice.isModalOpen);
  const {
    imageError,
    setImageFilename,
    setImageError,
    imageChangeHandler,
    imageSrc,
    setImageSrc,
  } = useUploadImage();

  const [caption, setCaption] = useState("");

  const imageRef = useRef();

  const togglePostCreatorModalVisibility = () => {
    setImageSrc("");
    setCaption("");
    setImageFilename("");
    dispatch(UISliceActions.toggleModalVisibility());
  };

  const postSubmitHandler = (event) => {
    event.preventDefault();
    if (imageSrc === "") {
      setImageError({ status: true, errorText: "Please select a image" });
      return;
    }

    const formData = new FormData();
    formData.append("desc", caption);
    formData.append("postImage", event.target.postImage.files[0]);

    dispatch(createNewPost(formData)).then(() => {
      setImageSrc("");
      setImageFilename("");
      setCaption("");
      history.push("/");
      // document.querySelector("").scrollTo(0, 0)
    });
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isModalOpen}
      size="xl"
      onClose={togglePostCreatorModalVisibility}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Create your post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box mt="3">
            <form
              encType="multipart/form-data"
              method="POST"
              onSubmit={postSubmitHandler}
              autoComplete="off"
              action="/api/posts/newpost"
            >
              <Input
                placeholder="Add a caption"
                name="caption"
                size="sm"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                value={caption}
              />

              <Box minHeight="60vh" p="16px" textAlign="center">
                <input
                  type="file"
                  id="actual-btn"
                  name="postImage"
                  isRequired={true}
                  hidden
                  onChange={imageChangeHandler}
                />

                <label className="fileLabel" htmlFor="actual-btn">
                  <Icon as={MdFileUpload} />
                  &nbsp;&nbsp;
                  <span>Select an image</span>
                </label>
                <Text
                  mt={{ base: "14px", md: "18px" }}
                  fontSize="sm"
                  id="file-chosen"
                >
                  <Text fontWeight={500} d="inline">
                    {/* {imageSrc && "Filename:    "} */}
                  </Text>
                  {/* {imageFilename} */}
                </Text>
                {imageError.status && (
                  <Text color="red.500" fontSize="12px">
                    {imageError.errorText}
                  </Text>
                )}

                <div className="postUploadFlex">
                  {/* {isImageLoading && <Spinner size="lg" />} */}
                  <div className="postUploadImageConatainer">
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        objectFit="contain"
                        ref={imageRef}
                        alt="coint"
                        className="postUploadImage"
                      />
                    )}
                  </div>
                </div>
              </Box>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  disabled={imageError.status}
                >
                  Create Post
                </Button>
                <Button onClick={togglePostCreatorModalVisibility}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewPostCreator;
