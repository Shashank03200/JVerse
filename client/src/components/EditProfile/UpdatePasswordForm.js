import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  VStack,
} from "@chakra-ui/react";
import { updateUserPassword } from "../../store/auth-actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import showToast from "../../utils/showToast";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userId = useSelector((state) => state.feed.userId);
  const dispatch = useDispatch();

  const passwordUpdateHandler = () => {
    if (
      currentPassword.length + newPassword.length + confirmPassword.length <
      18
    ) {
      showToast(dispatch, { msg: "Password length atleast 6" });
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(dispatch, {
        msg: "Please confirm new password correctly.",
      });
      return;
    }

    dispatch(updateUserPassword(currentPassword, newPassword, userId)).then(
      () => {
        console.log("Reset");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    );
  };

  return (
    <VStack spacing={6} align="stretch" className="security-info__form">
      <FormControl isRequired>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem>
            <FormLabel htmlFor="currentPasswordInput">
              Enter current password:{" "}
            </FormLabel>
          </GridItem>

          <GridItem>
            <Input
              id="currentPasswordInput"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </GridItem>
        </Grid>
      </FormControl>

      <FormControl isRequired>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem>
            <FormLabel htmlFor="newPasswordInput">
              Enter new password:{" "}
            </FormLabel>
          </GridItem>
          <GridItem>
            <Input
              id="newPasswordInput"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </GridItem>
        </Grid>
      </FormControl>

      <FormControl isRequired>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <GridItem>
            <FormLabel htmlFor="confirmNewPasswordInput">
              Confirm new password:{" "}
            </FormLabel>
          </GridItem>
          <GridItem>
            <Input
              id="confirmNewPasswordInput"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </GridItem>
        </Grid>
      </FormControl>

      <Box display="flex" justifyContent="end">
        <Button
          colorScheme="teal"
          width="fit-content"
          onClick={passwordUpdateHandler}
        >
          Save changes
        </Button>
      </Box>
    </VStack>
  );
};

export default UpdatePasswordForm;
