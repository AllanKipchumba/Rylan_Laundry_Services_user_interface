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
      break;

    case "expenses":
      return title2;
      break;

    case "credits":
      return title3;
      break;

    default:
      return "undefined";
      break;
  }
};

//props for input form
export type ChildProps = {
  onToggle: (hideform: boolean) => void;
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
enum TransactionType {
  sale = "sale",
  expense = "expense",
  credit = "credit",
}

export interface SalesData {
  transactionDate: Date;
  transactionType: TransactionType.sale;
  amount: number;
  description: {
    client: string;
  };
}

export interface ExpenditureData {
  transactionDate: Date;
  transactionType: TransactionType.expense;
  amount: number;
  description: {
    item: string;
  };
}

export interface CreditsData {
  transactionDate: Date;
  transactionType: TransactionType.credit;
  amount: number;
  description: {
    item: string;
    creditor: string;
  };
}

//makeAPIrequest component props
export type MakeAPIrequestChildProps = {
  salesData: SalesData;
  expenditureData: ExpenditureData;
  creditsData: CreditsData;
};
