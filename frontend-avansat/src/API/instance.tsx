import axios from "axios";
import { API_URL } from "../shared/Constants";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
  // .. other options
});

export default instance;
