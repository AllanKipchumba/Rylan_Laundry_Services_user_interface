import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";

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

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (id === "sales") setSales(true);
    if (id === "expenses") setExpenses(true);
    if (id === "credits") setCredits(true);
  }, [id]);

  //get the DOM node 'inputForm'
  const inputFormElement = document.getElementById("inputForm");
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

  //send data to db
  const sendDataToDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransactionData(initialState);

    //send sales data
    if (sales) {
      //turn into a component
      /**
       * modify component to receive props for sales, credits or expenses
       */
      const salesData = {
        transactionDate: date,
        transactionType: "sale",
        amount,
        description: {
          client,
        },
      };
      try {
        await axios({
          method: "post",
          url: `http://localhost:5000/transactions`,
          data: salesData,
          headers: headers,
        }).then((res) => {
          console.log(res.data);
          //toast success
        });
      } catch (error) {
        console.log(error);
        //toast error messsage
      }
    }
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
        <form onSubmit={sendDataToDB}>
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
            <button type="submit" className="btn">
              Submit
            </button>
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
