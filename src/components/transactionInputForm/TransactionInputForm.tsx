import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

export const returnTitle = (
  id: string,
  title1: string,
  title2: string,
  title3: string
): string => {
  switch (id) {
    case "sales":
      return title1;
      break;

    case "expenses":
      return title2;
      break;

    case "credits":
      return title3;
      break;

    default:
      return "undefined";
      break;
  }
};

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
  const { client, creditor, item, amount, date } = transactionData;
  const [hideForm, setHideForm] = useState<boolean>(false);
  const id = useLocation().pathname.split("/")[1];
  const [sales, setSales] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<boolean>(false);
  const [credits, setCredits] = useState<boolean>(false);

  useEffect(() => {
    if (id === "sales") setSales(true);
    if (id === "expenses") setExpenses(true);
    if (id === "credits") setCredits(true);
  }, [id]);

  //get the DOM node 'inputForm'
  const inputFormElement = document.getElementById("inputForm");
  // If the input form element is not found, return null to prevent errors
  if (!inputFormElement) {
    return null;
  }

  //hides input form
  const handleFormToggle = () => {
    setHideForm(!hideForm);
    onToggle(hideForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        <h1>Input {returnTitle(id, "Sales", "expenditure", "credits")} data</h1>
        <form>
          {sales && (
            <>
              <label>Client</label>
              <input
                type="text"
                name="client"
                value={client}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </>
          )}

          {expenses || credits ? (
            <>
              <label>Item</label>
              <input
                type="text"
                name="item"
                value={item}
                onChange={handleInputChange}
                required
              />
            </>
          ) : null}

          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => handleInputChange(e)}
            required
          />

          {credits && (
            <>
              <label>Creditor</label>
              <select
                name="creditor"
                value={creditor}
                onChange={(e) => handleInputChange(e)}
                required
                className={styles.input}
              >
                <option value="" disabled>
                  --Choose Creditor--
                </option>
                <option value={"ryl"}>ryl</option>
                <option value={"lan"}>lan</option>
              </select>
            </>
          )}

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={date.toISOString().substring(0, 10)}
            onChange={(e) => handleInputChange(e)}
            required
          />

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
