//function used by sales, expenses, credits components
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

//props for input form
export type ChildProps = {
  onToggle: (hideform: boolean) => void;
  editTransaction: boolean;
};

export interface IState {
  client: string;
  item: string;
  creditor: string;
  amount: number;
  date: Date;
}

export const initialState: IState = {
  client: "",
  item: "",
  creditor: "",
  amount: 0,
  date: new Date(),
};

// for makeAPIcomponent
export enum TransactionType {
  sale = "sale",
  expense = "expense",
  credit = "credit",
}

export interface TransactionData {
  _id: string;
  __v?: number;
  transactionDate: Date;
  transactionType:
    | TransactionType.sale
    | TransactionType.expense
    | TransactionType.credit;
  amount: number;
  description: {
    client?: string;
    item?: string;
    creditor?: string;
  };
}
