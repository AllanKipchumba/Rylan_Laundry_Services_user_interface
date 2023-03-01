import React from "react";
import { Routes, Route } from "react-router-dom";
import { Admin, Login } from "./pages";

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
};
