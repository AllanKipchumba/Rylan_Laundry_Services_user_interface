import React from "react";
import { Infobox } from "../../index";
import styles from "./dashboard.module.scss";
import { MdDryCleaning } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { editIcon, deleteIcon } from "../transactions/sales/Sales";

const washesIcon = <MdDryCleaning size={30} color="#46566e" />;
const clientsIcon = <IoIosPeople size={30} color="#1f93ff" />;
const revenueIcon = <AiOutlineDollarCircle size={30} color="#1dc88b" />;

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles["info-box"]}>
        <Infobox
          cardClass={`${styles.card} ${styles.card1}`}
          title={`total Washes`}
          count={200}
          icon={washesIcon}
        />
        <Infobox
          cardClass={`${styles.card} ${styles.card2}`}
          title={`Clients served`}
          count={200}
          icon={clientsIcon}
        />
        <Infobox
          cardClass={`${styles.card} ${styles.card3}`}
          title={`total Revenue generated`}
          count={200}
          icon={revenueIcon}
        />
      </div>
    </div>
  );
};
