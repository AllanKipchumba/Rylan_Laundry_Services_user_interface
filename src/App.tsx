import React from "react";
import { Routes, Route } from "react-router-dom";
import { Authenicated, NotAuthenicated } from "./components";
import { Admin, Login } from "./pages";

export const App = () => {
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
