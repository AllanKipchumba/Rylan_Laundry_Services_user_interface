import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";

type ChildProps = {
  onToggle: (hideform: boolean) => void;
};

export const TransactionInputForm = ({ onToggle }: ChildProps) => {
  const [hideForm, sethideForm] = useState<boolean>(false);

  const inputFormElement = document.getElementById("inputForm");
  if (!inputFormElement) return null;

  const handleToggle = () => {
    sethideForm(!hideForm);
    onToggle(hideForm);
  };

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.inputForm}>
        <div className={styles.cancel}>
          <RxCross2
            size={25}
            onClick={handleToggle}
            className={styles["cancel-icon"]}
          />
        </div>
        <h1>Input Sales data</h1>
        <form>
          <label>Client</label>
          <input type="text" required />

          <label>Amount</label>
          <input type="number" required />

          <label>Date</label>
          <input type="date" required />

          <div className={styles.btns}>
            <button className="btn">Submit</button>
            <button onClick={handleToggle} className="btn">
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    inputFormElement
  );
};
