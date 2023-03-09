import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";

type ChildProps = {
  onToggle: (hideform: boolean) => void;
};

interface IState {
  client: string;
  item: string;
  creditor: string;
  amount: number;
  date: Date;
}

const initialState: IState = {
  client: "",
  item: "",
  creditor: "",
  amount: 0,
  date: new Date(),
};

export const TransactionInputForm = ({ onToggle }: ChildProps) => {
  const [transactionData, setTransactionData] = useState(initialState);
  const [hideForm, setHideForm] = useState<boolean>(false);

  const inputFormElement = document.getElementById("inputForm");
  // If the input form element is not found, return null to prevent errors
  if (!inputFormElement) {
    return null;
  }

  const handleFormToggle = () => {
    setHideForm(!hideForm);
    onToggle(hideForm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.inputForm}>
        <div className={styles.cancel}>
          <RxCross2
            size={25}
            onClick={handleFormToggle}
            className={styles["cancel-icon"]}
          />
        </div>
        <h1>Input Sales data</h1>
        <form>
          <label>Client</label>
          <input type="text" required />

          <label>Item</label>
          <input type="text" required />

          <label>Amount</label>
          <input type="number" required />

          <label>Creditor</label>
          <input type="text" required />

          <label>Date</label>
          <input type="date" required />

          <div className={styles.btns}>
            <button className="btn">Submit</button>
            <button onClick={handleFormToggle} className="btn">
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    inputFormElement
  );
};
