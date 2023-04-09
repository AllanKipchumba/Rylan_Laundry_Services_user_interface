import React from "react";
import { Routes, Route } from "react-router-dom";
import { Authenicated } from "./components";
import { Admin, Login } from "./pages";
import { useFetchAuthData } from "./hooks/useFetchAuthData";

export const App = () => {
  const headers = useFetchAuthData();
  if (!headers) return <Login />;
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Authenicated>
            <Admin />
          </Authenicated>
        }
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
