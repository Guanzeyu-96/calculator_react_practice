import React from "react";
import classes from "./Button.module.css";
import { useClick } from "../hooks/use-click";

export const Button: React.FC<{
  value: string | number;
}> = ({ value }) => {
  const { onClick } = useClick();

  // 此函数用于给出css的className
  const getStyleName = (btn: string | number) => {
    const className = {
      0: classes.zero,
      "+": classes.sign,
      "-": classes.sign,
      x: classes.sign,
      "÷": classes.sign,
      "=": classes.sign,
      C: classes.special,
      "+-": classes.special,
      "%": classes.special,
    };
    // @ts-ignore
    return className[btn];
  };

  return (
    <button
      className={`${getStyleName(value)} ${classes.button}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};
