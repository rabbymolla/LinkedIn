import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RiNotification2Fill } from "react-icons/ri";
import { MdOutlineDarkMode } from "react-icons/md";
import Search from "../Search";
import "./sidebar.css";
import ViewProfile from "../ViewProfile";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [protal, setprotal] = useState(false);
  const handleProtal = () => {
    setprotal(true);
  };

  const users = useSelector((user) => user.counter.value);
  return (
    <>
      <section>
        <ToastContainer />
        <Grid templateColumns="repeat(12, 1fr)" gap={2} alignItems="center">
          <GridItem colStart={0} colEnd={1} w="100%">
            <Box>
              <NavLink>
                <picture>
                  <img
                    loading="lazy"
                    width={38}
                    src="../images/linkedin.jpg"
                    alt="logo"
                  />
                </picture>
              </NavLink>
            </Box>
          </GridItem>
          <GridItem colSpan={5} w="100%">
            <Search />
          </GridItem>
          <GridItem pl={5} colSpan={7} w="100%">
            <Flex alignItems="center">
              <Flex alignItems="center" justifyContent="space-between" w="60%">
                <div className="home_icom">
                  <NavLink to="/">
                    <FaHome />
                    <p> Home</p>
                  </NavLink>
                </div>
                <div className="home_icom">
                  <NavLink to="/message">
                    <BiSolidMessageRoundedDots />
                    <p>Messaging</p>
                  </NavLink>
                </div>
                <div className="home_icom">
                  <NavLink to="/notification">
                    <RiNotification2Fill />
                    <p>Notifications</p>
                  </NavLink>
                </div>
                <div className="home_profile">
                  <Popover placement="bottom-end">
                    <PopoverTrigger>
                      <Button onClick={handleProtal}>
                        <div className="home_profile_img">
                          <picture>
                            <img
                              src={users.photoURL || "./images/user.png"}
                              onError={(e) => {
                                e.target.src = "./images/user.png";
                              }}
                              loading="lazy"
                              alt="profile-1"
                            />
                          </picture>
                        </div>

                        <p>
                          Me <IoIosArrowDown />
                        </p>
                      </Button>
                    </PopoverTrigger>

                    <Portal>
                      {protal && (
                        <PopoverContent marginTop="10px">
                          <PopoverArrow />
                          {/* <PopoverCloseButton /> */}
                          <PopoverHeader>
                            <ViewProfile
                              protal={protal}
                              setprotal={setprotal}
                            />
                          </PopoverHeader>
                        </PopoverContent>
                      )}
                    </Portal>
                  </Popover>
                </div>
              </Flex>
              <Flex w="40%" alignItems="center" justifyContent="end">
                <div className="dark_mode">
                  <NavLink>
                    <MdOutlineDarkMode />
                  </NavLink>
                </div>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </section>
    </>
  );
};

export default Navbar;
