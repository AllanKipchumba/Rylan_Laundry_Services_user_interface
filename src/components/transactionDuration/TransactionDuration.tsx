import React from "react";
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

export const TransactionDuration = () => {
  return (
    <div>
      <form>
        <select value="" required className={styles.input}>
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

        <select required className={styles.input} value="">
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

        <button className={`btn }`} style={{ padding: "7px", width: "100%" }}>
          Get data
        </button>
      </form>
    </div>
  );
};
