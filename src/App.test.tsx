import App from "./App";
import { render, screen } from "./test-utils/test-utils";
import userEvent from "@testing-library/user-event";

describe("Wrapper", () => {
  it("should show number to screen when keyboard is clicked", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    // init
    expect(element).toHaveTextContent("0");
    expect(element).not.toHaveTextContent("1");

    // type '1' with keyboard
    userEvent.keyboard('1');

    expect(element).toHaveTextContent('1');
  });
});
