import React from "react";
import classes from "./Button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calculatorActions } from "../store/calculator";
import { RootState } from "../store/store";

export const Button: React.FC<{
  value: string | number;
}> = ({ value }) => {
  const dispatch = useDispatch();
  const isResult = useSelector<RootState>((state) => state.calculator.isResult);

  // 此函数用于给出css的className
  const getStyleName = (btn: string | number) => {
    const className = {
      0: classes.zero,
      "+": classes.sign,
      "-": classes.sign,
      x: classes.sign,
      "/": classes.sign,
      "=": classes.sign,
      C: classes.special,
      "+-": classes.special,
      "%": classes.special,
    };
    // @ts-ignore
    return className[btn];
  };

  const onClick = () => {
    // todo: 写完所有按钮的点击事件
    if (typeof value === "number") {
      // 如果输入数字时结果区有值，则自动执行初始化
      if (isResult) {
        dispatch(calculatorActions.reset());
      }
      dispatch(calculatorActions.numberClickHandler(value));
    } else if (["+", "-", "x", "/"].includes(value)) {
      dispatch(calculatorActions.operatorClickHandler(value));
    } else if (value === "=") {
      try {
        dispatch(calculatorActions.equalClickHandler());
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
        dispatch(calculatorActions.reset());
      }
    } else if (value === "C") {
      dispatch(calculatorActions.reset());
    } else if (value === ".") {
      dispatch(calculatorActions.pointClickHandler());
    } else if (value === "+-") {
      dispatch(calculatorActions.negativeClickHandler());
    } else if (value === "%") {
      dispatch(calculatorActions.percentClickHandler());
    }
  };

  return (
    <button
      className={`${getStyleName(value)} ${classes.button}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
