import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App component", () => {
  it("renders the correct elements", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("calls onChange with correct argument(s) on each graph input", () => {
    const onChangeMock = jest.fn();
    render(<App />);
    const input = screen.getByRole("textbox", { name: "graphInput" });

    userEvent.type(input, "AB1");

    expect(onChangeMock).toHaveBeenNthCalledWith(1, "A");
    expect(onChangeMock).toHaveBeenNthCalledWith(2, "AB");
    expect(onChangeMock).toHaveBeenNthCalledWith(3, "AB1");
  });
});
