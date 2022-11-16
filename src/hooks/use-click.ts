import { calculatorActions } from "../store/calculator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";


export const useClick = () => {

  const dispatch = useDispatch();
  const isResult = useSelector<RootState>((state) => state.calculator.isResult);

  const onClick = (value: string | number) => {
    // todo: 写完所有按钮的点击事件
    if (typeof value === "number") {
      // 如果输入数字时结果区有值，则自动执行初始化
      if (isResult) {
        dispatch(calculatorActions.reset());
      }
      dispatch(calculatorActions.numberClickHandler(value));
    } else if (["+", "-", "x", "÷"].includes(value)) {
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

  return { onClick };
};
