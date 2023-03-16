import React from "react";
import { TransactionDuration } from "../../transactionDuration/TransactionDuration";
import styles from "./report.module.scss";

// interface data {
//   [key: string]: number;
// }

// const arrdata: data[] = [
//   {
//     sales: 2540,
//     credits: 100,
//     expenses: 0,
//     deductions: 100,
//     businessRevenue: 1016,
//     debts: 100,
//     revenueToBeUsedToSettleDebts: 1016,
//     profit: 916,
//     sharableRevenue: 1524,
//     rylRevenue: 381,
//     debitsForRyl: 0,
//     expectedPayToRyl: 381,
//     lanRevenue: 1143,
//     debitsForLan: 100,
//     expectedPayToLan: 1243,
//   },
// ];

export const Report = () => {
  return (
    <div className={styles.report}>
      <div className={styles.header}>
        <h1>monthly report</h1>
        <div>
          <TransactionDuration />
        </div>
      </div>

      <div className={styles.data}>
        <div className={styles.header}>
          <h1>February 2023 Business report</h1>
        </div>

        <div className={styles["report-data"]}>
          <div className={styles["the-data"]}>
            <h4>Sales</h4>
            <p>6000</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>credits</h4>
            <p>2000</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>expenses</h4>
            <p>100</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>businessRevenue</h4>
            <p>3000</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>sharableRevenue</h4>
            <p>700</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>rylRevenue</h4>
            <p>1200</p>
          </div>
          <div className={styles["the-data"]}>
            <h4>lanRevenue</h4>
            <p>200</p>
          </div>
        </div>
      </div>
    </div>
  );
};
