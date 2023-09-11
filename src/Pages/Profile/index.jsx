import React from "react";
import "./profile.css";
import { Grid, GridItem } from "@chakra-ui/react";
import Bannaer from "../../Commponent/Bannar";
import ProfleShow from "../../Commponent/ProfileShow";

const Profile = () => {
  return (
    <>
      <section id="">
        <Grid
          templateColumns="repeat(1, 1fr)"
          bg="white"
          borderRadius="10px"
          overflow="hidden"
          border="1px solid var(--border_color)"
        >
          <GridItem w="100%">
            <Bannaer />
          </GridItem>
          <GridItem w="100%" p={5}>
            <ProfleShow />
          </GridItem>
        </Grid>
      </section>
    </>
  );
};

export default Profile;
