import App from "./App";
import { render, screen } from "./test-utils/test-utils";
import userEvent from "@testing-library/user-event";

describe("Keyboard input test", () => {
  it("should show number to screen when keyboard is clicked", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    // init
    expect(element).toHaveTextContent("0");
    expect(element).not.toHaveTextContent("1");

    // type '1' with keyboard
    userEvent.keyboard("1");

    expect(element).toHaveTextContent("1");
  });

  it("should calculate numbers by keyboard", function () {
    render(<App />);
    const element = screen.getByTestId("screen");

    // type '1' '+' '1' 'Enter' with keyboard
    userEvent.keyboard("1+1{Enter}");
    expect(element).toHaveTextContent("2");

    // reset
    userEvent.keyboard("{Esc}");
    expect(element).toHaveTextContent("0");

    // type '3' '*' '4' 'Enter' with keyboard
    userEvent.keyboard("3*4{Enter}");
    expect(element).toHaveTextContent("12");

    // type '9' '-' '1' 'Enter' with keyboard
    userEvent.keyboard("{Esc}");
    userEvent.keyboard("9-1{Enter}");
    expect(element).toHaveTextContent("8");

    // type '12' '/' '3' 'Enter' with keyboard
    userEvent.keyboard("{Esc}");
    userEvent.keyboard("12/3{Enter}");
    expect(element).toHaveTextContent("4");
  });

  it("should calculate numbers by click", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    const key1 = screen.getByText("1");
    const key2 = screen.getByText("2");
    const keyPlus = screen.getByText("+");
    const keyMinus = screen.getByText("-");
    const keyTimes = screen.getByText("x");
    const keyDivide = screen.getByText("÷");
    const keyEqual = screen.getByText("=");
    const keyReset = screen.getByText("C");

    // // type '1' '+' '2' '=' with click
    userEvent.click(key1);
    userEvent.click(keyPlus);
    userEvent.click(key2);
    userEvent.click(keyEqual);
    expect(element).toHaveTextContent("3");

    // reset
    userEvent.click(keyReset);
    expect(element).toHaveTextContent("0");

    // type '2' '*' '2' '=' with click
    userEvent.click(key2);
    userEvent.click(keyTimes);
    userEvent.click(key2);
    userEvent.click(keyEqual);
    expect(element).toHaveTextContent("4");

    // type '2' '-' '1' '=' with click
    userEvent.click(keyReset);
    userEvent.click(key2);
    userEvent.click(keyMinus);
    userEvent.click(key1);
    userEvent.click(keyEqual);

    // type '1' '/' '2' '=' with click
    userEvent.click(keyReset);
    userEvent.click(key1);
    userEvent.click(keyDivide);
    userEvent.click(key2);
    userEvent.click(keyEqual);
    expect(element).toHaveTextContent("0.5");
  });
});
