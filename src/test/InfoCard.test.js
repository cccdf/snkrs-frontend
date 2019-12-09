import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InfoCard from "../components/InfoCard.js";

it("renders infocard with props(producttitle)", () => {
  const { queryByText, container } = render(
    <InfoCard producttitle="Kyrie 6" />
  );
  expect(queryByText("Kyrie 6")).toBeTruthy();
});

it("renders infocard with props(imglink)", () => {
  const { container } = render(
    <InfoCard imglink="https://secure-images.nike.com/is/image/DotCom/CD8178_001_A_PREM?$SNKRS_COVER_WD$&align=0,1" />
  );
  expect(
    container.querySelector("div.infocard img").getAttribute("src")
  ).toEqual(
    "https://secure-images.nike.com/is/image/DotCom/CD8178_001_A_PREM?$SNKRS_COVER_WD$&align=0,1"
  );
});

it("renders infocard with props(productlink)", () => {
  const { container } = render(
    <InfoCard productlink="https://www.nike.com/launch/t/vapor-street-off-white-athlete-in-progress-black/" />
  );
  expect(
    container.querySelector("div.infocard div.title a").getAttribute("href")
  ).toEqual(
    "https://www.nike.com/launch/t/vapor-street-off-white-athlete-in-progress-black/"
  );
});

it("renders infocard with props(time)", () => {
  const { container } = render(<InfoCard releasetime="12/13/2019 at 3:00PM" />);
  expect(
    container.querySelector("div.infocard div.time p").textContent
  ).toEqual("12/13/2019 at 3:00PM");
});

it("renders infocard with props(price)", () => {
  const { container } = render(<InfoCard price="$200" />);
  expect(
    container.querySelector("div.infocard div.price p").textContent
  ).toEqual("Price: $$200");
});
