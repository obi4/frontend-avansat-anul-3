import styled from "@emotion/styled";
import React, { useRef } from "react";
import { uploadImage } from "../API/images";
import FormData from "form-data";

interface Props {
  onClick?: () => void;
  setImages: (value: { image: string; imageId: number }[]) => void;
  disabled: boolean;
}

const Button = styled.button`
  background-color: #9090f0;
  width: 209px;
  height: 53px;
  color: white;
  font-size: 28px;
  border: none;
  cursor: pointer;
`;

export const UploadImageButton: React.FC<Props> = ({ onClick, setImages, disabled }) => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      let data = new FormData();
      data.append("file", files[0]);
      const response = await uploadImage(files[0]);
      setImages(response.data.data);
    }
  };

  const onButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <Button
          disabled={disabled}
          onClick={onButtonClick}>+ Add Photo</Button>
    </>
  );
};
