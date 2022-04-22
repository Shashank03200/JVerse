import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import BasicInfoForm from "../components/EditProfile/BasicInfoForm";
import SecurityInfoForm from "../components/EditProfile/SecurityInfoForm";

function EditProfile() {
  return (
    <Container maxWidth="600px">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Basic Information</Tab>
          <Tab>Security</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BasicInfoForm />
          </TabPanel>
          <TabPanel>
            <SecurityInfoForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default EditProfile;
