import React from "react";
import styles from "./report.module.scss";

export const Report = () => {
  return (
    <div className={styles.report}>
      <div className={styles.header}>
        <h1>monthly report</h1>
        <div className={styles["transactions-duration"]}>
          <form>
            <input type="number" placeholder="month" required />
            <input type="number" placeholder="year" required />
            <button className={`btn }`} style={{ padding: "7px" }}>
              Get data
            </button>
          </form>
        </div>
      </div>

      <div></div>
    </div>
  );
};
