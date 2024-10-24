import { fireEvent, render, screen } from "@testing-library/react";

import SettingAction from "./index";

describe("Header", () => {
  const onClickMock = jest.fn();

  it("Snapshot", () => {
    const { container } = render(<SettingAction onClick={onClickMock} />);
    expect(container).toMatchSnapshot();
  });

  it("should render the icon button and handle click event", () => {
    render(<SettingAction onClick={onClickMock} />);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
