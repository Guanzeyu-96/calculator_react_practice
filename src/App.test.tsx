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

  it("should support 0.01 input", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    const key1 = screen.getByText("1");
    const key2 = screen.getByText("2");
    const key0 = screen.getByRole("button", { name: "0" });
    const keyPlus = screen.getByText("+");
    const keyPoint = screen.getByText(".");
    const keyEqual = screen.getByText("=");

    // type '0.01 + 0.02 ='

    userEvent.click(key0);
    userEvent.click(keyPoint);
    userEvent.click(key0);
    userEvent.click(key1);
    userEvent.click(keyPlus);
    userEvent.click(key0);
    userEvent.click(keyPoint);
    userEvent.click(key0);
    userEvent.click(key2);
    userEvent.click(keyEqual);

    // expect 0.03
    expect(element).toHaveTextContent("0.03");
  });

  it("should support continues computing", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    const key1 = screen.getByText("1");
    const key2 = screen.getByText("2");
    const key3 = screen.getByText("3");
    const keyPlus = screen.getByText("+");
    const keyTimes = screen.getByText("x");
    const keyEqual = screen.getByText("=");
    const keyReset = screen.getByText("C");

    // type '1+2+3='
    userEvent.click(key1);
    userEvent.click(keyPlus);
    userEvent.click(key2);
    userEvent.click(keyPlus);
    userEvent.click(key3);
    userEvent.click(keyEqual);

    // expect 7
    expect(element).toHaveTextContent("6");

    userEvent.click(keyReset);

    // type '1*3+2'
    userEvent.click(key1);
    userEvent.click(keyTimes);
    userEvent.click(key3);
    userEvent.click(keyPlus);
    userEvent.click(key2);
    userEvent.click(keyEqual);

    // expect 9.1
    expect(element).toHaveTextContent("5");
  });

  it("should support scientific computing", function () {
    render(<App />);
    const element = screen.getByTestId("screen");
    const key1 = screen.getByText("1");
    const key2 = screen.getByText("2");
    const key3 = screen.getByText("3");
    const key6 = screen.getByText("6");
    const key0 = screen.getByRole("button", { name: "0" });
    const keyPlus = screen.getByText("+");
    const keyTimes = screen.getByText("x");
    const keyDivide = screen.getByText("÷");
    const keyEqual = screen.getByText("=");
    const keyPoint = screen.getByText(".");
    const keyReset = screen.getByText("C");

    // type '1+2*3='
    userEvent.click(key1);
    userEvent.click(keyPlus);
    userEvent.click(key2);
    userEvent.click(keyTimes);
    userEvent.click(key3);
    userEvent.click(keyEqual);

    // expect 7
    expect(element).toHaveTextContent("7");

    userEvent.click(keyReset);

    // type '0.1+3*6/2=9.1'
    userEvent.click(key0);
    userEvent.click(keyPoint);
    userEvent.click(key1);
    userEvent.click(keyPlus);
    userEvent.click(key3);
    userEvent.click(keyTimes);
    userEvent.click(key6);
    userEvent.click(keyDivide);
    userEvent.click(key2);
    userEvent.click(keyEqual);

    // expect 9.1
    expect(element).toHaveTextContent("9.1");
  });
});
