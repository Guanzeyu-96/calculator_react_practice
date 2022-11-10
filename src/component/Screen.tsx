import React from "react";
import classes from "./Screen.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Screen: React.FC = () => {
  const result = useSelector<RootState>((state) => state.calculator.result);
  const input = useSelector<RootState>((state) => state.calculator.input);
  const isResult = useSelector<RootState>((state) => state.calculator.isResult);

  let screenNumber = isResult ? (result as string) : (input as string);
  if (screenNumber.length > 11) {
    screenNumber = (+screenNumber).toExponential(2).toString();
  }

  return <div className={classes.screen}>{screenNumber}</div>;
};
