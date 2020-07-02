import { act, fireEvent, render } from "@testing-library/react";
import React from "react";

import { Link } from "./Link";

describe("Link", () => {
	it("should render", () => {
		const { getByTestId, asFragment } = render(<Link href="/test">Test</Link>);
		expect(getByTestId("Link")).toHaveTextContent("Test");
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render external", () => {
		const { getByTestId, asFragment } = render(
			<Link href="https://ark.io" isExternal>
				ARK.io
			</Link>,
		);
		expect(getByTestId("Link")).toHaveAttribute("rel", "noopener noreferrer");
		expect(getByTestId("Link")).toHaveAttribute("target", "_blank");
		expect(getByTestId("Link__external")).toBeTruthy();
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render with tooltip", () => {
		const { getByTestId, baseElement } = render(
			<Link href="/test" tooltip="Custom Tooltip">
				Test
			</Link>,
		);

		act(() => {
			fireEvent.mouseEnter(getByTestId("Link"));
		});

		expect(baseElement).toHaveTextContent("Custom Tooltip");
	});
});
