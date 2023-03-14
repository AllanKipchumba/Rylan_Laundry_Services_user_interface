import React, { useState, useEffect } from "react";
import styles from "../transactions.module.scss";
import { BsPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { TransactionInputForm } from "../../../transactionInputForm/TransactionInputForm";
import { useLocation } from "react-router-dom";
import { TransactionDuration } from "../../../transactionDuration/TransactionDuration";
import { returnTitle } from "../../../transactionInputForm/types";

export const editIcon = <FiEdit color="#36b9cc" />;
export const deleteIcon = <MdOutlineDelete color="#e64b3b" />;
export const plusIcon = <BsPlus />;

interface IState {
  client: string;
  amount: number;
  date: Date;
}

export const Sales = () => {
  const [showInputForm, setShowInputForm] = useState<boolean>(false);
  const id = useLocation().pathname.split("/")[1];

  const handleToggle = (hideForm: boolean) => {
    setShowInputForm(hideForm);
  };

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
