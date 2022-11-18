import { Provider } from "react-redux";
import store from "./store";
import React, { ReactNode } from "react";

export const RXProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
