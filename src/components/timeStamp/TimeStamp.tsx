import React from "react";

interface IProps {
  transactionDate: Date;
}

export const Timestamp = ({ transactionDate }: IProps) => {
  const date = new Date(transactionDate);
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const monthIndex = date.getMonth();
  const fullMonthName = monthNames[monthIndex];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const timestamp = day + " " + fullMonthName + ", " + year;

  return <p>{timestamp}</p>;
};
