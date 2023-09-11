import { ChakraProvider, Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Commponent/Sidebar";
import { Outlet } from "react-router-dom";
import "./rootLayOut.css";

const RootLayOut = () => {
  return (
    <>
      <section id="rootlayout">
        <ToastContainer />
        <ChakraProvider>
          <Container maxW="container.xl">
            <Grid templateColumns="repeat(1, 1fr)">
              <GridItem w="100%">
                <Navbar />
              </GridItem>
            </Grid>
          </Container>
        </ChakraProvider>
      </section>
      <section>
        <ToastContainer />
        <ChakraProvider>
          <Container maxW="container.xl">
            <Grid templateColumns="repeat(1, 1fr)" gap={5}>
              <GridItem w="100%">
                <Outlet />
              </GridItem>
            </Grid>
          </Container>
        </ChakraProvider>
      </section>
    </>
  );
};

export default RootLayOut;
