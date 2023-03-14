import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { initialState, MakeAPIrequestChildProps, SalesData } from "./types";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const MakeAPIrequest = async ({
  salesData,
  expenditureData,
  creditsData,
}: MakeAPIrequestChildProps) => {
  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  return;
  try {
    await axios({
      method: "post",
      url: `http://localhost:5000/transactions`,
      data: salesData,
      headers: headers,
    }).then((res) => {
      console.log(res.status);
      Notify.success(`Data submited`);
      //   setTransactionData(initialState);
      //   setLoading(false);
    });
  } catch (error) {
    console.log(error);
    Notify.failure(`${error}!`);
    // setLoading(false);
  }
};
