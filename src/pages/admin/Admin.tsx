import React from "react";
import { Sidebar } from "../../components";
import styles from "./admin.module.scss";

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}></div>
    </div>
  );
};
