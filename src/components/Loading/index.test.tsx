import { render } from "@testing-library/react";

import Loading from "./index";

describe("Loading", () => {
  it("Snapshot", () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
