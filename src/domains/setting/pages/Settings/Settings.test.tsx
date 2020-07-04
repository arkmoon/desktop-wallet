import { translations as pluginTranslations } from "domains/plugin/i18n";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render } from "testing-library";

import { Settings } from "./Settings";

describe("Settings", () => {
	it("should render", () => {
		const { container, asFragment } = render(<Settings />, { wrapper: MemoryRouter });

		expect(container).toBeTruthy();
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render peer settings", () => {
		const { container, asFragment, getByText } = render(<Settings />, { wrapper: MemoryRouter });

		expect(container).toBeTruthy();
		fireEvent.click(getByText("Peer"));
		act(() => {
			expect(getByText("Peer Settings")).toBeInTheDocument();
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render plugins settings", () => {
		const { container, asFragment, getByText, getByTestId } = render(<Settings />, { wrapper: MemoryRouter });

		expect(container).toBeTruthy();
		fireEvent.click(getByText("Plugins"));
		act(() => {
			expect(getByText("Plugin Settings")).toBeInTheDocument();
		});

		// Open `BlacklistPlugins` modal
		act(() => {
			fireEvent.click(getByTestId("plugins__open-list"));
		});
		expect(getByTestId("modal__inner")).toHaveTextContent(pluginTranslations.MODAL_BLACKLIST_PLUGINS.TITLE);

		act(() => {
			fireEvent.click(getByTestId("modal__close-btn"));
		});
		expect(() => getByTestId("modal__inner")).toThrow(/Unable to find an element by/);

		// Open `AddBlacklistPlugin` modal
		act(() => {
			fireEvent.click(getByTestId("plugins__add-plugin"));
		});
		expect(getByTestId("modal__inner")).toHaveTextContent(pluginTranslations.MODAL_ADD_BLACKLIST_PLUGIN.TITLE);

		act(() => {
			fireEvent.click(getByTestId("modal__close-btn"));
		});
		expect(() => getByTestId("modal__inner")).toThrow(/Unable to find an element by/);

		expect(asFragment()).toMatchSnapshot();
	});
});