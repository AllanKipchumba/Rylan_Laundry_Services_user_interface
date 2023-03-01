import React from "react";
import {
  Sales,
  Sidebar,
  Dashboard,
  Credits,
  Expenses,
  Report,
  Header,
} from "../../components";
import styles from "./admin.module.scss";
import { Routes, Route } from "react-router-dom";

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Header />
        <div className={styles.routes}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
