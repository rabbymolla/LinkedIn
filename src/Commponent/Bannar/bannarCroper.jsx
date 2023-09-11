import { Box } from "@chakra-ui/react";
import React from "react";
import Cropper from "react-cropper";

const BannarCroper = ({
  setImage,
  image,
  cropperRef,
  cropData,
  setCropData,
}) => {
  return (
    <div>
      <Cropper
        ref={cropperRef}
        style={{ height: "200px", width: "100%", overflow: "hidden" }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight="200px"
        minCropBoxWidth="100%"
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
    </div>
  );
};

export default BannarCroper;
