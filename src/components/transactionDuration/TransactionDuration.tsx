import React, { useState } from "react";
import { defaultPeriod, IDuration } from "../admin/transactions/sales/Sales";
import styles from "./transactionDuration.module.scss";

const months = [
  { id: 1, name: "january" },
  { id: 2, name: "february" },
  { id: 3, name: "march" },
  { id: 4, name: "april" },
  { id: 5, name: "may" },
  { id: 6, name: "june" },
  { id: 7, name: "july" },
  { id: 8, name: "aughust" },
  { id: 9, name: "september" },
  { id: 10, name: "october" },
  { id: 11, name: "november" },
  { id: 12, name: "december" },
];

const years = [2021, 2022, 2023];

interface TransactionDurationProps {
  updateTransactionDuration: (data: IDuration) => void;
}

export const TransactionDuration = ({
  updateTransactionDuration,
}: TransactionDurationProps) => {
  const [transactionDuration, setTransactionDuration] = useState(defaultPeriod);
  const { month, year } = transactionDuration;

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransactionDuration((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitTransactionDurstion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTransactionDuration(transactionDuration);
  };

  return (
    <div>
      <form onSubmit={submitTransactionDurstion}>
        <select
          name="month"
          value={month}
          onChange={(e) => handleInputChange(e)}
          required
          className={styles.input}
        >
          <option value="" disabled>
            month
          </option>
          {months.map((month) => {
            const { id, name } = month;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        <select
          name="year"
          value={year}
          onChange={(e) => handleInputChange(e)}
          required
          className={styles.input}
        >
          <option value="" disabled>
            year
          </option>
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <button
          type="submit"
          className={`btn }`}
          style={{ padding: "7px", width: "100%" }}
        >
          Get data
        </button>
      </form>
    </div>
  );
};
