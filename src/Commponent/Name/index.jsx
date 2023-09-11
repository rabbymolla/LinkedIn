import React, { useEffect, useState } from "react";
import "./name.css";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { Button } from "@chakra-ui/react";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Name = () => {
  const users = useSelector((user) => user.counter.value);
  const userData = useSelector((user) => user.data.user);

  // name show
  // const [showName, setShowName] = useState([]);
  // const db = getDatabase();
  // useEffect(() => {
  //   const starCountRef = ref(db, "usersInfo/");
  //   onValue(starCountRef, (snapshot) => {
  //     const NameArry = [];
  //     snapshot.forEach((data) => {
  //       if (users.uid == data.val().id) {
  //         NameArry.push({ ...data.val(), id: data.key });
  //       }
  //     });
  //     setShowName(NameArry);
  //   });
  // }, []);

  return (
    <>
      <section id="name">
        <div className="name_show">
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
          {userData.location ? (
            <span>{userData.location}</span>
          ) : (
            <span>Your Location</span>
          )}
          <Button
            size="md"
            pt={2}
            pb={2}
            border="2px"
            borderColor="#0A66C2"
            borderRadius="50px"
            color="#0A66C2"
          >
            Contact Info
          </Button>
        </div>
        <div className="degree">
          <RiCompassDiscoverLine size={30} color="var(--hover_color)" />
          {userData.education ? (
            <Link>{userData.education}</Link>
          ) : (
            <Link>your Education</Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Name;
