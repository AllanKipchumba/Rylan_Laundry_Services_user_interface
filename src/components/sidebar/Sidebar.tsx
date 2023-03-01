import React from "react";
import styles from "./sidebar.module.scss";
import {
  AiFillDashboard,
  AiFillDollarCircle,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { GiExpense, GiCreditsCurrency } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";
import { NavLink } from "react-router-dom";

// interface CustomNavLinkProps {
//   isActive: boolean;
// }

// const activeLink = ({ isActive }: CustomNavLinkProps) =>
//   isActive ? `${styles.active}` : `${styles.navLink}`;

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1>LMS</h1>
      </div>
      <hr />
      <div className={styles["dash-list"]}>
        <ul>
          <NavLink to="/">
            <li>
              <AiFillDashboard />
              <p>Dashboard</p>
            </li>
          </NavLink>
          <NavLink to="/sales">
            <li>
              <AiFillDollarCircle />
              <p>Sales</p>
            </li>
          </NavLink>
          <NavLink to="/expenses">
            <li>
              <GiExpense />
              <p>Expenses</p>
            </li>
          </NavLink>
          <NavLink to="/credits">
            <li>
              <GiCreditsCurrency />
              <p>credits</p>
            </li>
          </NavLink>
          <NavLink to="/report">
            <li>
              <TbFileReport />
              <p>report</p>
            </li>
          </NavLink>

          <li>
            <AiOutlinePoweroff />
            <p>logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
