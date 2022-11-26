import { scientificComputing } from "./scientific-computing";

describe("scientific computing should be supported at any expression", () => {
  it('should support "1+2"', function () {
    const expression = "1+2";
    const result = scientificComputing(expression);
    expect(result).toBe("3");
  });

  it('should support "1+2*3"', function () {
    const expression = "1+2*3";
    const result = scientificComputing(expression);
    expect(result).not.toBe("9");
    expect(result).toBe("7");
  });

  it('should support "1+3/2"', function () {
    const expression = "1+3/2";
    const result = scientificComputing(expression);
    expect(result).toBe("2.5");
  });

  it('should support "1+2*3-9/3"', function () {
    const expression = "1+2*3-9/3";
    const result = scientificComputing(expression);
    expect(result).toBe("4");
  });

  it('should support "1+4*6/3+1"', function () {
    const expression = "1+4*6/3+1";
    const result = scientificComputing(expression);
    expect(result).toBe("10");
  });
});
