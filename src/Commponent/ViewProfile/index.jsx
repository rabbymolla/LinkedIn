import React from "react";
import "./viewProfile.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";
import { LoginUsers } from "../../Feature/Slice/LoginSlice";
import { DataUsers } from "../../Feature/Slice/UserSlice";

const ViewProfile = ({ protal, setProtal }) => {
  const handleOff = () => {
    setProtal(false);
  };

  const users = useSelector((user) => user.counter.value);
  const userData = useSelector((user) => user.data.user);
  const dispatch = useDispatch();

  // log out part

  const handleLogOut = () => {
    localStorage.removeItem("values");
    dispatch(LoginUsers(null));
  };

  return (
    <>
      {protal && (
        <section>
          <Box>
            <Flex alignItems="center">
              <div className="viewProfile_img">
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
              <div className="view_content">
                {users.displayName ? (
                  <h1>{users.displayName}</h1>
                ) : (
                  <h1>Your Name</h1>
                )}

                {userData.headline ? (
                  <p>{userData.headline}</p>
                ) : (
                  <p>Your Job Title</p>
                )}
              </div>
            </Flex>
            <NavLink to="/profile" onClick={handleOff}>
              <Button
                size="md"
                pt={2}
                pb={2}
                width="100%"
                border="2px"
                borderColor="#0A66C2"
                borderRadius="50px"
                mt={5}
                color="#0A66C2"
              >
                View Profile
              </Button>
            </NavLink>
          </Box>
          <Box borderTop="2px solid var(--border_color)" mt="20px">
            <div className="log_out" onClick={handleLogOut}>
              <MdLogout size={20} color="var(--black_color)" />
              <p>Log Out</p>
            </div>
          </Box>
        </section>
      )}
    </>
  );
};

export default ViewProfile;
