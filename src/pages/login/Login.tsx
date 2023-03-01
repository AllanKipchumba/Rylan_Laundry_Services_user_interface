import React from "react";
import styles from "./login.module.scss";
import logo from "../../assets/logo.png";

export const Login = () => {
  const handleLogin = () => {};

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles.login}>
        <div className={styles.header}>
          <div className={styles["image-wrapper"]}>
            <img className={styles.img} src={logo} alt="logo" />
          </div>
          <h1>Laundry Management System</h1>
        </div>

        <form>
          <input type="text" placeholder="Username" required />

          <input type="password" placeholder="Password" required />

          <button type="submit" onClick={handleLogin} className={styles.btn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
