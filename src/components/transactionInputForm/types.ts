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
