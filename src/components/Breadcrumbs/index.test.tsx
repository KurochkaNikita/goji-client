import { render } from "@testing-library/react";
import { TBreadcrumbs } from "types";

import Breadcrumbs from "./index";

describe("Breadcrumbs", () => {
  it("Snapshot with empty items", () => {
    const items = [] as TBreadcrumbs[];
    const { container } = render(
      <Breadcrumbs items={items} currentPage="here" />
    );
    expect(container).toMatchSnapshot();
  });

  it("Snapshot with 2 items", () => {
    const items: TBreadcrumbs[] = [
      { link: "/1", label: "1" },
      { link: "/2", label: "2" },
    ];
    const { container } = render(
      <Breadcrumbs items={items} currentPage="here" />
    );
    expect(container).toMatchSnapshot();
  });

  it("Snapshot without items", () => {
    const { container } = render(<Breadcrumbs currentPage="here" />);
    expect(container).toMatchSnapshot();
  });
});
