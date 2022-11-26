import { eraseZero } from "./Screen";

describe("should erase 0 before a number", () => {
  test("0003404", () => {
    const numberBeforeFormat = "0003404";

    const numberAfterFormat = eraseZero(numberBeforeFormat);

    expect(numberAfterFormat).toBe("3404");
  });

  test("0000", () => {
    const numberBeforeFormat = "0000";

    const numberAfterFormat = eraseZero(numberBeforeFormat);

    expect(numberAfterFormat).toBe("0");
  });

  test("000.0406", () => {
    const numberBeforeFormat = "000.0406";

    const numberAfterFormat = eraseZero(numberBeforeFormat);

    expect(numberAfterFormat).toBe("0.0406");
  });

  test("0000.", () => {
    const numberBeforeFormat = "0000.";

    const numberAfterFormat = eraseZero(numberBeforeFormat);

    expect(numberAfterFormat).toBe("0.");
  });
});
