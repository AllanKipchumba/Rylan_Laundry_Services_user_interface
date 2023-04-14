import React from "react";
import styles from "../yearCard/yearCard.module.scss";

interface YearCardProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TransactionType: React.FC<YearCardProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={styles.card}>
      <select value={value} onChange={onChange} className={styles.input}>
        <option value="" disabled>
          Transaction type
        </option>
        <option value="Sales">Sales</option>
        <option value="Expenditure">Expenditure</option>
        <option value="Credits">Credits</option>
      </select>
    </div>
  );
};
