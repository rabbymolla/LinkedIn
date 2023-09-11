import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FcTwoSmartphones } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../Validation/yup";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import "./ragistration.css";

const Ragistration = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const auth = getAuth();
  const [loding, setLoding] = useState(false);
  const naviget = useNavigate();
  const db = getDatabase();
  // formik use
  const formik = useFormik({
    initialValues: {
      fulName: "",
      email: "",
      password: "",
    },
    validationSchema: signUp,
    onSubmit: () => {
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.fulName,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  set(ref(db, "users/" + user.uid), {
                    userName: user.displayName,
                    email: user.email,
                  });
                  toast.success("Check Your Email Verifycation", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                })
                .catch((error) => {
                  console.log(error.code);
                });
            })
            .catch((error) => {
              console.log(error.code);
            });
          setLoding(false);
          formik.resetForm();
          setTimeout(() => {
            naviget("/login");
          }, 4300);
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            toast.error("Email Already in Use", {
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
        <ChakraProvider>
          <ToastContainer />
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
            <div className="hading">
              <h1>Make the most of your professional life</h1>
            </div>
            <Box
              bg="white"
              w="lg"
              p={6}
              margin="auto"
              borderRadius="lg"
              mt={30}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="input_field">
                  <h1>Name</h1>
                  <InputGroup size="lg" mt={3}>
                    <Input
                      pr="4.5rem"
                      type="text"
                      onChange={formik.handleChange}
                      name="fulName"
                      onBlur={formik.handleBlur}
                      value={formik.values.fulName}
                    />
                  </InputGroup>
                  {formik.errors.fulName ? (
                    <p className="error">{formik.errors.fulName}</p>
                  ) : null}
                </div>
                <div className="input_field">
                  <h1>Email</h1>
                  <InputGroup size="lg" mt={3}>
                    <Input
                      pr="4.5rem"
                      type="email"
                      onChange={formik.handleChange}
                      name="email"
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </InputGroup>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="error">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="input_field">
                  <h1>Password</h1>
                  <InputGroup size="lg" mt={3}>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={formik.handleChange}
                      name="password"
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="error">{formik.errors.password}</p>
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
                    Agree & Join
                  </Button>
                )}
                <div className="border_bottom">
                  <p>or</p>
                </div>
                <NavLink to="/phone">
                  <Box
                    bg="white"
                    w="md"
                    p={1}
                    margin="auto"
                    borderRadius="50px"
                    mt={5}
                    borderColor="black"
                    border="1px"
                    cursor="pointer"
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <FcTwoSmartphones className="google" />
                      <h1 className="google_text">Sign In With Phone </h1>
                    </Flex>
                  </Box>
                </NavLink>
                <Flex alignItems="center" justifyContent="center" mt={5}>
                  <p className="already_tittle">Already on LinkedIn? </p>
                  <NavLink className="signIn" to="/login">
                    Sign in
                  </NavLink>
                </Flex>
              </form>
            </Box>
          </Container>
        </ChakraProvider>
      </section>
    </>
  );
};

export default Ragistration;
