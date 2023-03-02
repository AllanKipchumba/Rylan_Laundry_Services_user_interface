import React from "react";
import { Card } from "../card/Card";
import styles from "./infobox.module.scss";

interface propTypes {
  cardClass: string;
  title: string;
  count: number;
  icon: React.ComponentType<any>;
}

export const Infobox = ({ cardClass, title, count, icon }: propTypes) => {
  const IconComponent = icon;
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          <IconComponent />
        </span>
      </Card>
    </div>
  );
};
