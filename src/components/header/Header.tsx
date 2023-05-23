import { ReactNode } from "react";
import styles from "./header.module.scss";
import image from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IProps {
  children: ReactNode;
}

export const Header = () => {
  const { user } = useSelector((store: RootState) => store["auth"]);
  const username = user && user.username;

  return (
    <div className={styles.header}>
      <div>
        <img src={image} alt="logo" style={{ width: "70px", height: "70px" }} />
      </div>
      <div className={styles["hero-header"]}>
        <div>
          <h1 className="font-bold">Laundry Data Management System</h1>
        </div>

        <div className={styles["header-right"]}>
          <h4>Howdy, {username}!</h4>
        </div>
      </div>
    </div>
  );
};
