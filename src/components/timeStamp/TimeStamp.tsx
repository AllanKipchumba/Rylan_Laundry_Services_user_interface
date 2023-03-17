import React from "react";

export const monthNames = [
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

interface IProps {
  transactionDate: Date;
}

export const Timestamp = ({ transactionDate }: IProps) => {
  const date = new Date(transactionDate);

  const monthIndex = date.getMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const timestamp = day + "/" + monthIndex + "/" + year;

  return <p>{timestamp}</p>;
};
