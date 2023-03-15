import React, { useState, useEffect } from "react";
import styles from "../transactions.module.scss";
import { BsPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { TransactionInputForm } from "../../../transactionInputForm/TransactionInputForm";
import { useLocation } from "react-router-dom";
import { TransactionDuration } from "../../../transactionDuration/TransactionDuration";
import { returnTitle } from "../../../transactionInputForm/types";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CheckLoadingState } from "../../../checkLoadingState/CheckLoadingState";
import { Timestamp } from "../../../timeStamp/TimeStamp";

export const editIcon = <FiEdit color="#36b9cc" />;
export const deleteIcon = <MdOutlineDelete color="#e64b3b" />;
export const plusIcon = <BsPlus />;

interface IDuration {
  month: number;
  year: number;
}

const initialState: IDuration = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

export const Sales = () => {
  const [showInputForm, setShowInputForm] = useState<boolean>(false);
  const id = useLocation().pathname.split("/")[1];
  const [salesPeriod, setSalesPeriod] = useState(initialState);
  const [salesData, setsalesData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  console.log(salesData);

  const handleToggle = (hideForm: boolean) => {
    setShowInputForm(hideForm);
  };

  // get sales data from db

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
          res.status == 201 && Notify.success(`Data submited`);
          setsalesData(res.data.sales);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        setLoading(false);
      }
    };
    getSalesdata();
  }, [salesPeriod]);

  return (
    <CheckLoadingState loading={loading}>
      <>
        {showInputForm && <TransactionInputForm onToggle={handleToggle} />}
        <div className={styles.transactions}>
          <div className={styles.header}>
            <div className={styles.wrapper}>
              <h1>{returnTitle(id, "sales", "expenditure", "credits")} data</h1>
              <div>
                <TransactionDuration />
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
              <h2>
                February 2023 {returnTitle(id, "sales", "expenses", "credits")}
              </h2>
            </div>
            {salesData?.length == 0 ? (
              <div>
                <p>No Sales records present for this period</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Client</th>
                    <th>Amount (Ksh)</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* MAP HERE */}
                  {salesData.map((sale, index) => {
                    const {
                      transactionDate,
                      amount,
                      _id,
                      description: { client },
                    } = sale;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{_id}</td>
                        <td>{client}</td>
                        <td>{amount}</td>
                        <td>
                          <Timestamp transactionDate={transactionDate} />
                        </td>
                        <td className={styles.action}>
                          <div>{editIcon}</div>
                          <div>{deleteIcon}</div>
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
