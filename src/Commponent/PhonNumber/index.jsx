import React, { useState } from "react";
import "./phone.css";
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
import PhoneInput from "react-phone-number-input";
import { NavLink, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUsers } from "../../Feature/Slice/LoginSlice";
import { getDatabase, ref, set } from "firebase/database";

const PhonNumber = () => {
  const users = useSelector((user) => user.counter.value);
  const [show, setShow] = React.useState(true);
  const handleClick = () => setShow(!show);
  const [value, setValue] = useState("");
  const auth = getAuth();
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [confarim, setConfarim] = useState("");
  const db = getDatabase();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (value == "" || value === undefined)
      return setError("Please Enter Phone Number");
    try {
      const response = await setUpRecaptcha(value);
      setConfarim(response);
      setFlag(true);
      setError("");
    } catch (error) {
      setError("Please Enter a Valied Phone Number");
      setValue("");
    }
  };

  function setUpRecaptcha(value) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, value, recaptchaVerifier);
  }

  // verify OTP
  const [OTP, setOTP] = useState("");
  const Naviget = useNavigate();
  const dispath = useDispatch();
  const [loding, setLoding] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (OTP == "" || OTP === null) return setError("Please Add Your OTP");
    try {
      setError("");
      await confarim.confirm(OTP).then(({ user }) => {
        set(ref(db, "users/" + user.uid), {
          userName: user.displayName,
          email: user.phoneNumber,
        });
        dispath(LoginUsers(user));
        localStorage.setItem("values", JSON.stringify(user));
        setLoding(true);
        setTimeout(() => {
          Naviget("/");
        }, 2000);
      });
    } catch (err) {
      setError("Please Enter a Valied OTP");
      setLoding(false);
    }
  };
  return (
    <>
      <section id="phone">
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
            <div className="hading">
              <h1>Your Phone Number Verify</h1>
            </div>
            <Box
              bg="white"
              w="lg"
              p={6}
              margin="auto"
              borderRadius="lg"
              mt={30}
            >
              <form
                onSubmit={getOtp}
                style={{ display: !flag ? "block" : "none" }}
              >
                <div className="input_field">
                  <h1>Phone Number</h1>
                  <InputGroup size="lg" mt={5}>
                    <PhoneInput
                      defaultCountry="BD"
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                    />
                  </InputGroup>
                  {error && <p className="error">{error} </p>}
                </div>

                {value && <div id="recaptcha-container"></div>}

                <Button
                  colorScheme="blue"
                  width="100%"
                  borderRadius="50px"
                  size="lg"
                  type="submit"
                >
                  Send OTP
                </Button>

                <div className="border_bottom">
                  <p>or</p>
                </div>

                <Flex alignItems="center" justifyContent="center" mt={5}>
                  <p className="already_tittle">Creacet on LinkedIn? </p>
                  <NavLink className="signIn" to="/ragistration">
                    Sign Up
                  </NavLink>
                </Flex>
              </form>
              <form
                onSubmit={verifyOtp}
                style={{ display: flag ? "block" : "none" }}
              >
                <div className="input_field">
                  <h1>Check Your OTP</h1>
                  <InputGroup size="lg" mt={5}>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter OTP"
                      onChange={(e) => setOTP(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  {error && <p className="error">{error}</p>}
                </div>
                {loding ? (
                  <Button
                    colorScheme="blue"
                    width="100%"
                    borderRadius="50px"
                    size="lg"
                    type="submit"
                  >
                    Login...
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    width="100%"
                    borderRadius="50px"
                    size="lg"
                    type="submit"
                  >
                    VerifY OTP
                  </Button>
                )}

                <div className="border_bottom">
                  <p>or</p>
                </div>
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

export default PhonNumber;
