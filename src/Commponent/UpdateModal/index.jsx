import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { editInfo } from "../../Validation/yup";
import { getDatabase, push, ref, set, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { LoginUsers } from "../../Feature/Slice/LoginSlice";
import { DataUsers } from "../../Feature/Slice/UserSlice";
import { uid } from "uid";

const UpdateModal = () => {
  const users = useSelector((user) => user.counter.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [show, setShow] = useState(true);
  const dispath = useDispatch();

  // formik user
  const db = getDatabase();
  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      displayName: users.displayName,
      headline: "",
      location: "",
      education: "",
    },
    validationSchema: editInfo,
    onSubmit: () => {
      userData();
    },
  });

  const userData = () => {
    updateProfile(auth.currentUser, {
      displayName: formik.values.displayName,
    }).then(async () => {
      const userInfo = {
        ...auth.currentUser,
      };

      const userValue = {
        uid: uid(),
        headline: formik.values.headline,
        location: formik.values.location,
        education: formik.values.education,
      };

      await update(ref(db, "users/" + users.uid), {
        userName: userInfo.displayName,
        headline: userValue.headline,
        location: userValue.location,
        education: userValue.education,
      }).then(() => {
        dispath(LoginUsers(userInfo));
        localStorage.setItem("values", JSON.stringify(userInfo));

        dispath(DataUsers(userValue));
        localStorage.setItem("data", JSON.stringify(userValue));

        toast.success("Update Your Data", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        formik.resetForm();
        setShow(false);
      });
    });
  };

  return (
    <>
      <section>
        <ToastContainer />
        <Box
          w={10}
          h={10}
          bg="var(--border_color)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          onClick={onOpen}
        >
          <GrEdit />
        </Box>
        {show && (
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={formik.handleSubmit}>
                <ModalHeader borderBottom="1px solid var(--border_color)">
                  Edit intros
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      name="displayName"
                      value={formik.values.displayName}
                      onBlur={formik.handleBlur}
                      placeholder="First name"
                    />
                    {formik.errors.displayName ? (
                      <p className="error">{formik.errors.displayName}</p>
                    ) : null}
                  </FormControl>

                  <FormControl mt={6}>
                    <FormLabel>Headline</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      name="headline"
                      value={formik.values.headline}
                      onBlur={formik.handleBlur}
                      placeholder="Headline"
                    />
                    {formik.touched.headline && formik.errors.headline ? (
                      <p className="error">{formik.errors.headline}</p>
                    ) : null}
                  </FormControl>
                  <FormControl mt={6}>
                    <FormLabel>Full Location</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      name="location"
                      value={formik.values.location}
                      onBlur={formik.handleBlur}
                      placeholder="Location"
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <p className="error">{formik.errors.location}</p>
                    ) : null}
                  </FormControl>
                  <FormControl mt={6}>
                    <FormLabel>Education</FormLabel>
                    <Input
                      onChange={formik.handleChange}
                      name="education"
                      value={formik.values.education}
                      onBlur={formik.handleBlur}
                      placeholder="Education"
                    />
                    {formik.touched.education && formik.errors.education ? (
                      <p className="error">{formik.errors.education}</p>
                    ) : null}
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue">
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        )}
      </section>
    </>
  );
};

export default UpdateModal;
