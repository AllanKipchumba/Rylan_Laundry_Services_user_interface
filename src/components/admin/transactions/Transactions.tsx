import React, { useState, useEffect } from "react";
import styles from "./transactions.module.scss";
import { BsPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { TransactionInputForm } from "../../transactionInputForm/TransactionInputForm";
import { useLocation } from "react-router-dom";
import { TransactionDuration } from "../../transactionDuration/TransactionDuration";
import { returnTitle } from "../../transactionInputForm/types";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../redux/store";
import { CheckLoadingState } from "../../checkLoadingState/CheckLoadingState";
import { monthNames, Timestamp } from "../../timeStamp/TimeStamp";
import { useDispatch } from "react-redux";
import {
  STORE_TRANSACTION,
  TransactionData,
} from "../../../redux/slices/transactionDetails";
import { Confirm } from "notiflix";

export const editIcon = <FiEdit color="#36b9cc" />;
export const deleteIcon = <MdOutlineDelete color="#e64b3b" />;
export const plusIcon = <BsPlus />;

export interface IDuration {
  month: number;
  year: number;
}

export const defaultPeriod: IDuration = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export const Transactions = () => {
  //access auth data
  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };
  //

  //variable declarations
  const [showInputForm, setShowInputForm] = useState(false);
  const id = useLocation().pathname.split("/")[1];
  const [salesPeriod, setSalesPeriod] = useState(defaultPeriod);
  const [salesData, setsalesData] = useState([]);
  const [expenditureData, setExpenditureData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState<TransactionData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [editTransaction, setEdittransaction] = useState(false);
  const [transactionIsDeleted, setTransactionIsDeleted] = useState(false);

  // This state variable tracks the number of updates to the transaction data.
  // It is used to trigger re-renders when the data is updated.
  const [updateCounter, setUpdateCounter] = useState(0);

  //

  //get the transaction to be edited and send it to redux store
  const storeThisTransaction = (id: string) => {
    const transaction = transactionsData.filter((data) => data._id === id);
    dispatch(STORE_TRANSACTION(transaction[0]));
  };
  //

  //update states from child component, TransactionInputForm
  const toggleTransactionInputForm = (hideForm: boolean, update: boolean) => {
    setShowInputForm(hideForm);
    // Increase the update counter when there is a data update.
    update && setUpdateCounter((prev) => prev + 1);
  };
  //
  console.log(updateCounter);

  /*updates sales period.
   *Receives data from TransactionDuration component
   */
  const changeSalesPeriod = (data: IDuration) => {
    setSalesPeriod(data);
  };
  //

  // get transactions data from db
  useEffect(() => {
    const getTransactionsData = async () => {
      setLoading(true);
      try {
        await axios({
          method: "post",
          url: `http://localhost:5000/transactions/monthly`,
          data: salesPeriod,
          headers: headers,
        }).then((res) => {
          setsalesData(res.data?.sales);
          setExpenditureData(res.data?.expenditure);
          setCreditsData(res.data?.credits);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    };
    getTransactionsData();
  }, [salesPeriod, id, transactionIsDeleted, updateCounter]);
  //

  //update transaction data variable depending on the 'id'
  useEffect(() => {
    id === "sales" && setTransactionsData(salesData);
    id === "expenses" && setTransactionsData(expenditureData);
    id === "credits" && setTransactionsData(creditsData);
  }, [id, salesData, expenditureData, creditsData]);
  //

  //delete transaction record
  const deleteTransaction = async (id: string) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/transactions/${id}`,
        headers: headers,
      }).then((res) => {
        res.status == 204 && Notify.info("Transaction deleted");
        setTransactionIsDeleted(!transactionIsDeleted);
      });
    } catch (error) {
      console.log(error);
      Notify.failure(`${error}!`);
    }
  };

  const confirmDeleteTransaction = (id: string) => {
    Confirm.show(
      "Delete Transaction!",
      `You are about to delete this transaction`,
      "Delete",
      "Cancel",
      function okCb() {
        deleteTransaction(id);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#e64b3b",
        okButtonBackground: "#e64b3b",
        cssAnimationStyle: "zoom",
      }
    );
  };
  //

  return (
    <CheckLoadingState loading={loading}>
      <>
        {showInputForm && (
          <TransactionInputForm
            onToggle={toggleTransactionInputForm}
            editTransaction={editTransaction}
          />
        )}
        <div className={styles.transactions}>
          <div className={styles.header}>
            <div className={styles.wrapper}>
              <h1>{returnTitle(id, "sales", "expenditure", "credits")} data</h1>
              <div>
                <TransactionDuration
                  updateTransactionDuration={changeSalesPeriod}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setShowInputForm(!showInputForm);
                setEdittransaction(false);
              }}
              className={`btn`}
            >
              <BsPlus />{" "}
              <span>
                Add {returnTitle(id, "sales", "expenditure", "credits")}
              </span>
            </button>
          </div>

          <div className={styles["transactions-data"]}>
            <div className={styles.header}>
              <h1>
                {monthNames[salesPeriod.month - 1]}, {salesPeriod.year} &nbsp;
                {returnTitle(id, "sales", "expenses", "credits")}
              </h1>
            </div>
            {transactionsData?.length == 0 ? (
              <div className={styles.noTransactionRecords}>
                <p>
                  No {returnTitle(id, "sales ", "expenses ", "credits ")}{" "}
                  present for this period
                </p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    {id === "sales" && <th>Client</th>}
                    {id === "expenses" && <th>item</th>}
                    {id === "credits" && (
                      <>
                        <th>item</th>
                        <th>creditor</th>
                      </>
                    )}
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.map((transaction, index) => {
                    const {
                      transactionDate,
                      amount,
                      _id,
                      description: { client, item, creditor },
                    } = transaction;

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{_id}</td>
                        <td>
                          <Timestamp transactionDate={transactionDate} />
                        </td>
                        {id === "sales" && <td>{client}</td>}
                        {id === "expenses" && <td>{item}</td>}
                        {id === "credits" && (
                          <>
                            <td>{item}</td> <td>{creditor}</td>
                          </>
                        )}
                        <td>Ksh {amount}</td>

                        <td className={styles.action}>
                          <div
                            onClick={() => {
                              _id != undefined && storeThisTransaction(_id);
                              setEdittransaction(true);
                              setShowInputForm(!showInputForm);
                            }}
                          >
                            {editIcon}
                          </div>
                          <div
                            onClick={() => {
                              _id != undefined && confirmDeleteTransaction(_id);
                            }}
                          >
                            {deleteIcon}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    </CheckLoadingState>
  );
};
