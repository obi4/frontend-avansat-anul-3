import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteImage, getImages } from "../../../API/images";
import { UploadImageButton } from "../../../shared/UploadImageButton";
import "./Styles.css";
import x from "../../../images/x.svg";

export const ImagesTab: React.FC = () => {
  const [images, setImages] = useState<{ image: string; imageId: number }[]>();

  const handleDeleteImage = async (id: number) => {
    const response = await deleteImage(id);
    setImages(response.data.data);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages();
        setImages(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Box className="imagesContainer">
        {images?.map(({ image, imageId }, index) => (
          <div className="container" key={`${imageId}-${index}`}>
            <div className="tag" onClick={() => handleDeleteImage(imageId)}>
              <img src={x} alt="profileImage" className="deleteImage" />
            </div>
            <img src={image} alt="profileImage" className="profileImage" />
          </div>
        ))}
      </Box>
      <Box className="addPhotoContainer">
        <UploadImageButton setImages={setImages}
                           disabled={images?.length === 4}/>
      </Box>
    </div>
  );
};
