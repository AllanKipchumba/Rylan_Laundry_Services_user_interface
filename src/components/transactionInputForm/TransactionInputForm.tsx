import React from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";

export const TransactionInputForm = () => {
  const inputFormElement = document.getElementById("inputForm");

  if (!inputFormElement) {
    return null;
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.inputForm}>
        <h1>Input Sales data</h1>
        <form>
          <label>Client</label>
          <input type="string" required />

          <label>Amount</label>
          <input type="number" required />

          <label>Date</label>
          <input type="date" required />

          <div>
            <button className="btn">Submit</button>
            <button className="btn">cancel</button>
          </div>
        </form>
      </div>
    </div>,
    inputFormElement
  );
};
