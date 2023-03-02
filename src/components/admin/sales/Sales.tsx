import React from "react";
import styles from "./sales.module.scss";
import { BsPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const editIcon = <FiEdit color="#36b9cc" />;
const deleteIcon = <MdOutlineDelete color="#e64b3b" />;

export const Sales = () => {
  return (
    <div className={styles.sales}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <h1>Sales data</h1>
          <div className={styles["sales-duration"]}>
            <form>
              <input type="number" placeholder="month" required />
              <input type="number" placeholder="year" required />
              <button className={styles.btn}>Get data</button>
            </form>
          </div>
        </div>
        <button className={styles.btn}>
          <BsPlus /> <span>Add sale</span>
        </button>
      </div>

      <div className={styles["sales-data"]}>
        <div className={styles.header}>
          <h2>February 2023 sales</h2>
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
  );
};
