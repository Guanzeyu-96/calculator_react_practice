import { configureStore } from "@reduxjs/toolkit";
import { calculatorSlice } from "./calculator";

const store = configureStore({
  reducer: { calculator: calculatorSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
