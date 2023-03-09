import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_SUCCESS: (state, action) => {
      state.user = action.payload;
    },

    LOGOUT: (state) => {
      state.user = null;
    },
  },
});

export const { AUTH_SUCCESS, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
