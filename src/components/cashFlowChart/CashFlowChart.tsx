import React, { useState, useEffect, useCallback } from "react";
import styles from "./cashflowChart.module.scss";
import { YearCard } from "../yearCard/YearCard";
import axios from "axios";
import { useFetchAuthData } from "../../hooks/useFetchAuthData";
import { base_url } from "..";
import { getMonthNames } from "../ClientTransactionRecord/ClientTransactionRecord";
import { MultiLineGraph } from "../charts/MultiLineGraph";
import { TransactionType } from "./TransactionType";

interface MonthData {
  month: number;
  data: {
    totalSales: number;
    totalExpenses: number;
    totalCredits: number;
  };
}

interface YearData {
  year: number;
  data: MonthData[];
  totalSales: number;
  totalExpenses: number;
  totalCredits: number;
}

interface IProps {
  checkIfMounted: (mounted: boolean) => void;
}

export const CashFlowChart: React.FC<IProps> = ({ checkIfMounted }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactionType, setTransactionType] = useState("Sales");
  const headers = useFetchAuthData();
  const [loading, setLoading] = useState(false);
  const [cashFlowData, setCashFlowData] = useState<YearData[]>([]);
  const currentData = cashFlowData?.filter((data) => data.year === year);
  const [monthsWithData, setMonthsWithData] = useState<number[]>([]);
  const monthNamesWithData = getMonthNames(monthsWithData);
  const [salesPerMonth, setSalesPerMonth] = useState<number[]>([]);
  const [expensesPerMonth, setExpensesPerMonth] = useState<number[]>([]);
  const [creditsPerMonth, setCreditsPerMonth] = useState<number[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalcredits, setTotalCredits] = useState(0);

  //fetch cashflow data
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

  //mine data from cashflow record
  useEffect(() => {
    const extractData = (yearDataArray: YearData[]) => {
      let monthsWithData: number[] = [];
      let salesPerMonth: number[] = [];
      let expensesPerMonth: number[] = [];
      let creditsPerMonth: number[] = [];
      let totalSales = 0;
      let totalExpenses = 0;
      let totalCredits = 0;

      yearDataArray.forEach((yearData) => {
        yearData.data.forEach((monthData) => {
          const { month } = monthData;
          const {
            totalSales: monthSales,
            totalExpenses: monthExpenses,
            totalCredits: monthCredits,
          } = monthData.data;
          monthsWithData = [...monthsWithData, month];
          salesPerMonth = [...salesPerMonth, monthSales];
          expensesPerMonth = [...expensesPerMonth, monthExpenses];
          creditsPerMonth = [...creditsPerMonth, monthCredits];
        });

        totalSales += yearData.totalSales;
        totalExpenses += yearData.totalExpenses;
        totalCredits += yearData.totalCredits;
      });

      setMonthsWithData(monthsWithData);
      setSalesPerMonth(salesPerMonth);
      setExpensesPerMonth(expensesPerMonth);
      setCreditsPerMonth(creditsPerMonth);
      setTotalSales(totalSales);
      setTotalExpenses(totalExpenses);
      setTotalCredits(totalCredits);
    };

    extractData(currentData);
  }, [year, cashFlowData]);

  //pass loading state to parent
  useEffect(() => {
    checkIfMounted(loading);
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
        <div className={styles["transaction-type"]}>
          <h5>Select transaction type:</h5>

          <TransactionType
            value={transactionType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTransactionType(e.target.value)
            }
          />
        </div>
      </div>
      <div className={styles.graph}>
        {transactionType === "Sales" && (
          <MultiLineGraph
            labels={monthNamesWithData}
            data={salesPerMonth}
            totals={totalSales}
            year={year}
            borderColor="#66cccc"
            transactionType={transactionType}
          />
        )}
        {transactionType === "Expenditure" && (
          <MultiLineGraph
            labels={monthNamesWithData}
            data={expensesPerMonth}
            totals={totalExpenses}
            year={year}
            borderColor="#46566e"
            transactionType={transactionType}
          />
        )}
        {transactionType === "Credits" && (
          <MultiLineGraph
            labels={monthNamesWithData}
            data={creditsPerMonth}
            totals={totalcredits}
            year={year}
            borderColor="#99cc66"
            transactionType={transactionType}
          />
        )}
      </div>
    </div>
  );
};
