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
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/slices/authSlice";
import { base_url } from "..";
import axios from "axios";
import { Notify } from "notiflix";
import { useFetchAuthData } from "../../hooks/useFetchAuthData";
import image from "../../assets/logo.png";

// interface CustomNavLinkProps {
//   isActive: boolean;
// }

// const activeLink = ({ isActive }) =>
//   isActive ? `${styles.active} ${styles.navLink}` : `${styles.navLink}`;

export const Sidebar = () => {
  const headers = useFetchAuthData();
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(LOGOUT());
    try {
      await axios({
        method: "post",
        url: `${base_url}/auth/logout`,
        headers: headers,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        Notify.failure(axiosError.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1>Rylan</h1>
        <div>
          {/* <img
            src={image}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
            className={styles.logo}
          /> */}
        </div>
      </div>
      <hr />
      <div className={styles["dash-list"]}>
        <ul>
          <NavLink to="/admin" className={styles.navlink}>
            <li>
              <AiFillDashboard size={25} />
              <p>Dashboard</p>
            </li>
          </NavLink>
          <NavLink to="/sales" className={styles.navlink}>
            <li>
              <AiFillDollarCircle size={25} />
              <p>Sales</p>
            </li>
          </NavLink>
          <NavLink to="/expenses" className={styles.navlink}>
            <li>
              <GiExpense size={25} />
              <p>Expenses</p>
            </li>
          </NavLink>
          <NavLink to="/credits" className={styles.navlink}>
            <li>
              <GiCreditsCurrency size={25} />
              <p>credits</p>
            </li>
          </NavLink>
          <NavLink to="/report" className={styles.navlink}>
            <li>
              <TbFileReport size={25} />
              <p>report</p>
            </li>
          </NavLink>

          <li onClick={logout}>
            <AiOutlinePoweroff size={25} />
            <p>logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
