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

// export interface IState {
//   client: string;
//   item: string;
//   creditor: string;
//   amount: number;
//   date: Date;
// }

// export const initialState: IState = {
//   client: "",
//   item: "",
//   creditor: "",
//   amount: 0,
//   date: new Date(),
// };

// // for makeAPIcomponent
// export enum TransactionType {
//   sale = "sale",
//   expense = "expense",
//   credit = "credit",
// }

// export interface SalesData {
//   transactionDate: Date;
//   transactionType: string;
//   amount: number;
//   description: {
//     client: string;
//   };
// }

// export interface ExpenditureData {
//   transactionDate: Date;
//   transactionType: TransactionType.expense;
//   amount: number;
//   description: {
//     item: string;
//   };
// }

// export interface CreditsData {
//   transactionDate: Date;
//   transactionType: TransactionType.credit;
//   amount: number;
//   description: {
//     item: string;
//     creditor: string;
//   };
// }
