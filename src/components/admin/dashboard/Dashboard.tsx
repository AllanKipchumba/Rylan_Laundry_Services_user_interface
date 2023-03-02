import React from "react";
import { Infobox } from "../../index";
import styles from "./dashboard.module.scss";
import { MdDryCleaning } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MonthAnalytics } from "../../monthanalytics/MonthAnalytics";

const washesIcon = <MdDryCleaning size={30} color="#46566e" />;
const clientsIcon = <IoIosPeople size={30} color="#1f93ff" />;
const revenueIcon = <AiOutlineDollarCircle size={30} color="#1dc88b" />;

export const Dashboard = () => {
  const data = [
    {
      sales: 8000,
      credits: 3000,
      expenses: 1000,
      deductions: 400,
      businessRevenue: 3000,
      debts: 100,
      revenueToSettleDebts: 3000,
      profit: 4000,
      sharableRevenue: 5000,
      ryl_Rev: 3000,
      ryl_debits: 3000,
      ryl_expected_pay: 3000,
      lan_rev: 3500,
      lan_debits: 200,
      lan_expected_pay: 2000,
    },
  ];
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

      <hr />
    </div>
  );
};
