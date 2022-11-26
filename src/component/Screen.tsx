import React from "react";
import classes from "./Screen.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { eraseZero } from "../utils/erase-zero";

export const Screen: React.FC = () => {
  const result = useSelector<RootState>((state) => state.calculator.result);
  const input = useSelector<RootState>((state) => state.calculator.input);
  const isResult = useSelector<RootState>((state) => state.calculator.isResult);

  let screenNumber = isResult ? (result as string) : (input as string);

  screenNumber = eraseZero(screenNumber) as string;

  if (screenNumber.length > 8) {
    screenNumber = (+screenNumber).toExponential(2).toString();
  }

  return (
    <div className={classes.screen} data-testid="screen">
      {screenNumber}
    </div>
  );
};
