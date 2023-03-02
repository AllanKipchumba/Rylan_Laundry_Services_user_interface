import React from "react";
import styles from "./card.module.scss";

interface propTypes {
  children: React.ReactNode[];
  cardClass: string;
}

export const Card = ({ children, cardClass }: propTypes) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};
