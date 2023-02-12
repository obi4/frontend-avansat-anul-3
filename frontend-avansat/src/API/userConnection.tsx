import axios from "axios";
import { API_URL } from "../shared/Constants";

export const getConnections = async () => {
  const response = await axios.get(
    `${API_URL}/userconnection/suggestions?limit=${1000}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );

  return response;
};

export const getMathces = async () => {
  const response = await axios.get(`${API_URL}/userconnection/matches`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });

  return response;
};

export const swipe = async (possibleMatchId: number, isSwipeRight: boolean) => {
  const response = await axios.post(
    `${API_URL}/userconnection/swipe`,
    { possibleMatchId: possibleMatchId, isSwipeRight: isSwipeRight },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );

  return response;
};
