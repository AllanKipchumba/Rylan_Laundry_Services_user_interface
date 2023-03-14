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
  // const [salesData, setsalesData] = useState([]);

  const { user } = useSelector((store: RootState) => store["auth"]);
  const token = user?.accessToken;
  const headers = { Authorization: `Bearer ${token}` };

  const handleToggle = (hideForm: boolean) => {
    setShowInputForm(hideForm);
  };

  // get sales data from db

  useEffect(() => {
    const getSalesdata = async () => {
      try {
        await axios
          .get(`http://localhost:5000/transactions`, {
            headers: headers,
            params: {
              month: salesPeriod.month,
              year: salesPeriod.year,
            },
          })
          .then((res) => {
            res.status == 201 && Notify.success(`Data submited`);
            console.log(res.data);

            // setLoading(false);
          });
      } catch (error) {
        console.log(error);
        Notify.failure(`${error}!`);
        // setLoading(false);
      }
    };
    getSalesdata();
  }, [salesPeriod]);

  return (
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
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>1fdsse3</td>
                <td>Leila</td>
                <td>150</td>
                <td>2/2/2023</td>
                <td className={styles.action}>
                  <div>{editIcon}</div>
                  <div>{deleteIcon}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
