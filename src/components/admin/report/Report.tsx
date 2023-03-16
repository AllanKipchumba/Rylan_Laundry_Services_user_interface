import axios from "axios";
import { Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { TransactionDuration } from "../../transactionDuration/TransactionDuration";
import { defaultPeriod, IDuration } from "../transactions/Transactions";
import styles from "./report.module.scss";

export const Report = () => {
  const [salesPeriod, setSalesPeriod] = useState(defaultPeriod);
  const [loading, setLoading] = useState<boolean>(false);
  const [monthlyReport, setMonthlyReport] = useState([]);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const changeSalesPeriod = (data: IDuration) => {
    setSalesPeriod(data);
  };

  //get monthly report from db
  useEffect(() => {
    const getMonthlyReport = async () => {
      setLoading(true);
      try {
        await axios({
          method: "post",
          url: `http://localhost:5000/analytics/monthly`,
          data: salesPeriod,
          headers: headers,
        }).then((res) => {
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    };
    getMonthlyReport();
  }, [salesPeriod]);

  return (
    <div className={styles.report}>
      <div className={styles.header}>
        <h1>monthly report</h1>
        <div>
          <TransactionDuration updateTransactionDuration={changeSalesPeriod} />
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
