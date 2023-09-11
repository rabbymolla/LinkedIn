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
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./login.css";
import { useFormik } from "formik";
import { signIn } from "../../Validation/yup";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { LoginUsers } from "../../Feature/Slice/LoginSlice";
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const auth = getAuth();
  const [loding, setLoding] = useState(false);
  const dispath = useDispatch();

  // formik
  const naviget = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signIn,
    onSubmit: () => {
      setLoding(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          if (auth.currentUser.emailVerified == true) {
            dispath(LoginUsers(user));
            localStorage.setItem("values", JSON.stringify(user));
            naviget("/");
            setLoding(false);
          } else {
            toast.error("Eamil Verified Needed", {
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
          }
        })
        .catch((error) => {
          setLoding(false);
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
          } else if (error.code.includes("auth/wrong-password")) {
            toast.error("Wrong Password", {
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
        });
    },
  });

  // google auth

  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        set(ref(db, "users/" + user.uid), {
          userName: user.displayName,
          email: user.email,
        }).then(() => {
          dispath(LoginUsers(user));
          localStorage.setItem("values", JSON.stringify(user));
        });

        naviget("/");
      })
      .catch((error) => {
        if (error.code.includes("auth/cancelled-popup-request")) {
          toast.error("Login Faild", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (error.code.includes("auth/popup-closed-by-user")) {
          toast.error("Login Faild", {
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
      });
  };
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
                <h1 className="sign_hadding">Sign in</h1>
                <p className="signTittle">
                  Stay updated on your professional world
                </p>
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
                <div className="input_field">
                  <h1>Password</h1>
                  <InputGroup size="lg" mt={3}>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={formik.handleChange}
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
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
                <div className="forget">
                  <NavLink to="/forgot">Forgot password?</NavLink>
                </div>
                {loding ? (
                  <Button
                    colorScheme="blue"
                    width="100%"
                    borderRadius="50px"
                    size="lg"
                    mt={4}
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
                    mt={4}
                    type="submit"
                  >
                    Sign In
                  </Button>
                )}

                <div className="border_bottom">
                  <p>or</p>
                </div>

                <Box
                  bg="white"
                  w="sm"
                  p={1}
                  margin="auto"
                  borderRadius="50px"
                  mt={30}
                  borderColor="black"
                  border="1px"
                  cursor="pointer"
                  onClick={handleGoogle}
                >
                  <Flex alignItems="center" justifyContent="center">
                    <FcGoogle className="google" />
                    <h1 className="google_text">Continu With Google </h1>
                  </Flex>
                </Box>
                <Box
                  bg="white"
                  w="sm"
                  p={1}
                  margin="auto"
                  borderRadius="50px"
                  mt={4}
                  borderColor="black"
                  border="1px"
                  cursor="pointer"
                >
                  <Flex alignItems="center" justifyContent="center">
                    <ImAppleinc className="google" />
                    <h1 className="google_text">Sign In With Apple </h1>
                  </Flex>
                </Box>
                <Flex alignItems="center" justifyContent="center" mt={5}>
                  <p className="already_tittle">Creacet on LinkedIn? </p>
                  <NavLink className="signIn" to="/ragistration">
                    Sign Up
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

export default Login;
