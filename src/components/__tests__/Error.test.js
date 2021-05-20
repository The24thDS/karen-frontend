import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "components/error/Error";

const fakeProps = {
  message: "There was an error",
};

describe("<Error />", () => {
  it("renders the passed error message", async () => {
    render(<Error {...fakeProps} />);
    expect(screen.getByText(fakeProps.message)).toBeVisible();
  });
});
