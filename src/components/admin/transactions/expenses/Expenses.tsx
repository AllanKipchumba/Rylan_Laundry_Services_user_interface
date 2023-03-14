import React, { useState } from "react";
import styles from "../transactions.module.scss";
import { editIcon, deleteIcon, plusIcon } from "../sales/Sales";
import { TransactionInputForm } from "../../../transactionInputForm/TransactionInputForm";
import { useLocation } from "react-router-dom";
import { TransactionDuration } from "../../../transactionDuration/TransactionDuration";
import { returnTitle } from "../../../transactionInputForm/types";

export const Expenses = () => {
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
            {plusIcon} <span>Add Expenditure</span>
          </button>
        </div>

        <div className={styles["transactions-data"]}>
          <div className={styles.header}>
            <h2>
              February 2023 {returnTitle(id, "Sales", "expenditure", "credits")}
            </h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1fdsse3</td>
                <td>downy</td>
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
                <td>downy</td>
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
                <td>downy</td>
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
                <td>downy</td>
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
