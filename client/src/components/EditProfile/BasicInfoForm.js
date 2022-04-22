import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useUploadImage from "../../hooks/useUploadImage";
import { loadUserDataUsingToken, updateUser } from "../../store/feed-actions";
import { UISliceActions } from "../../store/UISlice";
import setToastData from "../../utils/showToast";

function BasicInfoForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { imageError, imageChangeHandler, imageSrc, setImageSrc } =
    useUploadImage();

  const username = useSelector((state) => state.feed.userName);

  const {
    userProfileImage,
    userFullName,
    bio: retBio,
  } = useSelector((state) => state.feed);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    dispatch(UISliceActions.setPageLoading({ isPageLoading: true }));
    dispatch(loadUserDataUsingToken());
  }, []);

  useEffect(() => {
    if (userFullName && userFullName !== "") {
      const nameArray = userFullName.split(" ");
      const firstName = nameArray[0];
      let secondName = "";
      for (let i = 1; i < nameArray.length; i++) secondName += nameArray[i];
      setFName(firstName);
      setLName(secondName);
    }
    if (retBio) {
      setBio(retBio);
    }
    if (userProfileImage) {
      setImageSrc(userProfileImage);
    }
    dispatch(UISliceActions.setPageLoading({ isPageLoading: false }));
  }, [userFullName, retBio, userProfileImage]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (fName === "" || lName === "" || bio === "") {
      setToastData(dispatch, {
        success: false,
        msg: "Please fill all the textfields",
      });
      return;
    }

    formData.append("name", fName + " " + lName);
    formData.append("bio", bio);
    if (imageSrc !== "") {
      formData.append("profileImage", event.target.profileImage.files[0]);
    }

    dispatch(updateUser(formData)).then(() => {
      history.replace("/profile/" + username);
    });
  };

  const formCancelHandler = () => {
    if (fName === "" || lName === "" || bio === "") {
      setToastData(dispatch, {
        success: false,
        msg: "Please save the necessary details",
      });
      return;
    }
    history.replace("/");
  };

  return (
    <Box
      border={{ base: "1px solid", lg: "1px solid #ccc" }}
      borderRadius="12px"
    >
      <form
        style={{ padding: "0px 32px" }}
        encType="multipart/form-data"
        onSubmit={formSubmitHandler}
      >
        <Box paddingY="12px">
          <FormLabel htmlFor="profile-picture-upload">
            Set a profile picture
          </FormLabel>
          <input
            type="file"
            id="profile-picture-upload"
            hidden
            onChange={imageChangeHandler}
            accept="image/png image/jpg"
            name="profileImage"
          ></input>
          <label htmlFor="profile-picture-upload">
            <div className="profile-setup-image__wrapper">
              <Avatar size="xl" src={imageSrc}>
                <AvatarBadge border="none" boxSize="1.2em">
                  <Icon as={MdFileUpload} />
                </AvatarBadge>
              </Avatar>
            </div>
          </label>
          {imageError.status && (
            <Text color="red.500" fontSize="12px">
              {imageError.errorText}
            </Text>
          )}
        </Box>

        <Input
          placeholder="First name"
          size="md"
          my="12px"
          value={fName}
          isRequired
          onChange={(e) => setFName(e.target.value)}
        />
        <Input
          placeholder="Last name"
          size="md"
          my="12px"
          value={lName}
          isRequired
          onChange={(e) => setLName(e.target.value)}
        />

        <FormControl id="bioInput">
          <FormLabel htmlFor="bioTextArea">Add a bio</FormLabel>
          <Textarea
            id="bioTextArea"
            resize="none"
            rows="6"
            value={bio}
            name="bio"
            isRequired
            maxLength="100"
            onChange={(e) => setBio(e.target.value)}
          ></Textarea>
        </FormControl>

        <Stack direction="row" mt="24px" p="4px" spacing="24px">
          <Button type="submit" colorScheme="green" w="100%">
            Submit
          </Button>
          <Button colorScheme="blue" w="100%" onClick={formCancelHandler}>
            Skip
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default BasicInfoForm;
