import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useFetchAuthData = () => {
  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  return headers;
};
