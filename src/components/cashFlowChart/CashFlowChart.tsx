import React, { useState, useEffect } from "react";
import styles from "./cashflowChart.module.scss";
import { YearCard } from "../yearCard/YearCard";
import axios from "axios";
import { useFetchAuthData } from "../../hooks/useFetchAuthData";
import { base_url } from "..";
import { getMonthNames } from "../ClientTransactionRecord/ClientTransactionRecord";
import { CheckLoadingState } from "../checkLoadingState/CheckLoadingState";
import { MultiLineGraph } from "../charts/MultiLineGraph";

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

export const CashFlowChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const headers = useFetchAuthData();
  const [loading, setLoading] = useState(false);
  const [cashFlowData, setCashFlowData] = useState<YearData[]>([]);
  const [currentData, setCurrentData] = useState<YearData[]>([]);
  const [monthsWithData, setMonthsWithData] = useState<number[]>([]);
  const monthNamesWithData = getMonthNames(monthsWithData);
  const [salesPerMonth, setSalesPerMonth] = useState<number[]>([]);
  const [expensesPerMonth, setExpensesPerMonth] = useState<number[]>([]);
  const [creditsPerMonth, setCreditsPerMonth] = useState<number[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalcredits, setTotalCredits] = useState(0);

  console.log(salesPerMonth);

  //update currentData to be cashflow for a given year
  useEffect(() => {
    setCurrentData(cashFlowData.filter((data) => data.year === year));
  }, [cashFlowData, year]);

  useEffect(() => {
    //extract data from cashflow record
    const extractData = (yearDataArray: YearData[]) => {
      const monthsWithData: number[] = [];
      const salesPerMonth: number[] = [];
      const expensesPerMonth: number[] = [];
      const creditsPerMonth: number[] = [];
      let totalSales = 0;
      let totalExpenses = 0;
      let totalCredits = 0;

      for (const yearData of yearDataArray) {
        for (const monthData of yearData.data) {
          monthsWithData.push(monthData.month);
          salesPerMonth.push(monthData.data.totalSales);
          expensesPerMonth.push(monthData.data.totalExpenses);
          creditsPerMonth.push(monthData.data.totalCredits);
        }
        totalSales += yearData.totalSales;
        totalExpenses += yearData.totalExpenses;
        totalCredits += yearData.totalCredits;
      }

      setMonthsWithData(monthsWithData);
      setSalesPerMonth(salesPerMonth);
      setExpensesPerMonth(expensesPerMonth);
      setCreditsPerMonth(creditsPerMonth);
      setTotalSales(totalSales);
      setTotalExpenses(totalExpenses);
      setTotalCredits(totalCredits);
    };

    extractData(currentData);
  }, [currentData, year]);

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
    <CheckLoadingState loading={loading}>
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
          <div className={styles.graph}>
            {salesPerMonth.length !== 0 && (
              <MultiLineGraph
                labels={monthNamesWithData}
                sales={salesPerMonth}
                expenses={expensesPerMonth}
                credits={creditsPerMonth}
                totalSales={totalSales}
                totalExpenses={totalExpenses}
                totalCredits={totalcredits}
                year={year}
              />
            )}
          </div>
        </div>
      </div>
    </CheckLoadingState>
  );
};
