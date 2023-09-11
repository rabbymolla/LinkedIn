import { Slider } from "@chakra-ui/react";
import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropper.css";

const Cropped = ({ setImage, image, cropperRef, cropData, setCropData }) => {
  return (
    <>
      <section>
        <div className="crope_data">
          <Cropper
            ref={cropperRef}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
      </section>
    </>
  );
};

export default Cropped;
