import {render, screen} from "@testing-library/react";
import App from "./App";

describe("Wrapper", () => {
    it("should show number to screen when keyboard is clicked", function () {
        render(<App />);
        const element = screen.getByTestId("screen");
        // init
        expect(element).toBe("0");
    });
})