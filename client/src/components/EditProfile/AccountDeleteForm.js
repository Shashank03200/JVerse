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
import { deleteUserAccount } from "../../store/auth-actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AccountDeleteForm = () => {
  const history = useHistory();
  const userId = useSelector((state) => state.feed.userId);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const accountDeleteHandler = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      alert("Password should be atleast 6 chars long");
      return;
    }

    dispatch(deleteUserAccount(password, userId)).then(() => {
      history.push("/");
    });
  };

  return (
    <form className="security-info__form">
      <Box fontSize={{ md: "24px" }} marginY="20px">
        Delete your account :
      </Box>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2, 1fr)",
            }}
            gap={4}
          >
            <GridItem>
              <FormLabel htmlFor="passwordInput">
                Enter current password:{" "}
              </FormLabel>
            </GridItem>

            <GridItem>
              <Input
                id="passwordInput"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <Box display="flex" justifyContent="end">
          <Button
            colorScheme="red"
            variant="solid"
            onClick={accountDeleteHandler}
          >
            Delete Account
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

export default AccountDeleteForm;
