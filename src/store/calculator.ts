import { createSlice } from "@reduxjs/toolkit";
import { Decimal } from "decimal.js";

interface CalculatorState {
  input: string; // 实时输入区
  stage: string | null; // 暂存区
  rule: string | null; // 计算法则存储区
  result: string | null; // 计算结果保存区
  isResult: boolean; // 是否为input阶段,仅用来控制显示（input阶段显示input，非input阶段显示result）
  isNumInit: boolean; // 判断num输入状态。为true时表现为重置；为false时表现为拼接
}

const initCalculatorState: CalculatorState = {
  input: "0",
  stage: null,
  rule: null,
  result: null,
  isResult: false,
  isNumInit: false,
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: initCalculatorState,
  reducers: {
    numberClickHandler(state, action) {
      // 当isNumInit为true的时候重置input为0，并切换为输入模式（拼接）
      if (state.isNumInit) {
        state.input = "0";
        state.isNumInit = false;
      }
      // 先将input和输入拼接，转为number后再转回string（实现最前去掉0等操作）
      const numInput = state.input! + action.payload.toString();
      state.input = (+numInput).toString();
    },
    pointClickHandler(state) {
      if (state.isNumInit) {
        state.input = "0";
        state.isNumInit = false;
      }
      if (state.input!.includes(".")) {
        return;
      } else {
        state.input = state.input + ".";
      }
    },
    negativeClickHandler(state) {
      if (!state.isResult) {
        state.input = (-+state.input).toString();
      } else {
        state.result = (-+state.result!).toString();
      }
    },
    percentClickHandler(state) {
      if (!state.isResult) {
        const value = new Decimal(state.input);
        state.input = value.div(100).toString();
      } else {
        const value = new Decimal(state.result!);
        state.result = value.div(100).toString();
      }
    },

    operatorClickHandler(state, action) {
      // 如果点击运算符的时候result区有数据，则执行连算模式
      if (state.isResult) {
        state.input = state.result!;
        state.isResult = false;
        state.result = null;
      }

      // 点击运算符发生的事情：把input区的结果放入stage、初始化input区、把运算符的value记录到rule区，数字输入状态变为初始化
      state.stage = state.input!;
      state.rule = action.payload as string;
      state.isNumInit = true;
    },
    equalClickHandler(state) {
      // 点击=发生的事：根据input区，stage区和rule区的数据计算出结果并放入result区，数字输入状态变为初始化
      // 数值计算前使用Decimal处理
      // 判断用户没有输入运算符点击=的情况
      if (!state.stage){
        state.result = state.input;
        state.isResult = true;
        state.isNumInit = true;
        return;
      }

      const value = new Decimal(state.stage!);
      const targetValue = new Decimal(state.input);
      switch (state.rule) {
        case "+":
          state.result = value.add(targetValue).toString();
          break;
        case "-":
          state.result = value.minus(targetValue).toString();
          break;
        case "x":
          state.result = value.times(targetValue).toString();
          break;
        case "÷":
          // 被除数为0的情况下抛出异常
          if (+state.input === 0) throw new Error("Dividend can't be 0!");
          state.result = value.div(targetValue).toString();
          break;
        default:
          state.result = state.input; // default对应用户没有输入运算符点击=的情况
      }
      state.isResult = true;
      state.isNumInit = true;
    },
    reset(state) {
      // 重置按钮，按c使得所有state更新为最初状态
      state.input = "0";
      state.stage = null;
      state.rule = null;
      state.result = null;
      state.isResult = false;
      state.isNumInit = false;
    },
  },
});
export const calculatorActions = calculatorSlice.actions;
