import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Admin, Login } from "../../pages";
import { RootState } from "../../redux/store";

interface IProps {
  children: ReactNode;
}

export const Authenicated: React.FC<IProps> = ({ children }) => {
  const { user } = useSelector((store: RootState) => store["auth"]);

  if (user) {
    return <>{children}</>;
  } else {
    return <Login />;
  }
};

export const NotAuthenicated: React.FC<IProps> = ({ children }) => {
  const { user } = useSelector((store: RootState) => store["auth"]);

  if (!user) {
    return <>{children}</>;
  } else {
    return <Admin />;
  }
};
