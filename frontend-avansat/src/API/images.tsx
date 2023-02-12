import axios from "axios";
import { API_URL } from "../shared/Constants";

export const getImages = async () => {
  const response = await axios.get(`${API_URL}/photos/get-user-photos`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });

  return response;
};

export const uploadImage = async (image: any) => {
  const response = await axios.post(
    `${API_URL}/photos/upload-photo`,
    { files: image },
    {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response;
};

export const deleteImage = async (id: number) => {
  const response = await axios.delete(
    `${API_URL}/photos/delete-user-photo?photoId=${id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );

  return response;
};
