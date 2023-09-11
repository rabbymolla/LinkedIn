import React, { useState } from "react";
import "./forget.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useFormik } from "formik";
import { forgot } from "../../Validation/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const [loding, setLoding] = useState(false);
  const auth = getAuth();
  const naviget = useNavigate();

  //   formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgot,
    onSubmit: () => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          toast.success("Check Your email Account", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoding(false);
          setTimeout(() => {
            naviget("/login");
          }, 3500);
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            toast.error("Wrong Eamil Addrese", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          setLoding(false);
        });
      setLoding(true);
    },
  });

  return (
    <>
      <section>
        <ToastContainer />
        <ChakraProvider>
          <Container maxW="container.xl">
            <Flex alignItems="center" mt={30}>
              <h1 className="linke">Linked</h1>
              <picture>
                <img
                  loading="lazy"
                  width={38}
                  src="../images/linkedin.jpg"
                  alt="logo"
                />
              </picture>
            </Flex>
            <Box
              bg="white"
              w="md"
              p={6}
              margin="auto"
              borderRadius="lg"
              mt={30}
            >
              <Box mb={8}>
                <h1 className="sign_hadding">Forgot password?</h1>
                <p className="signTittle">Reset password in two quick steps</p>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <div className="input_field">
                  <h1>Email</h1>
                  <InputGroup size="lg" mt={3}>
                    <Input
                      pr="4.5rem"
                      type="email"
                      onChange={formik.handleChange}
                      name="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="error">{formik.errors.email}</p>
                  ) : null}
                </div>

                {loding ? (
                  <Button
                    colorScheme="blue"
                    width="100%"
                    borderRadius="50px"
                    size="lg"
                    type="submit"
                  >
                    <ClipLoader color="#fff" /> Sending...
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    width="100%"
                    borderRadius="50px"
                    size="lg"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                )}

                <NavLink to="/login">
                  <Button width="100%" borderRadius="50px" size="lg" mt={4}>
                    Back
                  </Button>
                </NavLink>
              </form>
            </Box>
          </Container>
        </ChakraProvider>
      </section>
    </>
  );
};

export default Forget;
