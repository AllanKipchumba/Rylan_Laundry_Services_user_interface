import React, { useState, useEffect } from "react";
import styles from "./cashflowChart.module.scss";
import { YearCard } from "../yearCard/YearCard";
import axios from "axios";
import { useFetchAuthData } from "../../hooks/useFetchAuthData";
import { base_url } from "..";

export const CashFlowChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const headers = useFetchAuthData();
  const [loading, setLoading] = useState(false);
  const [cashFlowData, setCashFlowData] = useState([]);
  const currentData = cashFlowData.filter((data) => data.year === year);
  console.log(cashFlowData);

  useEffect(() => {
    const fetchCashFlowData = async () => {
      setLoading(true);
      try {
        await axios({
          method: "get",
          url: `${base_url}/analytics/cashFlow`,
          headers: headers,
        }).then((res) => {
          setCashFlowData(res.data);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchCashFlowData();
  }, []);

  return (
    <div className={styles.cashFlow}>
      <div className={styles.heading}>
        <h1>Cash flow analysis</h1>
        <div className={styles.period}>
          <h5>Select period:</h5>
          <YearCard
            value={year}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setYear(parseInt(e.target.value))
            }
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};
