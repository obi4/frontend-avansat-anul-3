import axios from "axios";
import { User } from "../context/UserContext";
import { API_URL } from "../shared/Constants";

export const updateUser = async (userData: User) => {
  const response = await axios.put(`${API_URL}/user/user-profile`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });

  return response;
};

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/user/user-info`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });

  return response;
};
