import React from "react";
import styles from "./sidebar.module.scss";
import {
  AiFillDashboard,
  AiFillDollarCircle,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { GiExpense, GiCreditsCurrency } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1>LMS</h1>
      </div>
      <hr />
      <div className={styles["dash-list"]}>
        <ul>
          <li>
            <AiFillDashboard />
            <p>Dashboard</p>
          </li>
          <li>
            <AiFillDollarCircle />
            <p>Sales</p>
          </li>
          <li>
            <GiExpense />
            <p>Expenses</p>
          </li>
          <li>
            <GiCreditsCurrency />
            <p>credits</p>
          </li>
          <li>
            <TbFileReport />
            <p>report</p>
          </li>
          <li>
            <AiOutlinePoweroff />
            <p>logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
