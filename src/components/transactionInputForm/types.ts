export const returnTitle = (
  id: string,
  title1: string,
  title2: string,
  title3: string
): string => {
  switch (id) {
    case "sales":
      return title1;

    case "expenses":
      return title2;

    case "credits":
      return title3;

    default:
      return "undefined";
  }
};

export enum TransactionType {
  sale = "sale",
  expense = "expense",
  credit = "credit",
}

export interface TransactionInputData {
  client?: string;
  item?: string;
  creditor?: string;
  amount: number;
  date: Date;
}

export const initialState: TransactionInputData = {
  client: "",
  item: "",
  creditor: "",
  amount: 0,
  date: new Date(),
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
