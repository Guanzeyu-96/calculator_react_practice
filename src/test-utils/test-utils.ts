import { render } from "@testing-library/react";
import { RXProvider } from "../store/Provider";

const renderWithProvider = (ui: any, options?: any) => {
  render(ui, { wrapper: RXProvider, ...options });
};

export * from "@testing-library/react";
export { renderWithProvider as render };
