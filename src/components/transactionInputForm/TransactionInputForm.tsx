import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./transactionInputForm.module.scss";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  initialState,
  returnTitle,
  TransactionInputData,
  TransactionType,
} from "./types";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TransactionData } from "../../redux/slices/transactionDetails";
import { base_url } from "../index";

type ChildProps = {
  updateParentState: (hideform: boolean, databaseIsUpdated: boolean) => void;
  editTransaction: boolean;
};

export const TransactionInputForm = ({
  updateParentState,
  editTransaction,
}: ChildProps) => {
  //variable declarations
  const [hideForm, setHideForm] = useState(false);
  const id = useLocation().pathname.split("/")[1];
  const [sales, setSales] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [credits, setCredits] = useState(false);
  const [loading, setLoading] = useState(false);
  const [databaseIsUpdated, setDatabaseIsUpdated] = useState(false);
  //

  //upates states based on 'id'
  useEffect(() => {
    if (id === "sales") setSales(true);
    if (id === "expenses") setExpenses(true);
    if (id === "credits") setCredits(true);
  }, [id]);
  //

  //accesses the transaction to be edited from redux store
  const { data } = useSelector(
    (store: RootState) => store["transactionDetails"]
  );

  const {
    description: { client: editClient, item: editItem, creditor: editCreditor },
    amount: editAmount,
    _id: transactionID,
    transactionDate: editTransactionDate,
  } = data;

  const transactionToEdit: TransactionInputData = {
    client: editClient,
    item: editItem,
    creditor: editCreditor,
    amount: editAmount,
    date: new Date(editTransactionDate),
  };
  //

  // Capture the initial state of transaction data in the input fields
  const [transactionData, setTransactionData] = useState(() => {
    const newstate = editTransaction ? transactionToEdit : initialState;
    return newstate;
  });

  const { client, amount, item, creditor } = transactionData;
  const date = new Date(transactionData.date);
  //

  //accesses auth data
  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };
  //

  //manages the state that hides/show the transaction input form , sends data to parent
  const toggleTransactionInputFormVisibility = () => {
    setHideForm(!hideForm);
    updateParentState(hideForm, databaseIsUpdated);
  };
  //

  //manages the changes in the input form field
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };
  //

  //submits form data to db
  const [err403, setErr403] = useState(false);

  const submitFormDataToDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const url = editTransaction
      ? `${base_url}/transactions/${transactionID}`
      : `${base_url}/transactions`;

    const method = editTransaction ? "patch" : "post";

    const submitTransaction = async (url: string, data: TransactionData) => {
      try {
        const response = await axios({
          method,
          url,
          data,
          headers: headers,
        });

        if (response.status === 201 || 202) {
          Notify.success("Data submitted");
          setTransactionData(initialState);
          setLoading(false);
          setDatabaseIsUpdated(true);
        } else {
          Notify.info("Unable to submit data");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        if (axios.isAxiosError(error)) {
          setLoading(false);
          const axiosError = error;

          axiosError.response?.status == 403 && setErr403(true);
          axiosError.response?.status == 401 && Notify.failure(`Unauthorized!`);
        } else {
          console.error(error);
          Notify.failure(`${error}!`);
        }
      }
    };

    //submit sales
    if (sales) {
      const salesData = {
        transactionDate: date,
        transactionType: TransactionType.sale,
        amount,
        description: {
          client,
        },
      };

      submitTransaction(url, salesData);
    }

    // submit expenses
    else if (expenses) {
      const expenditureData = {
        transactionDate: date,
        transactionType: TransactionType.expense,
        amount,
        description: {
          item,
        },
      };

      submitTransaction(url, expenditureData);
    }

    // submit credits
    else if (credits) {
      const creditData = {
        transactionDate: date,
        transactionType: TransactionType.credit,
        amount,
        description: {
          item,
          creditor,
        },
      };

      submitTransaction(url, creditData);
    }
  };

  const navigate = useNavigate();
  err403 && navigate("/login");
  //

  //renders the input form component in the "inputForm" DOM node
  const inputFormElement = document.getElementById("inputForm");
  if (!inputFormElement) {
    return null;
  }
  //

  /*Ract portal:
   * React Portal provides a way to render children components
   * into a different DOM hierarchy than the one that originally renders them.
   */
  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.inputForm}>
        <div className={styles.cancel}>
          <RxCross2
            size={25}
            onClick={toggleTransactionInputFormVisibility}
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
                onChange={(e) => handleInputChange(e)}
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
            <button
              onClick={toggleTransactionInputFormVisibility}
              className="btn"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    inputFormElement
  );
};
