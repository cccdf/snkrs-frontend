import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfilePage from "../components/ProfilePage.js";

it("get username and say hello", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("username").textContent).toBe("Hi! ");
});

it("delete account button", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("deleteaccount")).toBeTruthy();
});

it("update button", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("updatelike")).toBeTruthy();
});

it("chose button", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("chosebutton")).toBeTruthy();
});

it("render user chose", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("userchose")).toBeTruthy();
});
it("choseinfo", () => {
  const { queryByTestId } = render(<ProfilePage />);
  expect(queryByTestId("choseinfo")).toBeTruthy();
});
