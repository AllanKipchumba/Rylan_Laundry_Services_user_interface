import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transactionDetailsReducer from "./slices/transactionDetails";
import clientsReducer from "./slices/fliterOurClients";

const rootReducer = combineReducers({
  auth: authReducer,
  transactionDetails: transactionDetailsReducer,
  clients: clientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

/* 
Subscribe to changes in the store and store the user in
local storage whenever there is a change
*/
store.subscribe(() => {
  localStorage.setItem("user", JSON.stringify(store.getState().auth.user));
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
