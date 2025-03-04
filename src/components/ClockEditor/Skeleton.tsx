import React from "react";

import styles from "./ClockEditor.module.scss";

export const Skeleton: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={`${styles.skeleton} ${styles.clock}`}></div>
      <div className={`${styles.skeleton} ${styles.button}`}></div>
    </div>
  );
};
