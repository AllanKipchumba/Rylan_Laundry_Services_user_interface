import React, { useState } from "react";
import styles from "./login.module.scss";
import logo from "../../assets/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { AUTH_SUCCESS } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IState {
  username: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IState>({ username: "", password: "" });
  const { username, password } = user;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginFail, setLoginFail] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios({
        method: "post",
        url: `https://rylan-laundry-dms-api.onrender.com/auth/login`,
        data: { username, password },
      }).then((res) => {
        setLoading(false);
        dispatch(AUTH_SUCCESS(res.data));
        navigate("/admin");
      });
    } catch (error) {
      setLoading(false);
      setLoginFail(true);
      console.log(error);
    }
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles.login}>
        <div className={styles.header}>
          <div className={styles["image-wrapper"]}>
            <img className={styles.img} src={logo} alt="logo" />
          </div>
          <h1>Laundry Management System</h1>
        </div>

        {loginFail && (
          <div className={styles["login-fail"]}>
            <p>Unable to login! Check your credentials</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleInputChange(e)}
            placeholder="Username"
            required
          />
          <div className={styles["input-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>

          <button type="submit" className={styles.btn}>
            {loading ? (
              <BeatLoader loading={loading} color="#fff" margin={4} size={17} />
            ) : (
              `Login`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
