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

  it("should calculate numbers by keyboard", function () {
    render(<App />);
    const element = screen.getByTestId("screen");

    // type '1' '+' '1' 'Enter' with keyboard
    userEvent.keyboard("1+1{Enter}");
    expect(element).toHaveTextContent('2');

    // reset
    userEvent.keyboard("{Esc}");
    expect(element).toHaveTextContent('0');

    // type '3' '*' '4' 'Enter' with keyboard
    userEvent.keyboard("3*4{Enter}");
    expect(element).toHaveTextContent('12');

    // type '9' '-' '1' 'Enter' with keyboard
    userEvent.keyboard("{Esc}");
    userEvent.keyboard("9-1{Enter}");
    expect(element).toHaveTextContent('8');

    // type '12' '/' '3' 'Enter' with keyboard
    userEvent.keyboard("{Esc}");
    userEvent.keyboard("12/3{Enter}");
    expect(element).toHaveTextContent('4');
  });
});
