import React from "react";
import { Box, Center, Container, Heading } from "@chakra-ui/react";

import UpdatePasswordForm from "./UpdatePasswordForm";
import AccountDeleteForm from "./AccountDeleteForm";

function SecurityInfoForm() {
  return (
    <Container maxW="lg">
      <Center>
        <Heading as="h3">Security</Heading>
      </Center>

      <Box fontSize={{ md: "24px" }} marginY="20px">
        Update your password:{" "}
      </Box>
      <Box as="form">
        <UpdatePasswordForm />
      </Box>
      <AccountDeleteForm />
    </Container>
  );
}

export default SecurityInfoForm;
