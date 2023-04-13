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
import { LineChart } from "../charts/LineChart";
import { YearCard } from "../yearCard/YearCard";
import { monthNames } from "../transactionInputForm/types";
import { Pagination } from "../pagination/Pagination";

const frequencyIcon = <TbSum size={30} color="#1f93ff" />;
const currentYear = new Date().getFullYear();

interface RevenueRecord {
  year: number;
  data: {
    month: number;
    data: {
      totalRevenue: number;
    };
  }[];
  totalRevenue: number;
}

//get month names
export const getMonthNames = (monthIds: number[]): string[] => {
  const result = monthIds?.map((monthId) => {
    if (monthId < 1 || monthId > 12) {
      throw new Error(`Invalid month ID: ${monthId}`);
    }
    return monthNames[monthId - 1];
  });

  return result;
};

export const ClientTransactionRecord = () => {
  const client = useLocation().pathname.split("/")[2];
  const headers = useFetchAuthData();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [revenueFromClient, setRevenueFromClient] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(currentYear);
  const [revenueRecord, setRevenueRecord] = useState<RevenueRecord[]>([]);
  const currentRecord = revenueRecord.filter((rev) => rev.year === year);
  const clientData = currentRecord[0]?.data;
  const [monthsWithData, setMonthsWithData] = useState<number[]>([]);
  const [revenuePerMonth, setRevenuePerMonth] = useState<number[]>([]);
  const monthNamesWithData = getMonthNames(monthsWithData);
  //props to pass to the line graph
  const data = revenuePerMonth;
  const labels = monthNamesWithData;

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);
  //get current clients
  const indexOfLastProduct = currentPage * clientsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - clientsPerPage;
  const transactionHistoryPage = transactionHistory.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const mappedData = clientData?.map((cData) => ({
      month: cData.month,
      revenue: cData.data.totalRevenue,
    }));
    setMonthsWithData(mappedData?.map(({ month }) => month));
    setRevenuePerMonth(mappedData?.map(({ revenue }) => revenue));
  }, [clientData]);

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
      axios({
        method: "get",
        url: `${base_url}/analytics/revenueRecord/${client}`,
        headers: headers,
      }),
    ])
      .then(([transactionRes, recordRes, revenueRecord]) => {
        if (!isMounted) return; // check if component is still mounted
        const { count, totalAmount } = recordRes?.data?.clientRecord;
        setTransactionHistory(transactionRes.data);
        setFrequency(count);
        setRevenueFromClient(totalAmount);
        setRevenueRecord(revenueRecord.data);

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
        <h1>
          Client:&nbsp;
          <span className={styles["client-name"]}>{client}</span>
        </h1>
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
        </div>

        <div className={styles.graph}>
          <div className={styles["graph-heading"]}>
            <h1>revenue graph</h1>

            <div className={styles.period}>
              <h5>Select period:</h5>
              <YearCard
                value={year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setYear(parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <div className={styles.chart}>
            <LineChart
              data={data}
              labels={labels}
              client={client}
              year={year}
            />
          </div>
        </div>

        <div className={styles.record}>
          <h1>
            <span className={styles["client-name"]}>{client}'s &nbsp;</span>
            transaction history
          </h1>

          <table>
            <thead>
              <tr>
                <th>transaction ID</th>
                <th>Date</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistoryPage.map((transaction, index) => {
                const { _id, transactionDate, amount } = transaction;
                return (
                  <tr key={index}>
                    <td>{_id}</td>
                    <td>
                      <Timestamp transactionDate={transactionDate} />
                    </td>
                    <td>Ksh {amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        clientsPerPage={clientsPerPage}
        totalClients={transactionHistory.length}
      />
    </CheckLoadingState>
  );
};
