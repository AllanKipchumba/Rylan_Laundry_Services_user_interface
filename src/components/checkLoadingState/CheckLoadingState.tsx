import React, { ReactNode } from "react";
import { Loading } from "notiflix";

interface IProps {
  loading: boolean;
  children: ReactNode;
}

export const CheckLoadingState = ({
  children,
  loading,
}: IProps): JSX.Element | null => {
  if (loading) {
    Loading.dots("Fetching data. Please wait...", {
      svgColor: "#4f72df",
      backgroundColor: "rgba(0,0,0,0.6)",
    });
    return null;
  } else {
    Loading.remove();

    return <>{children}</>;
  }
};
