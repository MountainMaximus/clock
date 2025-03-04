import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}
export const Button: React.FC<ButtonProps> = ({  children, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.root}
    >
      {children}
    </button>
  );
};

