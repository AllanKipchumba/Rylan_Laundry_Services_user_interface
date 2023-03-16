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
import { RootState } from "../../../redux/store";
import { CheckLoadingState } from "../../checkLoadingState/CheckLoadingState";
import { monthNames, Timestamp } from "../../timeStamp/TimeStamp";

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
/**
 * optimise this component to be used in sales, expenses, credits based on id
 *
 */

export const Transactions = () => {
  const [showInputForm, setShowInputForm] = useState<boolean>(false);
  const id = useLocation().pathname.split("/")[1];
  const [salesPeriod, setSalesPeriod] = useState(defaultPeriod);
  const [salesData, setsalesData] = useState([]);
  const [expenditureData, setExpenditureData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const handleToggle = (hideForm: boolean) => {
    setShowInputForm(hideForm);
  };

  const changeSalesPeriod = (data: IDuration) => {
    setSalesPeriod(data);
  };

  useEffect(() => {
    id === "sales" && setTransactionsData(salesData);
    id === "expenses" && setTransactionsData(expenditureData);
    id === "credits" && setTransactionsData(creditsData);
  }, [id, salesPeriod]);

  // get transactions data from db
  useEffect(() => {
    const getSalesdata = async () => {
      setLoading(true);
      try {
        await axios({
          method: "post",
          url: `http://localhost:5000/transactions/monthly`,
          data: salesPeriod,
          headers: headers,
        }).then((res) => {
          setsalesData(res.data.sales);
          setExpenditureData(res.data.expenditure);
          setCreditsData(res.data.credits);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    };
    getSalesdata();
  }, [salesPeriod, id]);

  return (
    <CheckLoadingState loading={loading}>
      <>
        {showInputForm && <TransactionInputForm onToggle={handleToggle} />}
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
              onClick={() => setShowInputForm(!showInputForm)}
              className={`btn`}
            >
              <BsPlus /> <span>Add sale</span>
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
                        <th>item</th> <th>creditor</th>
                      </>
                    )}
                    <th>Amount</th>
                    {/* <th>Action</th> */}
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

                        {/* <td className={styles.action}>
                          <div>{editIcon}</div>
                          <div>{deleteIcon}</div>
                        </td> */}
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