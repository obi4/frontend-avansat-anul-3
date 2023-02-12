import axios from "axios";
import { API_URL } from "../shared/Constants";
import instance from "./instance";

export const registerUser = async (
  email: string | null,
  firstName: string,
  lastName: string,
  password: string
) => {
  const response = await instance.post(`${API_URL}/auth/register`, {
    email: email,
    username: firstName.toLowerCase(),
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  return response;
};

export const loginUser = async (email: string | null, password: string) => {
  const response = await instance.post(`${API_URL}/auth/login`, {
    email: email,
    password: password,
    username: null,
  });

  return response;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const response = await axios.post(
    `${API_URL}/auth/change-password`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );

  return response;
};
