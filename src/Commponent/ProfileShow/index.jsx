import React from "react";
import "./profileShow.css";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import Name from "../Name";
import UpdateModal from "../UpdateModal";
import UploadeImage from "../UploadImage";

const ProfleShow = () => {
  return (
    <>
      <section>
        <div className="profileShow_items">
          {/* profile image part start */}
          <Box position="absolute" top="-100px" left="0">
            <UploadeImage />
          </Box>
          {/* profile image part end */}

          {/* profile name part start */}
          <Box pt="90px">
            <Name />
          </Box>
          <NavLink>
            <Box position="absolute" top="0px" right="0px">
              <UpdateModal />
            </Box>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default ProfleShow;
