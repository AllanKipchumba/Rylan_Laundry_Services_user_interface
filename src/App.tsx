import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
