import React from "react";
import styles from "./yearCard.module.scss";
import { years } from "../transactionDuration/TransactionDuration";

interface YearCardProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const YearCard: React.FC<YearCardProps> = ({ value, onChange }) => {
  return (
    <div className={styles.card}>
      <select value={value} onChange={onChange} className={styles.input}>
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
    </div>
  );
};
