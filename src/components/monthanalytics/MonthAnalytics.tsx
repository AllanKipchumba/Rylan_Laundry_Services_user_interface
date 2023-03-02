import React from "react";
import styles from "./monthanalytics.module.scss";

interface FinancialData {
  sales: number;
  credits: number;
  expenses: number;
  deductions: number;
  businessRevenue: number;
  debts: number;
  revenueToSettleDebts: number;
  profit: number;
  sharableRevenue: number;
  ryl_Rev: number;
  ryl_debits: number;
  ryl_expected_pay: number;
  lan_rev: number;
  lan_debits: number;
  lan_expected_pay: number;
}

interface Props {
  data: FinancialData[];
}

export const MonthAnalytics = ({ data }: Props) => {
  return (
    <div className={styles["financial-data"]}>
      <table>
        <thead>February Accounts</thead>
        {data.map((item, index) => (
          <div key={index}>
            <tr>
              Sales: <td>{item.sales}</td>
            </tr>
            <tr>
              Credits: <td>{item.credits}</td>
            </tr>
            <tr>
              Expenses: <td>{item.expenses}</td>
            </tr>
            <tr>
              Deductions:<td> {item.deductions}</td>
            </tr>
            <tr>
              Business Revenue: <td>{item.businessRevenue}</td>
            </tr>
            <tr>
              Debts: <td>{item.debts}</td>
            </tr>
            <tr>
              Revenue to Settle Debts:<td> {item.revenueToSettleDebts}</td>
            </tr>
            <tr>
              Profit: <td>{item.profit}</td>
            </tr>
            <tr>
              Sharable Revenue: <td>{item.sharableRevenue}</td>
            </tr>
            <tr>
              RYL Revenue: <td>{item.ryl_Rev}</td>
            </tr>
            <tr>
              RYL Debts: <td>{item.ryl_debits}</td>
            </tr>
            <tr>
              RYL Expected Pay: <td>{item.ryl_expected_pay}</td>
            </tr>
            <tr>
              LAN Revenue: <td>{item.lan_rev}</td>
            </tr>
            <tr>
              LAN Debts: <td>{item.lan_debits}</td>
            </tr>
            <tr>
              LAN Expected Pay: <td>{item.lan_expected_pay}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
};
