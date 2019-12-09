import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../components/Header";

it("render logo", () => {
  const { queryByTestId } = render(<Header />);
  expect(queryByTestId("logo").textContent).toBe("SNKRS PARADISE");
});

it("render search form", () => {
  const { queryByTestId } = render(<Header />);
  expect(queryByTestId("searchform")).toBeTruthy();
});

it("render newslink", () => {
  const { queryByTestId } = render(<Header />);
  expect(queryByTestId("newslink").textContent).toBe("NEWS");
});

it("render chatroom", () => {
  const { queryByTestId } = render(<Header />);
  expect(queryByTestId("chatroom").textContent).toBe("CHATROOM");
});
