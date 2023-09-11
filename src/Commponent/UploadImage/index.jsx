import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { createRef, useRef, useState } from "react";
import Cropped from "./Cropper";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import "./uploadImage.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginUsers } from "../../Feature/Slice/LoginSlice";

const UploadeImage = () => {
  const users = useSelector((user) => user.counter.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("xl");
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };
  const chooseFile = useRef(null);

  // crope images && upload file area

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const storage = getStorage();
  const storageRef = ref(storage, users.uid);
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleResat = () => {
    setImage("");
  };
  const handleCropBack = () => {
    setCropData("");
  };
  const handleCloseAll = () => {
    setCropData("");
    setImage("");
  };

  const handleProfileUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      // Data URL string
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(LoginUsers({ ...users, photoURL: downloadURL }));
            localStorage.setItem(
              "values",
              JSON.stringify({ ...users, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };
  const handleProfileDelete = () => {
    deleteObject(storageRef, users.uid).then(() => {
      setImage("");
    });
  };
  return (
    <>
      <section>
        <Box
          w={40}
          h={40}
          borderRadius="50%"
          overflow="hidden"
          onClick={() => handleSizeClick(size)}
          cursor="pointer"
        >
          <picture>
            <img
              width="100%"
              loading="lazy"
              src={users.photoURL || "./images/user.png"}
              onError={(e) => {
                e.target.src = "../images/user.png";
              }}
              alt="mainProfile"
            />
          </picture>
        </Box>
        {image ? (
          <Modal onClick={handleResat} size={size} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent bg={"black"}>
              {cropData ? (
                <ModalHeader
                  color="var(--white_color)"
                  borderBottom="1px solid var(--border_color)"
                >
                  Upload photo
                </ModalHeader>
              ) : (
                <ModalHeader
                  color="var(--white_color)"
                  borderBottom="1px solid var(--border_color)"
                >
                  Crop photo
                </ModalHeader>
              )}

              {cropData ? (
                <ModalCloseButton
                  color="var(--white_color)"
                  bg="var(--main_color)"
                  onClick={handleCropBack}
                />
              ) : (
                <ModalCloseButton
                  color="var(--white_color)"
                  bg="var(--main_color)"
                  onClick={handleResat}
                />
              )}
              <ModalBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                pt={5}
                pb={5}
              >
                {cropData ? (
                  <Box>
                    <div className="choose_text">
                      <h1>Set This Photo</h1>
                    </div>
                    <Box
                      w={40}
                      h={40}
                      borderRadius="50%"
                      m="auto"
                      overflow="hidden"
                    >
                      <img
                        style={{ width: "100%" }}
                        src={cropData}
                        alt="cropped"
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <div className="choose_text">
                      <h1> Size Your Photo</h1>
                    </div>

                    <Cropped
                      setImage={setImage}
                      image={image}
                      cropperRef={cropperRef}
                      cropData={cropData}
                      setCropData={setCropData}
                    />
                  </Box>
                )}
              </ModalBody>
              <ModalFooter borderTop="1px solid var(--border_color)">
                {cropData ? (
                  <>
                    <Button mr="10px" colorScheme="" onClick={onClose}>
                      <p onClick={handleCloseAll}>Close</p>
                    </Button>
                    <Button colorScheme="blue" onClick={getCropData}>
                      <p onClick={onClose}>
                        <span onClick={handleCloseAll}>Upload Photo</span>
                      </p>
                    </Button>
                  </>
                ) : (
                  <Button colorScheme="blue" onClick={getCropData}>
                    Crop Photo
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Modal onClose={onClose} size={size} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent bg={"black"}>
              <ModalHeader
                color="var(--white_color)"
                borderBottom="1px solid var(--border_color)"
              >
                Profile photo
              </ModalHeader>
              <ModalCloseButton
                color="var(--white_color)"
                bg="var(--main_color)"
              />
              <ModalBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                pt={10}
                pb={20}
              >
                <Box>
                  <div className="choose_text">
                    <h1> Choose your files</h1>
                  </div>

                  <Box
                    w={40}
                    h={40}
                    borderRadius="50%"
                    overflow="hidden"
                    m="auto"
                    onClick={() => chooseFile.current.click()}
                    cursor="pointer"
                  >
                    <picture>
                      <img
                        width="100%"
                        loading="lazy"
                        src={users.photoURL || "./images/user.png"}
                        onError={(e) => {
                          e.target.src = "../images/user.png";
                        }}
                        alt="mainProfile"
                      />
                    </picture>
                  </Box>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    ref={chooseFile}
                    hidden
                  />
                </Box>
              </ModalBody>
              <ModalFooter borderTop="1px solid var(--border_color)">
                <Button colorScheme="blue" onClick={handleProfileDelete}>
                  <p onClick={onClose}>Delete Photo</p>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </section>
    </>
  );
};

export default UploadeImage;
