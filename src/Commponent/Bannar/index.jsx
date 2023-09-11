import React, { createRef, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
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
import { GrEdit } from "react-icons/gr";
import { FcGallery } from "react-icons/fc";
import BannarCroper from "./bannarCroper";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import "./bannar.css";
import { DataUsers } from "../../Feature/Slice/UserSlice";
import { ToastContainer, toast } from "react-toastify";

const Bannaer = () => {
  const users = useSelector((user) => user.counter.value);
  const userData = useSelector((user) => user.data.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("xl");
  const chooseFile = useRef(null);
  const dispatch = useDispatch();
  const storage = getStorage();
  const storageRef = ref(storage, userData.uid);
  const auth = getAuth();

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  const handleBannarUpload = (e) => {
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
        getDownloadURL(storageRef).then((bannarURL) => {
          updateProfile(auth.currentUser, {
            bannarURL: bannarURL,
          }).then(() => {
            dispatch(DataUsers({ ...userData, bannarURL: bannarURL }));
            localStorage.setItem(
              "data",
              JSON.stringify({
                ...userData,
                bannarURL: bannarURL,
              })
            );
            setImage("");
            setCropData("");
            toast.success("Upload Bannar Photo", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
        });
      });
    }
  };
  const handleBack = () => {
    setImage("");
    setCropData("");
  };
  return (
    <>
      <section>
        <ToastContainer />
        <div className="bannar_items">
          <div className="bannar_img">
            <NavLink>
              <picture>
                <img
                  loading="lazy"
                  src={userData.bannarURL || "../images/bannar_deafult.png"}
                  onError={(e) => {
                    e.target.src = "../images/bannar_deafult.png";
                  }}
                  alt="bannar"
                />
              </picture>
            </NavLink>

            <Box
              w={10}
              h={10}
              bg="var(--white_color)"
              position="absolute"
              top="20px"
              right="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              className="bannar_icon"
              cursor="pointer"
              onClick={() => handleSizeClick(size)}
            >
              <GrEdit />
            </Box>
          </div>
        </div>
        {image ? (
          <Modal
            onClick={onClose}
            onClose={handleBack}
            size={size}
            isOpen={isOpen}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader borderBottom="1px solid var(--border_color)">
                Size your Bannar
              </ModalHeader>
              <ModalCloseButton onClick={handleBack} />
              <ModalBody>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <BannarCroper
                    setImage={setImage}
                    image={image}
                    cropperRef={cropperRef}
                    cropData={cropData}
                    setCropData={setCropData}
                  />
                </Box>
              </ModalBody>
              <ModalFooter borderTop="1px solid var(--border_color)">
                <Button onClick={onClose}>Close</Button>
                <Button colorScheme="blue" onClick={getCropData}>
                  <p onClick={onClose}>Upload Bannar</p>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Modal onClose={onClose} size={size} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader borderBottom="1px solid var(--border_color)">
                Bannar Photo
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box
                    w={60}
                    h={60}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="var(--border_color)"
                    borderRadius="50%"
                    cursor="pointer"
                    onClick={() => chooseFile.current.click()}
                  >
                    <FcGallery size={60} />
                  </Box>
                  <input
                    type="file"
                    ref={chooseFile}
                    hidden
                    onChange={handleBannarUpload}
                  />
                </Box>
              </ModalBody>
              <ModalFooter borderTop="1px solid var(--border_color)">
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </section>
    </>
  );
};

export default Bannaer;
