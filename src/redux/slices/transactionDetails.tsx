import { createSlice } from "@reduxjs/toolkit";
import {
  TransactionData,
  TransactionType,
} from "../../components/transactionInputForm/types";

const transactionData: TransactionData = {
  _id: "",
  __v: 0,
  transactionDate: new Date(),
  transactionType:
    TransactionType.sale || TransactionType.expense || TransactionType.credit,
  amount: 0,
  description: {
    client: "",
    item: "",
    creditor: "",
  },
};

const initialState = {
  data: transactionData,
};

const transactionDetails = createSlice({
  name: "transactionDetails",
  initialState,
  reducers: {
    STORE_TRANSACTION: (state, action) => {
      // state = initialState; // reset the state to its initial value
      state.data = action.payload; // assign new state value
    },
  },
});

export const { STORE_TRANSACTION } = transactionDetails.actions;

export default transactionDetails.reducer;
