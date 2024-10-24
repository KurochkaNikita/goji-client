import { render } from "@testing-library/react";

import Header from "./index";

describe("Header", () => {
  it("Snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
