import React, { useEffect, useState } from "react";
import styles from "./clientTransactionRecord.module.scss";
import { Infobox } from "../infobox/Infobox";
import { revenueIcon } from "../admin/dashboard/Dashboard";
import { TbSum } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { base_url } from "..";
import { useFetchAuthData } from "../../hooks/useFetchAuthData";
import { Notify } from "notiflix";
import { Timestamp } from "../timeStamp/TimeStamp";
import { CheckLoadingState } from "../checkLoadingState/CheckLoadingState";

const frequencyIcon = <TbSum size={30} color="#1f93ff" />;

export const ClientTransactionRecord = () => {
  const client = useLocation().pathname.split("/")[2];
  const headers = useFetchAuthData();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [revenueFromClient, setRevenueFromClient] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([
      axios({
        method: "get",
        url: `${base_url}/analytics/transactions/${client}`,
        headers: headers,
      }),
      axios({
        method: "get",
        url: `${base_url}/analytics/client/${client}`,
        headers: headers,
      }),
    ])
      .then(([transactionRes, recordRes]) => {
        if (!isMounted) return; // check if component is still mounted
        const { count, totalAmount } = recordRes?.data?.clientRecord;
        setTransactionHistory(transactionRes.data);
        setFrequency(count);
        setRevenueFromClient(totalAmount);
        setLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return; // check if component is still mounted
        setLoading(false);
        console.log(error);
        Notify.failure(`${error}!`);
      });

    return () => {
      isMounted = false;
    };
  }, [client]);

  return (
    <CheckLoadingState loading={loading}>
      <div className={styles["transaction-record"]}>
        <div className={styles.header}>
          <div className={styles["info-box"]}>
            <Infobox
              cardClass={`${styles.card} ${styles.card2}`}
              title={`Frequency`}
              count={frequency}
              icon={frequencyIcon}
            />
            <Infobox
              cardClass={`${styles.card} ${styles.card3}`}
              title={`Revenue from ${client}`}
              count={`Ksh ${revenueFromClient}`}
              icon={revenueIcon}
            />
          </div>
          <h1>
            <span className={styles["client-name"]}>{client}'s</span>{" "}
            transaction history
          </h1>
        </div>
        <div className={styles.record}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>transaction ID</th>
                <th>Date</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => {
                const { _id, transactionDate, amount } = transaction;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{_id}</td>
                    <td>
                      <Timestamp transactionDate={transactionDate} />
                    </td>
                    <td>{amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </CheckLoadingState>
  );
};
