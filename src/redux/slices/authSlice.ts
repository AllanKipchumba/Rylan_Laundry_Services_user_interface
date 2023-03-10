import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  roles: number[];
  accessToken: string;
}

interface AuthState {
  user: User | null;
}

const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
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
      localStorage.removeItem("user");
    },
  },
});

export const { AUTH_SUCCESS, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
