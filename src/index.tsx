import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RXProvider } from "./store/Provider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RXProvider>
    <App />
  </RXProvider>
);
