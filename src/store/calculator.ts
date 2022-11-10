import {createSlice} from "@reduxjs/toolkit";

enum RULE {
  ADD,
  MINUS,
  TIMES,
  DIVIDE,
}

interface CalculatorState {
  originValue: number;
  rule: RULE | null;
  objectValue: number | null;
}

const initCalculatorState: CalculatorState = {
  originValue: 0,
  rule: null,
  objectValue: null,
};

export const calculatorSlice = createSlice({
  name: 
})
