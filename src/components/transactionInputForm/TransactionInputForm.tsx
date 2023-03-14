import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { ChildProps, initialState, IState, returnTitle } from "./types";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { BeatLoader } from "react-spinners";

export const TransactionInputForm = ({ onToggle }: ChildProps) => {
  const [transactionData, setTransactionData] = useState(initialState);
  const { client, creditor, item, amount, date } = transactionData;
  const [hideForm, setHideForm] = useState<boolean>(false);
  const id = useLocation().pathname.split("/")[1];
  const [sales, setSales] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<boolean>(false);
  const [credits, setCredits] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (id === "sales") setSales(true);
    if (id === "expenses") setExpenses(true);
    if (id === "credits") setCredits(true);
  }, [id]);

  //hides input form, sends hide form state to parent component
  const handleFormToggle = () => {
    setHideForm(!hideForm);
    onToggle(hideForm);
  };

  //empties form fields
  const emptyFormInputFields = (ChildData: IState) => {
    setTransactionData(ChildData);
  };

  const updateLoadingState = (childData: boolean) => {
    setLoading(childData);
  };

  //captures form data
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitFormDataToDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const url = `http://localhost:5000/transactions`;

    //submit sales data
    if (sales) {
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
          url,
          data: salesData,
          headers: headers,
        }).then((res) => {
          res.status == 201 && Notify.success(`Data submited`);
          setTransactionData(initialState);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    }
    //submit expenses
    else if (expenses) {
      const expenditureData = {
        transactionDate: date,
        transactionType: "expense",
        amount,
        description: {
          item,
        },
      };

      try {
        await axios({
          method: "post",
          url,
          data: expenditureData,
          headers: headers,
        }).then((res) => {
          res.status == 201 && Notify.success(`Data submited`);
          setTransactionData(initialState);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    }
    //submit credits
    else if (credits) {
      const creditdata = {
        transactionDate: date,
        transactionType: "credit",
        amount,
        description: {
          item,
          creditor,
        },
      };

      try {
        await axios({
          method: "post",
          url,
          data: creditdata,
          headers: headers,
        }).then((res) => {
          res.status == 201 && Notify.success(`Data submited`);
          setTransactionData(initialState);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    }
  };

  const inputFormElement = document.getElementById("inputForm");
  if (!inputFormElement) {
    return null;
  }

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
        <form onSubmit={submitFormDataToDB}>
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
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `submit`
              )}
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
