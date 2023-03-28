import React, { useState } from "react";
import {
  Sidebar,
  Dashboard,
  Report,
  Header,
  Transactions,
} from "../../components";
import styles from "./admin.module.scss";
import { Routes, Route } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export const Admin = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const icon = toggleSidebar ? (
    <AiOutlineRight size={30} />
  ) : (
    <AiOutlineLeft size={30} />
  );

  return (
    <div className={styles.admin}>
      <div
        className={
          toggleSidebar ? `${styles.hideSidebar}` : `${styles.sidebar}`
        }
      >
        <Sidebar />
      </div>

      <div
        onClick={() => setToggleSidebar(!toggleSidebar)}
        className={styles["icon-hideSidebar"]}
      >
        {icon}
      </div>

      <div
        className={
          toggleSidebar
            ? `${(styles.content, styles["fill-content"])}`
            : `${styles.content}`
        }
      >
        <Header />

        <div className={styles.routes}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/sales" element={<Transactions />} />
            <Route path="/credits" element={<Transactions />} />
            <Route path="/expenses" element={<Transactions />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
