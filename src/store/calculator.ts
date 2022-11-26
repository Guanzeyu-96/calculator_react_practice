import { createSlice } from "@reduxjs/toolkit";
import { Decimal } from "decimal.js";
import { scientificComputing } from "../utils/scientific-computing";
import { eraseZero } from "../utils/erase-zero";
import { signMapper } from "../constant/signMapper";

interface CalculatorState {
  input: string; // 实时输入区
  stage: string | null; // 暂存区
  result: string | null; // 计算结果保存区
  isResult: boolean; // 是否为input阶段,仅用来控制显示（input阶段显示input，非input阶段显示result）
  isNumInit: boolean; // 判断num输入状态。为true时表现为重置；为false时表现为拼接
}

const initCalculatorState: CalculatorState = {
  input: "0",
  stage: null,
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

      state.input = state.input + action.payload.toString();
    },
    pointClickHandler(state) {
      if (state.isNumInit) {
        state.input = "0";
        state.isNumInit = false;
      }
      if (state.input.includes(".")) {
        return;
      } else {
        state.input = state.input + ".";
      }
    },
    negativeClickHandler(state) {
      if (!state.isResult) {
        state.input = (-parseInt(state.input)).toString();
      } else {
        state.result = (-parseInt(state.result!)).toString();
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
      // 连续运算指的是：暂存区清空，然后result区置入input区，result区清空
      if (state.isResult) {
        state.stage = null;
        state.input = state.result!;
        state.isResult = false;
        state.result = null;
      }

      // 点击运算符发生的事情：把input区的结果拼接入stage、然后把运算符拼接到stage区之后，数字输入状态变为初始化
      if (!state.stage) {
        state.stage =
          eraseZero(state.input) + signMapper[action.payload as string];
      } else {
        state.stage =
          state.stage +
          eraseZero(state.input) +
          signMapper[action.payload as string];
      }

      state.isNumInit = true;
    },
    equalClickHandler(state) {
      // 点击=发生的事：把input区的数据拼接到stage区之后得到expression，计算出结果并放入result区，数字输入状态变为初始化
      // 判断用户没有输入运算符点击=的情况
      if (!state.stage) {
        state.result = state.input;
        state.isResult = true;
        state.isNumInit = true;
        return;
      }

      const expression = state.stage + eraseZero(state.input);
      state.result = scientificComputing(expression);

      state.isResult = true;
      state.isNumInit = true;
    },
    reset(state) {
      // 重置按钮，按c使得所有state更新为最初状态
      state.input = "0";
      state.stage = null;
      state.result = null;
      state.isResult = false;
      state.isNumInit = false;
    },
  },
});

// @ts-ignore
export const calculatorActions = calculatorSlice.actions;
