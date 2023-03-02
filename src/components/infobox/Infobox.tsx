import React, { ReactNode } from "react";
import { Card } from "../card/Card";
import styles from "./infobox.module.scss";

interface propTypes {
  cardClass: string;
  title: string;
  count: number;
  icon: ReactNode;
}

export const Infobox = ({ cardClass, title, count, icon }: propTypes) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};
