import React from "react";
import styles from "./header.module.scss";
import image from "../../assets/logo.png";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <img src={image} alt="logo" style={{ width: "70px", height: "70px" }} />
      </div>
      <div>
        <h1>Laundry Management System</h1>
      </div>
      <div className={styles["header-right"]}>
        <p>Howdy, Admin!</p>
      </div>
    </div>
  );
};
