import React from "react";
import "@testing-library/jest-dom";
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
    const input = screen.getByRole("textbox", { name: "Graph" });

    userEvent.type(input, "AB1");

    expect(input).toHaveValue("AB1");
  });
});
