import React from "react";
import classes from "./ButtonArea.module.css";

export const ButtonArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={classes.buttonBox}>{children}</div>;
};
